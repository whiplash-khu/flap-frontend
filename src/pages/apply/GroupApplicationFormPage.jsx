import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyPageLayout from "../../components/layout/MyPageLayout";
import "./GroupApplicationFormPage.css";

// 임시 질문 데이터
const mockQuestions = [
  "첫 번째 질문입니다. Vivamus bibendum erat risus, non pretium diam dapibus quis?",
  "두 번째 질문입니다. Vivamus bibendum erat risus, non pretium diam dapibus quis?",
  "세 번째 질문입니다. Vivamus bibendum erat risus, non pretium diam dapibus quis?",
];

function GroupApplicationFormPage() {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const [answers, setAnswers] = useState(Array(mockQuestions.length).fill(""));
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleConfirmLeave = () => navigate("/homepage");
  const handleConfirmSubmit = () => {
    console.log({ groupId, answers });
    alert("신청서가 제출되었습니다.");
    navigate("/group/apply/final");
  };

  return (
    <>
      <MyPageLayout
        title="모임 가입 신청"
        onBackClick={() => setIsLeaveModalOpen(true)}
      >
        <div className="apply-content-wrapper">
          <div className="question-form-container">
            {mockQuestions.map((question, index) => (
              <div key={index} className="question-card">
                <div className="question-number">{index + 1}</div>
                <div className="question-content">
                  <p className="question-text">{question}</p>
                  <textarea
                    placeholder="자유롭게 입력해주세요."
                    value={answers[index]}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <footer className="apply-footer">
            <button
              className="apply-button"
              onClick={() => setIsSubmitModalOpen(true)}
            >
              가입 신청 완료
            </button>
          </footer>
        </div>
      </MyPageLayout>

      {isLeaveModalOpen && (
        <div className="application-modal-backdrop">
          <div className="application-modal-content">
            <h3>페이지를 벗어나시겠습니까?</h3>
            <p>작성 중이던 신청서는 저장되지 않아요!</p>
            <div className="application-modal-actions">
              <button
                className="action-button primary"
                onClick={handleConfirmLeave}
              >
                나가기
              </button>
              <button
                className="action-button secondary"
                onClick={() => setIsLeaveModalOpen(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {isSubmitModalOpen && (
        <div className="application-modal-backdrop">
          <div className="application-modal-content">
            <h3>신청서를 제출하시겠습니까?</h3>
            <p>한 번 제출한 신청서는 수정할 수 없어요!</p>
            <div className="application-modal-actions">
              <button
                className="action-button primary"
                onClick={handleConfirmSubmit}
              >
                제출
              </button>
              <button
                className="action-button secondary"
                onClick={() => setIsSubmitModalOpen(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GroupApplicationFormPage;
