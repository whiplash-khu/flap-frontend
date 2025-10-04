import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WithdrawCompletePage.css";

function WithdrawCompletePage() {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate("/login");
  };

  return (
    <div className="withdraw-complete-page">
      <div className="withdraw-complete-container">
        <div className="withdraw-complete-content">
          <h1>
            탈퇴 처리가
            <br />
            완료되었어요.
          </h1>
          <p>
            그동안 함께 비행할 수 있어 <br />
            감사했습니다.
          </p>
        </div>
        <div className="profile-complete-footer">
          <button onClick={handleFinish}>확인</button>
        </div>
      </div>
    </div>
  );
}

export default WithdrawCompletePage;
