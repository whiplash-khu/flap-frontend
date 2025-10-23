import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import GroupDetailLayout from "../../components/layout/GroupDetailLayout";
import "./ApplicantsListPage.css";

const mockApplicants = [
  {
    userId: "user1",
    name: "답변자 이름",
    school: "경희대학교",
    studentId: "25학번",
    age: 20,
    gender: "여",
  },
  {
    userId: "user2",
    name: "답변자 이름",
    school: "경희대학교",
    studentId: "24학번",
    age: 22,
    gender: "남",
  },
];

function ApplicantsListPage() {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const handleBackToManagement = () => {
    navigate(`/group/${groupId}/manage`);
  };

  return (
    <GroupDetailLayout
      groupName="스트리트 푸드 파이터"
      onBackClick={handleBackToManagement}
    >
      <div className="applicants-list-container">
        {mockApplicants.map((applicant) => (
          <div key={applicant.userId} className="applicant-card">
            <span className="applicant-name">{applicant.name}</span>
            <p className="applicant-info">{`${applicant.school} | ${applicant.studentId} | ${applicant.age}세 | ${applicant.gender}`}</p>
            <Link
              to={`/group/${groupId}/manage/applicants/${applicant.userId}`}
              className="view-application-button"
            >
              신청서 확인 &gt;
            </Link>
          </div>
        ))}
      </div>
    </GroupDetailLayout>
  );
}

export default ApplicantsListPage;
