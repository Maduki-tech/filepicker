BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[akte] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_akte_id] DEFAULT newid(),
    [aktenschrank_id] UNIQUEIDENTIFIER,
    [aktenname] VARCHAR(200) NOT NULL,
    [aktenzeichen] VARCHAR(12) NOT NULL,
    [sachbearbeiter] NCHAR(10),
    [vorlage_briefkopf] UNIQUEIDENTIFIER,
    [vorlage_briefbaustein] UNIQUEIDENTIFIER,
    [ordner_id] VARCHAR(200),
    [angelegt_am] DATETIME NOT NULL CONSTRAINT [DF_akte_angelegt_am] DEFAULT CURRENT_TIMESTAMP,
    [geändert_am] DATETIME NOT NULL CONSTRAINT [DF_akte_geändert_am] DEFAULT CURRENT_TIMESTAMP,
    [angelegt_von] NCHAR(10),
    [geändert_von] NCHAR(10),
    CONSTRAINT [PK_akte] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[aktenschrank] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_aktenschrank_id] DEFAULT newid(),
    [team_id] UNIQUEIDENTIFIER,
    [bezeichnung] VARCHAR(200) NOT NULL,
    CONSTRAINT [PK_aktenschrank] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[beteiligter] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_beteiligter_id] DEFAULT newid(),
    [typ_id] UNIQUEIDENTIFIER NOT NULL,
    [akte_id] UNIQUEIDENTIFIER,
    [kontakt_id] UNIQUEIDENTIFIER NOT NULL,
    [vertreter_id] UNIQUEIDENTIFIER,
    [aktenzeichen] VARCHAR(12),
    [betreff_beteiligter] VARCHAR(100),
    [betreff_vertreter] VARCHAR(100),
    [ordner_id] VARCHAR(150),
    [schuldner] BIT NOT NULL CONSTRAINT [DF_beteiligter_schuldner] DEFAULT 0,
    [glaeubiger] BIT NOT NULL CONSTRAINT [DF_Table_1_glaubiger] DEFAULT 0,
    [nahest_person] BIT NOT NULL CONSTRAINT [DF_beteiligter_nahest_person] DEFAULT 0,
    CONSTRAINT [PK_beteiligter] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[beteiligter_typ] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_beteiligter_typ_id] DEFAULT newid(),
    [bezeichnung] VARCHAR(200) NOT NULL,
    CONSTRAINT [PK_beteiligter_typ] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[kontakt] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_kontakt_id] DEFAULT newid(),
    [nachname] VARCHAR(50),
    [vorname] VARCHAR(50),
    [anrede] VARCHAR(15),
    [anschrift1] VARCHAR(50),
    [plz] VARCHAR(10),
    [ort] VARCHAR(50),
    [email] VARCHAR(50),
    [telefon] VARCHAR(50),
    [fax] VARCHAR(50),
    CONSTRAINT [PK_kontakt] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[team] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_Table_1_ID] DEFAULT newid(),
    [team_name] VARCHAR(50) NOT NULL,
    [verzeichnis_name] VARCHAR(50),
    [ordner_id] VARCHAR(200),
    [team_farbe] NCHAR(10),
    [textfarbe_akten] NCHAR(10),
    [prefix_aktenzeichen] INT NOT NULL,
    CONSTRAINT [PK_team] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [IX_team] UNIQUE NONCLUSTERED ([prefix_aktenzeichen])
);

-- AddForeignKey
ALTER TABLE [dbo].[akte] ADD CONSTRAINT [FK_akte_team] FOREIGN KEY ([aktenschrank_id]) REFERENCES [dbo].[aktenschrank]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[aktenschrank] ADD CONSTRAINT [FK_aktenschrank_team] FOREIGN KEY ([team_id]) REFERENCES [dbo].[team]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[beteiligter] ADD CONSTRAINT [FK_beteiligter_akte] FOREIGN KEY ([akte_id]) REFERENCES [dbo].[akte]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[beteiligter] ADD CONSTRAINT [FK_beteiligter_beteiligter_typ] FOREIGN KEY ([typ_id]) REFERENCES [dbo].[beteiligter_typ]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[beteiligter] ADD CONSTRAINT [FK_beteiligter_kontakt] FOREIGN KEY ([kontakt_id]) REFERENCES [dbo].[kontakt]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[beteiligter] ADD CONSTRAINT [FK_beteiligter_kontakt1] FOREIGN KEY ([vertreter_id]) REFERENCES [dbo].[kontakt]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[beteiligter_typ] ADD CONSTRAINT [FK_beteiligter_typ_beteiligter_typ] FOREIGN KEY ([id]) REFERENCES [dbo].[beteiligter_typ]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
