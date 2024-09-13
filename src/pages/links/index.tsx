import { useContext, useEffect, useState } from 'react';
import { AddLink, SearchBar, FolderList, FolderMenuList } from '@/components';
import {
  DropBoxStoreProvider,
  LinkComponent,
  LinksContextProvider,
  ModalStoreProvider,
  ModifyAndDeleteModal,
} from '@/components/links-component';
import { FolderContext, FolderProvider } from '@/lib/context';
import { linkSearch, LinkSearchData } from '@/lib/api';

const MainContent = () => {
  const { selectedFolder } = useContext(FolderContext);
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
      console.log(links.data.list);
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

  /** @TODO 기본적으로 '전체' 폴더가 선택되게 하기 */
  return (
    <main className="select-none">
      <div className="h-[220px] pt-[60px] bg-bg">
        <AddLink />
      </div>
      <div className="max-w-[1060px] m-auto">
        <div className="my-10">
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
        <FolderList />
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-2xl text-black my-6 font-[Pretendard] not-italic leading-[normal]">
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
