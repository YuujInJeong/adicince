import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginComponent from './components/LoginComponent';
import GoalInput from './components/GoalInput';
import Calendar from './components/Calendar';
import TaskList from './components/TaskList';
import { getChatbotResponse } from './api/chatbot';
import { addTaskToNaverCalendar } from './api/naverCalendar';
import { parseChatbotResponse } from './utils/chatbotResponseParser';
import { Task } from './types';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin: 20px 0;
`;

const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { isAuthenticated, accessToken } = useAuth();

  useEffect(() => {
    if (!process.env.REACT_APP_CLOVA_STUDIO_API_KEY) {
      setError('API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.');
    }
    setIsLoading(false);
  }, []);

  const handleGoalSubmit = async (goal: string) => {
    try {
      const response = await getChatbotResponse(goal);
      const newTasks = parseChatbotResponse(response);
      setTasks(prevTasks => [...prevTasks, ...newTasks]);

      if (isAuthenticated && accessToken) {
        for (const task of newTasks) {
          await addTaskToNaverCalendar(task, accessToken);
        }
      }
    } catch (error) {
      console.error('Error processing goal:', error);
      setError('목표 처리 중 오류가 발생했습니다.');
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <h1>Todo Mate</h1>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!error && (
        <>
          <LoginComponent />
          <GoalInput onSubmit={handleGoalSubmit} />
          <Calendar tasks={tasks} />
          <TaskList tasks={tasks} />
        </>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContainer>
        <AppContent />
      </AppContainer>
    </AuthProvider>
  );
};

export default App;