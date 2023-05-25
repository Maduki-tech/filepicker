import { ChevronDownIcon, FolderIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { dataProps, dateiablageProps } from '~/types/Explorer';

const Sidebar = ({
    data,
    onSelectFolder,
}: dataProps & { onSelectFolder: React.Dispatch<any> }) => {
    const handleFolderClick = (folderId: string) => {
        onSelectFolder(folderId); // Update the current folder ID in the parent component
    };

    const renderFiles = (files: dateiablageProps[]) => {
        if (!files) return null;
        return files.map((file) => (
            <div
                key={file.id}
                className="flex items-center cursor-pointer"
                onClick={() => handleFolderClick(file.id)}
            >
                <FolderIcon className="h-5 w-5 mr-2" />
                {file.name}
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
