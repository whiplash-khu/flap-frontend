import React, { useState } from "react";
import "./CalendarCard.css";
import YearMonthPicker from "./YearMonthPicker";

export default function CalendarCard({ selectedDate, onDateChange }) {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  const handleTogglePicker = () => setIsPickerOpen(!isPickerOpen);
  const handleYearChange = (year) =>
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
  const handleMonthChange = (monthIndex) => {
    setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
    setIsPickerOpen(false);
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const dates = [];
  for (let i = firstDayOfMonth.getDay(); i > 0; i--) {
    dates.push({ day: new Date(year, month, 1 - i), isCurrentMonth: false });
  }
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    dates.push({ day: new Date(year, month, i), isCurrentMonth: true });
  }
  const gridsize = 42;
  const remainingSlots = gridsize - dates.length;
  for (let i = 1; i <= remainingSlots; i++) {
    dates.push({ day: new Date(year, month + 1, i), isCurrentMonth: false });
  }

  const handleDateClick = (dateObj) => {
    if (dateObj.isCurrentMonth) {
      onDateChange(dateObj.day);
    }
  };
  const isSelected = (date) =>
    selectedDate && date.toDateString() === selectedDate.toDateString();

  return (
    <>
      <div className="calendar-card">
        <div className="calendar-header">
          <button className="month-picker-button" onClick={handleTogglePicker}>
            {year}년 {month + 1}월 {isPickerOpen ? "▲" : "▾"}
          </button>
        </div>
        <div className="days-of-week">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="calendar-grid">
          {dates.map((dateObj, index) => (
            <div
              key={index}
              className={`calendar-day ${
                !dateObj.isCurrentMonth ? "other-month" : ""
              } ${dateObj.day.getDay() === 0 ? "sunday" : ""} ${
                isSelected(dateObj.day) ? "selected" : ""
              }`}
              onClick={() => handleDateClick(dateObj)}
            >
              {dateObj.day.getDate()}
            </div>
          ))}
        </div>
      </div>

      <YearMonthPicker
        isOpen={isPickerOpen}
        onClose={handleTogglePicker}
        currentDate={currentDate}
        onYearChange={handleYearChange}
        onMonthChange={handleMonthChange}
      />
    </>
  );
}
