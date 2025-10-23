import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPaperPlane, FaPlus } from "react-icons/fa";
import "./ChatRoomPage.css";

// 임시 채팅 데이터
const mockChatData = {
  "host-contact": {
    title: "방장에게 문의하기",
    messages: [
      { sender: "me", text: "안녕하세요!" },
      { sender: "me", text: "혹시 나이 제한이 있을까요?" },
      { sender: "other", text: "안녕하세요~ 미성년자만 아니면 무방합니다!" },
    ],
  },
  1: {
    title: "스트리트 푸드 파이터",
    messages: [{ sender: "other", text: "네, 좋습니다!" }],
  },
};

function ChatRoomPage() {
  const { chatId } = useParams();
  const navigate = useNavigate();

  const chatInfo = mockChatData[chatId] || { title: "채팅", messages: [] };

  const [messages, setMessages] = useState(chatInfo.messages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { sender: "me", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="chat-page-container">
      <header className="chat-header">
        <button className="back-arrow" onClick={() => navigate(-1)}>
          &#x3c;
        </button>
        <h1 className="header-title">{chatInfo.title}</h1>
      </header>

      <main className="message-list">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble ${
              msg.sender === "me" ? "my-message" : "other-message"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className="chat-footer">
        <button className="plus-button">
          <FaPlus />
        </button>
        <input
          type="text"
          placeholder="메시지 입력"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button className="send-button" onClick={handleSendMessage}>
          <FaPaperPlane />
        </button>
      </footer>
    </div>
  );
}

export default ChatRoomPage;
