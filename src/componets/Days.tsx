// Day.tsx
import React from "react";

interface DayProps {
  day: number;
  isCurrentDay: boolean;
  isPrevMonth: boolean;
}

const Day: React.FC<DayProps> = ({ day, isCurrentDay, isPrevMonth }) => {
  return (
    <div
      style={{
        color: isPrevMonth ? "#f0f0c7" : "yellow",
        borderRadius: "50%",
        padding: "7px",
        textAlign: "center",
        cursor: "pointer",
        background: isCurrentDay ? "#575757" : "",
      }}
    >
      {day}
    </div>
  );
};

export default Day;
