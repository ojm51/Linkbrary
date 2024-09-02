import shareIcon from '@/assets/icons/ic_share.svg';
import penIcon from '@/assets/icons/ic_pen.svg';
import trashIcon from '@/assets/icons/ic_trash.svg';
import FolderMenu from './FolderMenu';

const menuList = [
  {
    id: 1,
    src: shareIcon,
    text: '공유',
    modalType: 'share',
  },
  {
    id: 2,
    src: penIcon,
    text: '이름 변경',
    modalType: 'changeName',
  },
  {
    id: 3,
    src: trashIcon,
    text: '삭제',
    modalType: 'delete',
  },
];

const FolderMenuList = () => {
  return (
    <ul className="flex justify-center items-center gap-3">
      {menuList.map((menu) => (
        <li key={menu.id}>
          <FolderMenu
            src={menu.src}
            text={menu.text}
            modalType={menu.modalType}
          />
        </li>
      ))}
    </ul>
  );
};

export default FolderMenuList;
