import { AddLink, SearchBar, FolderList, FolderMenuList } from '@/components';
import { instance } from '@/lib/api';
import { debounce } from '@/lib/react';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import star from '@/assets/icons/ic_star.svg';
import starSelected from '@/assets/icons/ic_star_selected.svg';
import { useCallback, useEffect, useState } from 'react';
import { PLACEHOLDER_LINKS } from './placeholder-data';

type QueryResponse<T> = {
  data: T;
};
type FoldersQueryResponse<T> = QueryResponse<T>;
type LinksQueryResponse<T> = QueryResponse<T> & {
  additional: {
    favorites: LinksFavorites;
  };
};
type Query = {
  id: number;
};
type LinksQuery = Query & {
  page: number;
  pageSize: number;
  keyword: string;
};
type FoldersQuery = Query & {};
type FoldersRdo = {
  id: number;
  createdAt: string;
  name: string;
  linkCount: number;
};
type FoldersListRdo = Array<FoldersRdo>;
type FoldersDto = {
  id: number;
  createdAt: string;
  name: string;
  linkCount: number;
};
type FoldersListDto = Array<FoldersDto>;
type LinksRdo = {
  id: number;
  favorite: boolean;
  url: string;
  title: string;
  imageSource: string;
  description: string;
  createdAt: string;
};
type LinksListRdo = Array<LinksRdo>;
type LinksDto = {
  id: number;
  favorite: boolean;
  url: string;
  title: string;
  imageSource: string;
  description: string;
  createdAt: string;
  relativeTime: string;
};
type LinksListDto = Array<LinksDto>;
type LinksFavorites = Array<LinksFavorite>;
type LinksFavorite = Pick<LinksDto, 'id' | 'favorite'>;

const fetchLinksData = async <T,>({
  queryKey,
  signal,
}: QueryFunctionContext): Promise<T> => {
  const resource = queryKey[0] as string;
  const query = queryKey[2] as LinksQuery;
  const { id, page, pageSize, keyword } = query;
  const url = `${id ? `/folders/${id}` : ''}/${resource}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`;
  const response = await instance.get(url, { signal });
  return response.data as T;
};

const fetchFoldersData = async <T,>({
  queryKey,
  signal,
}: QueryFunctionContext): Promise<T> => {
  const resource = queryKey[0] as string;
  const { id } = queryKey[2] as FoldersQuery;
  const url = `/${resource}${id > 0 ? `/${id}` : ''}`;
  const response = await instance.get(url, { signal });
  return response.data as T;
};

const foldersQueryOptions = {
  default: () => ['folders'],
  lists: () => [...foldersQueryOptions.default(), 'list'],
  list: ({ id = 0 }: Partial<FoldersQuery> = {}) => ({
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 2,
    queryKey: [...foldersQueryOptions.lists(), { id }],
    queryFn: async (
      context: QueryFunctionContext,
    ): Promise<FoldersQueryResponse<FoldersListDto>> => {
      // const data = await fetchFoldersData<FoldersListRdo>({ ...context });
      // return { data };
      return {
        data: [
          {
            id: 294,
            createdAt: '2024-09-02T00:48:37.679Z',
            linkCount: 100,
            name: '전체',
          },
        ],
      };
    },
  }),
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

const mapLinkRdoToDto = (resDto: LinksListRdo): LinksListDto => {
  return resDto.map(({ id, createdAt, imageSource, ...rest }) => {
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
    } as LinksDto;
  });
};

const linksQueryOptions = {
  default: () => ['links'],
  lists: () => [...linksQueryOptions.default(), 'list'],
  list: ({
    id = 0,
    pageSize = 9,
    page = 1,
    keyword = '',
  }: Partial<LinksQuery> = {}) => ({
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 2,
    queryKey: [...linksQueryOptions.lists(), { id, page, pageSize, keyword }],
    queryFn: async (
      context: QueryFunctionContext,
    ): Promise<LinksQueryResponse<LinksListDto>> => {
      // const data = await fetchLinksData<LinksListRdo>({ ...context });
      // const dtos = mapLinkRdoToDto(data);
      // const favorites = dtos.map((dto) => ({ id: dto.id, favorite: dto.favorite }));
      // return { data: dtos, additional: { favorites: favorites } };
      const dtos = mapLinkRdoToDto(PLACEHOLDER_LINKS().slice(0, pageSize));
      const favorites = dtos.map((dto) => ({
        id: dto.id,
        favorite: dto.favorite,
      }));
      return { data: dtos, additional: { favorites } };
    },
  }),
};

const useFetchFoldersHook = (id: number) => {
  return useQuery<FoldersQueryResponse<FoldersListDto>>(
    foldersQueryOptions.list({ id }),
  );
};

const useWidthHook = () => {
  const [width, setWidth] = useState(0);
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    const debouncedResize = debounce(() => {
      handleResize();
    }, 300);
    handleResize();
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, []);
  return { width };
};

const getPageSize = (width: number) => {
  if (width >= 425 && width < 1024) return 6;
  return 9;
};

const useFetchLinksHook = (query: LinksQuery) => {
  return useQuery<LinksQueryResponse<LinksListDto>>(
    linksQueryOptions.list(query),
  );
};

const LinkComponent = ({
  data: { id, url, title, createdAt, description, imageSource, relativeTime },
  favorite: { favorite: currentFavorite },
  update,
}: {
  data: LinksDto;
  favorite: LinksFavorite;
  update: (updatedFavorite: LinksFavorite) => void;
}) => {
  const onClick = () => update({ id, favorite: !currentFavorite });
  return (
    <div>
      <div className="relative w-full h-0 pt-[56.25%]">
        <Image priority src={imageSource} alt={title} fill sizes="100vw" />
        <Image
          className="absolute top-5 right-3 hover:scale-110"
          src={currentFavorite ? starSelected : star}
          alt=""
          width={34}
          height={34}
          onClick={onClick}
        />
      </div>
      <div>{relativeTime}</div>
      <div>{description}</div>
      <div>{createdAt}</div>
    </div>
  );
};

const mutationLinksFavorite = async (updatedFavorite: LinksFavorite) => {
  // To-do
  // 즐겨찾기 추가
};

const useLinksFavoritesHook = (initFavorites: LinksFavorites = []) => {
  const [state, setState] = useState(initFavorites);

  const update = useCallback(async (updatedFavorite: LinksFavorite) => {
    const response = await mutationLinksFavorite(updatedFavorite);
    setState((prevState) =>
      prevState.map((prevFavorite) =>
        prevFavorite.id === updatedFavorite.id ? updatedFavorite : prevFavorite,
      ),
    );
  }, []);

  return { favorites: state, update };
};

type LinksListComponentProps = {
  query: LinksQuery;
};

const LinkListComponent = ({ query }: LinksListComponentProps) => {
  const { data, isPending, isError } = useFetchLinksHook(query);
  const { favorites, update: updateFavorite } = useLinksFavoritesHook(
    data?.additional?.favorites,
  );
  return (
    <section className="lg:container lg:mx-auto p-8">
      <ul className="grid grid-flow-row auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {data?.data.map((link) => {
          const currentFavorite = favorites.find(
            (favorite) => favorite.id === link.id,
          );
          return (
            <li key={link.id} className="shadow-md rounded-xl">
              <LinkComponent
                data={link}
                favorite={currentFavorite as LinksFavorite}
                update={updateFavorite}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const initialLinksQueryState = (width: number) => ({
  id: 0,
  page: 1,
  pageSize: getPageSize(width),
  keyword: '',
});

const useFoldersQueryHook = () => {
  const [query, setQuery] = useState(() => ({
    id: 0,
  }));
  const update = useCallback((updatedQuery: FoldersQuery) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      ...updatedQuery,
    }));
  }, []);
  return { query, update };
};

const useLinksQueryHook = (width: number, folderId: number = 0) => {
  const [query, setQuery] = useState(initialLinksQueryState(width));
  const update = useCallback(
    (updatedQuery: Partial<LinksQuery>) => {
      setQuery((prevQuery) => ({
        ...prevQuery,
        ...updatedQuery,
        id: folderId,
      }));
    },
    [folderId],
  );
  useEffect(() => {
    update({ pageSize: getPageSize(width) });
  }, [update, width]);
  return { query, update };
};

type LinkListPagenationComponentProps = {
  query: LinksQuery;
  width: number;
  update: (updatedQuery: Partial<LinksQuery>) => void;
};

const getPagination = (page: number, totalPages: number, width: number) => {
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

type PagenationNumberComponentProps = {
  page: number | string;
  position: 'first' | 'last' | 'middle' | 'single' | undefined;
  isActive: boolean;
  query: Partial<LinksQuery> | undefined;
  update: (updatedQuery: Partial<LinksQuery>) => void;
};
const pageStyle =
  'box-content w-7 h-7 p-2 text-center rounded-lg bg-gray-200 text-lg leading-relaxed';
const PaginationNumberComponent = ({
  page,
  isActive,
  position,
  query,
  update,
}: PagenationNumberComponentProps) => {
  return isActive || position === 'middle' ? (
    <li className={`${pageStyle} font-semibold`}>{page}</li>
  ) : (
    <li className={pageStyle}>
      <button
        className="w-full h-full"
        onClick={() => update(query as LinksQuery)}
      >
        {page}
      </button>
    </li>
  );
};

type PagenationArrowComponentProps = {
  query: Partial<LinksQuery>;
  direction: 'left' | 'right';
  isDisabled: boolean;
  update: (updatedQuery: Partial<LinksQuery>) => void;
};
const PagenationArrowComponent = ({
  query,
  direction,
  isDisabled,
  update,
}: PagenationArrowComponentProps) => {
  const arrow = direction === 'left' ? '<' : '>';
  return isDisabled ? (
    <li className={pageStyle}>
      <button className="w-full h-full">{arrow}</button>
    </li>
  ) : (
    <li className={`${pageStyle} bg-green-600 text-white`}>
      <button onClick={() => update(query)}>{arrow}</button>
    </li>
  );
};

const LinkListPagenationComponent = ({
  query,
  width,
  update,
}: LinkListPagenationComponentProps) => {
  const { data, isPending, isError } = useFetchFoldersHook(query.id);
  if (isPending) {
    return <div>로딩중</div>;
  }
  if (isError) {
    return undefined;
  }
  const entire = data.data.find((dto) => dto.name === '전체') as FoldersDto;
  const { page, pageSize } = query;
  const { linkCount } = entire;
  const totalPages = Math.ceil(linkCount / pageSize);
  const allPages = getPagination(page, totalPages, width);
  return (
    <section className="px-8">
      <ul className="flex justify-center gap-x-2">
        <PagenationArrowComponent
          query={{ page: page - 1 }}
          direction="left"
          isDisabled={page <= 1}
          update={update}
        />
        {allPages.map((val, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined;
          if (index === 0) position = 'first';
          if (index === allPages.length - 1) position = 'last';
          if (allPages.length === 1) position = 'single';
          if (val === '...') position = 'middle';
          return (
            <PaginationNumberComponent
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              page={val}
              position={position}
              isActive={page === val}
              query={{
                page: position !== 'middle' ? (val as number) : undefined,
              }}
              update={update}
            />
          );
        })}
        <PagenationArrowComponent
          query={{ page: page + 1 }}
          direction="right"
          isDisabled={page >= totalPages}
          update={update}
        />
      </ul>
    </section>
  );
};

const Links = () => {
  const { width } = useWidthHook();
  const { query: linksQuery, update: linksupdate } = useLinksQueryHook(width);
  const { query: foldersQuery, update: foldersupdate } = useFoldersQueryHook();
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
      <LinkListComponent query={linksQuery} />
      <LinkListPagenationComponent
        query={linksQuery}
        width={width}
        update={linksupdate}
      />
    </>
  );
};

export default Links;
