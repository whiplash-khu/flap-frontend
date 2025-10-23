import { Link, useNavigate } from "react-router-dom";
import MyPageLayout from "../../components/layout/MyPageLayout";
import "./SecurityPage.css";

function SecurityPage() {
  const navigate = useNavigate();

  // 임시 사용자 데이터
  const userData = {
    name: "홍길동",
    email: "name@email.com",
    birthdate: "YYYY.MM.DD",
  };

  const handleLogout = () => {
    //나중에 로그아웃 백엔드
    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  return (
    <MyPageLayout title="개인정보 및 보안">
      <div className="security-container">
        <div className="info-section">
          <div className="info-row">
            <span className="info-label">이름</span>
            <span className="info-value">{userData.name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">이메일</span>
            <span className="info-value">{userData.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">생년월일</span>
            <span className="info-value">{userData.birthdate}</span>
            <Link to="/mypage/change-birthdate" className="change-button">
              변경
            </Link>
          </div>
          <div className="info-row">
            <Link to="/mypage/change-password" className="link-style">
              비밀번호 변경
            </Link>
          </div>
        </div>

        <div className="action-section">
          <button className="action-link" onClick={handleLogout}>
            로그아웃
          </button>
          <Link to="/mypage/withdraw" className="action-link danger">
            계정 탈퇴하기
          </Link>
        </div>
      </div>
    </MyPageLayout>
  );
}

export default SecurityPage;
