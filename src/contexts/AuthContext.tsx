// src/contexts/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('naverAccessToken');
    if (token) {
      setIsAuthenticated(true);
      setAccessToken(token);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('naverAccessToken', token);
    setIsAuthenticated(true);
    setAccessToken(token);
  };

  const logout = () => {
    localStorage.removeItem('naverAccessToken');
    setIsAuthenticated(false);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, accessToken, login, logout }}>
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