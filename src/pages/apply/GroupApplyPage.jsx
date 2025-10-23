import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./GroupApplyPage.css";

function GroupApplyPage() {
  const { groupId } = useParams();
  const navigate = useNavigate();

  // TODO: groupId로 API를 호출하여 모임 데이터를 가져오기.
  const mockGroupData = {
    name: "슬픈 도시 학생들",
    schedule: "매주 화요일 | 오후 6시",
    description:
      "술을 사랑하는 대학생들의 모임\n술좋아하는 사람이라면 모두 환영!!!",
  };

  return (
    <div className="apply-page-container">
      <header className="apply-page-header">
        <div className="header-top-row">
          <button className="back-arrow" onClick={() => navigate(-1)}>
            &#x3c;
          </button>
        </div>
        <div className="apply-page-title">
          <h2>{mockGroupData.name}</h2>
          <p>{mockGroupData.schedule}</p>
        </div>
      </header>

      <main className="apply-page-content">
        <div className="apply-description-card">
          <p>
            {mockGroupData.description.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
      </main>

      <footer className="apply-page-footer">
        <Link to={`/group/apply/${groupId}/form`} className="apply-button">
          가입 신청하기
        </Link>
        <Link to="/chat/host-contact" className="contact-button">
          방장에게 문의하기
        </Link>
      </footer>
    </div>
  );
}

export default GroupApplyPage;
