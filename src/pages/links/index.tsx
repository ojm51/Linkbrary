import { useContext } from 'react';
import { AddLink, SearchBar, FolderList, FolderMenuList } from '@/components';
import { FolderContext } from '@/lib/context';

function links() {
  const { selectedFolder } = useContext(FolderContext);

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
            {selectedFolder}
          </h3>
          <FolderMenuList />
        </div>
      </div>
    </>
  );
}

export default links;
