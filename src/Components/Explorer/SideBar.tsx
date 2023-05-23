import { BoltSlashIcon, FolderIcon } from '@heroicons/react/20/solid';
import { data } from './fileData';
import React, { useState } from 'react';
import { Folder } from '@prisma/client';

const Sidebar = ({ data }: { data: Folder[] }) => {
    const [expandedItems, setExpandedItems] = useState<File[]>([]);

    // handle the click on an item
    const handleItemClick = (index, datei) => {
        const file = data[index];

        if (expandedItems.includes(index)) {
            if (datei.type !== 'folder') {
                // Handle File Click
                console.log(datei.name);
            } else {
                // Handle Folder Click
                setExpandedItems(
                    expandedItems.filter((item) => item !== index)
                );
            }
        } else {
            setExpandedItems([...expandedItems, index]);
        }
    };

    const renderFiles = (files) => {
        if (!files) return null;
        return files.map((file, index) => {
            const isExpanded = expandedItems.includes(index);
            const isFolder = file.type === 'folder';

            return (
                <div key={index}>
                    <div
                        className={`flex items-center cursor-pointer ${
                            isExpanded ? 'bg-blue-100' : ''
                        }`}
                        onClick={() => handleItemClick(index, file)}
                    >
                        <FolderIcon className="h-5 w-5 mr-2" />
                        {file.name}
                    </div>
                    {isFolder && isExpanded && (
                        <div className="ml-4 mt-2">
                            {renderFiles(file.children)}
                        </div>
                    )}
                </div>
            );
        });
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
