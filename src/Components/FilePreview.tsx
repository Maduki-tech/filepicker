import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
    Inject,
    Toolbar,
    Annotation,
    BookmarkView,
    FormDesigner,
    FormFields,
    LinkAnnotation,
    Magnification,
    Navigation,
    Print,
    TextSearch,
    TextSelection,
    ThumbnailView,
} from '@syncfusion/ej2-react-pdfviewer';
import { env } from '~/env.mjs';

const DynamicPdfViewer = dynamic(
    () =>
        import('@syncfusion/ej2-react-pdfviewer').then(
            (module) => module.PdfViewerComponent
        ),
    { ssr: false }
);

export default function FilePreview({fileContent}: {fileContent: string}) {
    const hostUrl = env.NEXT_PUBLIC_URL;
    const viewer = React.useRef(null);
    const [firstLoad, setFirstLoad] = React.useState(true);
    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }
        console.log(fileContent);
        if (viewer.current) {
            viewer.current.load(fileContent);
        }
    }, [fileContent]);

    return (
        <div>
            <div className="control-section">
                {typeof window !== 'undefined' && (
                    <DynamicPdfViewer
                        id="container"
                        ref={viewer}
                        serviceUrl={hostUrl + 'api/'}
                        style={{ height: '640px' }}
                    >
                        {/* Inject the required services */}
                        <Inject
                            services={[
                                Toolbar,
                                Magnification,
                                Navigation,
                                Annotation,
                                LinkAnnotation,
                                BookmarkView,
                                ThumbnailView,
                                Print,
                                TextSelection,
                                TextSearch,
                                FormFields,
                                FormDesigner,
                            ]}
                        />
                    </DynamicPdfViewer>
                )}
            </div>
        </div>
    );
}
