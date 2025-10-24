import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";              // ← 추가
import "./LoginPage.css";
import UserContext from "../../components/context/UserContext";


function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);  // ← 추가
  const [user, setUser] = useContext(UserContext);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      // 백엔드 명세: POST /auth/login
      // body 예시: { email, password }
      let { data } = (await api.post("/auth/login", { email, password })).data;

      console.log(data);

      localStorage.setItem("accessToken", data.tokens.access);
      localStorage.setItem("refreshToken", data.tokens.refresh);
      localStorage.setItem("userId", data.id);

      // 응답 형태 가정: { token, user }
      // (토큰 키가 accessToken 등이라면 아래 한 줄만 맞게 바꿔주세요.)

      const user = (await api.get("/users/" + data.id)).data.data;

      setUser(user);

      navigate("/");
    } catch (err) {
      // 에러 메시지 우선순위대로 표시
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "로그인 중 오류가 발생했습니다.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !loading) handleLogin();
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
              onKeyDown={onKeyDown}
              disabled={loading}
              autoComplete="email"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button
            className="login-button"
            onClick={handleLogin}
            disabled={loading}
            aria-busy={loading ? "true" : "false"}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>

          <div className="forgot-links">
            <a href="#">아이디 찾기</a> | <a href="#">비밀번호 찾기</a>
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
