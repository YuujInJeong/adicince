// src/api/naverCalendar.ts
import axios from 'axios';
import { Task } from '../types';

const NAVER_CALENDAR_API_URL = 'https://openapi.naver.com/calendar/createSchedule.json';

export const addTaskToNaverCalendar = async (task: Task, accessToken: string) => {
  try {
    const response = await axios.post(
      NAVER_CALENDAR_API_URL,
      {
        calendarId: '@default',
        title: task.title,
        description: `소요 시간: ${task.duration}시간`,
        start: task.date.toISOString(),
        end: new Date(task.date.getTime() + task.duration * 60 * 60 * 1000).toISOString(),
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding task to Naver Calendar:', error);
    throw error;
  }
};