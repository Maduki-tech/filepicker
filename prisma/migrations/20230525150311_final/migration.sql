BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[dateiablage] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_dateiablage_id] DEFAULT newid(),
    [parent_id] UNIQUEIDENTIFIER,
    [typ_id] UNIQUEIDENTIFIER,
    [referenz_id] UNIQUEIDENTIFIER,
    [name] VARCHAR(100),
    [size] INT,
    [content] VARBINARY(max),
    [date_created] DATETIME NOT NULL CONSTRAINT [DF_dateiablage_date_created] DEFAULT CURRENT_TIMESTAMP,
    [date_modified] DATETIME NOT NULL CONSTRAINT [DF_dateiablage_date_modified] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_dateiablage] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[dateiablage_typ] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_dateiablage_typ_id] DEFAULT newid(),
    [bezeichnung] VARCHAR(50) NOT NULL,
    CONSTRAINT [PK_dateiablage_typ] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[sysdiagrams] (
    [name] NVARCHAR(128) NOT NULL,
    [principal_id] INT NOT NULL,
    [diagram_id] INT NOT NULL IDENTITY(1,1),
    [version] INT,
    [definition] VARBINARY(max),
    CONSTRAINT [PK__sysdiagr__C2B05B61A0975439] PRIMARY KEY CLUSTERED ([diagram_id]),
    CONSTRAINT [UK_principal_name] UNIQUE NONCLUSTERED ([principal_id],[name])
);

-- AddForeignKey
ALTER TABLE [dbo].[dateiablage] ADD CONSTRAINT [FK_dateiablage_dateiablage] FOREIGN KEY ([parent_id]) REFERENCES [dbo].[dateiablage]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[dateiablage] ADD CONSTRAINT [FK_dateiablage_dateiablage_typ] FOREIGN KEY ([typ_id]) REFERENCES [dbo].[dateiablage_typ]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
