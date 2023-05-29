import { type NextApiRequest, type NextApiResponse } from 'next';
import querystring from 'querystring';
// import SQLFileProvider from '../../utils/sql-file-provider'
// import { type Files } from '@prisma/client'
import multer from 'multer';
import {
    type FileManagerResponse,
    type FileSyncArray,
} from '~/types/fileInterfaces';
import { PrismaClient } from '@prisma/client';

export const config = {
    api: {
        bodyParser: false,
    },
};

const upload = multer();

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req;
    const chunks = [];
    for await (const chunk of req) {
        chunks.push(chunk);
    }
    const isJson = req.headers['content-type'] === 'application/json';

    const rawBody = Buffer.concat(chunks).toString();
    req.body = isJson ? JSON.parse(rawBody) : querystring.parse(rawBody);

    const body = req.body;

    if (method === 'POST') {
        upload.any()(req as any, res as any, async (err: any) => {
            if (err) {
                res.status(500);
                return;
            }
            // @ts-ignore
            const buffer = Buffer.from(body.content, 'base64');

            const file = await prisma.dateiablage.create({
                data: {
                    name: body.name,
                    size: body.size,
                    content: buffer,
                },
            });

            res.status(200).json({ req: file });
        });
    } else {
        res.status(405).end('Action Not Allowed');
    }
}
