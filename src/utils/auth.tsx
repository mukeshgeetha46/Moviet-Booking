// Types
type UserData = {
  id: string;
  email: string;
  name?: string;
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