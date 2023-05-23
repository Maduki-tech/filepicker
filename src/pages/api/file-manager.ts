import { type NextApiRequest, type NextApiResponse } from 'next';
import SQLFileProvider from '../../utils/sql-file-provider';
import { buffer } from 'micro';
import querystring from 'querystring';
import bodyParser from 'body-parser';
import { type Files } from '@prisma/client';
import multer from 'multer';
import type {
    FileManagerRequestBody,
    FileManagerResponse,
    FileSyncArray,
    SyncFiles,
} from '~/types/fileInterfaces';

export const config = {
    api: {
        bodyParser: false,
    },
};

const sqlFileProvider = new SQLFileProvider();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<FileManagerResponse | string | Files | FileSyncArray>
) {
    // const chunks = [];
    // for await (const chunk of req) {
    //     chunks.push(chunk);
    // }
    //   
    // const rawBody = Buffer.concat(chunks).toString();
    //
    //

        const rawBody = (await buffer(req)).toString();

    const isJson = req.headers['content-type'] === 'application/json';

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    req.body = isJson ? JSON.parse(rawBody) : querystring.parse(rawBody);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    req.body = isJson ? JSON.parse(rawBody) : querystring.parse(rawBody);

    const { method } = req;
    const body = req.body as FileManagerRequestBody;



    if (method === 'POST') {
        const action = body.action;

        switch (action) {
            case 'read':
                if (body.path === undefined) {
                    body.path = '/';
                }

                const fileList: SyncFiles[] = await sqlFileProvider.getFileList(
                    body.path
                );

                // prepare response
                const response: FileManagerResponse = {
                    cwd: {
                        name: '/',
                        size: 0,
                        dateModified: new Date(),
                        hasChild: true,
                        isFile: false,
                        type: 'Folder',
                        filterPath: '/',
                        mimeType: '',
                        content: new Buffer(''),
                        dateCreated: new Date(),
                        isRoot: true,
                        parentID: null,
                    },
                    files: fileList,
                };

                res.status(200).json(response);
                break;

            case 'create':
                const folderPath = body.path;
                const folderName = body.name;
                const newFolder = await sqlFileProvider.createFolder(
                    folderPath,
                    folderName
                );
                res.status(200).json({ files: [newFolder] });

                break;

            case 'move':
                const sourcePath = body.path;
                const targetPath = body.targetPath;
                const fileName = body.name;
                const movedFile = await sqlFileProvider.moveFile(
                    sourcePath,
                    targetPath,
                    fileName
                );
                res.status(200).json({ files: [movedFile] });
                break;

            case 'copy':
                const sourcePathCopy = body.path;
                const targetPathCopy = body.targetPath;
                const fileNameCopy = body.name;
                const copiedFile = await sqlFileProvider.copyFile(
                    sourcePathCopy,
                    targetPathCopy,
                    fileNameCopy
                );
                res.status(200).json({ files: [copiedFile] });
                break;

            case 'delete':
                // TODO: NEED TO FIX THE FILE LIMIT
                const jsonParser = bodyParser.json({ limit: '100mb' });
                jsonParser(req, res, async () => {
                    const pathRemove = body.path;
                    const nameRemove = body.name;
                    const removedFile = await sqlFileProvider.removeFile(
                        pathRemove,
                        nameRemove
                    );
                    res.status(200).json({ files: [removedFile] });
                });
                break;

            case 'rename':
                const pathRename = body.path;
                const nameRename = body.name;
                const newName = body.newName;
                const renamedFile = await sqlFileProvider.renameFile(
                    pathRename,
                    nameRename,
                    newName
                );
                res.status(200).json({ files: [renamedFile] });
                break;

            // case 'download':
            //     const pathDownload = body.path;
            //     const nameDownload = body.name;
            //     const downloadedFile = await sqlFileProvider.downloadFile(
            //         pathDownload,
            //         nameDownload
            //     );
            //     res.status(200).json({ files: [downloadedFile] });
            //     break;

            default:
                res.setHeader('Allow', ['POST']);
                res.status(405).end(`Action Not Allowed`);
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method Not Allowed`);
    }
}
