import React, { useState } from "react";
import Day from "./Days";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface CalendarProps {
  year: number;
  month: number;
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getWeekdayNames = () => {
  const weekdayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  return weekdayNames.map((day, index) => (
    <li
      key={index}
      style={{ fontWeight: "bold", color: "yellow", fontSize: "16px" }}
    >
      {day}
    </li>
  ));
};

const Calendar: React.FC<CalendarProps> = ({ year, month }) => {
  const [currentMonth, setCurrentMonth] = useState(month);
  const [currentYear, setCurrentYear] = useState(year);

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    if (currentMonth === 0) {
      setCurrentYear((prevYear) => prevYear - 1);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    if (currentMonth === 11) {
      setCurrentYear((prevYear) => prevYear + 1);
    }
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const today = new Date();

  const getFirstDayOfMonth = () => {
    return new Date(currentYear, currentMonth, 1).getDay();
  };

  const getLastDayOfMonth = () => {
    return new Date(currentYear, currentMonth + 1, 0).getDay();
  };

  const daysToRender = 42; // 6 rows of 7 days

  const renderDays = () => {
    const firstDayOfMonth = getFirstDayOfMonth();
    const lastDayOfMonth = getLastDayOfMonth();
    const days = [];

    let daysFromPrevMonth = 0;

    // Determine the number of days from the previous month based on the starting day
    if (firstDayOfMonth >= 2) {
      daysFromPrevMonth = firstDayOfMonth - 1;
    }

    // Render the days from the previous month
    for (let i = 1; i <= daysFromPrevMonth; i++) {
      days.push(
        <Day
          key={`prev-${i}`}
          day={
            getDaysInMonth(currentYear, currentMonth - 1) -
            daysFromPrevMonth +
            i
          }
          isCurrentDay={false}
          isPrevMonth={true}
        />
      );
    }

    // Render the days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <Day
          key={`current-${i}`}
          day={i}
          isCurrentDay={
            currentYear === today.getFullYear() &&
            currentMonth === today.getMonth() &&
            i === today.getDate()
          }
          isPrevMonth={false}
        />
      );
    }

    // Render the first four days of the next month
    for (let i = 1; i <= Math.min(4, daysToRender - days.length); i++) {
      days.push(
        <Day
          key={`next-${i}`}
          day={i}
          isCurrentDay={false}
          isPrevMonth={true}
        />
      );
    }

    return days;
  };

  return (
    <div
      style={{
        background: "grey",
        padding: "20px",
        borderRadius: "8px",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          padding: "5px 20px",
          background: "#a7a4a4",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "yellow",
          borderRadius: "8px",
          fontSize: "20px",
        }}
      >
        <h2>{`${monthNames[currentMonth]} ${currentYear}`}</h2>

        <div>
          <LeftOutlined
            style={{ cursor: "pointer", marginRight: "15px", fontSize: "22px" }}
            onClick={handlePrevMonth}
          />
          <RightOutlined
            style={{ cursor: "pointer", fontSize: "22px" }}
            onClick={handleNextMonth}
          />
        </div>
      </div>
      <div style={{ marginTop: "30px" }}>
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "10px",
            listStyle: "none",
            padding: "5px",
            textAlign: "center",
            borderBottom: "solid yellow",
            fontSize: "18px",
          }}
        >
          {getWeekdayNames()}
        </ul>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "20px",
          padding: "5px",
          color: "yellow",
          height: "350px",
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
