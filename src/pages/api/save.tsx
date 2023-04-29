import { type NextApiRequest, type NextApiResponse } from 'next';
import SQLFileProvider from '../../utils/sql-file-provider';
import { buffer } from 'micro';
import querystring from 'querystring';
import { type Files } from '@prisma/client';
import multer from 'multer';

interface SyncFiles {
    itemID?: number
    name: string
    parentID: number | null
    size: number | null
    isFile: boolean | null
    mimeType: string | null
    content: Buffer | null
    dateModified: Date | null
    dateCreated: Date | null
    hasChild: boolean | null
    isRoot: boolean | null
    type: string | null
    filterPath: string | null
}

interface FileManagerResponse {
    cwd: SyncFiles
    files: SyncFiles[]
}
interface ReadAction {
    action: 'read'
    path?: string
}

interface CreateAction {
    action: 'create'
    path: string
    name: string
    data: Files
}
interface SaveAction {
    action: 'Save'
    path: string
    name: string
    data: Files
}

interface FileSyncArray {
    files: SyncFiles[]
}

type FileManagerRequestBody = ReadAction | CreateAction | SaveAction

export const config = {
  api: {
    bodyParser: false,
  },
};
const upload = multer();

const sqlFileProvider = new SQLFileProvider();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FileManagerResponse | string | Files | FileSyncArray>
) {
  const rawBody = (await buffer(req)).toString();

  const isJson = req.headers['content-type'] === 'application/json';

  req.body = isJson ? JSON.parse(rawBody) : querystring.parse(rawBody);

  const { method } = req;
  const body = req.body as FileManagerRequestBody;
  const action = body.action;
  console.log('action', action);

  if (method === 'POST' && action === 'Save') {
    upload.single('file')(req, res, async (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      const filePath = body.path === undefined ? '/' : body.path;
      const uploadedFile = req.file;
      const newFile = await sqlFileProvider.createFile(filePath, uploadedFile);
      res.status(200).json({ files: [newFile] });
    });
  } else {
    res.status(405).end('Action Not Allowed');
  }
}

