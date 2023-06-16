import React, { useEffect, useState } from 'react';
import { env } from '~/env.mjs';

export default function Index() {
    const [signedInUser, setSignedInUser] = useState();
    // Array of API discovery doc URLs for APIs
    const DISCOVERY_DOCS = [
        'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
    ];

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

    const handleAuthClick = async () => {
        const gapi = await import('gapi-script').then((pack) => pack.gapi);
        gapi.auth2.getAuthInstance().signIn();
    };

    /**
     *  Called when the signed in status changes, to update the UI
     *  appropriately. After a sign-in, the API is called.
     */
    const updateSigninStatus = async (isSignedIn) => {
        const gapi = await import('gapi-script').then((pack) => pack.gapi);
        if (isSignedIn) {
            // Set the signed in user
            setSignedInUser(gapi.auth2.getAuthInstance().currentUser.je.Qt);
        } else {
            // prompt user to sign in
            handleAuthClick();
        }
    };

    /**
     *  Sign out the user upon button click.
     */
    const handleSignOutClick = async () => {
        const gapi = await import('gapi-script').then((pack) => pack.gapi);
        gapi.auth2.getAuthInstance().signOut();
    };

    const initClient = async () => {
        const gapi = await import('gapi-script').then((pack) => pack.gapi);
        gapi.client
            .init({
                apiKey: env.NEXT_PUBLIC_GOOGLE_DRIVE_API,
                clientId: env.NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            })
            .then(
                function () {
                    // Listen for sign-in state changes.
                    gapi.auth2
                        .getAuthInstance()
                        .isSignedIn.listen(updateSigninStatus);

                    // Handle the initial sign-in state.
                    updateSigninStatus(
                        gapi.auth2.getAuthInstance().isSignedIn.get()
                    );
                },
                function (error) {}
            );
    };

    // GAPI FUnction
    const handleClientLoad = async () => {
        const gapi = await import('gapi-script').then((pack) => pack.gapi);
        gapi.load('client:auth2', initClient);
    };
    handleClientLoad();

    return (
        <div>
            <button onClick={handleClientLoad}>click</button>
        </div>
    );
}
