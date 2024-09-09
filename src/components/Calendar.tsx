// src/components/Calendar.tsx
import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';
import { Task } from '../types';

moment.locale('ko');
const localizer = momentLocalizer(moment);

const StyledCalendar = styled(BigCalendar)`
  height: 500px;
  margin-top: 20px;
`;

interface CalendarProps {
  tasks: Task[];
}

const Calendar: React.FC<CalendarProps> = ({ tasks }) => {
  const events = tasks.map(task => ({
    title: task.title,
    start: new Date(task.date),
    end: new Date(new Date(task.date).getTime() + task.duration * 60 * 60 * 1000),
  }));

  return (
    <StyledCalendar
      localizer={localizer}
      events={events}
      startAccessor={(event: any) => event.start}
      endAccessor={(event: any) => event.end}
      views={['month', 'week', 'day']}
    />
  );
};

export default Calendar;  