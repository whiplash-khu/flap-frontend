import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import GroupDetailLayout from "../../components/layout/GroupDetailLayout";
import "./ApplicantsListPage.css";

//예시 데이터
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
  {
    userId: "user3",
    name: "답변자 이름",
    school: "경희대학교",
    studentId: "23학번",
    age: 21,
    gender: "여",
  },
  {
    userId: "user4",
    name: "답변자 이름",
    school: "경희대학교",
    studentId: "22학번",
    age: 23,
    gender: "남",
  },
  {
    userId: "user5",
    name: "답변자 이름",
    school: "경희대학교",
    studentId: "21학번",
    age: 24,
    gender: "여",
  },
  {
    userId: "user6",
    name: "답변자 이름",
    school: "경희대학교",
    studentId: "20학번",
    age: 25,
    gender: "남",
  },
];

function ApplicantsListPage() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(2);
  const loaderRef = useRef(null);

  const handleBackToManagement = () => {
    navigate(`/group/${groupId}/manage`);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) =>
            prev < mockApplicants.length ? prev + 2 : prev
          );
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, []);

  return (
    <GroupDetailLayout
      groupName="스트리트 푸드 파이터"
      onBackClick={handleBackToManagement}
    >
      <div className="applicants-list-container">
        {mockApplicants.slice(0, visibleCount).map((applicant) => (
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
        {visibleCount < mockApplicants.length && (
          <div ref={loaderRef} style={{ height: "40px" }} />
        )}
      </div>
    </GroupDetailLayout>
  );
}

export default ApplicantsListPage;
