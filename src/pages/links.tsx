import { AddLink } from '@/LinksComponents/components/AddLink';
import { SearchBar } from '@/LinksComponents/components/SearchBar';

function links() {
  return (
    <>
      <div className="h-[220px] pt-[60px] bg-bg">
        <AddLink />
      </div>
      <SearchBar />
    </>
  );
}

export default links;
