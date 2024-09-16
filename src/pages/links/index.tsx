import { useEffect, useState } from 'react';
import { FolderProvider, useFolder } from '@/lib/context';
import { AddLink, SearchBar, FolderList, FolderMenuList } from '@/components';
import { linkSearch, LinkSearchData } from '@/lib/api';
import {
  DropBoxStoreProvider,
  LinkComponent,
  LinksContextProvider,
  ModalStoreProvider,
  ModifyAndDeleteModal,
} from '@/components/links-component';

const MainContent = () => {
  const { selectedFolder } = useFolder();
  const [searchText, setSearchText] = useState<string>('');
  /** @TODO debouncing 사용하여 onChange로 검색 가능하도록 하기  */
  const [searchValue, setSearchValue] = useState<string>('');
  const [filterLinks, setFilterLinks] = useState<LinkSearchData[]>([]);

  const fetchLinks = async () => {
    const option = {
      page: 0,
      pageSize: 0,
      search: searchValue,
    };

    try {
      const links = await linkSearch(option);
      setFilterLinks(links.data.list);
    } catch (error) {
      console.error(error);
    }
  };

  const searchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue(searchText);
  };

  const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    fetchLinks();
  }, [searchValue]);

  return (
    <main className="select-none">
      <div className="bg-bg pt-6 pb-10 px-8 md:pt-[3.75rem] md:pb-[5.625rem]">
        <AddLink />
      </div>
      <div className="max-w-[66.25rem] mt-5 mx-8 md:mt-10 lg:mt-10 lg:m-auto">
        <div className="my-10 md:mb-10">
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            searchSubmit={searchSubmit}
            searchOnChange={searchOnChange}
          />
        </div>
        {searchValue && (
          <h2 className="text-lg font-bold mb-5 md:mb-10 md:text-3xl">
            {searchValue}
            <span className="text-secondary-60">에 대한 검색 결과입니다.</span>
          </h2>
        )}
        <div className="mb-7 md:mb-6">
          <FolderList />
        </div>
        <div className="md:flex md:justify-between md:items-center">
          <h3 className="font-semibold text-2xl text-black mb-3 font-[Pretendard] not-italic leading-[normal]">
            {selectedFolder.name}
          </h3>
          <FolderMenuList />
        </div>
      </div>
      <LinkComponent filterLinks={filterLinks} searchValue={searchValue} />
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
