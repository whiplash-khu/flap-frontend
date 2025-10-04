import MyPageLayout from "../../components/MyPageLayout";
import "./NoticesPage.css";

// 임시 공지사항. 근데 이거를 클릭하면 내용 화면으로 넘어가야되나? 아님 이 안에 다 작성?
const mockNotices = [
  {
    id: 1,
    title: "공지사항",
    date: "2025/07/21",
    content: "서비스 업데이트 관련 내용 ~~~~",
  },
  {
    id: 2,
    title: "공지사항",
    date: "2025/07/11",
    content: "감사합니다.",
  },
  {
    id: 3,
    title: "FLAP",
    date: "2025/07/01",
    content: "하잉",
  },
];

function NoticesPage() {
  return (
    <MyPageLayout title="공지사항">
      <div className="notice-list">
        {mockNotices.map((notice) => (
          <div key={notice.id} className="notice-item">
            <div className="notice-header">
              <span className="notice-title">{notice.title}</span>
              <span className="notice-date">{notice.date}</span>
            </div>
            <p className="notice-content">{notice.content}</p>
          </div>
        ))}
      </div>
    </MyPageLayout>
  );
}

export default NoticesPage;
