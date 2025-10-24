import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaPaperPlane, FaBell } from "react-icons/fa";
import { LiaBarcodeSolid } from "react-icons/lia";
import "./HomePage.css";
//예시 데이터
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

const generateMockRecruitingGroups = (page, limit) => {
  const groups = [];
  const startId = (page - 1) * limit + 100;
  for (let i = 0; i < limit; i++) {
    const id = startId + i;
    groups.push({
      id: id,
      name: `구인중인 모임 ${id}`,
      boardingTime: `2025-${String((id % 12) + 1).padStart(2, "0")}`,
      issuedAt: `${(id % 7) + 1}일전`,
      tags: [`#태그${id % 3}`, `#친목`, `#스터디`],
      image: `https://via.placeholder.com/100/${Math.floor(
        Math.random() * 16777215
      ).toString(16)}/000?Text=G${id}`,
    });
  }
  return groups;
};

const PAGE_LIMIT = 5;
const userData = { profileImage: "/images/winter.jpeg" };

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recruitingGroups, setRecruitingGroups] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();
  const loadMoreRef = useRef(null);

  const loadMoreGroups = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const newGroups = generateMockRecruitingGroups(nextPage, PAGE_LIMIT);
      if (newGroups.length === 0) {
        setHasMore(false);
      } else {
        setRecruitingGroups((prevGroups) => [...prevGroups, ...newGroups]);
        setPage(nextPage);
      }
      if (nextPage >= 5) {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 1000);
  }, [page, isLoading, hasMore]);

  useEffect(() => {
    if (page === 0) {
      loadMoreGroups();
    }
  }, [loadMoreGroups, page]);

  useEffect(() => {
    const options = { root: null, rootMargin: "20px", threshold: 1.0 };
    observerRef.current = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading && hasMore) {
        loadMoreGroups();
      }
    }, options);

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observerRef.current.observe(currentRef);
    }

    return () => {
      if (observerRef.current && currentRef) {
        observerRef.current.unobserve(currentRef);
      }
    };
  }, [loadMoreGroups, isLoading, hasMore]);

  return (
    <>
      <div className="home-page-container">
        <header className="home-header new-design">
          <div className="header-icons">
            <Link to="/chat" className="icon-link">
              <FaPaperPlane />
            </Link>
            <Link to="/notifications" className="bell-icon-link">
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
            <h2>다음 비행을 확인하세요!</h2>
          </div>
        </header>

        <section className="next-flight-section">
          <div className="next-flight-scroll">
            {mockMyGroups.map((group) => (
              <Link
                to={`/group/${group.id}/board`}
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
          {recruitingGroups.map((group) => (
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
          {isLoading && (
            <div>
              <p style={{ textAlign: "center", color: "#888" }}>
                더 많은 모임 로딩 중...
              </p>
            </div>
          )}
          {hasMore && (
            <div
              ref={loadMoreRef}
              style={{ height: "50px" }}
              aria-hidden="true"
            />
          )}
          {!hasMore && recruitingGroups.length > 0 && (
            <div>
              <p style={{ textAlign: "center", color: "#aaa" }}>
                모든 모임을 불러왔습니다.
              </p>
            </div>
          )}
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
            <Link to="/main/search" className="modal-button">
              모임 검색하기
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
