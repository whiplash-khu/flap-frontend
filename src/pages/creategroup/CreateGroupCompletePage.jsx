import { useNavigate } from "react-router-dom";
import "./CreateGroupCompletePage.css";

function CreateGroupCompletePage() {
  const navigate = useNavigate();

  const handleDone = () => {
    navigate("/");
  };

  return (
    <div className="group-complete-page">
      <div className="group-complete-container">
        <div className="group-complete-content">
          <h1>
            모든 준비가
            <br />
            끝났어요!
          </h1>
          <p>
            크루원이 모일 때까지 <br /> 기다려 보아요.
          </p>
        </div>
        <div className="group-complete-footer">
          <button onClick={handleDone}>좋아요!</button>
        </div>
      </div>
    </div>
  );
}

export default CreateGroupCompletePage;
