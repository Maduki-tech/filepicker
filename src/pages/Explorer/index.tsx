import { CloudArrowUpIcon, FolderPlusIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react';
import MainContent from '~/Components/Explorer/Main';
import InputModal from '~/Components/Explorer/ModalFolderName';
import Sidebar from '~/Components/Explorer/SideBar';
import Navbar from '~/Components/Navbar';
import { BreadCrumbProps } from '~/types/Explorer';

import { api } from '~/utils/api';

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
    const { data, refetch } = api.fileManager.getFolder.useQuery({
        id: currentFolderId,
    });

    useEffect(() => {
        if (data) {
            setFiles(data);
        }
    }, [data]);

    const createFolder = () => {
        setModalOpen(!modalOpen);
        // Test
    };

    const handleFolderCreate = async () => {
        setModalOpen(false);
        await refetch(); // Refetch the data after the folder creation is successful
    };

    return (
        <>
            <Navbar />
            {modalOpen && (
                <InputModal
                    setFiles={handleFolderCreate}
                    setModalOpen={setModalOpen}
                    currentFolderId={currentFolderId}
                />
            )}
            <div className="bg-white rounded shadow">
                <div className="flex items-center p-2 bg-blue-500 gap-2 text-white">
                    <span>File Explorer</span>
                    <ToolbarButton
                        icon={<CloudArrowUpIcon className="h-5 w-5" />}
                        onClick={() => {}}
                    />
                    <ToolbarButton
                        icon={<FolderPlusIcon className="h-5 w-5" />}
                        onClick={() => createFolder()}
                    />
                </div>
                <div className="flex">
                    <div className="w-1/4 border-r">
                        <Sidebar
                            data={files}
                            onSelectFolder={setCurrentFolderId}
                        />
                    </div>
                    <div className="w-3/4">
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
