import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignupLayout from "../../components/layout/SignupLayout";
import "./ProfileSetupPage.css";

function ProfileSetupPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const signupData = location.state;

  const [nickname, setNickname] = useState("");
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!signupData?.userId) {
      console.error("User ID not found in location state!");
      //setError("사용자 정보를 찾을 수 없습니다.");
    }
  }, [signupData]);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setProfileImageFile(file);
      setProfileImageUrl(URL.createObjectURL(file));
    }
  };

  const handleDone = () => {
    setError("");
    if (nickname.length < 2) {
      setError("닉네임은 2자 이상 입력해주세요.");
      return;
    }

    console.log("--- 프로필 설정 정보 (백엔드 전송 전) ---");
    console.log("User ID:", signupData.userId);
    console.log("Nickname:", nickname);
    console.log("Profile Image File:", profileImageFile);

    alert("프로필 설정 완료 (백엔드 연동 전)");
    navigate("/signup/final");
  };

  return (
    <SignupLayout
      title="프로필 설정"
      buttonText={"완료"}
      onButtonClick={handleDone}
      buttonDisabled={nickname.length < 2 || !signupData?.userId}
    >
      <h2 className="main-heading">
        프로필을 통해
        <br />
        나를 표현해보세요.
      </h2>

      <div className="profile-image-wrapper">
        <label htmlFor="profile-image-upload" className="profile-image-label">
          <div className="profile-image-placeholder">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="프로필 미리보기"
                className="profile-image-preview"
              />
            ) : (
              <span>+</span>
            )}
          </div>
        </label>
        <input
          id="profile-image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
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
      {error && (
        <p className="error-message" style={{ textAlign: "center" }}>
          {error}
        </p>
      )}
    </SignupLayout>
  );
}

export default ProfileSetupPage;
