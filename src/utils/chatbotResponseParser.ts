// src/utils/chatbotResponseParser.ts
import { Task } from '../types';

export function parseChatbotResponse(response: string): Task[] {
  const lines = response.split('\n');
  const tasks: Task[] = [];
  let currentDate = new Date();

  for (const line of lines) {
    if (line.includes('|') && !line.includes('항목')) {
      const [, title, , duration] = line.split('|').map(item => item.trim());
      if (title && duration) {
        const [hours, minutes] = duration.split('시간');
        const durationInHours = parseFloat(hours) + (minutes ? parseFloat(minutes) / 60 : 0);
        
        tasks.push({
          title,
          date: new Date(currentDate),
          duration: durationInHours
        });

        // Move to the next day for the next task
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      }
    }
  }

  return tasks;
}