import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "./GroupDetailLayout.css";

const mockMembers = [
  {
    id: "leader",
    name: "모임장",
    image: "https://placehold.co/50/e0e0e0/808080?Text=L",
  },
  { id: "user1", name: "너구리", image: "/images/winter.jpeg" },
  {
    id: "user2",
    name: "피카츄",
    image: "https://placehold.co/50/ffca28/d32f2f?Text=P",
  },
];
function GroupDetailLayout({
  groupName,
  groupSchedule,
  children,
  onBackClick,
}) {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [isMemberListOpen, setIsMemberListOpen] = useState(false);

  const isAdmin = true;

  return (
    <>
      <div className="group-detail-page">
        <div className="group-detail-container">
          <header className="group-detail-header">
            <div className="header-top-row">
              <button
                className="back-arrow"
                onClick={
                  onBackClick ? onBackClick : () => navigate("/")
                }
              >
                &#x3c;
              </button>
              <div className="header-right-icons">
                <button
                  className="user-icon-button"
                  onClick={() => setIsMemberListOpen(true)}
                >
                  <FaUser />
                </button>
              </div>
            </div>
            <div className="header-title-group">
              <h2>{groupName || "스트리트 푸드 파이터"}</h2>
              <p>{groupSchedule || "매주 화요일 | 오후 6시"}</p>
            </div>
          </header>

          <main className="group-detail-content">
            <nav className="group-detail-tabs">
              <NavLink to={`/group/${groupId}/board`} className="tab-link">
                게시판
              </NavLink>
              <NavLink to={`/group/${groupId}/schedule`} className="tab-link">
                일정
              </NavLink>
              <NavLink to={`/group/${groupId}/attendance`} className="tab-link">
                출석
              </NavLink>
              <NavLink to={`/group/${groupId}/fee`} className="tab-link">
                회비
              </NavLink>
              {isAdmin && (
                <NavLink to={`/group/${groupId}/manage`} className="tab-link">
                  관리
                </NavLink>
              )}
            </nav>
            <div className="tab-content-wrapper">{children}</div>
          </main>
        </div>
      </div>

      {isMemberListOpen && (
        <div
          className="member-list-backdrop"
          onClick={() => setIsMemberListOpen(false)}
        >
          <div
            className="member-list-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="modal-title">구성원 보기</h3>
            <img
              src="https://placehold.co/100/ffcc80/000000?Text=Group"
              alt="Group"
              className="modal-group-image"
            />
            <div className="member-list">
              {mockMembers.map((member) => (
                <div key={member.id} className="member-item">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="member-image"
                  />
                  <span className="member-name">{member.name}</span>
                </div>
              ))}
            </div>
            <button className="leave-group-button">모임 나가기</button>
          </div>
        </div>
      )}
    </>
  );
}

export default GroupDetailLayout;
