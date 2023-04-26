import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class SQLFileProvider {
  /**
   * @param {string | string[]} path - The path of the folder to get the file list.
   * @async
   * @returns {Promise<any[]>} - The list of files in the given path.
   */
  async getFileList(path: string | string[]): Promise<any[]> {
    try {
      const files = await prisma.files.findMany({
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

  // ... Implement other methods like createFolder, renameFile, remove, etc.
}

