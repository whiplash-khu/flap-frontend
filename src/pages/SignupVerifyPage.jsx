import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignupLayout from "../components/SignupLayout";
import "./SignupVerifyPage.css";

function SignupVerifyPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "이메일 정보 없음";

  const [verifyCode, setVerifyCode] = useState("");

  const handleConfirm = () => {
    if (verifyCode.length !== 6) {
      alert("인증번호 6자리를 정확하게 입력해주세요.");
      return;
    }
    console.log(`입력된 인증번호: ${verifyCode}`);
    alert("인증이 완료되었습니다. (시뮬레이션)");

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

      <div className="input-group">
        <label>이메일</label>
        <div className="email-display-box">{email}</div>
      </div>

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
