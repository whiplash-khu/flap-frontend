<<<<<<< HEAD
import { useState, useEffect, useRef } from "react";
=======
import { useState, useContext, useEffect } from 'react';
>>>>>>> c98030d (2025102506)
import MyPageLayout from "../../components/layout/MyPageLayout";
import UserContext from "../../components/context/UserContext";
import { api } from "../../lib/api";
import "./NoticesPage.css";
<<<<<<< HEAD
//예시 데이터
const mockNotices = [
  {
    id: 1,
    title: "공지사항",
    date: "2025/07/21",
    content: "서비스 업데이트 관련 내용 ~~~~",
  },
  { id: 2, title: "공지사항", date: "2025/07/11", content: "감사합니다." },
  { id: 3, title: "FLAP", date: "2025/07/01", content: "하잉" },
  {
    id: 4,
    title: "공지사항",
    date: "2025/06/25",
    content: "새로운 기능이 추가되었습니다.",
  },
  {
    id: 5,
    title: "공지사항",
    date: "2025/06/10",
    content: "서버 점검 예정 안내.",
  },
  {
    id: 6,
    title: "공지사항",
    date: "2025/05/30",
    content: "정기 업데이트 완료.",
  },
  { id: 7, title: "FLAP", date: "2025/05/12", content: "하이하이" },
  {
    id: 8,
    title: "공지사항",
    date: "2025/05/01",
    content: "공지사항 테스트입니다.",
  },
];

function NoticesPage() {
  const [visibleCount, setVisibleCount] = useState(3);
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setVisibleCount((prev) => {
            if (prev < mockNotices.length) {
              return prev + 3;
            }
            return prev;
          });
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, []);

  return (
    <MyPageLayout title="공지사항">
      <div className="notice-list">
        {mockNotices.slice(0, visibleCount).map((notice) => (
          <div key={notice.id} className="notice-item">
            <div className="notice-header">
              <span className="notice-title">{notice.title}</span>
              <span className="notice-date">{notice.date}</span>
            </div>
            <p className="notice-content">{notice.content}</p>
          </div>
        ))}
        {visibleCount < mockNotices.length && (
          <div ref={loaderRef} style={{ height: "40px" }} />
=======

function NoticesPage() {
  const [user] = useContext(UserContext);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    api.get("/notices").then((res) => setNotices(res.data.data)).catch((err) => console.error("공지사항을 불러올 수 없습니다.", err))
  }, []);
  
  return (
    <MyPageLayout title="공지사항">
      <div className="notice-list">
        {notices.length === 0 ? (
          <p className="no-notice">등록된 공지사항이 없습니다.</p>
        ) : (
          notices.map((notice) => (
            <div key={notice.id} className="notice-item">
              <div className="notice-header">
                <span className="notice-title">{notice.title}</span>
                <span className="notice-date">
                  {new Date(notice.createdAt).toLocaleDateString("ko-KR")}
                </span>
              </div>
              <p className="notice-content">{notice.content}</p>
            </div>
          ))
>>>>>>> c98030d (2025102506)
        )}
      </div>
    </MyPageLayout>
  );
}

export default NoticesPage;