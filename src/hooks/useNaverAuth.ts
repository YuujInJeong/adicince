// src/hooks/useNaverAuth.ts
import { useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { initiateNaverLogin, getNaverToken } from '../api/naverAuth';

export const useNaverAuth = () => {
  const { login: authLogin, logout: authLogout } = useAuth();

  const startNaverLogin = useCallback(() => {
    initiateNaverLogin();
  }, []);

  const handleNaverCallback = useCallback(async (code: string, state: string) => {
    try {
      const token = await getNaverToken(code, state);
      authLogin(token);
    } catch (error) {
      console.error('Failed to complete Naver login:', error);
    }
  }, [authLogin]);

  return {
    startNaverLogin,
    handleNaverCallback,
    logout: authLogout
  };
};

// 기존의 useAuth를 그대로 내보내기
export { useAuth } from '../contexts/AuthContext';