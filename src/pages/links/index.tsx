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
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-2xl text-black">title</h3>
        <FolderMenuList />
      </div>
    </>
  );
}

export default links;
