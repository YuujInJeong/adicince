// src/components/TaskList.tsx
import React from 'react';
import styled from 'styled-components';
import { Task } from '../types';

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
`;

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <List>
      {tasks.map((task, index) => (
        <ListItem key={index}>
          <h3>{task.title}</h3>
          <p>날짜: {new Date(task.date).toLocaleDateString()}</p>
          <p>소요 시간: {task.duration}시간</p>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;