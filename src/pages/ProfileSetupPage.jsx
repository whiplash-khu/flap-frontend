// src/pages/ProfileSetupPage.jsx

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignupLayout from "../components/SignupLayout"; // SignupLayout을 불러옵니다.
import "./ProfileSetupPage.css"; // 페이지 고유 스타일은 그대로 사용합니다.

function ProfileSetupPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // 이전 페이지에서 전달받은 email

  const [nickname, setNickname] = useState("");

  // src/pages/ProfileSetupPage.jsx 의 handleDone 함수

  // src/pages/ProfileSetupPage.jsx 의 handleDone 함수만 수정

  const handleDone = () => {
    if (nickname.length < 2) {
      alert("닉네임은 2자 이상 입력해주세요.");
      return;
    }

    const finalData = { ...location.state, nickname };
    console.log("--- 최종 회원가입 및 프로필 정보 ---");
    console.log(finalData);
    alert("프로필 설정이 완료되었습니다!");

    // 새로 수정한 경로로 이동
    navigate("/signup/final");
  };

  return (
    <SignupLayout
      title="프로필 설정"
      buttonText="완료"
      onButtonClick={handleDone}
    >
      {/* 기존의 .profile-setup-page, .profile-setup-container 등은 
        모두 SignupLayout이 처리하므로 삭제합니다.
        내용물만 children으로 전달합니다.
      */}
      <p className="subtitle">
        <h2>
          프로필을 통해 <br />
          나를 표현해보세요.
        </h2>
      </p>

      <div className="profile-image-wrapper">
        <label htmlFor="profile-image-upload">
          <div className="profile-image-placeholder">
            <span>+</span>
          </div>
        </label>
        <input id="profile-image-upload" type="file" accept="image/*" />
      </div>

      <div className="input-group">
        <label>닉네임</label>
        <input
          type="text"
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
    </SignupLayout>
  );
}

export default ProfileSetupPage;
