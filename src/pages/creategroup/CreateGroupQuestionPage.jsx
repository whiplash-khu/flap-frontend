import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignupLayout from "../../components/SignupLayout";
import "./CreateGroupQuestionPage.css";

function CreateGroupQuestionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const existingData = location.state;

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleAddQuestion = () => {
    if (currentQuestion.trim() !== "") {
      setQuestions([...questions, currentQuestion.trim()]);
      setCurrentQuestion("");
    }
  };

  const handleRemoveQuestion = (indexToRemove) => {
    setQuestions(questions.filter((_, index) => index !== indexToRemove));
  };

  const handleEditStart = (index, text) => {
    setEditingIndex(index);
    setEditText(text);
  };

  const handleEditSave = (index) => {
    if (editText.trim() === "") {
      alert("질문 내용은 비워둘 수 없습니다.");
      return;
    }
    const updatedQuestions = [...questions];
    updatedQuestions[index] = editText.trim();
    setQuestions(updatedQuestions);
    setEditingIndex(null);
    setEditText("");
  };

  const handleEditKeyDown = (e, index) => {
    if (e.key === "Enter") {
      handleEditSave(index);
    }
  };

  const handleDone = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmCreation = () => {
    const finalData = { ...existingData, questions };
    console.log("--- 최종 모임 생성 데이터 ---", finalData);
    setIsConfirmModalOpen(false);
    navigate("/group/create-complete", { state: finalData });
  };

  return (
    <>
      <SignupLayout
        title="모임 생성"
        buttonText="완료"
        onButtonClick={handleDone}
      >
        <h2 className="main-heading">
          가입 질문을
          <br />
          만들어주세요.
        </h2>

        <div className="info-box">
          모임 생성 후에는 가입 질문을 수정하거나 삭제할 수 없으니, 신중하게
          만들어주세요!
        </div>

        <div className="input-group">
          <label>질문</label>
          <div className="question-input-row">
            <input
              type="text"
              placeholder="질문을 입력하세요."
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
            />
            <button onClick={handleAddQuestion} className="add-button">
              ✓
            </button>
          </div>
        </div>

        <div className="question-list">
          {questions.map((question, index) => (
            <div key={index} className="question-item">
              {editingIndex === index ? (
                <div className="edit-mode">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => handleEditKeyDown(e, index)}
                    className="edit-input"
                    autoFocus
                  />
                  <button
                    onClick={() => handleEditSave(index)}
                    className="icon-button"
                  >
                    ✓
                  </button>
                </div>
              ) : (
                <>
                  <span>
                    {index + 1}. {question}
                  </span>
                  <div className="icon-buttons">
                    <button
                      onClick={() => handleEditStart(index, question)}
                      className="icon-button"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleRemoveQuestion(index)}
                      className="icon-button"
                    >
                      ×
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </SignupLayout>

      {isConfirmModalOpen && (
        <div className="confirm-modal-backdrop">
          <div className="confirm-modal-content">
            <h3>정말 이대로 생성하시겠어요?</h3>
            <p>
              모임이 만들어진 후에는 가입 질문을 다시 수정할 수 없습니다. 내용을
              다시 한번 확인해주세요.
            </p>
            <div className="confirm-modal-actions">
              <button
                className="confirm-button"
                onClick={handleConfirmCreation}
              >
                네, 생성합니다.
              </button>
              <button
                className="cancel-button"
                onClick={() => setIsConfirmModalOpen(false)}
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

export default CreateGroupQuestionPage;
