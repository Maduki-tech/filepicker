import { CloudArrowUpIcon, FolderPlusIcon } from '@heroicons/react/20/solid';
import React from 'react';
import MainContent from '~/Components/Explorer/Main';
import InputModal from '~/Components/Explorer/ModalFolderName';
import Sidebar from '~/Components/Explorer/SideBar';
import Navbar from '~/Components/Navbar';

import { api } from '~/utils/api';

export default function Index() {
    const [modalOpen, setModalOpen] = React.useState(false);
    const { data } = api.fileManager.getFolder.useQuery();

    const createFolder = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <>
            <Navbar />
            {modalOpen && (
            <InputModal  setModalOpen={setModalOpen}/>
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
                        <Sidebar data={data} />
                    </div>
                    <div className="w-3/4">
                        {/* <MainContent data={data}/> */}
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
