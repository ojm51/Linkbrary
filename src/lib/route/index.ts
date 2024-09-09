export enum Routes {
  HOME = '/',
  LOGIN = '/login',
  SIGNUP = '/signup',
  LINKS = '/links',
  FAVORITE = '/favorite',
}

export type RoutesType = Partial<Routes>;

export const ROUTE_CONTROL: Record<string, string[]> = {
  needAuth: [Routes.LINKS, Routes.FAVORITE],
  hasHeaderNFooter: [Routes.HOME, Routes.LINKS, Routes.FAVORITE],
  hasOnlyHeader: [],
  hasOnlyFooter: [],
};
