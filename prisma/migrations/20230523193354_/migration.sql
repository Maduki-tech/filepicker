/*
  Warnings:

  - You are about to alter the column `name` on the `File` table. The data in that column could be lost. The data in that column will be cast from `NChar(40)` to `VarChar(40)`.
  - You are about to alter the column `name` on the `Folder` table. The data in that column could be lost. The data in that column will be cast from `NChar(40)` to `VarChar(40)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[File] ALTER COLUMN [name] VARCHAR(40) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Folder] ALTER COLUMN [name] VARCHAR(40) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
