// src/pages/SignupCompletePage.jsx

import { useNavigate, useLocation } from "react-router-dom";
import "./SignupCompletePage.css";

function SignupCompletePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const signupData = location.state; // 이전 단계까지의 모든 데이터를 전달받음

  const handleContinue = () => {
    // 프로필 설정 페이지로 이동하면서 모든 데이터를 계속 전달
    navigate("/profile-setup", { state: signupData });
  };

  return (
    <div className="complete-page">
      <div className="complete-container">
        <div className="complete-content">
          <h1>
            회원가입을
            <br />
            완료했어요!
          </h1>
          <p>
            나를 소개할 <br />
            프로필을 만들어볼까요?
          </p>
        </div>
        <div className="complete-footer">
          <button onClick={handleContinue}>계속</button>
        </div>
      </div>
    </div>
  );
}

export default SignupCompletePage;
