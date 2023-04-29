import { PrismaClient, type Files } from '@prisma/client'
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

export default class SQLFileProvider {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async getFileList(path: string): Promise<SyncFiles[]> {
        console.log('read', path)
        try {
            const files = await this.prisma.files.findMany({
                where: {
                    FilterPath: path,
                },
                select: {
                    Name: true,
                    IsFile: true,
                    Size: true,
                    DateModified: true,
                    Type: true,
                    FilterPath: true,
                    HasChild: true,
                    IsRoot: true,
                    MimeType: true,
                    Content: true,
                    DateCreated: true,
                    ParentID: true,
                },
            })

            return files.map((file) => ({
                name: file.Name,
                isFile: file.IsFile,
                size: file.Size,
                dateModified: file.DateModified,
                type: file.Type,
                filterPath: file.FilterPath,
                hasChild: file.HasChild,
                isRoot: file.IsRoot,
                mimeType: file.MimeType,
                content: file.Content,
                dateCreated: file.DateCreated,
                parentID: file.ParentID,
            }))
        } catch (error) {
            console.error('Error in getFileList:', error)
            return []
        }
    }

    async createFolder(path: string, name: string): Promise<SyncFiles> {
        const filterPath = path.endsWith('/') ? path : path + '/'
        console.log('in function :',filterPath)
        await this.prisma.files.create({
            data: {
                Name: name.replace(' ', ''),
                ParentID: null,
                Size: 0,
                IsFile: false,
                MimeType: '',
                Content: new Buffer(''),
                DateModified: new Date(),
                DateCreated: new Date(),
                HasChild: false,
                IsRoot: false,
                Type: 'Folder',
                FilterPath: filterPath === '/' ? '/' : '/' + name + '/',
            },
        })

        const dataToReturn = {
            name: name.replace(' ', ''),
            parentID: null,
            size: 0,
            isFile: false,
            mimeType: '',
            content: new Buffer(''),
            dateModified: new Date(),
            dateCreated: new Date(),
            hasChild: false,
            isRoot: false,
            type: 'Folder',
            filterPath: filterPath + name + '/',
        }


        return dataToReturn
    }

    async createFile(path: string, file: Express.Multer.File): Promise<Files> {
        const filterPath = path.endsWith('/') ? path : path + '/'
        const newFile = await this.prisma.files.create({
            data: {
                Name: file.originalname,
                ParentID: null,
                Size: file.size,
                IsFile: true,
                MimeType: file.mimetype,
                Content: file.buffer,
                DateModified: new Date(),
                DateCreated: new Date(),
                HasChild: false,
                IsRoot: false,
                Type: 'File',
                FilterPath: filterPath,
            },
        })

        return newFile
    }

    // ... Implement other methods like createFolder, renameFile, remove, etc.
}
