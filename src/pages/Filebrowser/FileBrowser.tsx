import { useState } from 'react';
import FolderTree from './FolderTree';

const dummyData = [
    {
        ItemID: 1,
        Name: 'Folder 1',
        ParentID: null,
        Size: null,
        IsFile: false,
        MimeType: null,
        Content: null,
        DateModified: new Date(),
        DateCreated: new Date(),
        HasChild: true,
        IsRoot: true,
        Type: 'folder',
        FilterPath: '/Folder 1',
    },
    {
        ItemID: 2,
        Name: 'Folder 2',
        ParentID: null,
        Size: null,
        IsFile: false,
        MimeType: null,
        Content: null,
        DateModified: new Date(),
        DateCreated: new Date(),
        HasChild: true,
        IsRoot: true,
        Type: 'folder',
        FilterPath: '/Folder 1',
    },
    {
        ItemID: 1,
        Name: 'Folder 1',
        ParentID: null,
        Size: null,
        IsFile: false,
        MimeType: null,
        Content: null,
        DateModified: new Date(),
        DateCreated: new Date(),
        HasChild: true,
        IsRoot: true,
        Type: 'folder',
        FilterPath: '/Folder 1',
    },
    {
        ItemID: 1,
        Name: 'Folder 1',
        ParentID: null,
        Size: null,
        IsFile: false,
        MimeType: null,
        Content: null,
        DateModified: new Date(),
        DateCreated: new Date(),
        HasChild: true,
        IsRoot: true,
        Type: 'folder',
        FilterPath: '/Folder 1',
    },
    {
        ItemID: 1,
        Name: 'Folder 1',
        ParentID: null,
        Size: null,
        IsFile: false,
        MimeType: null,
        Content: null,
        DateModified: new Date(),
        DateCreated: new Date(),
        HasChild: true,
        IsRoot: true,
        Type: 'folder',
        FilterPath: '/Folder 1',
    },
    {
        ItemID: 1,
        Name: 'Folder 1',
        ParentID: null,
        Size: null,
        IsFile: false,
        MimeType: null,
        Content: null,
        DateModified: new Date(),
        DateCreated: new Date(),
        HasChild: true,
        IsRoot: true,
        Type: 'folder',
        FilterPath: '/Folder 1',
    },
    {
        ItemID: 1,
        Name: 'Folder 1',
        ParentID: null,
        Size: null,
        IsFile: false,
        MimeType: null,
        Content: null,
        DateModified: new Date(),
        DateCreated: new Date(),
        HasChild: true,
        IsRoot: true,
        Type: 'folder',
        FilterPath: '/Folder 1',
    },
    {
        ItemID: 1,
        Name: 'Folder 1',
        ParentID: null,
        Size: null,
        IsFile: false,
        MimeType: null,
        Content: null,
        DateModified: new Date(),
        DateCreated: new Date(),
        HasChild: true,
        IsRoot: true,
        Type: 'folder',
        FilterPath: '/Folder 1',
    },
    {
        ItemID: 1,
        Name: 'Folder 1',
        ParentID: null,
        Size: null,
        IsFile: false,
        MimeType: null,
        Content: null,
        DateModified: new Date(),
        DateCreated: new Date(),
        HasChild: true,
        IsRoot: true,
        Type: 'folder',
        FilterPath: '/Folder 1',
    },
    {
        ItemID: 2,
        Name: 'Nested Folder 1',
        ParentID: 1,
        Size: null,
        IsFile: false,
        MimeType: null,
        Content: null,
        DateModified: new Date(),
        DateCreated: new Date(),
        HasChild: false,
        IsRoot: false,
        Type: 'folder',
        FilterPath: '/Folder 1/Nested Folder 1',
    },
    // More files and folders...
];

export default function FileBrowser() {
    const [path, setPath] = useState([]);
    // Initialize only with root directories
    const [items, setItems] = useState(dummyData.filter((i) => i.IsRoot));
    const [openFolders, setOpenFolders] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleClick = (item) => {
        // Handle click event
        setSelectedItem(item);
    };

    const handleDoubleClick = (item) => {
        if (item.Type === 'folder') {
            setPath([...path, item.Name]);
            // For this example, we'll just filter the dummyData.
            setItems(dummyData.filter((i) => i.ParentID === item.ItemID));
            setOpenFolders([...openFolders, item.ItemID]);
        }
    };
    const goBack = () => {
        if (path.length > 0) {
            const newPath = [...path];
            newPath.pop();
            setPath(newPath);
            // Here you would make a request to your server to fetch the contents of the new directory.
            // For this example, we'll just filter the dummyData.
            if (newPath.length > 0) {
                const parentFolder = dummyData.find(
                    (i) => i.Name === newPath[newPath.length - 1]
                );
                setItems(
                    dummyData.filter((i) => i.ParentID === parentFolder.ItemID)
                );
            } else {
                setItems(dummyData.filter((i) => i.IsRoot));
            }
        }
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-100 border-r p-4">
                <h2 className="font-bold mb-4">Current Structure</h2>
                <ul>
                    {dummyData
                        .filter((i) => i.IsRoot)
                        .map((rootItem) => (
                            <li key={rootItem.ItemID}>
                                <FolderTree
                                    item={rootItem}
                                    items={dummyData}
                                    openFolders={openFolders}
                                    setOpenFolders={setOpenFolders}
                                />
                            </li>
                        ))}
                </ul>
            </div>
            {/* Main Content */}
            <div className="w-full bg-white">
                <div className="p-4">
                    <nav className="flex items-center justify-between">
                        {/* Navbar content */}
                        <button
                            onClick={goBack}
                            className="text-sm text-gray-700"
                        >
                            Back
                        </button>
                    </nav>
                    <div className="py-4">
                        {/* Breadcrumbs */}
                        <div className="flex items-center space-x-2">
                            {path.map((dir, i) => (
                                <span key={i} className="text-sm text-gray-700">
                                    {dir}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="py-4">{/* Buttons */}</div>
                    <div className="grid grid-cols-4 gap-4">
                        {items.map((item, i) => (
                            <div
                                key={i}
                                onClick={() => handleClick(item)}
                                onDoubleClick={() => handleDoubleClick(item)}
                                className="border rounded p-2"
                            >
                                {item.Type === 'folder' ? '📁' : '📄'}{' '}
                                {item.Name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
