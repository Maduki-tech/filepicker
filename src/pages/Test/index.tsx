import React from 'react';
import { google } from 'googleapis';

const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

export const getServerSideProps = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: './test.json',
        scopes: SCOPES,
    });
    google.options({ auth });

    const drive = google.drive({ version: 'v3', auth });

    const about = await drive.about.get({
        fields: '*',
    });
    console.log(about);
    const user = about.data.user.displayName;

    return {
        props: {
            user,
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
