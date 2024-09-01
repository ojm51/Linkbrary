import shareIcon from '@/assets/icons/ic_share.svg';
import penIcon from '@/assets/icons/ic_pen.svg';
import trashIcon from '@/assets/icons/ic_trash.svg';
import FolderMenu from './FolderMenu';

const menuList = [
  {
    src: shareIcon,
    text: '공유',
  },
  {
    src: penIcon,
    text: '이름 변경',
  },
  {
    src: trashIcon,
    text: '삭제',
  },
];

const FolderMenuList = () => {
  return (
    <ul className="flex justify-center items-center gap-3">
      {menuList.map((menu, index) => (
        <li key={index}>
          <FolderMenu src={menu.src} text={menu.text} />
        </li>
      ))}
    </ul>
  );
};

export default FolderMenuList;
