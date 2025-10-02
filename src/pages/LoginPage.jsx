import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    console.log("로그인 시도:", { email, password });
    alert(`${email}님, 환영합니다!`);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="hero-section">
          <h1>
            모임의 시작,
            <br />
            FLAP과 함께
          </h1>
        </div>

        <div className="form-section">
          <div className="input-group">
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login-button" onClick={handleLogin}>
            로그인
          </button>
          <div className="forgot-links">
            <a href="#">아이디 찾기</a> | <a href="#">비밀번호 찾기</a>
            {/* 일단 지금은 아이디, 비번 찾기 기능 안넣어놓음 */}
          </div>
        </div>

        <div className="signup-footer">
          <p>
            아직 계정이 없다면? <Link to="/signup">회원가입</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
