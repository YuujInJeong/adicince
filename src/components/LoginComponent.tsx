import React from 'react';
import styled from 'styled-components';
import { useAuth, useNaverAuth } from '../hooks/useNaverAuth';

const LoginButton = styled.button`
  background-color: #03C75A;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
`;

const LoginComponent: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { startNaverLogin } = useNaverAuth();

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    startNaverLogin();
  };

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    logout();
  };

  if (isAuthenticated) {
    return <LoginButton onClick={handleLogout}>로그아웃</LoginButton>;
  }

  return <LoginButton onClick={handleLogin}>네이버로 로그인</LoginButton>;
};

export default LoginComponent;