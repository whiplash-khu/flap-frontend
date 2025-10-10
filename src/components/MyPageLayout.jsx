import { useNavigate } from "react-router-dom";
import "./MyPageLayout.css";

function MyPageLayout({ title, children }) {
  const navigate = useNavigate();

  return (
    <div className="mypage-layout-page">
      <div className="mypage-layout-container">
        <div className="mypage-layout-header">
          <button className="back-arrow" onClick={() => navigate(-1)}>
            &#x3c;
          </button>
          <h1 className="header-title">{title}</h1>
        </div>
        <div className="mypage-layout-content">{children}</div>
      </div>
    </div>
  );
}

export default MyPageLayout;
