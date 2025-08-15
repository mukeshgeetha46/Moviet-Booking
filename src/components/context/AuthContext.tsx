import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// Types - moved to top
type UserData = {
  id: string;
  email: string;
  fullname?: string;
};

interface AuthContextType {
  token: string | null;
  user: UserData | null;
  isAuthenticated: boolean;
  logout: () => void;
    login: (token: string, user: UserData) => void;  // Add this
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);

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
  };

  const value = {
    token,
    user,
    isAuthenticated: !!token,
    logout,
    login
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

// Save token & user data
export const setAuthData = (token: string, user: UserData) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('userData', JSON.stringify(user));
};

// Get token
export const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Get user data (parsed)
export const getUserData = (): UserData | null => {
    console.log('login first')
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

// Clear auth data (logout)
export const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken(); // Converts token to boolean
};