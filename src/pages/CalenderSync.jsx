import React, { useState } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, RefreshCw } from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CalendarWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Header = styled.div`
  background: linear-gradient(to right, #2563eb, #1d4ed8);
  padding: 1.25rem;
  color: white;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const SelectWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Select = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
  }
  
  option {
    background: #2563eb;
    color: white;
  }
`;

const NavigationButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 0.375rem;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const SyncButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Calendar = styled.div`
  padding: 1.25rem;
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const WeekDay = styled.div`
  font-weight: 600;
  color: #4b5563;
  padding: 0.25rem;
  font-size: 0.875rem;
`;

const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
`;

const Day = styled.div`
  aspect-ratio: 1;
  padding: 0.25rem;
  border-radius: 0.375rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  background: ${props => {
    switch (props.status) {
      case 'pending':
        return '#dbeafe';
      case 'completed':
        return '#dcfce7';
      case 'draft':
        return '#fee2e2';
      default:
        return 'transparent';
    }
  }};
  border: 1px solid ${props => {
    switch (props.status) {
      case 'pending':
        return '#93c5fd';
      case 'completed':
        return '#86efac';
      case 'draft':
        return '#fca5a5';
      default:
        return '#e5e7eb';
    }
  }};
  
  &:hover {
    background: ${props => {
      if (!props.status) return '#f3f4f6';
      switch (props.status) {
        case 'pending':
          return '#bfdbfe';
        case 'completed':
          return '#bbf7d0';
        case 'draft':
          return '#fecaca';
        default:
          return 'transparent';
      }
    }};
  }
`;

const DayNumber = styled.span`
  font-size: 0.875rem;
  font-weight: ${props => props.isToday ? '600' : '400'};
  color: ${props => {
    if (!props.isCurrentMonth) return '#9ca3af';
    if (props.isToday) return '#2563eb';
    return '#111827';
  }};
`;

const Legend = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #4b5563;
`;

const LegendBox = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 0.25rem;
  background: ${props => {
    switch (props.status) {
      case 'pending':
        return '#dbeafe';
      case 'completed':
        return '#dcfce7';
      case 'draft':
        return '#fee2e2';
      default:
        return 'transparent';
    }
  }};
  border: 1px solid ${props => {
    switch (props.status) {
      case 'pending':
        return '#93c5fd';
      case 'completed':
        return '#86efac';
      case 'draft':
        return '#fca5a5';
      default:
        return '#e5e7eb';
    }
  }};
`;

function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [documentStatuses, setDocumentStatuses] = useState({
    '2024-03-05': 'pending',
    '2024-03-10': 'completed',
    '2024-03-15': 'draft',
    '2024-03-20': 'pending',
    '2024-03-25': 'completed'
  });
  const [isSyncing, setIsSyncing] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);

  const handleSync = () => {
    setIsSyncing(true);
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const newStatuses = { ...documentStatuses };
    
    const numberOfNewPending = Math.floor(Math.random() * 3) + 3;
    const availableDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)
      .filter(day => {
        const date = new Date(year, month, day);
        return !documentStatuses[formatDateKey(date)];
      });
    
    for (let i = availableDays.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableDays[i], availableDays[j]] = [availableDays[j], availableDays[i]];
    }
    
    for (let i = 0; i < Math.min(numberOfNewPending, availableDays.length); i++) {
      const day = availableDays[i];
      const date = new Date(year, month, day);
      newStatuses[formatDateKey(date)] = 'pending';
    }
    
    setTimeout(() => {
      setDocumentStatuses(newStatuses);
      setIsSyncing(false);
    }, 800);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const previousMonth = new Date(year, month, 0);
    const daysInPreviousMonth = previousMonth.getDate();
    
    const days = [];
    
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPreviousMonth - i),
        isCurrentMonth: false
      });
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <Container>
      <CalendarWrapper>
        <Header>
          <Title>
            <CalendarIcon size={20} />
            Document Calendar
          </Title>
          <Controls>
            <SelectWrapper>
              <Select
                value={currentDate.getMonth()}
                onChange={(e) => setCurrentDate(new Date(currentDate.getFullYear(), parseInt(e.target.value)))}
              >
                {months.map((month, index) => (
                  <option key={month} value={index}>{month}</option>
                ))}
              </Select>
              <Select
                value={currentDate.getFullYear()}
                onChange={(e) => setCurrentDate(new Date(parseInt(e.target.value), currentDate.getMonth()))}
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </Select>
            </SelectWrapper>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <SyncButton onClick={handleSync} disabled={isSyncing}>
                <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
                {isSyncing ? 'Syncing...' : 'Sync to Calendar'}
              </SyncButton>
              <NavigationButton onClick={handlePreviousMonth}>
                <ChevronLeft size={18} />
              </NavigationButton>
              <NavigationButton onClick={handleNextMonth}>
                <ChevronRight size={18} />
              </NavigationButton>
            </div>
          </Controls>
        </Header>

        <Calendar>
          <WeekDays>
            {weekDays.map(day => (
              <WeekDay key={day}>{day}</WeekDay>
            ))}
          </WeekDays>
          <Days>
            {getDaysInMonth(currentDate).map((day, index) => (
              <Day
                key={index}
                status={documentStatuses[formatDateKey(day.date)]}
              >
                <DayNumber
                  isToday={isToday(day.date)}
                  isCurrentMonth={day.isCurrentMonth}
                >
                  {day.date.getDate()}
                </DayNumber>
              </Day>
            ))}
          </Days>
        </Calendar>

        <Legend>
          <LegendItem>
            <LegendBox status="pending" />
            <span>Pending</span>
          </LegendItem>
          <LegendItem>
            <LegendBox status="completed" />
            <span>Completed</span>
          </LegendItem>
          <LegendItem>
            <LegendBox status="draft" />
            <span>Draft</span>
          </LegendItem>
        </Legend>
      </CalendarWrapper>
    </Container>
  );
}

export default CalendarPage;