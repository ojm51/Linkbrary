import Image from 'next/image';
import Folder from './Folder';
import plusIcon from '@/assets/icons/ic_plus.svg';

const FolderList = () => {
  const folderList = ['a', 'bb', 'ccc', 'dddd'];

  return (
    <div className="flex justify-between items-center">
      <ul className="flex justify-start items-center gap-2">
        {folderList.map((folderName) => (
          <li>
            <Folder folderName={folderName} />
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
