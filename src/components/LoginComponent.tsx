import React from "react";
import styled from "styled-components";
import { useAuth, useNaverAuth } from "../hooks/useNaverAuth";
import { useNavigate } from "react-router-dom"; // 리다이렉트 추가

const LoginButton = styled.button`
  background-color: #03c75a;
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
  const navigate = useNavigate(); // 네비게이션을 위한 훅

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    startNaverLogin();
    navigate("/"); // 로그인 후 메인 페이지로 리다이렉트
  };

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    logout();
  };

  if (isAuthenticated) {
    return (
      <div>
        <p>환영합니다, 정유진님!</p> {/* 사용자 이름 출력 */}
        <LoginButton onClick={handleLogout}>로그아웃</LoginButton>
      </div>
    );
  }

  return <LoginButton onClick={handleLogin}>네이버로 로그인</LoginButton>;
};

export default LoginComponent;
