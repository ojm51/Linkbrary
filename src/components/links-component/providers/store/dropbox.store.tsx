import { createContext, PropsWithChildren, useEffect, useMemo, useReducer } from 'react';
import { useLinksContextSelector } from '../context';

export type TDropBoxState = {
  opens: TDropBoxOpen[];
};

export type TDropBoxActions = {
  type: 'INIT' | 'OPEN' | 'CLOSE';
  payload?: {
    opens?: TDropBoxOpen[];
    open?: TDropBoxOpen;
  };
};

export type TDropBoxOpen = {
  id: number;
  open: boolean;
};

export type DropBoxStore = {
  state: TDropBoxState;
  open: (updatedOpen: TDropBoxOpen) => void;
  close: () => void;
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
export const DropBoxStoreContext = createContext<DropBoxStore | undefined>(undefined);
export const DropBoxStoreProvider = ({ children }: PropsWithChildren) => {
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
