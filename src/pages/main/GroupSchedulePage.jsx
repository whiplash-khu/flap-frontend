import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import GroupDetailLayout from "../../components/layout/GroupDetailLayout";
import CalendarCard from "../../components/common/Molecules/CalendarCard";
import "./GroupSchedulePage.css";

const mockSchedules = [
  {
    id: 1,
    title: "햄버거 최대 몇 개? 챌린지",
    location: "롯데리아 건대입구점",
    time: "18:00-20:00",
  },
  { id: 2, title: "다음엔 뭐 먹지?", location: "미정", time: "미정" },
];

function GroupSchedulePage() {
  const { groupId } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const isAdmin = true;

  return (
    <GroupDetailLayout groupName="스트리트 푸드 파이터">
      <div className="schedule-page-container">
        <div className="calendar-wrapper">
          <CalendarCard
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </div>

        <div className="upcoming-schedules">
          <h4>다음 일정</h4>
          {mockSchedules.map((schedule) => (
            <div key={schedule.id} className="schedule-item">
              <p className="schedule-title">{schedule.title}</p>
              <div className="schedule-details">
                <span>📍 {schedule.location}</span>
                <span>⏰ {schedule.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isAdmin && (
        <footer className="schedule-footer">
          <Link
            to={`/group/${groupId}/schedule/new`}
            className="register-schedule-button"
          >
            일정 등록
          </Link>
        </footer>
      )}
    </GroupDetailLayout>
  );
}

export default GroupSchedulePage;
