import { ChevronDownIcon, FolderIcon } from '@heroicons/react/20/solid';
import { dateiablage } from '@prisma/client';
import React from 'react';
import { BreadCrumbProps, dataProps, dateiablageProps } from '~/types/Explorer';

type SidebarProps = {
    data: dataProps;
    onSelectFolder: React.Dispatch<any>;
    breadcrumb: BreadCrumbProps[];
    setBreadcrumb: React.Dispatch<React.SetStateAction<BreadCrumbProps[]>>;
};

const Sidebar = ({
    data,
    onSelectFolder,
    breadcrumb,
    setBreadcrumb,
}: SidebarProps) => {
    const [openFolders, setOpenFolders] = React.useState([]);

    const handleFolderClick = (
        folderId: string,
        folderName: string,
        folderParentID: string
    ) => {
        onSelectFolder(folderId);
        if (folderParentID === null) {
            setBreadcrumb([
                {
                    id: null,
                    name: 'Home',
                    current: true,
                },
                {
                    id: folderId,
                    name: folderName,
                    current: true,
                },
            ]);
            return;
        }

        if (openFolders.includes(folderId)) {
            setOpenFolders(openFolders.filter((id) => id !== folderId));
        } else {
            setOpenFolders([...openFolders, folderId]);
            setBreadcrumb((prev) => {
                // Update the breadcrumb state
                const index = prev.findIndex((item) => item.id === folderId);
                // check if item is parent

                if (index === -1) {
                    return [
                        ...prev,
                        {
                            id: folderId,
                            name: folderName,
                            current: true,
                        },
                    ];
                }
                return prev.slice(0, index + 1);
            });
        }
    };
    const renderFiles = (
        files: dateiablageProps[] | dateiablageProps['other_dateiablage']
    ) => {
        if (!files) return null;
        return files.map((file) => (
            <div
                key={file.id}
                className="flex justify-center flex-col cursor-pointer"
                onClick={() =>
                    handleFolderClick(file.id, file.name, file.parent_id)
                }
            >
                <div className="flex">
                    <FolderIcon className="h-5 w-5 mr-1" />
                    {file.name}
                </div>

                <div className="ml-4">
                    {openFolders.includes(file.id) &&
                        file.other_dateiablage &&
                        renderFiles(file.other_dateiablage)}
                </div>
            </div>
        ));
    };

    return (
        <div className="flex flex-col bg-gray-200 h-full">
            <div className="p-4">
                <h2 className="text-xl font-bold">File Explorer</h2>
            </div>
            <div className="p-4">{renderFiles(data)}</div>
        </div>
    );
};

export default Sidebar;
