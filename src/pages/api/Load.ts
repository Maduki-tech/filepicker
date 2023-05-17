import { type NextApiRequest, type NextApiResponse } from 'next';
import SQLFileProvider from '../../utils/sql-file-provider';
import { type Files } from '@prisma/client';
import {
    type FileManagerRequestBody,
    type FileManagerResponse,
    type FileSyncArray,
} from '~/types/fileInterfaces';

const sqlFileProvider = new SQLFileProvider();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<
        | FileManagerResponse
        | string
        | Files
        | FileSyncArray
        | { error: string }
        | { content: any }
    >
) {
    const { method } = req;
    const body = req.body as FileManagerRequestBody;

    if (method === 'POST') {
        const action = body.action;
        console.log(body);
        if (action === 'Load') {
            const file = await sqlFileProvider.getFileByName(body.document);
            console.log(file);
            if (file) {
                const response = { content: file.content };
                res.status(200).json(response);
            } else {
                res.status(404).json({ error: 'File not found' });
            }
        } else {
            res.status(400).json({ error: 'Invalid action' });
        }
    } else {
        res.status(405).end('Action Not Allowed');
    }
}
