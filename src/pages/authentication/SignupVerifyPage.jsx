// src/pages/SignupVerifyPage.jsx

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignupLayout from "../../components/SignupLayout";
import "./SignupVerifyPage.css";

function SignupVerifyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "이메일 정보 없음";

  const [verifyCode, setVerifyCode] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const CORRECT_CODE = "123456";

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setVerifyCode(newCode);
    if (newCode === CORRECT_CODE) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleConfirm = () => {
    if (isCorrect) {
      console.log(`인증 성공! 코드: ${verifyCode}`);
      alert("인증이 완료되었습니다.");
      navigate("/signup/password", { state: { email: email } });
    } else {
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  return (
    <SignupLayout
      title="회원가입"
      buttonText="다음"
      onButtonClick={handleConfirm}
    >
      <h2 className="main-heading">
        가입을 위해
        <br />
        이메일 인증이 필요해요.
      </h2>
      <div className="input-group">
        <label>이메일</label>
        <div className="email-display-box">{email}</div>
      </div>
      <div className="input-group">
        <label>인증</label>
        {/* 입력창과 재전송 버튼을 한 줄에 배치하는 컨테이너 */}
        <div className="verify-input-row">
          {/* 아이콘을 포함하는 input 컨테이너 */}
          <div className="input-with-icon">
            <input
              type="number"
              placeholder="코드를 입력해주세요."
              value={verifyCode}
              onChange={handleCodeChange}
            />
            {isCorrect && <span className="verify-checkmark">✓</span>}
          </div>
          <button className="resend-button">재전송</button>
        </div>
      </div>
    </SignupLayout>
  );
}

export default SignupVerifyPage;
