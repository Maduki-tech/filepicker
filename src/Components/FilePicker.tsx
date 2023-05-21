import * as React from 'react';
import {
    FileManagerComponent,
    Inject,
    NavigationPane,
    DetailsView,
    Toolbar,
} from '@syncfusion/ej2-react-filemanager';
import { env } from '~/env.mjs';

export default function FilePicker({ setFile }) {
    const hostUrl = env.NEXT_PUBLIC_URL;

    const onFileSelect = (args) => {
        const file = args.fileDetails;
        if (file.isFile && file.type === 'pdf') {
            console.log(args);
            setFile(file);
        }
    };


    return (
        <div className='h-full flex flex-grow'>
            <div className="control-section">
                <FileManagerComponent
                    height={'100%'}
                    id="overview_file"
                    fileOpen={onFileSelect}
                    ajaxSettings={{
                        url: hostUrl + 'api/file-manager',
                        uploadUrl: hostUrl + 'api/save',
                        getImageUrl: hostUrl + 'api/file-manager',
                        downloadUrl: hostUrl + 'api/file-manager',
                    }}
                    toolbarSettings={{
                        items: [
                            'NewFolder',
                            'Upload',
                            'SortBy',
                            'Cut',
                            'Copy',
                            'Paste',
                            'Delete',
                            'Refresh',
                            'Download',
                            'Rename',
                            'Selection',
                            'View',
                            'Details',
                        ],
                    }}
                    contextMenuSettings={{
                        layout: [
                            'SortBy',
                            'View',
                            'Refresh',
                            '|',
                            'Paste',
                            '|',
                            'NewFolder',
                            '|',
                            'Details',
                            '|',
                            'SelectAll',
                        ],
                    }}
                    view={'Details'}
                    allowDragAndDrop={true}
                    showThumbnail={true}
                >
                    <Inject services={[NavigationPane, DetailsView, Toolbar]} />
                </FileManagerComponent>
            </div>
        </div>
    );
}
