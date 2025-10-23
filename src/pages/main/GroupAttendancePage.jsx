import React, { useState } from "react";
import GroupDetailLayout from "../../components/layout/GroupDetailLayout";
import "./GroupAttendancePage.css";

// 임시 구성원 목록 데이터
const mockMembers = [
  { id: "user1", name: "너구리" },
  { id: "user2", name: "피카츄" },
  { id: "user3", name: "이름이" },
];

const mockSchedules = [
  { id: 1, title: "하이디라오에 가요", date: "2025/06/24" },
  { id: 2, title: "하이디라오에 가요", date: "2025/07/01" },
  { id: 3, title: "하이디라오에 가요", date: "2025/07/08" },
];

function GroupAttendancePage() {
  const isAdmin = true;

  const [attendance, setAttendance] = useState({});
  const [scheduleIndex, setScheduleIndex] = useState(0);
  const handlePrevSchedule = () => {
    setScheduleIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNextSchedule = () => {
    setScheduleIndex((prevIndex) =>
      Math.min(mockSchedules.length - 1, prevIndex + 1)
    );
  };

  const currentSchedule = mockSchedules[scheduleIndex];

  const attendanceData = {
    present: 8,
    absent: 2,
  };

  const total = attendanceData.present + attendanceData.absent;
  const attendanceRate =
    total > 0 ? Math.round((attendanceData.present / total) * 100) : 0;

  const handleStatusChange = (memberId, status) => {
    setAttendance((prev) => ({ ...prev, [memberId]: status }));
  };

  const adminView = (
    <div className="admin-attendance-view">
      <div className="date-nav-header">
        <button onClick={handlePrevSchedule} disabled={scheduleIndex === 0}>
          &lt;
        </button>
        <div className="date-display">
          <h4>{currentSchedule.title}</h4>
          <span>{currentSchedule.date}</span>
        </div>
        <button
          onClick={handleNextSchedule}
          disabled={scheduleIndex === mockSchedules.length - 1}
        >
          &gt;
        </button>
      </div>

      <div className="member-attendance-list">
        {mockMembers.map((member) => (
          <div key={member.id} className="member-row">
            <span>{member.name}</span>
            <select
              className="status-select"
              value={attendance[member.id] || ""}
              onChange={(e) =>
                setAttendance((prev) => ({
                  ...prev,
                  [member.id]: e.target.value,
                }))
              }
            >
              <option value="" disabled>
                선택
              </option>
              <option>출석</option>
              <option>결석</option>
              <option>지각</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );

  const userView = (
    <div className="attendance-container">
      <h4>출석현황</h4>
      <div className="chart-container">
        <div className="pie-chart" style={{ "--p": attendanceRate }}>
          {attendanceRate}%<span>출석했어요!</span>
        </div>
      </div>
      <div className="attendance-summary">
        <div className="summary-item present">
          <span className="label">출석</span>
          <span className="count">{attendanceData.present}</span>
        </div>
        <div className="summary-item absent">
          <span className="label">결석</span>
          <span className="count">{attendanceData.absent}</span>
        </div>
      </div>
      <button className="details-link">자세히 보기 &gt;</button>
    </div>
  );

  return (
    <GroupDetailLayout groupName="스트리트 푸드 파이터">
      {isAdmin ? adminView : userView}
    </GroupDetailLayout>
  );
}

export default GroupAttendancePage;
