import { PrismaClient, type Files } from '@prisma/client'

export default class SQLFileProvider {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async getFileList(): Promise<Files[]> {
        try {
            const files = await this.prisma.files.findMany({
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
            console.log('files:', files)

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

    async createFolder(path: string, name: string): Promise<Files> {
        const filterPath = path.endsWith('/') ? path : path + '/'
        const newFolder = await this.prisma.files.create({
            data: {
                Name: name.replace(' ', ''),
                ParentID: null,
                Size: 0,
                IsFile: true,
                MimeType: '',
                Content: new Buffer(''),
                DateModified: new Date(),
                DateCreated: new Date(),
                HasChild: false,
                IsRoot: false,
                Type: 'Folder',
                FilterPath: filterPath + name + '/',
            },
        })

        return newFolder
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
