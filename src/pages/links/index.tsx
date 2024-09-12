import { AddLink, SearchBar, FolderList, FolderMenuList } from '@/components';
import {
  DropBoxStoreProvider,
  LinkComponent,
  LinksContextProvider,
  ModalStoreProvider,
  ModifyAndDeleteModal,
} from '@/components/links-component';
import { FolderContext, FolderProvider } from '@/lib/context';
import { useContext } from 'react';

const MainContent = () => {
  const { selectedFolder } = useContext(FolderContext);

  return (
    <main className="select-none">
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
            {selectedFolder.name}
          </h3>
          <FolderMenuList />
        </div>
      </div>
      <LinkComponent />
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
