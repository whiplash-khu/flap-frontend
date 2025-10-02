// src/pages/SignupVerifyPage.jsx

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation 추가
import SignupLayout from "../components/SignupLayout";
import "./SignupVerifyPage.css";

function SignupVerifyPage() {
  const navigate = useNavigate();
  const location = useLocation(); // location 객체를 통해 state 데이터에 접근

  // 이전 페이지에서 전달받은 이메일. state가 없을 경우를 대비해 기본값 설정
  const email = location.state?.email || "이메일 정보 없음";

  const [verifyCode, setVerifyCode] = useState("");

  const handleConfirm = () => {
    if (verifyCode.length !== 6) {
      alert("인증번호 6자리를 정확하게 입력해주세요.");
      return;
    }
    console.log(`입력된 인증번호: ${verifyCode}`);
    alert("인증이 완료되었습니다. (시뮬레이션)");
    // 다음 단계인 비밀번호 설정 페이지로 이동하면서 email 정보 전달
    navigate("/signup/password", { state: { email: email } });
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

      {/* 고정된 이메일 표시 박스 */}
      <div className="input-group">
        <label>이메일</label>
        <div className="email-display-box">{email}</div>
      </div>

      {/* 인증번호 입력 필드 */}
      <div className="input-group">
        <label>인증</label>
        <div className="verify-input-row">
          <input
            type="number"
            placeholder="코드를 입력해주세요."
            value={verifyCode}
            onChange={(e) => setVerifyCode(e.target.value)}
          />
          <button className="resend-button">재전송</button>
        </div>
        <p className="helper-text">다시 시도해주세요.</p>
      </div>
    </SignupLayout>
  );
}

export default SignupVerifyPage;
