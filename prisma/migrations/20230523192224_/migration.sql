/*
  Warnings:

  - You are about to alter the column `name` on the `file` table. The data in that column could be lost. The data in that column will be cast from `NChar(40)` to `VarChar(40)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[file] ALTER COLUMN [name] VARCHAR(40) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
