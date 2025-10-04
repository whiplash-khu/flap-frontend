import { Link } from "react-router-dom";
import MyPageLayout from "../../components/MyPageLayout";
import "./MyPage.css";

function MyPage() {
  // TODO: 실제 사용자 데이터 여기 들어감
  const userData = {
    nickname: "너구리",
    email: "name@email.com",
    school: "경희대학교 25학번",
    profileImage: "/images/winter.jpeg",
  };

  return (
    <MyPageLayout title="마이 페이지">
      <div className="profile-card">
        <img
          src={userData.profileImage}
          alt="profile"
          className="profile-image"
        />
        <div className="profile-info">
          <p className="nickname">{userData.nickname}</p>
          <p className="email">{userData.email}</p>
          <p className="school">{userData.school}</p>
        </div>
      </div>

      <div className="menu-list">
        <Link to="/mypage/edit-profile" className="menu-item">
          프로필 편집
        </Link>
        <Link to="/mypage/security" className="menu-item">
          개인정보 및 보안
        </Link>
        <Link to="/mypage/notifications" className="menu-item">
          알림
        </Link>
        <Link to="/mypage/notices" className="menu-item">
          공지사항
        </Link>
        <Link to="/mypage/support" className="menu-item">
          고객센터 / 운영정책
        </Link>
      </div>
    </MyPageLayout>
  );
}

export default MyPage;
