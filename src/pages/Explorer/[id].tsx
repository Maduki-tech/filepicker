import { CloudArrowUpIcon, FolderPlusIcon } from '@heroicons/react/20/solid';
import { akte } from '@prisma/client';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import MainContent from '~/Components/Explorer/Main';
import InputModal from '~/Components/Explorer/Modals/ModalFolderName';
import Sidebar from '~/Components/Explorer/SideBar';
import { BreadCrumbProps } from '~/types/Explorer';

import { api } from '~/utils/api';

export default function Index() {
    const router = useRouter();
    console.log(router.query.id);

    const [modalOpen, setModalOpen] = useState(false);
    const [breadcrumb, setBreadcrumb] = useState<BreadCrumbProps[]>([
        {
            id: null,
            name: 'Home',
            current: true,
        },
    ]);
    const [currentFolderId, setCurrentFolderId] = useState(null);
    const [files, setFiles] = useState();
    const { data, refetch } = api.fileManager.getFolder.useQuery({
        id: currentFolderId,
    });
    // const akte = api.fileManager.getAkteById.useQuery({
    //     id: router.query.id.toString(),
    // });
    //
    // const aktenName = akte.data.aktenname;
    // const aktenSchrankID = akte.data.aktenschrank_id;
    //
    // const aktenschrank = api.fileManager.getAktenschrankByID.useQuery({
    //     id: aktenSchrankID,
    // });


    

    // useEffect(() => {
    //     if (data) {
    //         setFiles(data);
    //     }
    //     console.log(data);
    // }, [data]);

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
            {modalOpen && (
                <InputModal
                    setFiles={handleFolderCreate}
                    setModalOpen={setModalOpen}
                    currentFolderId={currentFolderId}
                />
            )}
            <div className="bg-white rounded shadow">
                <div className="flex items-center p-2 bg-blue-500 gap-2 text-white">
                    <span>File Explorer route </span>
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
                            breadcrumb={breadcrumb}
                            setBreadcrumb={setBreadcrumb}
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
