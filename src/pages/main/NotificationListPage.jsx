import React from "react";
import MyPageLayout from "../../components/layout/MyPageLayout";
import "./NotificationListPage.css";

const mockNotifications = [
  {
    id: 1,
    type: "comment",
    message: "'슬픈 도시 학생들' 모임에 새로운 댓글이 달렸습니다.",
    time: "1시간 전",
  },
  {
    id: 2,
    type: "notice",
    message: "'스트리트 푸드 파이터' 모임에 새로운 공지가 등록되었습니다.",
    time: "3시간 전",
  },
];

function NotificationListPage() {
  return (
    <MyPageLayout title="알림">
      <div className="notification-list-container">
        {mockNotifications.map((notif) => (
          <div key={notif.id} className="notification-item">
            <p className="notification-message">{notif.message}</p>
            <span className="notification-time">{notif.time}</span>
          </div>
        ))}
      </div>
    </MyPageLayout>
  );
}

export default NotificationListPage;
