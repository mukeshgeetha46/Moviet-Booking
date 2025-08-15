import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// Types
type UserData = {
  userid: number;
  email: string;
  fullname: string;
  passwordhash?: string;
  createdat?: string;
  updatedat?: string | null;
};

interface AuthContextType {
  // Movie related states
  setMovieId: (id: number | null) => void;
  movieId: number | null;
  setMovieDate: (date: Date | null) => void;
  movieDate: Date | null;
  
  // Auth related states
  token: string | null;
  user: UserData | null;
  isAuthenticated: boolean;
  
  // Auth methods
  logout: () => void;
  login: (token: string, user: UserData) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [movieId, setMovieId] = useState<number | null>(null);
  const [movieDate, setMovieDate] = useState<Date | null>(null);

  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getUserData();
    setToken(storedToken);
    setUser(storedUser);
  }, []);

  const login = (token: string, user: UserData) => {
    setAuthData(token, user);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    clearAuthData();
    setToken(null);
    setUser(null);
    setMovieId(null);
    setMovieDate(null);
  };

  const value = {
    token,
    user,
    movieId,
    movieDate,
    isAuthenticated: !!token,
    logout,
    login,
    setMovieId,
    setMovieDate
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper functions remain the same
export const setAuthData = (token: string, user: UserData) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('userData', JSON.stringify(user));
};

export const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

export const getUserData = (): UserData | null => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

export const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};