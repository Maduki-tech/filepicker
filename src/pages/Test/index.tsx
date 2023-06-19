import React, { useEffect, useState } from 'react';
import { env } from '~/env.mjs';
import { google } from 'googleapis';

const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

export const getServerSideProps = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: './test.json',
        scopes: SCOPES,
    });
    google.options({ auth });

    const drive = google.drive({ version: 'v3', auth });

    const res = await drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
    });

    const files = res.data.files;

    return {
        props: {
            files,
        },
    };
};

export default function Index(props: Record<string, unknown>) {
    return (
        <div>
            <h1>Test</h1>
            <pre>{JSON.stringify(props, null, 2)}</pre>
        </div>
    );
}
