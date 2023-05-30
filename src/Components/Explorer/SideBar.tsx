import { FolderIcon } from '@heroicons/react/20/solid';
import React, { useEffect } from 'react';
import { BreadCrumbProps, dataProps, dateiablageProps } from '~/types/Explorer';
import { api } from '~/utils/api';

type SidebarProps = {
    data: dataProps[];
    onSelectFolder: React.Dispatch<any>;
    setBreadcrumb: React.Dispatch<React.SetStateAction<BreadCrumbProps[]>>;
};

const Sidebar = ({ data, onSelectFolder, setBreadcrumb }: SidebarProps) => {
    const [openFolders, setOpenFolders] = React.useState([]);
    const [allDataFetched, setAllData] = React.useState([]);

    const allData = api.fileManager.getAllFolder.useQuery();

    useEffect(() => {
        if (allData.isSuccess) {
            setAllData(allData.data);
        }
    }, [allData.isSuccess]);

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
            // return;
        }

        if (openFolders.includes(folderId)) {
            setOpenFolders(openFolders.filter((id) => id !== folderId));
            console.log(openFolders);
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
        files:
            | dateiablageProps[]
            | dateiablageProps['other_dateiablage']
            | dataProps[]
    ) => {
        if (!files) return null;
        return allDataFetched.map((file: dateiablageProps) => (
            <div
                key={file.id}
                className="flex justify-center flex-col cursor-pointer"
                onClick={() =>
                    handleFolderClick(file.id, file.name, file.parent_id)
                }
            >
                {file.parent_id === null && (
                    <div className="flex">
                        <FolderIcon className="h-5 w-5 mr-1" />
                        {file.name}
                    </div>
                )}

                <div className="ml-4">
                    {/* if the file has the same parent id as the current folder then render it */}

                    {file.id ===
                        openFolders.find((allParentID: string) => {
                            console.log(allParentID);
                            return allParentID === file.id;
                        }) && (
                        <div className="flex flex-col">
                            {allDataFetched.map((file: dateiablageProps) => {
                                if (openFolders.includes(file.parent_id)) {
                                console.log('file', file);
                                    return (
                                        <div
                                            key={file.id}
                                            className="flex justify-center flex-col cursor-pointer"
                                            onClick={() =>
                                                handleFolderClick(
                                                    file.id,
                                                    file.name,
                                                    file.parent_id
                                                )
                                            }
                                        >
                                            <div className="flex">
                                                <FolderIcon className="h-5 w-5 mr-1" />
                                                {file.name}
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    )}
                </div>
            </div>
        ));
    };

    return (
        <div className="flex flex-col bg-neutral-100 h-full">
            <div className="p-4">
                <h2 className="text-xl font-bold">File Explorer</h2>
            </div>
            <div className="p-4">{renderFiles(data)}</div>
        </div>
    );
};

export default Sidebar;
