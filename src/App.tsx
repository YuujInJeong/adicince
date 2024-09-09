// src/App.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginComponent from './components/LoginComponent';
import GoalInput from './components/GoalInput';
import Calendar from './components/Calendar';
import TaskList from './components/TaskList';
import Callback from './components/Callback';
import { getChatbotResponse } from './api/chatbot';
import { addTaskToNaverCalendar } from './api/naverCalendar';
import { parseChatbotResponse } from './utils/chatbotResponseParser';
import { Task } from './types';
import { Container, Card, Heading } from './styles/StyledComponents';
import GlobalStyle from './styles/globalStyles';

const ErrorMessage = styled.div`
  color: red;
  margin: 20px 0;
`;

const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { isAuthenticated, accessToken } = useAuth();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    if (!process.env.REACT_APP_CLOVA_STUDIO_API_KEY) {
      setError('CLOVA Studio API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.');
    }
    if (!process.env.REACT_APP_NAVER_APIGW_API_KEY) {
      setError(prevError => 
        prevError 
          ? `${prevError} NAVER APIGW API 키도 설정되지 않았습니다.` 
          : 'NAVER APIGW API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.'
      );
    }
    setIsLoading(false);

    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleGoalSubmit = async (goal: string) => {
    setError(null);  // 새 목표 제출 시 이전 에러 초기화
    try {
      console.log('Submitting goal:', goal);
      const response = await getChatbotResponse(goal);
      console.log('Chatbot response:', response);
      
      const newTasks = parseChatbotResponse(response);
      console.log('Parsed tasks:', newTasks);
      
      setTasks(prevTasks => [...prevTasks, ...newTasks]);

      if (isAuthenticated && accessToken) {
        console.log('Adding tasks to Naver Calendar');
        for (const task of newTasks) {
          try {
            await addTaskToNaverCalendar(task, accessToken);
            console.log('Task added to Naver Calendar:', task);
          } catch (calendarError) {
            console.error('Error adding task to Naver Calendar:', calendarError);
            setError(prevError => 
              prevError 
                ? `${prevError} 일부 작업을 네이버 캘린더에 추가하는 데 실패했습니다.` 
                : '일부 작업을 네이버 캘린더에 추가하는 데 실패했습니다.'
            );
          }
        }
      }
    } catch (error) {
      console.error('Error processing goal:', error);
      if (error instanceof Error) {
        setError(`목표 처리 중 오류가 발생했습니다: ${error.message}`);
      } else {
        setError('목표 처리 중 알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  if (isLoading) {
    return <Container>로딩 중...</Container>;
  }

  if (currentPath === '/auth/callback') {
    return <Callback />;
  }

  return (
    <Container>
      <Heading>Todo Mate</Heading>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Card>
        <LoginComponent />
      </Card>
      <Card>
        <GoalInput onSubmit={handleGoalSubmit} />
      </Card>
      <Card>
        <Calendar tasks={tasks} />
      </Card>
      <Card>
        <TaskList tasks={tasks} />
      </Card>
    </Container>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <GlobalStyle />
      <AppContent />
    </AuthProvider>
  );
};

export default App;