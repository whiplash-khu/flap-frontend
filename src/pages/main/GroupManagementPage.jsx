import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import GroupDetailLayout from "../../components/layout/GroupDetailLayout";
import "./GroupManagementPage.css";

function GroupManagementPage() {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const handleViewApplicants = () => {
    navigate(`/group/${groupId}/manage/applicants`);
  };
  return (
    <GroupDetailLayout groupName="스트리트 푸드 파이터">
      <div className="management-container">
        <Link
          to={`/group/${groupId}/manage/settings`}
          className="management-link-card"
        >
          <span>모임 관리</span>
          <span>▶</span>
        </Link>

        <div className="application-card">
          <h2>가입 신청 현황</h2>
          <div className="status-display">
            <div className="status-count">
              <strong>2명</strong>
              <span>신청했어요!</span>
            </div>
            <button
              className="view-applicants-button"
              onClick={handleViewApplicants}
            >
              신청자 확인 &gt;
            </button>
          </div>
        </div>

        <button className="disband-button">모임 해산하기</button>
      </div>
    </GroupDetailLayout>
  );
}

export default GroupManagementPage;
