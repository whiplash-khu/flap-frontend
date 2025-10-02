import { useNavigate } from "react-router-dom";
import "./SignupFinalPage.css";

function SignupFinalPage() {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate("/login");
  };

  return (
    <div className="profile-complete-page">
      <div className="profile-complete-container">
        <div className="profile-complete-content">
          <h1>
            모든 준비가
            <br />
            끝났어요!
          </h1>
          <p>
            이제 FLAP에서 <br />
            자유롭게 날아볼까요?
          </p>
        </div>
        <div className="profile-complete-footer">
          <button onClick={handleFinish}>좋아요!</button>
        </div>
      </div>
    </div>
  );
}

export default SignupFinalPage;
