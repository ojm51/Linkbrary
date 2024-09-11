import {
  AddLink,
  SearchBar,
  FolderList,
  FolderMenuList,
  CommonButton,
} from '@/components';
import { instance } from '@/lib/api';
import { debounce } from '@/lib/react';
import {
  MutationOptions,
  QueryFunctionContext,
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import star from '@/assets/icons/ic_star.svg';
import starSelected from '@/assets/icons/ic_star_selected.svg';
import kebabIcon from '@/assets/icons/ic_kebab.svg';
import closeIcon from '@/assets/icons/ic_close.svg';
import emptyImg from '@/assets/images/empty.jpeg';
import {
  Context,
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { match } from 'ts-pattern';

type TQueryResponse<T> =
  | undefined
  | {
      data: T;
    };

type TMutationResponse<T> =
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

type TLinksMutationQuery =
  | undefined
  | {
      id: number;
      url: string;
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
const useCustomContext = <T,>(context: Context<T | undefined>) => {
  const CustomContext = useContext(context);
  if (!CustomContext) {
    throw new Error('ContextSelector는 프로바이더 내부에서 사용되어야 합니다.');
  }
  return CustomContext;
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

const linkServices = {
  find: async (
    query: TLinksQuery,
    signal: AbortSignal,
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
  modify: async (
    query: TLinksMutationQuery,
  ): Promise<TMutationResponse<TLinkDto>> => {
    const response = await instance.put(`/links/${query?.id}`, {
      url: query?.url,
    });
    const { data } = response;
    const [dto] = linkEntitiesToDtos([data]);
    return { data: dto };
  },
  delete: async (query: {id: number}) => {},
};

const folderOptions = {
  all: () => {
    return queryOptions({
      queryKey: ['folders', 'all'],
      queryFn: (context) => folderServices(context).all(),
      staleTime: 180000,
      gcTime: 200000,
    });
  },
};

const linkOptions = {
  find: (query: TLinksQuery) => {
    return queryOptions({
      queryKey: ['links', 'find', query],
      queryFn: ({ signal }) => linkServices.find(query, signal),
      staleTime: 180000,
      gcTime: 200000,
      enabled: !!query,
    });
  },
  modify: () => {
    return {
      mutationFn: (query: TLinksMutationQuery) => linkServices.modify(query),
    };
  },
  delete: (): MutationOptions<void, unknown, { id: number; url: string }> => {
    return {
      mutationFn: (variables) => linkServices.delete(variables),
    };
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
const useLinksContextSelector = () => useCustomContext(LinksContext);

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

const LinkCards = () => {
  const { linksAction } = useLinksContextSelector();
  return (
    <section className="p-8 lg:container lg:mx-auto">
      <ul className="grid grid-flow-row auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {linksAction.data?.data.list.map((card) => {
          return (
            <li key={card.id}>
              <LinkCard data={card} />
            </li>
          );
        })}
      </ul>
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
    <div className="shadow-lg rounded-2xl">
      <CardHeader
        title={title}
        imageSource={imageSource}
        favorite={favorite}
        id={id}
        url={url}
      />
      <CardBody
        id={id}
        createdAt={createdAt}
        description={description}
        relativeTime={relativeTime}
      />
    </div>
  );
};
const CardHeader = ({
  url,
  imageSource,
  title,
  id,
  favorite,
}: Pick<TLinkDto, 'url' | 'imageSource' | 'title' | 'id' | 'favorite'>) => {
  return (
    <div className="relative">
      <Link href={url} target="_blank">
        <div className="relative w-full h-0 pt-[56.25%]">
          <Image
            priority
            className="rounded-2xl"
            src={imageSource || emptyImg}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>
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
  );
};

const CardBody = ({
  id,
  relativeTime,
  description,
  createdAt,
}: Pick<TLinkDto, 'id' | 'relativeTime' | 'description' | 'createdAt'>) => {
  return (
    <div className="flex flex-col gap-y-3 py-4 px-5 min-h-32">
      <ul className="flex justify-between">
        <li>
          <div className="text-xs">{relativeTime}</div>
        </li>
        <li>
          <DropBox id={id} />
        </li>
      </ul>
      <div>{description}</div>
      <div>{createdAt}</div>
    </div>
  );
};

type TModalMode = 'MODIFY' | 'DELETE' | '';
type TModalType = 'MODIFY' | 'DELETE' | 'CLOSE';
type TModalState = {
  mode: TModalMode;
  linkId: number;
};
type TModalActions = {
  type: TModalType;
  payload?: TModalState;
};
type TModalStore = {
  state: TModalState;
  modifyModal: (linkId: number) => void;
  deleteModal: (linkId: number) => void;
  closeModal: () => void;
};
const modalState: TModalState = {
  mode: '',
  linkId: 0,
};
const modalReducer = (state: TModalState, action: TModalActions) => {
  switch (action.type) {
    case 'MODIFY':
    case 'DELETE':
    case 'CLOSE':
      return { ...(action.payload as TModalState) };
    default:
      return state;
  }
};
const ModalStoreContext = createContext<TModalStore | undefined>(undefined);
const useModalStore = () => useCustomContext(ModalStoreContext);
const ModalStoreProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(modalReducer, modalState);
  const updateModal = (
    type: TModalType,
    mode: TModalMode = '',
    linkId: number = 0,
  ) => {
    dispatch({ type, payload: { mode, linkId } });
  };
  const modifyModal = useCallback((linkId: number) => {
    updateModal('MODIFY', 'MODIFY', linkId);
  }, []);
  const deleteModal = useCallback((linkId: number) => {
    updateModal('DELETE', 'DELETE', linkId);
  }, []);
  const closeModal = useCallback(() => {
    updateModal('CLOSE');
  }, []);
  const value = useMemo(
    () => ({
      state,
      modifyModal,
      deleteModal,
      closeModal,
    }),
    [closeModal, deleteModal, modifyModal, state],
  );
  return (
    <ModalStoreContext.Provider value={value}>
      {children}
    </ModalStoreContext.Provider>
  );
};

const ModifyAndDeleteModal = () => {
  const { state, closeModal } = useModalStore();
  const { folderAction, linksAction } = useLinksContextSelector();
  const isLoading = folderAction.isLoading || linksAction.isLoading;
  if (!state.mode || isLoading) return undefined;
  const currentLink = linksAction.data?.data.list.find(
    (item) => item.id === state.linkId,
  );
  let title;
  let body;
  if (state.mode === 'MODIFY') {
    title = '수정하기';
    body = <ModifyModalBody currentLink={currentLink} />;
  } else {
    title = '삭제하기';
    body = <DeleteModalBody currentLink={currentLink} />;
  }

  return (
    <ModalRoot open={!!state.mode}>
      <ModalFrame>
        <ModalTitle>{title}</ModalTitle>
        <ModalClose onClick={closeModal}>
          <Image src={closeIcon} alt="X" width={24} height={24} />
        </ModalClose>
        {body}
      </ModalFrame>
    </ModalRoot>
  );
};

const ModalRoot = ({
  children,
  open,
}: PropsWithChildren & {
  open: boolean;
}) => {
  return (
    <div
      className={`${open ? 'auto' : 'hidden'} fixed inset-0 w-screen h-screen flex justify-center items-center bg-gray-300 bg-opacity-30 z-40 overflow-hidden`}
    >
      {children}
    </div>
  );
};

const ModalFrame = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative flex flex-col justify-center items-center w-[30%] h-auto bg-white z-50 py-8 px-10">
      {children}
    </div>
  );
};

const ModalTitle = ({ children }: PropsWithChildren) => {
  return <div className="font-bold text-xl">{children}</div>;
};

const ModalClose = ({
  children,
  onClick,
}: PropsWithChildren & {
  onClick: () => void;
}) => {
  return (
    <div className="absolute right-4 top-4 cursor-pointer" onClick={onClick}>
      {children}
    </div>
  );
};

const ModifyModalBody = ({ currentLink }: { currentLink?: TLinkDto }) => {
  const queryClient = useQueryClient();
  const { linksQueryAction } = useLinksContextSelector();
  const { closeModal } = useModalStore();
  const [input, setInput] = useState('');
  const mutateAction = useMutation({
    ...linkOptions.modify(),
    onSuccess: (data) => {
      const currentQuerykey = linkOptions.find(linksQueryAction.data).queryKey;
      const currentQueryData = queryClient.getQueryData(currentQuerykey);
      const newQueryData = {
        data: {
          totalCount: currentQueryData?.data.totalCount,
          list: currentQueryData?.data.list.map((item) =>
            item.id === data?.data.id ? { ...data.data } : item,
          ),
        },
      } as TQueryResponse<TLinksResponse<TLinkDto[]>>;
      queryClient.setQueryData(currentQuerykey, newQueryData);
      closeModal();
    },
  });
  const onClick = () => {
    if (input) {
      mutateAction.mutate({ id: currentLink?.id as number, url: input });
    }
  };
  return (
    <>
      <h2>{currentLink?.title || currentLink?.url}</h2>
      <input
        className="border-2 p-3"
        placeholder="내용 입력"
        onChange={(e) => setInput(e.target.value)}
      />
      {mutateAction.isError && (
        <div>중복된 URL이거나, 등록할 수 없는 URL입니다.</div>
      )}
      {mutateAction.isPending ? (
        <div>요청 처리 중...</div>
      ) : (
        <CommonButton mode="default" onClick={onClick}>
          링크수정
        </CommonButton>
      )}
    </>
  );
};

const DeleteModalBody = ({ currentLink }: { currentLink?: TLinkDto }) => {
  const mutateAction = useMutation(linkOptions.delete());
  return (
    <>
      <h2>{currentLink?.title || currentLink?.url}</h2>
      <CommonButton mode="default">링크삭제</CommonButton>
    </>
  );
};

type TDropBoxState = {
  opens: TDropBoxOpen[];
};
type TDropBoxActions = {
  type: 'INIT' | 'OPEN' | 'CLOSE';
  payload?: {
    opens?: TDropBoxOpen[];
    open?: TDropBoxOpen;
  };
};
type TDropBoxOpen = {
  id: number;
  open: boolean;
};
const dropBoxState: TDropBoxState = {
  opens: [],
};
const dropBoxReducer = (state: TDropBoxState, action: TDropBoxActions) => {
  switch (action.type) {
    case 'INIT':
      return { opens: action.payload?.opens as TDropBoxOpen[] };
    case 'OPEN':
      return {
        opens: state.opens.map((item) =>
          item.id === action.payload?.open?.id
            ? { ...item, open: action.payload.open.open }
            : { ...item, open: false },
        ),
      };
    case 'CLOSE':
      return {
        opens: state.opens.map((item) =>
          item.open ? { ...item, open: false } : item,
        ),
      };
    default:
      return state;
  }
};
type DropBoxStore = {
  state: TDropBoxState;
  open: (updatedOpen: TDropBoxOpen) => void;
  close: () => void;
};
const DropBoxStoreContext = createContext<DropBoxStore | undefined>(undefined);
const useDropBoxStore = () => useCustomContext(DropBoxStoreContext);
const DropBoxStoreProvider = ({ children }: PropsWithChildren) => {
  const { linksAction } = useLinksContextSelector();
  const list = linksAction.data?.data.list;
  const [state, dispatch] = useReducer(dropBoxReducer, dropBoxState);

  const open = (updatedOpen: TDropBoxOpen) => {
    dispatch({ type: 'OPEN', payload: { open: updatedOpen } });
  };
  const close = () => {
    dispatch({ type: 'CLOSE' });
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const { target } = e;
      const isButton =
        target instanceof HTMLImageElement ||
        target instanceof HTMLButtonElement;
      if (!isButton) {
        close();
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    const initOpens: TDropBoxOpen[] =
      list?.map(
        ({ id }): TDropBoxOpen => ({
          id,
          open: false,
        }),
      ) || [];
    dispatch({ type: 'INIT', payload: { opens: initOpens } });
  }, [list]);

  const value = useMemo(
    () => ({
      state,
      open,
      close,
    }),
    [state],
  );

  return (
    <DropBoxStoreContext.Provider value={value}>
      {children}
    </DropBoxStoreContext.Provider>
  );
};

const DropBox = ({ id }: Pick<TLinkDto, 'id'>) => {
  const { state, open: dropBoxOpen, close: dropBoxClose } = useDropBoxStore();
  const { modifyModal, deleteModal } = useModalStore();
  const currentItem = state.opens.find((item) => item.id === id);
  const handleClick = () => dropBoxOpen({ id, open: true });
  return (
    <DropBoxRoot>
      <DropBoxButton onClick={handleClick}>
        <Image src={kebabIcon} alt="..." width={21} height={17} />
      </DropBoxButton>
      <DropBoxMenu isOpen={currentItem?.open}>
        <DropBoxOption
          value="수정하기"
          onClick={() => {
            dropBoxClose();
            modifyModal(id);
          }}
        />
        <DropBoxOption
          value="삭제하기"
          onClick={() => {
            dropBoxClose();
            deleteModal(id);
          }}
        />
      </DropBoxMenu>
    </DropBoxRoot>
  );
};

const DropBoxRoot = ({ children }: PropsWithChildren) => {
  return <div className="relative">{children}</div>;
};
const DropBoxButton = ({
  children,
  onClick,
}: {
  onClick: () => void;
} & PropsWithChildren) => {
  return <button onClick={onClick}>{children}</button>;
};

const DropBoxMenu = ({
  children,
  isOpen,
}: { isOpen?: boolean } & PropsWithChildren) => {
  const ulStyle = 'absolute top-0 -left-[300%] min-w-max bg-white shadow-lg';
  return (
    <ul className={`${isOpen ? 'auto' : 'hidden'} ${ulStyle}`}>{children}</ul>
  );
};
const DropBoxOption = ({
  value,
  onClick,
}: {
  value: string;
  onClick: () => void;
}) => {
  return (
    <li>
      <button className="p-4 hover:bg-secondary-10" onClick={onClick}>
        {value}
      </button>
    </li>
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
    <button id={`page-${page}`} className={`${pageStyle}`}>
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
      id={`page-${page}`}
      className={`${pageStyle} bg-green-400 text-white font-semibold`}
      data-action="pagination"
    >
      {arrow}
    </button>
  );
};

const LinkPagination = () => {
  const ulRef = useRef<HTMLUListElement>(null);
  const { linksAction, linksQueryAction, clientSizeAction } =
    useLinksContextSelector();

  const { width } = clientSizeAction.data || {};
  const { totalCount } = linksAction.data?.data || {};
  const { page, pageSize } = linksQueryAction?.data || {};
  const totalPages = getTotalPages(totalCount, pageSize);
  const allPages = getPagination(page, pageSize, totalPages, width);

  useEffect(() => {
    const currentUlRef = ulRef.current;
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof HTMLButtonElement) {
        const { id } = target;
        if (id.startsWith('page-')) {
          event.stopPropagation();
          const clickedPageId = id.slice(id.indexOf('-') + 1);
          linksQueryAction.updator({ page: Number(clickedPageId) });
        }
      }
    };
    currentUlRef?.addEventListener('click', handleClick);
    return () => {
      currentUlRef?.removeEventListener('click', handleClick);
    };
  }, [linksQueryAction]);

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

const LinksContextProvider = ({ children }: PropsWithChildren) => {
  const folderAction = useFolderAction();
  const clientSizeAction = useClientSize();
  const linksQueryAction = useLinksQueryAction(
    clientSizeAction.data,
    folderAction.data,
  );
  const linksAction = useLinksAction(linksQueryAction.data);
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
    <LinksContext.Provider value={value}>{children}</LinksContext.Provider>
  );
};

const Links = () => {
  return (
    <LinksContextProvider>
      <DropBoxStoreProvider>
        <ModalStoreProvider>
          <ModifyAndDeleteModal />
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
                  title
                </h3>
                <FolderMenuList />
              </div>
            </div>
            <LinkComponent />
          </main>
        </ModalStoreProvider>
      </DropBoxStoreProvider>
    </LinksContextProvider>
  );
};

const LinkComponent = () => {
  const { folderAction, linksAction } = useLinksContextSelector();
  const isLoading = folderAction.isLoading || linksAction.isLoading;
  const isError = folderAction.isError || linksAction.isError;
  return match({ isLoading, isError })
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
        <LinkCards />
        <LinkPagination />
      </>
    ));
};

export default Links;
