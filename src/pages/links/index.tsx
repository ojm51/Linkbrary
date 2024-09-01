import AddLink from '@/LinksComponents/AddLink';
import SearchBar from '@/LinksComponents/SearchBar';
import FolderList from '@/LinksComponents/FolderList/FolderList';
import FolderMenuList from '@/LinksComponents/FolderMenuList/FolderMenuList';

function links() {
  return (
    <>
      <div className="h-[220px] pt-[60px] bg-bg">
        <AddLink />
      </div>
      <SearchBar />
      <FolderList />
      <FolderMenuList />
    </>
  );
}

export default links;
