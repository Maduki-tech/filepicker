import {type  NextApiRequest,  type NextApiResponse } from 'next'
import SQLFileProvider from '../../utils/sql-file-provider'
import { type Files } from '@prisma/client'
import multer from 'multer'
import { type FileManagerResponse, type FileSyncArray } from '~/types/fileInterfaces'

export const config = {
    api: {
        bodyParser: false,
    },
}

console.log(config)

const upload = multer()
const sqlFileProvider = new SQLFileProvider()

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<FileManagerResponse | string | Files | FileSyncArray>
) {
    const { method } = req

    if (method === 'POST') {
        upload.any()(req as any, res as any, async (err: any) => {
            if (err) {
                res.status(500)
                return
            }

            const filePath = '/'
            // @ts-ignore
            const uploadedFiles = req.files as Express.Multer.File[]
            const newFiles = await Promise.all(
                uploadedFiles.map((file) =>
                    sqlFileProvider.createFile(filePath, file)
                )
            )
            res.status(200).json({ files: newFiles })
        })
    } else {
        res.status(405).end('Action Not Allowed')
    }
}
