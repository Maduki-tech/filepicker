import { type NextApiRequest, type NextApiResponse } from 'next'
import SQLFileProvider from '../../utils/sql-file-provider'
import { buffer } from 'micro'
import querystring from 'querystring'
import multer from 'multer'

interface FileManagerFile {
    name: string
    size: number
    dateModified: string
    hasChild: boolean
    isFile: boolean
    type: string
    filterPath: string
}

interface FileManagerResponse {
    cwd: FileManagerFile
    files: FileManagerFile[]
}
interface ReadAction {
    action: 'read'
    path?: string
}

interface OtherAction {
    action: string
    [key: string]: any
}
interface CreateAction {
    action: 'create'
    path: string
    name: string
    isFile: boolean
    file?: Express.Multer.File
}


type FileManagerRequestBody = ReadAction | OtherAction | CreateAction

export const config = {
    api: {
        bodyParser: false,
    },
}
const upload = multer()

const sqlFileProvider = new SQLFileProvider()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<FileManagerResponse>
) {
    const rawBody = (await buffer(req)).toString()

    const isJson = req.headers['content-type'] === 'application/json'
    req.body = isJson ? JSON.parse(rawBody) : querystring.parse(rawBody)

    req.body = isJson ? JSON.parse(rawBody) : querystring.parse(rawBody)

    const { method } = req
    const body = req.body as FileManagerRequestBody

    if (method === 'POST') {
        const action = body.action

        switch (action) {
            case 'read':
                const path = (body.path as string) || '/'
                const fileList: FileManagerFile[] =
                    await sqlFileProvider.getFileList(path)
                console.log('fileList:', fileList)
                // res.status(200).json(fileList);
                const response: FileManagerResponse = {
                    cwd: {
                        name: '/',
                        size: 0,
                        dateModified: new Date().toISOString(),
                        hasChild: true,
                        isFile: false,
                        type: 'Folder',
                        filterPath: '/',
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
                res.status(200).json(newFolder)
                break
            case 'upload':
                // Handle file uploads with multer
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
                    res.status(200).json(newFile)
                })
                break
            // Implement other actions like 'delete', 'rename', etc.
            default:
                res.setHeader('Allow', ['POST'])
                res.status(405).end(`Action ${action} Not Allowed`)
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${method!} Not Allowed`)
    }
}
