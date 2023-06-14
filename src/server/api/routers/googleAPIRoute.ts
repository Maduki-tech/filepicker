import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { env } from '~/env.mjs';
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
    env.FLOXGCLIENTID,
    env.FLOXGCLIENTSECRET,
    env.FLOXGTENANTID
);

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

export const googleAPIRoute = createTRPCRouter({
    getAuthUrl: publicProcedure.query(async () => {
        const scopes = [
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.metadata.readonly',
        ];

        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
        });

        return { url };
    }),
    //
    // handleOAuth2Callback: publicProcedure.mutation(async (code) => {
    //     const { tokens } = await oauth2Client.getToken(code);
    //     oauth2Client.setCredentials(tokens);
    // }),

    getData: publicProcedure.query(async () => {
        const res = await drive.files.list({
            pageSize: 10,
            fields: 'nextPageToken, files(id, name)',
        });

        return res.data.files;
    }),
});
