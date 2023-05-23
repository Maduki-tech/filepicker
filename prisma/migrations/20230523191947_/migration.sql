/*
  Warnings:

  - You are about to drop the `Files` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropTable
DROP TABLE [dbo].[Files];

-- CreateTable
CREATE TABLE [dbo].[file] (
    [itemID] INT NOT NULL IDENTITY(1,1),
    [name] NCHAR(40) NOT NULL,
    [parentID] INT,
    [size] INT,
    [type] NVARCHAR(1000),
    [content] VARBINARY(max),
    [isRoot] BIT,
    [dateModified] DATETIME,
    [dateCreated] DATETIME,
    CONSTRAINT [file_pkey] PRIMARY KEY CLUSTERED ([itemID])
);

-- AddForeignKey
ALTER TABLE [dbo].[file] ADD CONSTRAINT [file_parentID_fkey] FOREIGN KEY ([parentID]) REFERENCES [dbo].[file]([itemID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
