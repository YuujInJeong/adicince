// src/components/GoalInput.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
`;

const SubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
`;

interface GoalInputProps {
  onSubmit: (goal: string) => void;
}

const GoalInput: React.FC<GoalInputProps> = ({ onSubmit }) => {
  const [goal, setGoal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal.trim()) {
      onSubmit(goal);
      setGoal('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="목표를 입력하세요"
      />
      <SubmitButton type="submit">제출</SubmitButton>
    </Form>
  );
};

export default GoalInput;