import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import MyPageLayout from "../../components/layout/MyPageLayout";
import { FaEllipsisV } from "react-icons/fa";
import "./ChatListPage.css";

const generateMockChats = (page, limit) => {
  const chats = [];
  const startId = (page - 1) * limit + 1;
  const names = ["피카츄", "라이츄", "파이리", "꼬부기", "버터플"];
  const messages = [
    "네 좋아요!",
    "과제 제출 잊지 마세요.",
    "오늘 저녁 뭐 먹지?",
    "ㅋㅋㅋㅋㅋ",
    "알겠습니다.",
  ];
  for (let i = 0; i < limit; i++) {
    const id = startId + i;
    chats.push({
      id: id,
      name: `${names[id % names.length]} (${id})`,
      timestamp: `${(id % 7) + 1}일전`,
      image: `https://via.placeholder.com/60/${Math.floor(
        Math.random() * 16777215
      ).toString(16)}/000?Text=${names[id % names.length][0]}`,
      lastMessage: messages[id % messages.length],
      unreadCount: Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0,
    });
  }
  return chats;
};

const PAGE_LIMIT = 10;

function ChatListPage() {
  const handleOptionsClick = (e) => {
    e.preventDefault();
    console.log("더보기 버튼 클릭!");
  };

  const [chats, setChats] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();
  const loadMoreRef = useRef(null);

  const loadMoreChats = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const newChats = generateMockChats(nextPage, PAGE_LIMIT);
      if (newChats.length === 0) {
        setHasMore(false);
      } else {
        setChats((prevChats) => [...prevChats, ...newChats]);
        setPage(nextPage);
      }
      if (nextPage >= 3) {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 1000);
  }, [page, isLoading, hasMore]);

  useEffect(() => {
    if (page === 0) {
      loadMoreChats();
    }
  }, [loadMoreChats, page]);

  useEffect(() => {
    const options = { root: null, rootMargin: "20px", threshold: 1.0 };
    observerRef.current = new IntersectionObserver((entries) => {
      const target = entries[0];

      if (target.isIntersecting && !isLoading && hasMore) {
        loadMoreChats();
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
  }, [loadMoreChats, isLoading, hasMore]);

  return (
    <MyPageLayout title="채팅">
      <div className="chat-list-container">
        {chats.map((room) => (
          <Link
            to={`/chat/${room.id}`}
            key={room.id}
            className="chat-card-item"
          >
            <img src={room.image} alt={room.name} className="chat-card-image" />
            <div className="chat-card-info">
              <span className="chat-card-name">{room.name}</span>
              <p className="chat-timestamp">{room.timestamp}</p>
            </div>
            <button
              className="more-options-button"
              onClick={handleOptionsClick}
            >
              <FaEllipsisV />
            </button>
            {/* {room.unreadCount > 0 && (
              <div className="unread-badge">{room.unreadCount}</div>
            )} 안읽음 표시 */}
          </Link>
        ))}
        {isLoading && (
          <div>
            <p style={{ textAlign: "center", color: "#888" }}>
              채팅 목록 로딩 중...
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
        {!hasMore && chats.length > 0 && (
          <div>
            <p style={{ textAlign: "center", color: "#aaa" }}>
              모든 채팅 목록을 불러왔습니다.
            </p>
          </div>
        )}
      </div>
    </MyPageLayout>
  );
}

export default ChatListPage;
