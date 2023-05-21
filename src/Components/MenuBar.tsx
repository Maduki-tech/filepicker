import React from 'react';
import { ArrowsPointingOutIcon, XCircleIcon } from '@heroicons/react/20/solid';

export default function MenuBar({ children }: { children: React.ReactNode }) {
    const [showModal, setShowModal] = React.useState(false);
    const openPDFInModal = () => {
        setShowModal(!showModal);
    };
    return (
        <div className="w-full px-4 pb-2">
            <button
                type="button"
                className="inline-flex items-start gap-x-1.5 rounded-md bg-indigo-600 p-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => openPDFInModal()}
            >
                <ArrowsPointingOutIcon
                    className=" h-5 w-5"
                    aria-hidden="true"
                />
            </button>

            <div className={`${showModal ? '' : 'hidden'}`}>
                <Modal toggle={openPDFInModal}>{children}</Modal>
            </div>
        </div>
    );
}

const Modal = ({
    children,
    toggle,
}: {
    children: React.ReactNode;
    toggle: any;
}) => {
    return (
        <div
            className="fixed z-50 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 bg-gray-500/75  transition-opacity"
                    aria-hidden="true"
                ></div>
                <button
                    className="hover:cursor-pointer absolute z-50 right-20"
                    role="button"
                    onClick={() => toggle()}
                >
                    <XCircleIcon
                        className="h-10 w-10 text-indigo-600"
                        aria-hidden="true"
                    />
                </button>
                <div className="fixed inset-0">{children}</div>
            </div>
        </div>
    );
};
