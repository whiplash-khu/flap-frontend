import { useNavigate, useLocation } from "react-router-dom";
import "./SignupCompletePage.css";

function SignupCompletePage() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/");
  };

  return (
    <div className="complete-page">
      <div className="complete-container">
        <div className="complete-content">
          <h1>
            회원가입을
            <br />
            완료했어요!
          </h1>
          <p>
            이제 FLAP에서 <br />
            자유롭게 날아볼까요?
          </p>
        </div>
        <div className="complete-footer">
          <button onClick={handleContinue}>계속</button>
        </div>
      </div>
    </div>
  );
}

export default SignupCompletePage;
