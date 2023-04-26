BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Files] (
    [ItemID] INT NOT NULL IDENTITY(1,1),
    [Name] NCHAR(40) NOT NULL,
    [ParentID] INT,
    [size] BIGINT,
    [IsFile] BIT,
    [MimeType] NCHAR(200),
    [Content] VARBINARY(max),
    [DateModified] DATETIME,
    [DateCreated] DATETIME,
    [HasChild] BIT,
    [IsRoot] BIT,
    [Type] VARCHAR(255),
    [FilterPath] NVARCHAR(200),
    CONSTRAINT [PK_Files] PRIMARY KEY CLUSTERED ([ItemID])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
