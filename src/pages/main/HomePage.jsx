// src/pages/main/HomePage.jsx
import React, { useContext, useEffect, useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { FaPaperPlane, FaBell } from "react-icons/fa";
import { LiaBarcodeSolid } from "react-icons/lia";
import { api } from "@/lib/api";
import "./HomePage.css";
import UserContext from "../../components/context/UserContext";
import InfiniteScroll from "@/components/common/Organisms/InfiniteScroll";


const userData = { profileImage: "/images/winter.jpeg", nickname: "너구리" };

function HomePage() {
  //const ref = useRef();

  const [user] = useContext(UserContext);
  //const [myGroups, setMyGroups] = useState([]);
  //const [groups, setGroups] = useState([]);
  //const [index, setIndex] = useState();

  //const [loading, setLoading] = useState(false);
  //const [errMsg, setErrMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  //useEffect(() => {
  //  let aborted = false;
  //  (async () => {
  //    try {
  //      setLoading(true);
  //      setErrMsg("");
  //      let query = '';

  //      if(groups['length'] !== 0) {
  //        query = '?index=' + groups[groups['length']-1].id;
  //      }

  //      console.log(groups);

  //      const { data } = await api.get('/groups' + query);

  //      console.log(groups);
  //      // 응답 예: { status:"success", data: [ { id, name, tags:[], isRecruiting, startAt, ... }, ... ] }
  //      if (!aborted) setGroups(Array.isArray(data?.data) ? data.data : []);
  //    } catch (e) {
  //      if (aborted) return;
  //      console.error("[HomePage] fetchGroups error:", e?.response?.data || e);
  //      setErrMsg(
  //        e?.response?.data?.message || "그룹 목록을 불러오지 못했습니다."
  //      );
  //    } finally {
  //      if (!aborted) setLoading(false);
  //    }
  //  })();
  //  return () => {
  //    aborted = true;
  //  };
  //}, [user]);

  // 서버 데이터에서 “내가 참여한 모임” / “구인중인 모임” 분리
  // 백엔드가 플래그를 어떻게 주는지에 따라 아래 조건을 맞추세요.
  // 예: isRecruiting === true → 구인중, false → 내 모임
  //const myGroups = useMemo(
  //  () => groups.filter((g) => g.isRecruiting === false),
  //  [groups]
  //);
  //const recruitingGroups = useMemo(
  //  () => groups.filter((g) => g.isRecruiting === true),
  //  [groups]
  //);

  return (
    <>
      <div className="home-page-container">
        <header className="home-header new-design">
          <div className="header-icons">
            <Link to="/chat" className="icon-link" aria-label="채팅">
              <FaPaperPlane />
            </Link>
            <Link to="/notifications" className="icon-link" aria-label="알림">
              <FaBell />
            </Link>
            <Link to="/mypage" className="icon-link" aria-label="마이페이지">
              <img
                src={userData.profileImage}
                alt="profile"
                className="header-profile-img"
              />
            </Link>
          </div>
          <div className="greeting">
            <h2>{userData.nickname} 님,</h2>
            <h2>다음 비행을 확인하세요!</h2>
          </div>
        </header>

        <section className="next-flight-section">
          {/*{loading && <div className="next-flight-scroll">불러오는 중…</div>}
          {!loading && errMsg && (
            <div className="next-flight-scroll">{errMsg}</div>
          )}
          {!loading && !errMsg && (
            <div className="next-flight-scroll">
              {[].length === 0 ? (
                <div className="flight-item empty">참여중인 모임이 없어요</div>
              ) : (
                [].map((g) => {
                  const img =
                    g.media?.url ||
                    g.image ||
                    "https://placehold.co/100/cccccc/000000?Text=Group";
                  return (
                    <Link
                      to={`/group/${g.id}/board`}
                      key={g.id}
                      className="flight-item"
                      title={g.name}
                    >
                      <img src={img} alt={g.name} className="flight-item-img" />
                      <span>{g.name}</span>
                    </Link>
                  );
                })
              )}
            </div>
          )}*/}
        </section>
        
        <main className="group-list-section">
          <h3>구인중인 모임</h3>

          <div className="add-group-container">
            <button
              className="add-group-button"
              onClick={() => setIsModalOpen(true)}
              aria-label="모임 추가"
            >
              +
            </button>
          </div>

          <InfiniteScroll baseUrl='/groups' query={{
            isMember: false,
            size: 3
          }} mapFn={(g) => {
                const img =
                  g.media?.url ||
                  g.image ||
                  "https://placehold.co/100/eeeeee/000000?Text=Recruit";
                const boardingTime =
                  g.boardingTime ||
                  (g.startAt ? g.startAt.slice(0, 7) : "미정"); // YYYY-MM
                const issuedAt = g.issuedAt || "최근";
                const tags = Array.isArray(g.tags) ? g.tags : [];

                return (
                  <Link
                    to={`/group/apply/${g.id}`}
                    key={g.id}
                    className="group-ticket"
                    title={g.name}
                  >
                    <div className="ticket-header">{g.name}</div>
                    <div className="ticket-body">
                      <img
                        src={img}
                        alt={g.name}
                        className="ticket-image"
                      />
                      <div className="ticket-info">
                        <div className="ticket-details-row">
                          <div className="ticket-details">
                            <span>Boarding Time</span>
                            <strong>{boardingTime}</strong>
                          </div>
                          <div className="ticket-details">
                            <span>Issued At</span>
                            <strong>{issuedAt}</strong>
                          </div>
                        </div>
                        <div className="ticket-tags">
                          <span>Tag</span>
                          <strong>
                            {tags.length ? tags.map((t) => `#${t}`).join(" ") : "-"}
                          </strong>
                        </div>
                      </div>
                      <div className="ticket-stub">
                        <LiaBarcodeSolid className="barcode-icon" />
                      </div>
                    </div>
                  </Link>
                );
              }} />
          {/*{loading && <div className="group-ticket">불러오는 중…</div>}
          {!loading && errMsg && <div className="group-ticket">{errMsg}</div>}

          {!loading &&
            !errMsg &&
            (groups.length === 0 ? (
              <div className="group-ticket empty">현재 구인중인 모임이 없어요</div>
            ) : (
              groups.map()
            ))}*/}
        </main>
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
