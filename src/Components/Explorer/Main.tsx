import {
    ChevronDownIcon,
    FolderIcon,
    HomeIcon,
} from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react';
import { BreadCrumbProps, dateiablageProps } from '~/types/Explorer';
import Menu from '../ContextMenu/Menu';
import MoveFileModal from './Modals/MoveFileModal';
import CreateFileModal from './Modals/MoveFileModal';
import InputModal from './Modals/ModalFolderName';
import { dateiablage } from '@prisma/client';
import DeleteFileModal from './Modals/DeleteFileModal';
import RenameFileModal from './Modals/RenameModal';

type MainProps = {
    data: dateiablageProps[];
    currentFolderId: string | null;
    setCurrentFolderId: (folderId: string | null) => void;
    breadcrumb: BreadCrumbProps[];
    setBreadcrumb: React.Dispatch<React.SetStateAction<BreadCrumbProps[]>>;
};

type ContextMenuProps = {
    show: boolean;
    x: number;
    y: number;
    currentFile: dateiablageProps | null;
};

const MainContent = ({
    data,
    currentFolderId,
    setCurrentFolderId,
    breadcrumb,
    setBreadcrumb,
}: MainProps) => {
    // Handle click on folder

    const [contextMenu, setContextMenu] = useState({
        show: false,
        x: 0,
        y: 0,
        currentFile: null,
    });

    const [createFileModal, setCreateFileModal] = useState(false);
    const [moveFileModal, setMoveFileModal] = useState(false);
    const [deleteFileModal, setDeleteFileModal] = useState(false);
    const [renameFileModal, setRenameFileModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState<dateiablage>(null);

    const handleFolderClick = (fileName: string, folderId: string) => {
        setCurrentFolderId(folderId); // Update the current folder ID state
        setBreadcrumb((prev) => {
            // Update the breadcrumb state
            const index = prev.findIndex((item) => item.id === folderId);
            if (index === -1) {
                return [
                    ...prev,
                    {
                        id: folderId,
                        name: fileName,
                        current: true,
                    },
                ];
            }
            return prev.slice(0, index + 1);
        });
    };

    const handleContextMenu = (e: React.MouseEvent, file: dateiablageProps) => {
        e.preventDefault();
        setContextMenu({
            show: true,
            x: e.pageX,
            y: e.pageY,
            currentFile: file,
        });
    };

    // handle when selecting an action
    const contextMenuClose = (e, action, file) => {
        setContextMenu({ show: false, x: 0, y: 0, currentFile: null });
        setSelectedFile(file);

        switch (action) {
            case 'Verschieben':
                setMoveFileModal(true);
                break;
            case 'Löschen':
                setDeleteFileModal(true);
                break;
            case 'Erstellen':
                setCreateFileModal(true);
                break;
            case 'Umbenennen':
                setRenameFileModal(true);
                break;
            default:
                break;
        }
    };

    const handleModalClose = () => {
        setCreateFileModal(false);
        setMoveFileModal(false);
        setDeleteFileModal(false);
        setRenameFileModal(false);
    };

    const closeContextMenuOutside = () => {
        setContextMenu({ show: false, x: 0, y: 0, currentFile: null });
    };

    // Render all the files in the current folder
    const renderFiles = (files: dateiablageProps[]) => {
        if (!files) return null;
        return files.map((file) => (
            <tr
                key={file.id}
                onContextMenu={(e) => handleContextMenu(e, file)}
                className="hover:bg-blue-100 hover:cursor-pointer bg-neutral-200"
                onClick={() => handleFolderClick(file.name, file.id)}
            >
                <td className="whitespace-nowrap flex py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    <FolderIcon className="h-5 w-5 mr-2" />
                    {file.name}
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                    0
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                    {file.date_created.toLocaleString('de-DE', {
                        timeZone: 'Europe/Berlin',
                    })}
                </td>
            </tr>
        ));
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <Breadcrumb crumbs={breadcrumb} setFolderId={handleFolderClick} />
            {contextMenu.show && (
                <Menu
                    closeContextMenu={contextMenuClose}
                    x={contextMenu.x}
                    y={contextMenu.y}
                    currentFile={contextMenu.currentFile}
                    closeContextMenuOutside={closeContextMenuOutside}
                />
            )}

            {createFileModal && (
                <InputModal
                    setModalOpen={handleModalClose}
                    currentFolderId={currentFolderId}
                />
            )}
            {moveFileModal && (
                <MoveFileModal
                    setModalOpen={handleModalClose}
                    currentFolder={selectedFile}
                />
            )}
            {deleteFileModal && (
                <DeleteFileModal
                    setModalOpen={handleModalClose}
                    currentFolder={selectedFile}
                />
            )}
            {renameFileModal && (
                <RenameFileModal
                    setModalOpen={handleModalClose}
                    currentFolder={selectedFile}
                />
            )}

            <div className="flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-neutral-500">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                    >
                                        <button className="group inline-flex">
                                            Name
                                            <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                                                <ChevronDownIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </button>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        <span>Größe</span>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        <span>Erstellt am</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-400 bg-white">
                                {renderFiles(data)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Breadcrumb({
    crumbs,
    setFolderId,
}: {
    crumbs: BreadCrumbProps[];
    setFolderId: (folderName: string, folderId: string) => void;
}) {
    return (
        <nav className="flex mt-2" aria-label="Breadcrumb">
            <ol
                role="list"
                className="flex space-x-4 rounded-md bg-white px-6 shadow"
            >
                {crumbs.map((crumb, idx) => (
                    <div key={idx}>
                        {crumb.name !== 'Home' ? (
                            <li
                                key={crumb.id}
                                className="flex hover:cursor-pointer"
                            >
                                <div className="flex items-center">
                                    <svg
                                        className="h-full w-6 flex-shrink-0 text-gray-200"
                                        viewBox="0 0 24 44"
                                        preserveAspectRatio="none"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                                    </svg>
                                    <span
                                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                                        onClick={() =>
                                            setFolderId(
                                                crumb.name.toString(),
                                                crumb.id
                                            )
                                        }
                                    >
                                        {crumb.name.toString()}
                                    </span>
                                </div>
                            </li>
                        ) : (
                            <li className="flex h-[44px]">
                                <div className="flex items-center">
                                    <span
                                        className="text-sm font-medium text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                                        onClick={() =>
                                            setFolderId(
                                                crumb.name.toString(),
                                                crumb.id
                                            )
                                        }
                                    >
                                        <HomeIcon
                                            className="h-5 w-5 flex-shrink-0"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </div>
                            </li>
                        )}
                    </div>
                ))}
            </ol>
        </nav>
    );
}

export default MainContent;
