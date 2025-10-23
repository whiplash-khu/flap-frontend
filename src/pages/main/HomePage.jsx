import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPaperPlane, FaBell } from "react-icons/fa";
import { LiaBarcodeSolid } from "react-icons/lia";
import "./HomePage.css";

const mockMyGroups = [
  {
    id: 1,
    name: "스트리트 푸드 파이터",
    image: "https://via.placeholder.com/100/ffcc80/000000?Text=Food",
  },
  {
    id: 2,
    name: "슬픈 도시 학생들",
    image: "https://via.placeholder.com/100/b3e5fc/000000?Text=Study",
  },
  {
    id: 3,
    name: "이름뭐하지",
    image: "https://via.placeholder.com/100/c5e1a5/000000?Text=Etc",
  },
  {
    id: 4,
    name: "코딩 스터디",
    image: "https://via.placeholder.com/100/ce93d8/000000?Text=Code",
  },
  {
    id: 5,
    name: "주말 등산 모임",
    image: "https://via.placeholder.com/100/fff59d/000000?Text=Hike",
  },
];
const mockRecruitingGroups = [
  {
    id: 1,
    name: "스트리트 푸드 파이터",
    boardingTime: "2025-01",
    issuedAt: "3일전",
    tags: ["#음식", "#친목", "#취미"],
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "슬픈 도시 학생들",
    boardingTime: "2025-01",
    issuedAt: "3일전",
    tags: ["#음식", "#친목", "#취미"],
    image: "https://via.placeholder.com/100",
  },
];

const userData = { profileImage: "/images/winter.jpeg" };

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="home-page-container">
        <header className="home-header new-design">
          <div className="header-icons">
            <Link to="/chat" className="icon-link">
              <FaPaperPlane />
            </Link>
            <Link to="/notifications" className="icon-link">
              <FaBell />
            </Link>
            <Link to="/mypage" className="icon-link">
              <img
                src={userData.profileImage}
                alt="profile"
                className="header-profile-img"
              />
            </Link>
          </div>
          <div className="greeting">
            <h2>너구리 님,</h2>
            {/* 이름 api? 아니면 로그인 페이지에서 받아오기 */}
            <h2>다음 비행을 확인하세요!</h2>
          </div>
        </header>
        <section className="next-flight-section">
          <div className="next-flight-scroll">
            {mockMyGroups.map((group) => (
              <Link
                to={"/group/${group.id}/board"}
                key={group.id}
                className="flight-item"
              >
                <img
                  src={group.image}
                  alt={group.name}
                  className="flight-item-img"
                />
                <span>{group.name}</span>
              </Link>
            ))}
          </div>
        </section>

        <main className="group-list-section">
          <h3>구인중인 모임</h3>
          {mockRecruitingGroups.map((group) => (
            <Link
              to={`/group/apply/${group.id}`}
              key={group.id}
              className="group-ticket"
            >
              <div className="ticket-header">{group.name}</div>
              <div className="ticket-body">
                <img
                  src={group.image}
                  alt={group.name}
                  className="ticket-image"
                />
                <div className="ticket-info">
                  <div className="ticket-details-row">
                    <div className="ticket-details">
                      <span>Boarding Time</span>
                      <strong>{group.boardingTime}</strong>
                    </div>
                    <div className="ticket-details">
                      <span>Issued At</span>
                      <strong>{group.issuedAt}</strong>
                    </div>
                  </div>
                  <div className="ticket-tags">
                    <span>Tag</span>
                    <strong>{group.tags.join(" ")}</strong>
                  </div>
                </div>
                <div className="ticket-stub">
                  <LiaBarcodeSolid className="barcode-icon" />
                </div>
              </div>
            </Link>
          ))}
        </main>

        <div className="add-group-container">
          <button
            className="add-group-button"
            onClick={() => setIsModalOpen(true)}
          >
            +
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fab-modal-backdrop"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="fab-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <Link to="/creategroup/create" className="modal-button">
              모임 생성하기
            </Link>
            <Link to="/group/search" className="modal-button">
              모임 검색하기
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
