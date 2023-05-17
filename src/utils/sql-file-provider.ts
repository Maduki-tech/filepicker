import { PrismaClient } from '@prisma/client';
import { SyncFiles } from '~/types/fileInterfaces';

export default class SQLFileProvider {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getFileList(path: string): Promise<SyncFiles[]> {
        console.log('path', path);
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
            });

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
            }));
        } catch (error) {
            console.error('Error in getFileList:', error);
            return [];
        }
    }

    async createFolder(path: string, name: string): Promise<SyncFiles> {
        const filterPath = path.endsWith('/') ? path : path + '/';
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
                FilterPath: filterPath === '/' ? '/' : path,
            },
        });

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
            filterPath: filterPath === '/' ? '/' : path,
        };

        return dataToReturn;
    }

    async createFile(
        path: string,
        file: Express.Multer.File
    ): Promise<SyncFiles> {
        console.log('file', file);

        const fileExists = await this.prisma.files.findFirst({
            where: {
                Name: file.originalname,
                FilterPath: path,
            },
        });

        if (fileExists) {
            throw new Error('File already exists');
        }

        const fileEndsWith = file.originalname.split('.').pop();

        const filterPath = path.endsWith('/') ? path : path + '/';
        await this.prisma.files.create({
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
                Type: fileEndsWith,
                FilterPath: filterPath === '/' ? '/' : path,
            },
        });

        const newFile = {
            name: file.originalname,
            parentID: null,
            size: file.size,
            isFile: true,
            mimeType: file.mimetype,
            content: file.buffer,
            dateModified: new Date(),
            dateCreated: new Date(),
            hasChild: false,
            isRoot: false,
            type: fileEndsWith,
            filterPath: filterPath === '/' ? '/' : path,
        };

        return newFile;
    }

    async moveFile(
        sourcePath: string,
        targetPath: string,
        fileName: string
    ): Promise<SyncFiles> {
        // Retrieve the file from the source path
        const file = await this.prisma.files.findFirst({
            where: {
                Name: fileName,
                FilterPath: sourcePath,
            },
        });

        if (!file) {
            throw new Error('File not found');
        }

        // Update the file's FilterPath to the target path
        const updatedFile = await this.prisma.files.update({
            where: { ItemID: file.ItemID },
            data: { FilterPath: targetPath },
        });

        // Return the moved file as a SyncFiles object
        return {
            name: updatedFile.Name,
            parentID: updatedFile.ParentID,
            size: updatedFile.Size,
            isFile: updatedFile.IsFile,
            mimeType: updatedFile.MimeType,
            content: updatedFile.Content,
            dateModified: updatedFile.DateModified,
            dateCreated: updatedFile.DateCreated,
            hasChild: updatedFile.HasChild,
            isRoot: updatedFile.IsRoot,
            type: updatedFile.Type,
            filterPath: updatedFile.FilterPath,
        };
    }

    async copyFile(
        sourcePath: string,
        targetPath: string,
        fileName: string
    ): Promise<SyncFiles> {
        // Retrieve the file from the source path
        const file = await this.prisma.files.findFirst({
            where: {
                Name: fileName,
                FilterPath: sourcePath,
            },
        });

        if (!file) {
            throw new Error('File not found');
        }

        // Create a new file with the same data as the source file
        const newFile = await this.prisma.files.create({
            data: {
                Name: file.Name,
                ParentID: file.ParentID,
                Size: file.Size,
                IsFile: file.IsFile,
                MimeType: file.MimeType,
                Content: file.Content,
                DateModified: file.DateModified,
                DateCreated: file.DateCreated,
                HasChild: file.HasChild,
                IsRoot: file.IsRoot,
                Type: file.Type,
                FilterPath: targetPath,
            },
        });

        // Return the copied file as a SyncFiles object
        return {
            name: newFile.Name,
            parentID: newFile.ParentID,
            size: newFile.Size,
            isFile: newFile.IsFile,
            mimeType: newFile.MimeType,
            content: newFile.Content,
            dateModified: newFile.DateModified,
            dateCreated: newFile.DateCreated,
            hasChild: newFile.HasChild,
            isRoot: newFile.IsRoot,
            type: newFile.Type,
            filterPath: newFile.FilterPath,
        };
    }

    async removeFile(path: string, fileName: string): Promise<SyncFiles> {
        // Retrieve the file from the source path
        const file = await this.prisma.files.findFirst({
            where: {
                Name: fileName,
                FilterPath: path,
            },
        });
        console.log(file);

        if (!file) {
            throw new Error('File not found');
        }

        // Delete the file
        await this.prisma.files.delete({
            where: { ItemID: file.ItemID },
        });

        // Return the deleted file as a SyncFiles object
        return {
            name: file.Name,
            parentID: file.ParentID,
            size: file.Size,
            isFile: file.IsFile,
            mimeType: file.MimeType,
            content: file.Content,
            dateModified: file.DateModified,
            dateCreated: file.DateCreated,
            hasChild: file.HasChild,
            isRoot: file.IsRoot,
            type: file.Type,
            filterPath: file.FilterPath,
        };
    }

    async renameFile(
        path: string,
        fileName: string,
        newFileName: string
    ): Promise<SyncFiles> {
        // Retrieve the file from the source path
        const file = await this.prisma.files.findFirst({
            where: {
                Name: fileName,
                FilterPath: path,
            },
        });

        if (!file) {
            throw new Error('File not found');
        }

        // Update the file's name
        const updatedFile = await this.prisma.files.update({
            where: { ItemID: file.ItemID },
            data: { Name: newFileName },
        });

        // Return the renamed file as a SyncFiles object
        return {
            name: updatedFile.Name,
            parentID: updatedFile.ParentID,
            size: updatedFile.Size,
            isFile: updatedFile.IsFile,
            mimeType: updatedFile.MimeType,
            content: updatedFile.Content,
            dateModified: updatedFile.DateModified,
            dateCreated: updatedFile.DateCreated,
            hasChild: updatedFile.HasChild,
            isRoot: updatedFile.IsRoot,
            type: updatedFile.Type,
            filterPath: updatedFile.FilterPath,
        };
    }
    async getFileByName(name: string): Promise<SyncFiles | null> {
        const file = await this.prisma.files.findFirst({
            where: {
                Name: name,
            },
        });
        return {
            name: file.Name,
            parentID: file.ParentID,
            size: file.Size,
            isFile: file.IsFile,
            mimeType: file.MimeType,
            content: file.Content,
            dateModified: file.DateModified,
            dateCreated: file.DateCreated,
            hasChild: file.HasChild,
            isRoot: file.IsRoot,
            type: file.Type,
            filterPath: file.FilterPath,
        };
    }
}
