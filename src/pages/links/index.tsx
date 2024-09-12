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
import { linkSearch } from '@/lib/api/search/api';

export interface SearchLinkData {
  id: number;
  title: string;
  url: string;
  description: string;
  imageSource: string;
  favorite: boolean;
  createdAt: string;
}

const MainContent = () => {
  const { selectedFolder } = useContext(FolderContext);
  const [searchText, setSearchText] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [allLinks, setAllLinks] = useState<SearchLinkData[]>([]);
  const [filterLinks, setFilterLinks] = useState<SearchLinkData[]>([]);

  const fetchLinks = async () => {
    try {
      const links = await linkSearch();
      setAllLinks(links.data.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    const keyword = searchValue.toLowerCase();
    const filter = allLinks.filter(
      (allLink) =>
        allLink.url.toLowerCase().includes(keyword) ||
        allLink.title.toLowerCase().includes(keyword) ||
        allLink.description.toLowerCase().includes(keyword),
    );
    setFilterLinks(filter);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  const searchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue(searchText);
    handleSearch();
  };

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
