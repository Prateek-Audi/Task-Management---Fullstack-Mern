import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';
import { authService } from '../services/api.service';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Handle OAuth callback token in URL
    const url = new URL(window.location.href);
    const urlToken = url.searchParams.get('token');

    const initializeFromToken = async (jwtToken: string) => {
      try {
        localStorage.setItem('auth_token', jwtToken);
        // Fetch user from backend using the token
        const me = await authService.me();
        localStorage.setItem('user', JSON.stringify(me));
        setUser(me);
      } catch (error) {
        console.error('Failed to initialize user from token:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        // Clean the token from the URL
        url.searchParams.delete('token');
        window.history.replaceState({}, document.title, url.toString());
        setIsLoading(false);
      }
    };

    if (urlToken) {
      initializeFromToken(urlToken);
      return;
    }

    // Check if user is logged in on mount (local state)
    const token = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password);
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    setUser(response.user);
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    const response = await authService.register(name, email, password, role);
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    setUser(response.user);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
