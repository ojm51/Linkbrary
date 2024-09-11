import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import { FolderContext, FolderProvider } from '@/lib/context';
import { AddLink, SearchBar, FolderList, FolderMenuList } from '@/components';
import { instance } from '@/lib/api';
import { debounce } from '@/lib/react';
import {
  QueryFunctionContext,
  queryOptions,
  useQuery,
} from '@tanstack/react-query';
import Image from 'next/image';
import star from '@/assets/icons/ic_star.svg';
import starSelected from '@/assets/icons/ic_star_selected.svg';
import { match } from 'ts-pattern';
import { linkSearch } from '@/lib/api/search/api';

type TQueryResponse<T> =
  | undefined
  | {
      data: T;
    };

type TLinksResponse<T> = {
  list: T;
  totalCount: number;
};

type TLinksQuery =
  | undefined
  | {
      folderId: number;
      pageSize: number;
      page: number;
      keyword: string;
    };

type TFolder = {
  id: number;
  createdAt: string;
  name: string;
  linkCount: number;
};

type TFolderDto = {
  id: number;
  createdAt: string;
  name: string;
  linkCount: number;
};

type TLink = {
  id: number;
  favorite: boolean;
  url: string;
  title: string;
  imageSource: string;
  description: string;
  createdAt: string;
};

type TLinkDto = {
  id: number;
  favorite: boolean;
  url: string;
  title: string;
  imageSource: string;
  description: string;
  createdAt: string;
  relativeTime: string;
};

type TClientSize =
  | undefined
  | {
      width: number;
      height: number;
    };

const TIME_UNITS = [
  { value: 31536000, text: 'years' },
  { value: 2592000, text: 'months' },
  { value: 86400, text: 'days' },
  { value: 3600, text: 'hours' },
  { value: 60, text: 'minutes' },
  { value: 1, text: 'seconds' },
];

const getRelativeTimeString = (createdDate: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - createdDate.getTime()) / 1000,
  );
  const result = TIME_UNITS.find(({ value }) => diffInSeconds >= value);
  if (result) {
    const { value, text } = result;
    const count = Math.floor(diffInSeconds / value);
    return `${count} ${text} ago`;
  }
  return 'a moment ago';
};

const linkEntitiesToDtos = (entities: Array<TLink>): Array<TLinkDto> => {
  return entities.map(({ id, createdAt, imageSource, ...rest }) => {
    const createdDate = new Date(createdAt);
    const createdDateString = createdDate
      .toLocaleDateString('ko-KR')
      .slice(0, -1);
    const relativeTimeString = getRelativeTimeString(createdDate);
    return {
      id,
      createdAt: createdDateString,
      relativeTime: relativeTimeString,
      imageSource,
      ...rest,
    };
  });
};

const getPageSize = (width: number) => {
  if (width >= 425 && width < 1024) return 6;
  return 9;
};

const folderServices = ({ signal }: QueryFunctionContext) => ({
  all: async (): Promise<TQueryResponse<TFolderDto[]>> => {
    const response = await instance.get<TFolder[]>('/folders', { signal });
    const { data } = response;
    return { data };
  },
});

const linkServices = ({ signal }: QueryFunctionContext) => ({
  find: async (
    query: TLinksQuery,
  ): Promise<TQueryResponse<TLinksResponse<TLinkDto[]>>> => {
    const response = await instance.get<TLinksResponse<TLink[]>>(
      `/folders/${query?.folderId}/links`,
      {
        params: {
          page: query?.page,
          pageSize: query?.pageSize,
          keyword: query?.keyword,
        },
        signal,
      },
    );
    const { data } = response;
    const { list, totalCount } = data;
    const dtos = linkEntitiesToDtos(list);
    return { data: { list: dtos, totalCount } };
  },
});

const folderOptions = {
  all: () => {
    return queryOptions({
      queryKey: ['folders', 'all'],
      queryFn: (context) => folderServices(context).all(),
      staleTime: 180000,
      gcTime: 2000,
    });
  },
};

const linkOptions = {
  find: (query: TLinksQuery) => {
    return queryOptions({
      queryKey: ['links', 'find', query],
      queryFn: (context) => linkServices(context).find(query),
      staleTime: 180000,
      gcTime: 2000,
      enabled: !!query,
    });
  },
};

const useLinksQueryAction = (
  clientSize: TClientSize,
  allFolders: TQueryResponse<TFolderDto[]>,
) => {
  const [linksQuery, setlinksQuery] = useState<TLinksQuery>(undefined);

  const initializer = (width: number, allFoldersData: TFolderDto[]) => {
    const folder = allFoldersData.find(
      (folderData) => folderData.name === '전체',
    ) as TFolderDto;

    if (!folder) {
      console.error("Error: '전체' 폴더를 찾을 수 없습니다.");
      return; // 폴더가 없을 경우 함수 실행을 중단
    }

    const initQuery: TLinksQuery = {
      page: 1,
      pageSize: getPageSize(width),
      keyword: '',
      folderId: folder.id,
    };
    setlinksQuery(initQuery);
  };

  const updator = (updatedQuery: Partial<TLinksQuery>) => {
    setlinksQuery((prevQuery) =>
      !prevQuery
        ? undefined
        : {
            ...prevQuery,
            ...updatedQuery,
          },
    );
  };

  useEffect(() => {
    if (clientSize && allFolders) {
      initializer(clientSize.width, allFolders.data);
    }
  }, [clientSize, allFolders]);

  return { data: linksQuery, updator };
};

const useClientSize = () => {
  const [clientSize, setClientSize] = useState<TClientSize>(undefined);
  const handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setClientSize({ width, height });
  };
  useEffect(() => {
    const debouncedResize = debounce(() => {
      handleResize();
    }, 300);
    handleResize();
    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);
  return { data: clientSize };
};
const useFolderAction = () => useQuery(folderOptions.all());
const useLinksAction = (query: TLinksQuery) =>
  useQuery(linkOptions.find(query));

type FolderAction = ReturnType<typeof useFolderAction>;
type ClientSizeAction = ReturnType<typeof useClientSize>;
type LinksQueryAction = ReturnType<typeof useLinksQueryAction>;
type LinksAction = ReturnType<typeof useLinksAction>;

type LinksContextProps =
  | undefined
  | {
      folderAction: FolderAction;
      clientSizeAction: ClientSizeAction;
      linksQueryAction: LinksQueryAction;
      linksAction: LinksAction;
    };
const LinksContext = createContext<LinksContextProps>(undefined);
const useLinksContextSelector = () => {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error(
      'LinksContextSelector는 프로바이더 내부에서 사용되어야 합니다.',
    );
  }
  return context;
};

const pageStyle =
  'relative box-content w-7 h-7 p-2 text-center rounded-lg bg-gray-200 text-lg leading-relaxed';

const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';
const LinkCardsSkeleton = () => {
  const { clientSizeAction } = useLinksContextSelector();
  const width = clientSizeAction.data?.width;
  const pageSize = getPageSize(width || 0);
  return (
    <section className="p-8 lg:container lg:mx-auto">
      <ul className="grid grid-flow-row auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(pageSize)
          .fill(0)
          .map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index} className="relative overflow-hidden">
              <LinkCardSkeleton />
            </li>
          ))}
      </ul>
    </section>
  );
};

const LinkCardSkeleton = () => {
  const cardStyle = 'w-full h-5 bg-gray-200 rounded-2xl';
  return (
    <div className={`${shimmer} flex flex-col gap-y-1`}>
      <div className="relative w-full h-0 pt-[56.25%]">
        <div
          className={`${shimmer} absolute top-0 left-0 w-full h-full bg-gray-200 rounded-2xl`}
        />
      </div>
      <div className={cardStyle} />
      <div className={cardStyle} />
      <div className={cardStyle} />
    </div>
  );
};

const LinkPaginationSkeleton = () => {
  return (
    <section className="p-8 lg:container lg:mx-auto">
      <ul className="relative flex justify-center gap-x-2">
        {Array(5)
          .fill(0)
          .map((_, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <li key={index} className={`${shimmer} ${pageStyle}`} />;
          })}
      </ul>
    </section>
  );
};

type SearchLinkDataProps = {
  filteredLinks: SearchLinkData[];
  searchResult: string;
};

const LinkCards = ({ filteredLinks, searchResult }: SearchLinkDataProps) => {
  const { linksAction } = useLinksContextSelector();

  const allLinks = linksAction.data?.data.list || [];

  const displayLinks =
    searchResult.trim() === '' ? allLinks : linkEntitiesToDtos(filteredLinks);

  return (
    <section className="p-8 lg:container lg:mx-auto">
      {displayLinks.length > 0 ? (
        <ul className="grid grid-flow-row auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayLinks.map((card) => (
            <li key={card.id}>
              <LinkCard data={card} />
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="text-center font-bold text-lg my-5 md:text-3xl md:my-10">
          검색된 내용이 없습니다.
        </h2>
      )}
    </section>
  );
};

type LinkCardProps = {
  data: TLinkDto;
};
const LinkCard = ({ data }: LinkCardProps) => {
  const {
    title,
    imageSource,
    createdAt,
    description,
    favorite,
    relativeTime,
    id,
    url,
  } = data;
  return (
    <Link href={url} target="_blank">
      <div>
        <div className="relative w-full h-0 pt-[56.25%]">
          <Image
            priority
            className="rounded-2xl"
            src={imageSource}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <Image
            id={String(id)}
            className="absolute top-5 right-3 hover:scale-110 cursor-pointer"
            src={favorite ? starSelected : star}
            alt=""
            width={34}
            height={34}
            data-favorite={!favorite}
          />
        </div>
        <div>{relativeTime}</div>
        <div>{description}</div>
        <div>{createdAt}</div>
      </div>
    </Link>
  );
};

const getTotalPages = (totalCount?: number, pageSize?: number) => {
  if (!totalCount || !pageSize) {
    return undefined;
  }
  return Math.ceil(totalCount / pageSize);
};
const getPagination = (
  page?: number,
  pageSize?: number,
  totalPages?: number,
  width?: number,
) => {
  if (!page || !pageSize || !totalPages || !width) {
    return undefined;
  }
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const isNarrowScreen = width < 1024;
  const isVeryNarrowScreen = width < 425;
  const nearStart = page <= 3;
  const nearEnd = page >= totalPages - 2;
  if (nearStart) {
    return isNarrowScreen
      ? [1, 2, 3, '...', totalPages]
      : [1, 2, 3, '...', totalPages - 1, totalPages];
  }
  if (nearEnd) {
    return isNarrowScreen
      ? [1, '...', totalPages - 2, totalPages - 1, totalPages]
      : [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }
  return isVeryNarrowScreen
    ? [page - 2, page - 1, page, page + 1, page + 2]
    : [1, '...', page - 1, page, page + 1, '...', totalPages];
};

type PageNumberProps = {
  position: 'first' | 'last' | 'single' | 'middle' | undefined;
  page: string | number;
  isActive: boolean;
};
const PageNumber = ({ page, position, isActive }: PageNumberProps) => {
  return isActive || position === 'middle' ? (
    <div className={`${pageStyle} font-semibold`}>{page}</div>
  ) : (
    <button className={`${pageStyle}`} data-page={page}>
      {page}
    </button>
  );
};

type PageArrowProps = {
  direction: 'left' | 'right';
  page: number;
  isDisabled: boolean;
};
const PageArrow = ({ direction, page, isDisabled }: PageArrowProps) => {
  const arrow = direction === 'left' ? '<' : '>';
  return isDisabled ? (
    <div className={`${pageStyle} bg-red-400 text-white font-semibold`}>
      {arrow}
    </div>
  ) : (
    <button
      className={`${pageStyle} bg-green-400 text-white font-semibold`}
      data-page={page}
    >
      {arrow}
    </button>
  );
};

const usePaginationEvent = (
  updator: (updatedQuery: Partial<TLinksQuery>) => void,
) => {
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const { target } = e;
      if (target instanceof HTMLButtonElement && target.dataset.page) {
        const { page } = target.dataset;
        updator({ page: Number(page) });
      }
    };
    const ulRefCurrent = ulRef.current;
    ulRefCurrent?.addEventListener('click', handleClick);
    return () => {
      ulRefCurrent?.removeEventListener('click', handleClick);
    };
  }, [updator]);

  return ulRef;
};

const LinkPagination = () => {
  const { linksAction, linksQueryAction, clientSizeAction } =
    useLinksContextSelector();

  const { width } = clientSizeAction.data || {};
  const { totalCount } = linksAction.data?.data || {};
  const { page, pageSize } = linksQueryAction?.data || {};
  const totalPages = getTotalPages(totalCount, pageSize);
  const allPages = getPagination(page, pageSize, totalPages, width);

  const ulRef = usePaginationEvent(linksQueryAction.updator);

  return (
    <section className="p-8">
      <ul className="flex justify-center gap-x-2" ref={ulRef}>
        {page && (
          <li>
            <PageArrow
              direction="left"
              page={page - 1}
              isDisabled={page <= 1}
            />
          </li>
        )}
        {allPages?.map((val, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined;
          if (index === 0) position = 'first';
          if (index === allPages.length - 1) position = 'last';
          if (allPages.length === 1) position = 'single';
          if (val === '...') position = 'middle';
          return (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              <PageNumber
                page={val}
                position={position}
                isActive={page === val}
              />
            </li>
          );
        })}
        {page && totalPages && (
          <li>
            <PageArrow
              direction="right"
              page={page + 1}
              isDisabled={page >= totalPages}
            />
          </li>
        )}
      </ul>
    </section>
  );
};

type LinkComponentProps = SearchLinkDataProps & {
  isLoading: boolean;
  isError: boolean;
};

const LinkComponent = (props: LinkComponentProps) => {
  return match(props)
    .with({ isLoading: true }, () => (
      <>
        <LinkCardsSkeleton />
        <LinkPaginationSkeleton />
      </>
    ))
    .with({ isLoading: false, isError: true }, () => (
      <section>
        <div>
          데이터가 존재하지 않거나, 불러오는 데 실패했습니다. 다시 시도 해
          주세요.
        </div>
      </section>
    ))
    .otherwise(() => (
      <>
        <LinkCards
          filteredLinks={props.filteredLinks}
          searchResult={props.searchResult}
        />
        <LinkPagination />
      </>
    ));
};

interface SearchLinkData {
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
  const folderAction = useFolderAction();
  const clientSizeAction = useClientSize();
  const linksQueryAction = useLinksQueryAction(
    clientSizeAction.data,
    folderAction.data,
  );
  const linksAction = useLinksAction(linksQueryAction.data);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<string>('');
  const [searchLinks, setSearchLinks] = useState<SearchLinkData[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<SearchLinkData[]>([]);

  const fetchLinks = async () => {
    try {
      const links = await linkSearch();
      setSearchLinks(links.data.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    const keyword = searchValue.toLowerCase();
    const filter = searchLinks.filter(
      (searchLink) =>
        searchLink.url.toLowerCase().includes(keyword) ||
        searchLink.title.toLowerCase().includes(keyword) ||
        searchLink.description.toLowerCase().includes(keyword),
    );
    setFilteredLinks(filter);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handlerSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchResult(searchValue);
    handleSearch();
  };

  const value = useMemo(
    () => ({
      folderAction,
      clientSizeAction,
      linksQueryAction,
      linksAction,
    }),
    [clientSizeAction, folderAction, linksAction, linksQueryAction],
  );
  return (
    <LinksContext.Provider value={value}>
      <main className="select-none">
        <div className="h-[220px] pt-[60px] bg-bg">
          <AddLink />
        </div>
        <div className="max-w-[1060px] m-auto">
          <div className="my-10">
            <SearchBar
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              setSearchResult={setSearchResult}
              handlerSearchSubmit={handlerSearchSubmit}
            />
          </div>
          {searchResult && (
            <h2 className="text-lg font-bold mb-5 md:mb-10 md:text-3xl">
              {searchResult}
              <span className="text-secondary-60">
                에 대한 검색 결과입니다.
              </span>
            </h2>
          )}
          <FolderList />
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-2xl text-black my-6 font-[Pretendard] not-italic leading-[normal]">
              {selectedFolder.name || '전체'}
            </h3>
            <FolderMenuList />
          </div>
        </div>
        <LinkComponent
          isLoading={folderAction.isLoading || linksAction.isLoading}
          isError={folderAction.isError || linksAction.isError}
          filteredLinks={filteredLinks}
          searchResult={searchResult}
        />
      </main>
    </LinksContext.Provider>
  );
};

const Links = () => {
  return (
    <FolderProvider>
      <MainContent />
    </FolderProvider>
  );
};

export default Links;
