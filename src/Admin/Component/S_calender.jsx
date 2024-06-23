import React from 'react';
import styled from 'styled-components';



function S_calender() {
  // 날짜 데이터와 로직은 예제를 단순화하기 위해 생략
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1); // 예제용 간단한 데이터

  return (
    <CalendarWrapper>
        <CalendarContainer>
            <CalendarHeader>
                <button>◀</button>
                2024년 6월
                <button>▶</button>
            </CalendarHeader>
            
            <DayNames>
                {daysOfWeek.map(day => (
                <Day key={day}>{day}</Day>
                ))}
            </DayNames>

            <MonthGrid>
                {daysInMonth.map(day => (
                day === 23 ? <CurrentDay key={day}>{day}</CurrentDay> : <Day key={day}>{day}</Day>
                ))}
            </MonthGrid>
        </CalendarContainer>
    </CalendarWrapper>
  );
}

export default S_calender;


const CalendarWrapper = styled.div`
  width: 100%;
  height:500px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

const CalendarContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background: white;
  border: 1px solid #ccc;
  text-align: center;
  user-select: none;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #f0f0f0;
  font-size: 18px;
`;

const DayNames = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #f0f0f0;
  font-size: 16px;
`;

const Day = styled.div`
  padding: 15px;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-right: none;
  }
`;

const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const CurrentDay = styled(Day)`
  background-color: #ccc;
`;