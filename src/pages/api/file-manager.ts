import { NextApiRequest, NextApiResponse } from 'next'
import SQLFileProvider from '../../utils/sql-file-provider'
import { buffer } from 'micro'
import querystring from 'querystring'

export const config = {
    api: {
        bodyParser: false,
    },
}

const sqlFileProvider = new SQLFileProvider()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Check if the content type is JSON
    const isJson = req.headers['content-type'] === 'application/json'

    // Manually parse the request body as x-www-form-urlencoded or JSON
    const rawBody = (await buffer(req)).toString()
    req.body = isJson ? JSON.parse(rawBody) : querystring.parse(rawBody)

    const { method, query, body } = req

    if (method === 'POST') {
        const action = body.action

        switch (action) {
            case 'read':
                const path = body.path || '/'
                const fileList = await sqlFileProvider.getFileList(path)
                console.log('fileList:', fileList)
                // res.status(200).json(fileList);
                res.status(200).json({
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
