import * as React from 'react'
import {
    FileManagerComponent,
    Inject,
    NavigationPane,
    DetailsView,
    Toolbar,
} from '@syncfusion/ej2-react-filemanager'
import { env } from '~/env.mjs'

export default function FilePicker() {
    // const hostUrl = 'https://filepicker.vercel.app/'
    const hostUrl = env.NEXT_PUBLIC_URL
    return (
        <div>
            <div className="control-section">
                <FileManagerComponent
                    className="bg-white"
                    id="overview_file"
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
    )
}
