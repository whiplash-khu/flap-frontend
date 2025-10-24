import { useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import SignupLayout from "../../components/layout/SignupLayout";
import "./SignupPasswordPage.css";

function SignupPasswordPage() {
  const navigate = useNavigate();
  // const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');   // ← 인증 토큰 (중요)

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (password.length < 8) return setError("비밀번호는 8자 이상이어야 합니다.");
    if (password.length > 16) return setError("비밀번호는 16자 이하이어야 합니다.");
    if (password !== passwordConfirm) return setError("비밀번호가 일치하지 않습니다.");
    if (!token) return setError("이메일 인증 토큰이 없습니다. 처음부터 다시 진행해주세요.");

    setError("");
    navigate("/signup/user-info", {
      state: { token, password }, // ← 다음 화면으로 전달
    });
  };
  
  return (
    <SignupLayout title="회원가입" buttonText="다음" onButtonClick={handleNext}>
      <h2 className="main-heading">
        로그인에 사용할
        <br />
        비밀번호를 설정해주세요.
      </h2>
      <div className="input-group">
        <label>비밀번호</label>
        <input
          type="password"
          placeholder="8~16 글자 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>비밀번호 확인</label>
        <input
          type="password"
          placeholder="비밀번호 재입력"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
    </SignupLayout>
  );
}

export default SignupPasswordPage;
