import React, { useState } from "react";
import GroupDetailLayout from "../../components/layout/GroupDetailLayout";
import "./GroupFeePage.css";

const mockMembers = [
  { id: "user1", name: "너구리" },
  { id: "user2", name: "피카츄" },
  { id: "user3", name: "이름이" },
];
const mockSchedules = [
  { id: 1, title: "하이디라오 회비", date: "2025/06/24" },
  { id: 2, title: "햄버거 회비", date: "2025/07/01" },
];
const feeData = {
  total: 30000,
  account: "카카오뱅크 3333-01-1234567",
};

function GroupFeePage() {
  const isAdmin = true;

  const [feeStatus, setFeeStatus] = useState({});
  const [scheduleIndex, setScheduleIndex] = useState(0);

  const handlePrevSchedule = () =>
    setScheduleIndex((prev) => Math.max(0, prev - 1));
  const handleNextSchedule = () =>
    setScheduleIndex((prev) => Math.min(mockSchedules.length - 1, prev + 1));
  const currentSchedule = mockSchedules[scheduleIndex];
  const handleStatusChange = (memberId, status) =>
    setFeeStatus((prev) => ({ ...prev, [memberId]: status }));
  const handleCopyAccount = () =>
    navigator.clipboard
      .writeText(feeData.account)
      .then(() => alert("계좌번호가 복사되었습니다."));

  const adminView = (
    <div className="fee-admin-view">
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
      <div className="member-list">
        {mockMembers.map((member) => (
          <div key={member.id} className="member-row">
            <span>{member.name}</span>
            <select
              className="status-select"
              value={feeStatus[member.id] || "미납"}
              onChange={(e) => handleStatusChange(member.id, e.target.value)}
            >
              <option>미납</option>
              <option>완납</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );

  const userView = (
    <div className="fee-container">
      <div className="fee-box total-fee-box">
        <span className="label">회비</span>
        <span className="amount">{feeData.total.toLocaleString()}원</span>
      </div>
      <div className="fee-box account-box">
        <span className="label">정산계좌</span>
        <div className="account-info">
          <span className="account-number">{feeData.account}</span>
          <button onClick={handleCopyAccount}>복사</button>
        </div>
      </div>
    </div>
  );

  return (
    <GroupDetailLayout groupName="스트리트 푸드 파이터">
      {isAdmin ? adminView : userView}
    </GroupDetailLayout>
  );
}

export default GroupFeePage;
