import React from 'react';
import { useClickOutside } from '~/utils/hooks/useClickOutside';
import {
    TrashIcon,
    PlusCircleIcon,
    FolderOpenIcon,
    PencilIcon,
} from '@heroicons/react/20/solid';
import { dateiablageProps } from '~/types/Explorer';

const navigation = [
    {
        name: 'Verschieben',
        current: true,
        icon: <FolderOpenIcon className="h-5 w-5" />,
    },
    {
        name: 'Löschen',
        current: false,
        icon: <TrashIcon className="h-5 w-5" />,
    },
    {
        name: 'Erstellen',
        current: false,
        icon: <PlusCircleIcon className="h-5 w-5" />,
    },
    {
        name: 'Umbenennen',
        current: false,
        icon: <PencilIcon className="h-5 w-5" />,
    },
];
export default function Menu({
    x,
    y,
    closeContextMenu,
    closeContextMenuOutside,
    currentFile,
}: {
    x: number;
    y: number;
    closeContextMenu: (event: React.MouseEvent<HTMLLIElement, MouseEvent> , action: string, file: dateiablageProps | null) => void;
    closeContextMenuOutside: () => void;
    currentFile: dateiablageProps | null;
}) {
    const contextMenuRef = React.useRef<HTMLDivElement>(null);

    useClickOutside(contextMenuRef, closeContextMenuOutside);
    return (
        <div
            className="absolute z-20 w-48 py-1 mt-1 bg-white rounded-md shadow-lg"
            ref={contextMenuRef}
            style={{ top: `${y}px`, left: `${x}px` }}
        >
            <nav
                className="flex flex-1 flex-col overflow-hidden justify-center"
                aria-label="Sidebar"
            >
                <ul role="list" className="">
                    {navigation.map((item) => (
                        <li
                            onClick={(event) => 
                                closeContextMenu(event, item.name, currentFile)
                            }
                            className="flex justify-between items-center p-2 pl-3 hover:text-indigo-600 hover:bg-gray-50 "
                            key={item.name}
                        >
                            <button className="hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md text-sm leading-6 font-semibold">
                                {item.name}
                            </button>

                            {item.icon}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
