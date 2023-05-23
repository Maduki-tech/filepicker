/*
  Warnings:

  - You are about to drop the `file` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[file] DROP CONSTRAINT [file_parentID_fkey];

-- DropTable
DROP TABLE [dbo].[file];

-- CreateTable
CREATE TABLE [dbo].[Folder] (
    [folderID] INT NOT NULL IDENTITY(1,1),
    [name] NCHAR(40) NOT NULL,
    [parentID] INT,
    [dateCreated] DATETIME,
    [dateModified] DATETIME,
    CONSTRAINT [Folder_pkey] PRIMARY KEY CLUSTERED ([folderID])
);

-- CreateTable
CREATE TABLE [dbo].[File] (
    [fileID] INT NOT NULL IDENTITY(1,1),
    [name] NCHAR(40) NOT NULL,
    [parentFolderID] INT,
    [size] INT,
    [type] NVARCHAR(1000),
    [content] VARBINARY(max),
    [dateCreated] DATETIME,
    [dateModified] DATETIME,
    CONSTRAINT [File_pkey] PRIMARY KEY CLUSTERED ([fileID])
);

-- AddForeignKey
ALTER TABLE [dbo].[Folder] ADD CONSTRAINT [Folder_parentID_fkey] FOREIGN KEY ([parentID]) REFERENCES [dbo].[Folder]([folderID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[File] ADD CONSTRAINT [File_parentFolderID_fkey] FOREIGN KEY ([parentFolderID]) REFERENCES [dbo].[Folder]([folderID]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
