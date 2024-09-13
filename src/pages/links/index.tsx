import { useContext } from 'react';
import { FolderContext, FolderProvider } from '@/lib/context';
import { AddLink, SearchBar, FolderList, FolderMenuList } from '@/components';
import {
  DropBoxStoreProvider,
  LinkComponent,
  LinksContextProvider,
  ModalStoreProvider,
  ModifyAndDeleteModal,
} from '@/components/links-component';

const MainContent = () => {
  const { selectedFolder } = useContext(FolderContext);

  return (
    <main className="select-none">
      <div className="bg-bg pt-6 pb-10 px-8 md:pt-[3.75rem] md:pb-[5.625rem]">
        <AddLink />
      </div>
      <div className="max-w-[66.25rem] mt-5 mx-8 md:mt-10 lg:mt-10 lg:m-auto">
        <div className="mb-8 md:mb-10">
          <SearchBar />
        </div>
        <div className="mb-7 md:mb-6">
          <FolderList />
        </div>
        <div className="md:flex md:justify-between md:items-center">
          <h3 className="font-semibold text-2xl text-black mb-3 font-[Pretendard] not-italic leading-[normal]">
            {selectedFolder.name}
          </h3>
          <FolderMenuList />
        </div>
        <LinkComponent />
      </div>
    </main>
  );
};

const Links = () => {
  return (
    <FolderProvider>
      <LinksContextProvider>
        <DropBoxStoreProvider>
          <ModalStoreProvider>
            <ModifyAndDeleteModal />
            <MainContent />
          </ModalStoreProvider>
        </DropBoxStoreProvider>
      </LinksContextProvider>
    </FolderProvider>
  );
};

export default Links;
