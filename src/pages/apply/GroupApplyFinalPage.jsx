import { useNavigate } from "react-router-dom";
import "./GroupApplyFinalPage.css";

function SignupFinalPage() {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate("/homepage");
  };

  return (
    <div className="apply-complete-page">
      <div className="apply-complete-container">
        <div className="apply-complete-content">
          <h1>
            가입 신청을
            <br />
            완료했어요!
          </h1>
          <p>
            신청이 수락되기까지 <br />
            기다려주세요.
          </p>
        </div>
        <div className="apply-complete-footer">
          <button onClick={handleFinish}>좋아요!</button>
        </div>
      </div>
    </div>
  );
}

export default SignupFinalPage;
