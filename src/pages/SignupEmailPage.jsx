// src/pages/SignupEmailPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupLayout from "../components/SignupLayout";
import "./SignupEmailPage.css";

function SignupEmailPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleRequestCode = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("올바른 이메일 형식을 입력해주세요.");
      return;
    }
    console.log(`인증번호 요청 이메일: ${email}`);
    alert("인증번호가 발송되었습니다. (시뮬레이션)");

    // navigate 할 때 state 객체에 이메일 정보를 담아 전달합니다.
    navigate("/signup/verify", { state: { email: email } });
  };

  return (
    <SignupLayout
      title="회원가입"
      buttonText="인증번호 요청"
      onButtonClick={handleRequestCode}
    >
      <h2 className="main-heading">
        가입을 위해
        <br />
        이메일 인증이 필요해요.
      </h2>
      <div className="input-group">
        <label>이메일</label>
        <input
          type="email"
          placeholder="예) abc@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </SignupLayout>
  );
}

export default SignupEmailPage;
