import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

type PDFFile = string | File | null;

// pdfjs.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.js');
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function Viewer({ file }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pdfFile, setPdfFile] = useState<PDFFile>(null);
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }
        const bytesData = file.content.data;
        const data = Buffer.from(bytesData).toString('base64');
        setPdfFile(data);
    }, [file]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div>
            {pdfFile && (
                <Document
                    file={`data:application/pdf;base64,${pdfFile}`}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={(err) => console.log(err)}
                >
                    <Page
                        pageNumber={1}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                    />
                </Document>
            )}
            {numPages && (
                <p>
                    Page {pageNumber} of {numPages}
                </p>
            )}
        </div>
    );
}
