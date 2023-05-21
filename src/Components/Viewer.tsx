import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import MenuBar from './MenuBar';

type PDFFile = string | File | null;

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function Viewer({ file }) {
    return (
        <div className="flex flex-col items-center">
            <MenuBar>
                <PDFViewer file={file} isModal={true} />
            </MenuBar>
            <PDFViewer file={file} isModal={false} />
        </div>
    );
}

const PDFViewer = ({ file, isModal }: { file: any; isModal: boolean }) => {
    const [firstLoad, setFirstLoad] = useState(true);

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pdfFile, setPdfFile] = useState<PDFFile>(null);
    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }
        const bytesData = file.content.data;
        const data = Buffer.from(bytesData).toString('base64');
        setPdfFile(data);
    }, [file]);

    return (
        <div className="flex flex-col justify-center h-full">
            {pdfFile && (
                <Document
                    file={`data:application/pdf;base64,${pdfFile}`}
                    onLoadError={(err) => console.log(err)}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                >
                    <Page
                        pageNumber={pageNumber}
                        className={'flex justify-center'}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                        height={isModal ? null : window.innerHeight - 220}
                    />
                </Document>
            )}
            {numPages && (
                <div className="flex w-full justify-around py-2">
                    <button
                        type="button"
                        onClick={() => setPageNumber(pageNumber - 1)}
                        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <ArrowLeftIcon
                            className="-ml-0.5 h-5 w-5"
                            aria-hidden="true"
                        />
                    </button>
                    <p>
                        Page {pageNumber} of {numPages}
                    </p>
                    <button
                        type="button"
                        onClick={() => setPageNumber(pageNumber + 1)}
                        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <ArrowRightIcon
                            className="-ml-0.5 h-5 w-5"
                            aria-hidden="true"
                        />
                    </button>
                </div>
            )}
        </div>
    );
};
