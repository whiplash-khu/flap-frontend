import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MyPageLayout from "../../components/layout/MyPageLayout";
import "./ApplicationDetailPage.css";

const mockApplication = {
  applicant: {
    name: "신청자 이름",
    info: "학교 | 학번 | 나이 | 성별",
    contact: "연락처",
    image: "https://via.placeholder.com/80",
  },
  responses: [
    {
      question: "Vivamus bibendum erat risus, non pretium diam dapibus quis?",
      answer:
        "저의 첫 번째 답변입니다. 자유롭게 작성한 내용이 여기에 보입니다.",
    },
    {
      question: "Vivamus bibendum erat risus, non pretium diam dapibus quis?",
      answer: "저의 두 번째 답변입니다.",
    },
    {
      question: "Vivamus bibendum erat risus, non pretium diam dapibus quis?",
      answer: "저의 세 번째 답변입니다.",
    },
  ],
};

function ApplicationDetailPage() {
  const { groupId, userId } = useParams();
  const navigate = useNavigate();

  const handleBackToList = () => {
    navigate(`/group/${groupId}/manage/applicants`);
  };

  return (
    <>
      <MyPageLayout title="" onBackClick={handleBackToList}>
        <div className="application-content-wrapper">
          <header className="applicant-header">
            <div className="applicant-image-placeholder"></div>
            <div className="applicant-info-text">
              <h3>{mockApplication.applicant.name}</h3>
              <p>{mockApplication.applicant.info}</p>
              <p>{mockApplication.applicant.contact}</p>
            </div>
          </header>

          <div className="response-list">
            {mockApplication.responses.map((response, index) => (
              <div key={index} className="question-card">
                <div className="question-number">{index + 1}</div>
                <div className="question-content">
                  <p className="question-text">{response.question}</p>
                  <p className="answer-text">
                    {response.answer || "입력값 없음"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MyPageLayout>

      <footer className="application-footer">
        <button className="action-button approve">수락</button>
        <button className="action-button reject">거절</button>
      </footer>
    </>
  );
}

export default ApplicationDetailPage;
