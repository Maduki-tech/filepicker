// components/FolderTree.js
export default function FolderTree({ item, items, openFolders, setOpenFolders }) {
  const isOpen = openFolders.includes(item.ItemID);

  const handleFolderClick = () => {
    if (isOpen) {
      setOpenFolders(openFolders.filter(id => id !== item.ItemID));
    } else {
      setOpenFolders([...openFolders, item.ItemID]);
    }
  }

  const childItems = items.filter(i => i.ParentID === item.ItemID);

  return (
    <div>
      <div onClick={handleFolderClick}>
        {isOpen ? '📂' : '📁'} {item.Name}
      </div>
      {isOpen && childItems.map(childItem => (
        <div className="ml-4" key={childItem.ItemID}>
          <FolderTree item={childItem} items={items} openFolders={openFolders} setOpenFolders={setOpenFolders} />
        </div>
      ))}
    </div>
  );
}

