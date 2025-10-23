import React from "react";
import { Link } from "react-router-dom";
import MyPageLayout from "../../components/layout/MyPageLayout";
import { FaEllipsisV } from "react-icons/fa";
import "./ChatListPage.css";

const mockChatRooms = [
  {
    id: 1,
    name: "피카츄",
    timestamp: "3일전",
    image: "https://via.placeholder.com/60/ffca28/d32f2f?Text=P",
  },
  {
    id: 2,
    name: "피카츄",
    timestamp: "3일전",
    image: "https://via.placeholder.com/60/ffca28/d32f2f?Text=P",
  },
  {
    id: 3,
    name: "피카츄",
    timestamp: "3일전",
    image: "https://via.placeholder.com/60/ffca28/d32f2f?Text=P",
  },
  {
    id: 4,
    name: "피카츄",
    timestamp: "3일전",
    image: "https://via.placeholder.com/60/ffca28/d32f2f?Text=P",
  },
];

function ChatListPage() {
  const handleOptionsClick = (e) => {
    e.preventDefault();
    console.log("더보기 버튼 클릭!");
    //여기에 더보기 메뉴 추가.
  };

  return (
    <MyPageLayout title="채팅">
      <div className="chat-list-container">
        {mockChatRooms.map((room) => (
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
          </Link>
        ))}
      </div>
    </MyPageLayout>
  );
}

export default ChatListPage;
