import React, { useEffect, useState } from 'react';
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
type PDFFile = string | File | null;

export default function FilePreview({fileContent}) {
    const [pdfFile, setPdfFile] = useState<PDFFile>(null);
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }
        // create a File
        const bytesData = fileContent.content.data;
        const data = Buffer.from(bytesData).toString('base64');

        // create blob and then create a File
        const blob = new Blob([bytesData], { type: 'application/pdf' });
        const file = new File([blob], 'file.pdf', { type: 'application/pdf' });
        setPdfFile(file);
    }, [fileContent]);

    return (
        <div>
            <div className="control-section">
                {typeof window !== 'undefined' && (
                    <DynamicPdfViewer
                        id="container"
                        documentPath={pdfFile}
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
