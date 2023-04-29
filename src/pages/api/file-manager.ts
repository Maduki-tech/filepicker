// eslint-disable-next-line
import { type NextApiRequest, type NextApiResponse } from 'next'
import SQLFileProvider from '../../utils/sql-file-provider'
import { buffer } from 'micro'
import querystring from 'querystring'
// import multer from 'multer'
import { type Files } from '@prisma/client'
import multer from 'multer'

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
}
const upload = multer()

const sqlFileProvider = new SQLFileProvider()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<FileManagerResponse | string | Files | FileSyncArray>
) {
    const rawBody = (await buffer(req)).toString()

    const isJson = req.headers['content-type'] === 'application/json'

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    req.body = isJson ? JSON.parse(rawBody) : querystring.parse(rawBody)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    req.body = isJson ? JSON.parse(rawBody) : querystring.parse(rawBody)

    const { method } = req
    const body = req.body as FileManagerRequestBody

    if (method === 'POST') {
        const action = body.action
        console.log('action', action)

        switch (action) {
            case 'read':
                // const path = (body.path as string) || '/'
                if (body.path === undefined) {
                    body.path = '/'
                }

                const fileList: SyncFiles[] = await sqlFileProvider.getFileList(
                    body.path
                )
                // res.status(200).json(fileList)
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
                }

                res.status(200).json(response)
                break

            case 'create':
                const folderPath = body.path
                const folderName = body.name
                const newFolder = await sqlFileProvider.createFolder(
                    folderPath,
                    folderName
                )
                res.status(200).json({ files: [newFolder] })

                break

            case 'Save':
                upload.single('file')(req, res, async (err) => {
                    if (err) {
                        res.status(500).json({ error: err.message })
                        return
                    }

                    const filePath = body.path
                    const uploadedFile = req.file
                    const newFile = await sqlFileProvider.createFile(
                        filePath,
                        uploadedFile
                    )
                    res.status(200).json({ files: [newFile] })
                })
                break

            // // Implement other actions like 'delete', 'rename', etc.
            default:
                res.setHeader('Allow', ['POST'])
                res.status(405).end(`Action Not Allowed`)
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method Not Allowed`)
    }
}
