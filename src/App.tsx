import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginComponent from "./components/LoginComponent";
import GoalInput from "./components/GoalInput";
import Calendar from "./components/Calendar";
import TaskList from "./components/TaskList";
import { getChatbotResponse } from "./api/chatbot";
import { addTaskToNaverCalendar } from "./api/naverCalendar";
import { parseChatbotResponse } from "./utils/chatbotResponseParser";
import { Task } from "./types";
import { Container, Card, Heading } from "./styles/StyledComponents";
import GlobalStyle from "./styles/globalStyles";

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
      setError("API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.");
    }
    setIsLoading(false);
  }, []);

  const handleGoalSubmit = async (goal: string) => {
    try {
      const response = await getChatbotResponse(goal);
      const newTasks = parseChatbotResponse(response);
      setTasks((prevTasks) => [...prevTasks, ...newTasks]);

      if (isAuthenticated && accessToken) {
        for (const task of newTasks) {
          await addTaskToNaverCalendar(task, accessToken);
        }
      }
    } catch (error) {
      console.error("Error processing goal:", error);
      setError("목표 처리 중 오류가 발생했습니다.");
    }
  };

  if (isLoading) {
    return <Container>로딩 중...</Container>;
  }

  return (
    <Container>
      <Heading>Todo Mate</Heading>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!error && (
        <>
          <Card>
            <LoginComponent />
          </Card>
          {isAuthenticated && (
            <>
              <Card>
                <GoalInput onSubmit={handleGoalSubmit} />
              </Card>
              <Card>
                <Calendar tasks={tasks} />
              </Card>
              <Card>
                <TaskList tasks={tasks} />
              </Card>
            </>
          )}
        </>
      )}
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
