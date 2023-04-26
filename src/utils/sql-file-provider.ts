import { PrismaClient, type Files } from '@prisma/client';


export default class SQLFileProvider {
private prisma:  PrismaClient;

constructor() {
    this.prisma = new PrismaClient();
}
  /**
   * @param {string | string[]} path - The path of the folder to get the file list.
   * @async
   * @returns {Promise<any[]>} - The list of files in the given path.
   */
  async getFileList(path: string | string[]): Promise<any[]> {
    try {
      const files = await this.prisma.files.findMany({
        select: {
          Name: true,
          IsFile: true,
          size: true,
          DateModified: true,
          Type: true,
          FilterPath: true,
          HasChild: true,
        },
      });

      return files.map(file => ({
        name: file.Name.trim(),
        isFile: file.IsFile,
        size: file.size?.toString(),
        dateModified: file.DateModified,
        type: file.Type,
        filterPath: file.FilterPath,
        hasChild: file.HasChild,
      }));
    } catch (error) {
      console.error('Error in getFileList:', error);
      return [];
    }
  }

  async createFolder(path: string, name: string): Promise<Files> {
    const filterPath = path.endsWith('/') ? path : path + '/';
    const newFolder = await this.prisma.files.create({
      data: {
        Name: name,
        ParentID: null,
        size: 0,
        IsFile: false,
        MimeType: null,
        Content: null,
        DateModified: new Date(),
        DateCreated: new Date(),
        HasChild: false,
        IsRoot: false,
        Type: 'Folder',
        FilterPath: filterPath + name + '/',
      },
    });

    return newFolder;
  }

 async createFile(path: string, file: Express.Multer.File): Promise<Files> {
    const filterPath = path.endsWith('/') ? path : path + '/';
    const newFile = await this.prisma.files.create({
      data: {
        Name: file.originalname,
        ParentID: null,
        size: file.size,
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
    });

    return newFile;
  }

  // ... Implement other methods like createFolder, renameFile, remove, etc.
}

