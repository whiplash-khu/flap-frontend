import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignupLayout from "../../components/layout/SignupLayout";
import "./SignupPasswordPage.css";

function SignupPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    if (password.length > 16) {
      setError("비밀번호는 16자 이하이어야 합니다.");
      return;
    }
    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setError("");
    console.log("최종 이메일:", email);
    console.log("최종 비밀번호:", password);
    alert("비밀번호 설정이 완료되었습니다.");

    navigate("/signup/user-info", {
      state: { email: email, password: password },
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
