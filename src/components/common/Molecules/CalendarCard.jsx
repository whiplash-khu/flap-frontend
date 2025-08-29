import React from "react";
import "./CalendarCard.css";
export default function CalendarCard() {
  
  const days = Array.from({length:35}).map((_,i)=>i+1);
  return (
    <div className="calendar-card">
      <div className="calendar-header">2025년 7월</div>
      <div className="calendar-grid">
        {days.map((d,i)=> <div key={i} className={`calendar-day ${d===22?"selected":""}`}>{d}</div>)}
      </div>
    </div>
  );
}
