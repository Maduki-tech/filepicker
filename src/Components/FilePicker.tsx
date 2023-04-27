import * as React from 'react'
import {
    FileManagerComponent,
    Inject,
    NavigationPane,
    DetailsView,
    Toolbar,
} from '@syncfusion/ej2-react-filemanager'

export default function FilePicker() {
    const hostUrl = 'http://localhost:3000/'
    return (
        <div>
            <div className="control-section">
                <FileManagerComponent
                    id="overview_file"
                    ajaxSettings={{
                        url: hostUrl + 'api/file-manager',
                        // getImageUrl: hostUrl + 'api/SQLProvider/SQLGetImage',
                        // uploadUrl: hostUrl + 'api/SQLProvider/SQLUpload',
                        // downloadUrl: hostUrl + 'api/SQLProvider/SQLDownload',
                    }}
                    toolbarSettings={{
                        items: [
                            'NewFolder',
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
                    showThumbnail={false}
                >
                    <Inject services={[NavigationPane, DetailsView, Toolbar]} />
                </FileManagerComponent>
            </div>
        </div>
    )
}

