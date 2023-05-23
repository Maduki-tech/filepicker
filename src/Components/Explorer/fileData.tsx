import { DocumentIcon } from "@heroicons/react/20/solid";

export type File = {
    name: string;
    icon?: React.ReactNode;
    type: string;
    size: string;
    createdAt: string;
    updatedAt: string;
    children?: File[];
};

export const data: File[] = [
    {
        name: 'Documents',
        type: 'folder',
        size: '1.2mb',
        createdAt: '12/12/2020',
        updatedAt: '12/12/2020',
        children: [
            {
                name: 'Resume.pdf',
                icon: <DocumentIcon className="w-5 h-5" />,
                type: 'file',
                size: '1.2mb',
                createdAt: '12/12/2020',
                updatedAt: '12/12/2020',
            },
        ],
    },
    {
        name: 'Images',
        type: 'folder',
        size: '1.2mb',
        createdAt: '12/12/2020',
        updatedAt: '12/12/2020',
    },
    {
        name: 'Akten',
        type: 'folder',
        size: '1.2mb',
        createdAt: '12/12/2020',
        updatedAt: '12/12/2020',
    },
];
