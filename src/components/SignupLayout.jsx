// src/components/SignupLayout.jsx

import { useNavigate } from "react-router-dom";
import "./SignupLayout.css";

// props로 title, children, buttonText, onButtonClick을 받습니다.
function SignupLayout({ title, children, buttonText, onButtonClick }) {
  const navigate = useNavigate();

  return (
    <div className="layout-page">
      <div className="layout-container">
        {/* 헤더: 뒤로가기 버튼과 페이지 제목(title)을 표시 */}
        <div className="layout-header">
          <button className="back-arrow" onClick={() => navigate(-1)}>
            &#x3c;
          </button>
          <h1 className="header-title">{title}</h1>
        </div>

        {/* 컨텐츠: 각 페이지의 고유한 내용(children)이 여기에 표시됩니다. */}
        <div className="layout-content">{children}</div>

        {/* 푸터: 다음 단계로 넘어가는 버튼을 표시 */}
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
