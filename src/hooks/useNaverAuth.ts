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
      return true; // 성공 시 true 반환
    } catch (error) {
      console.error('Failed to complete Naver login:', error);
      return false; // 실패 시 false 반환
    }
  }, [authLogin]);

  return {
    startNaverLogin,
    handleNaverCallback,
    logout: authLogout
  };
};

export { useAuth } from '../contexts/AuthContext';