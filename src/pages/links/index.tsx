import AddLink from '@/components/links/AddLink';
import SearchBar from '@/components/links/SearchBar';
import FolderList from '@/components/links/FolderList/FolderList';
import FolderMenuList from '@/components/links/FolderMenuList/FolderMenuList';

function links() {
  return (
    <>
      <div className="h-[220px] pt-[60px] bg-bg">
        <AddLink />
      </div>
      <div className="max-w-[1060px] m-auto">
        <div className="my-10">
          <SearchBar />
        </div>
        <FolderList />
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-2xl text-black my-6 font-[Pretendard] not-italic leading-[normal]">
            title
          </h3>
          <FolderMenuList />
        </div>
      </div>
    </>
  );
}

export default links;
