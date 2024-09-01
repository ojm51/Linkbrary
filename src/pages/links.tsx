import { AddLink } from '@/LinksComponents/components/AddLink';
import { SearchBar } from '@/LinksComponents/components/SearchBar';
import FolderList from '@/LinksComponents/components/FolderList/FolderList';

function links() {
  return (
    <>
      <div className="h-[220px] pt-[60px] bg-bg">
        <AddLink />
      </div>
      <SearchBar />
      <FolderList />
    </>
  );
}

export default links;
