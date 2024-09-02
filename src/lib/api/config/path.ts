export const API_PATH = {
  auth: {
    signUp: '/auth/sign-up',
    Login: '/auth/sign-in',
    googleSignUp: '/auth/sign-up/google',
    kakaoSignUp: '/auth/sign-up/kakao',
    googleLogin: '/auth/sign-in/google',
    kakaoSLogin: '/auth/sign-in/kakao',
  },
  folder: {
    default: '/folders',
    detail(id: string | number) {
      return `/folders/${id}`;
    },
  },
  link: {
    default: '/links',
    detail(id: string | number) {
      return `/links/${id}`;
    },
    category(id: string | number) {
      return `/folders/${id}/links`;
    },
  },
  favorite: {
    default: '/favorites',
  },
  oauth: {
    default: '/oauthApps',
  },
  user: {
    default: '/users',
    emailCheck: '/users/check-email',
  },
};
