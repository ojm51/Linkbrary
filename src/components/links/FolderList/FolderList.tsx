import Image from 'next/image';
import plusIcon from '@/assets/icons/ic_plus.svg';
import Folder from './Folder';

const FolderList = () => {
  const folderList = [
    { id: 1, name: 'a' },
    { id: 2, name: 'bb' },
    { id: 3, name: 'ccc' },
    { id: 4, name: 'dddd' },
  ];

  return (
    <div className="flex justify-between items-center">
      <ul className="flex justify-start items-center gap-2">
        {folderList.map((folderName) => (
          <li key={folderName.id}>
            <Folder folderName={folderName.name} />
          </li>
        ))}
      </ul>

      <button className="flex justify-center items-center gap-1 font-medium text-primary text-base">
        <p>폴더 추가</p>
        <Image src={plusIcon} alt="플러스 아이콘" width={16} height={16} />
      </button>
    </div>
  );
};

export default FolderList;
