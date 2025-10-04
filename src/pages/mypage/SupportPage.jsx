import MyPageLayout from "../../components/MyPageLayout";
import "./SupportPage.css";

function SupportPage() {
  const supportEmail = "help@mail.com";

  const handleCopyEmail = () => {
    navigator.clipboard
      .writeText(supportEmail)
      .then(() => {
        alert("이메일 주소가 클립보드에 복사되었습니다.");
      })
      .catch((err) => {
        console.error("이메일 복사 실패:", err);
        alert("주소 복사에 실패했습니다.");
      });
  };

  return (
    <MyPageLayout title="고객센터 / 운영정책">
      <div className="support-container">
        <p className="support-guide">
          문의 사항은 <br />
          하단의 메일 주소로 보내주세요.
        </p>
        <p className="support-email">{supportEmail}</p>
        <button className="copy-button" onClick={handleCopyEmail}>
          주소 복사
        </button>
      </div>
    </MyPageLayout>
  );
}

export default SupportPage;
