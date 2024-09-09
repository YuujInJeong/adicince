// src/components/Callback.tsx
import React, { useEffect } from 'react';
import { useNaverAuth } from '../hooks/useNaverAuth';

const Callback: React.FC = () => {
  const { handleNaverCallback } = useNaverAuth();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (code && state) {
      handleNaverCallback(code, state).then((success) => {
        if (success) {
          window.location.href = '/'; // 성공 시 홈페이지로 리다이렉트
        } else {
          window.location.href = '/?error=login_failed'; // 실패 시 에러 메시지와 함께 홈페이지로 리다이렉트
        }
      });
    } else {
      window.location.href = '/?error=invalid_callback'; // 유효하지 않은 콜백 파라미터
    }
  }, [handleNaverCallback]);

  return <div>로그인 처리 중...</div>;
};

export default Callback;