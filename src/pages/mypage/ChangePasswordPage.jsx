import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupLayout from "../../components/SignupLayout";
import "./ChangePasswordPage.css";

function ChangePasswordPage() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  //백엔드 연동되면 기존 비밀번호 맞는지 확인하는 코드 추가하기
  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("모든 필드를 입력해주세요.");
      return;
    }
    if (newPassword.length < 8 || newPassword.length > 16) {
      setError("새 비밀번호는 8자 이상, 16자 이하이어야 합니다.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    setError("");
    console.log("현재 비밀번호:", currentPassword);
    console.log("새 비밀번호:", newPassword);
    alert("비밀번호가 성공적으로 변경되었습니다.");

    navigate(-1);
  };

  return (
    <SignupLayout
      title="비밀번호 변경"
      buttonText="비밀번호 변경"
      onButtonClick={handleChangePassword}
    >
      <div className="input-group">
        <label>현재 비밀번호</label>
        <input
          type="password"
          placeholder="현재 비밀번호 입력"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>새 비밀번호</label>
        <input
          type="password"
          placeholder="8자 ~ 16자 새로운 비밀번호"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>비밀번호 확인</label>
        <input
          type="password"
          placeholder="새 비밀번호 재입력"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
    </SignupLayout>
  );
}

export default ChangePasswordPage;
