import Folder from './Folder';

const FolderList = () => {
  const folderList = ['a', 'bb', 'ccc', 'dddd'];

  return (
    <ul className="flex justify-start items-center gap-2">
      {folderList.map((folderName) => (
        <li>
          <Folder folderName={folderName} />
        </li>
      ))}
    </ul>
  );
};

export default FolderList;
