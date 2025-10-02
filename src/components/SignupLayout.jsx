import { useNavigate } from "react-router-dom";
import "./SignupLayout.css";

function SignupLayout({ title, children, buttonText, onButtonClick }) {
  const navigate = useNavigate();

  return (
    <div className="layout-page">
      <div className="layout-container">
        <div className="layout-header">
          <button className="back-arrow" onClick={() => navigate(-1)}>
            &#x3c;
          </button>
          <h1 className="header-title">{title}</h1>
        </div>

        {/* 여기다가 페이지 내용 작성 */}
        <div className="layout-content">{children}</div>

        <div className="layout-footer">
          <button className="action-button" onClick={onButtonClick}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupLayout;
