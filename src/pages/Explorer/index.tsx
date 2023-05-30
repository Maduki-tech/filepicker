import { FolderPlusIcon, ArrowPathIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react';
import MainContent from '~/Components/Explorer/Main';
import InputModal from '~/Components/Explorer/Modals/ModalFolderName';
import Sidebar from '~/Components/Explorer/SideBar';
import { BreadCrumbProps } from '~/types/Explorer';

import { api } from '~/utils/api';

type FileProps = {
    name: string;
    size: number;
    content: string;
};

export default function Index() {
    const [modalOpen, setModalOpen] = useState(false);
    const [breadcrumb, setBreadcrumb] = useState<BreadCrumbProps[]>([
        {
            id: null,
            name: 'Home',
            current: true,
        },
    ]);
    const [currentFolderId, setCurrentFolderId] = useState(null);
    const [files, setFiles] = useState([]);
    const [firstFetch, setFirstFetch] = useState(true);
    const { data, refetch, isSuccess } = api.fileManager.getFolder.useQuery({
        id: currentFolderId,
    });

    // set Data on first fetch
    useEffect(() => {
        if (isSuccess && firstFetch) {
            setFiles(data);
            setFirstFetch(false);
        }
    }, [isSuccess]);

    const createFolder = () => {
        setModalOpen(!modalOpen);
    };

    const handleFolderCreate = async () => {
        setModalOpen(false);
        await refetch(); // Refetch the data after the folder creation is successful
    };

    const handleRefetch = async () => {
        await refetch();
    };

    const saveFileToDatabase = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const arrayBuffer = reader.result as ArrayBuffer;
            const buffer = Buffer.from(arrayBuffer);

            const base64Content = buffer.toString('base64');

            const fileData: FileProps = {
                name: file.name,
                size: file.size,
                content: base64Content,
            };

            fetch('/api/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fileData),
            })
                .then((response) => {
                    console.log(response);
                })
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        reader.onerror = (error) => {
            console.log(error);
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <>
            {modalOpen && (
                <InputModal
                    setFiles={handleFolderCreate}
                    setModalOpen={setModalOpen}
                    currentFolderId={currentFolderId}
                />
            )}
            <div className="bg-white rounded shadow h-[calc(100vh-4rem)] overflow-hidden">
                <div className="flex items-center p-2 bg-blue-500 gap-2 text-white">
                    <span>File Explorer</span>
                    <input type="file" onChange={saveFileToDatabase} />
                    <ToolbarButton
                        icon={<FolderPlusIcon className="h-5 w-5" />}
                        onClick={() => createFolder()}
                    />
                    <ToolbarButton
                        icon={<ArrowPathIcon className="h-5 w-5" />}
                        onClick={() => handleRefetch()}
                    />
                </div>
                <div className="flex h-full">
                    <div className="w-1/4 border-r">
                        <Sidebar
                            data={files}
                            onSelectFolder={setCurrentFolderId}
                            setBreadcrumb={setBreadcrumb}
                        />
                    </div>
                    <div className="w-3/4 bg-neutral-200">
                        <MainContent
                            data={data}
                            currentFolderId={currentFolderId}
                            setCurrentFolderId={setCurrentFolderId}
                            breadcrumb={breadcrumb}
                            setBreadcrumb={setBreadcrumb}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

type ToolbarButtonProps = {
    icon: React.ReactNode;
    onClick: () => void;
};

const ToolbarButton = ({ icon, onClick }: ToolbarButtonProps) => {
    return (
        <button
            type="button"
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={onClick}
        >
            {icon}
        </button>
    );
};
