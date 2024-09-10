import { createContext } from 'react';
import { AuthContextType, useAuthHandler } from './useAuthHandler';

export const AuthContext = createContext<AuthContextType>({
  userInfo: null,
  isLoggedin: false,
  login: () => {},
  logout: () => {},
  updateUserInfo: () => {},
  updateIsLoggedIn: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const authProviderValue = useAuthHandler();

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};
