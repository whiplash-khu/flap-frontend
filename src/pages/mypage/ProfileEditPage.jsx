import { useState } from "react";
import MyPageLayout from "../../components/layout/MyPageLayout";
import "./ProfileEditPage.css";

function ProfileEditPage() {
  // 임시 사용자 데이터
  const initialUserData = {
    nickname: "너구리",
    profileImage: "/images/winter.jpeg",
  };

  const [nickname, setNickname] = useState(initialUserData.nickname);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    if (isEditing) {
      // TODO: 여기에 나중에 닉네임 변경 API 요청 코드
      console.log(`새로운 닉네임 저장: ${nickname}`);
    }
    setIsEditing(!isEditing);
  };

  return (
    <MyPageLayout title="프로필 수정">
      <div className="profile-edit-container">
        <div className="profile-image-container">
          <img
            src={initialUserData.profileImage}
            alt="profile"
            className="profile-image-large"
          />
          <button className="change-photo-button">사진 변경</button>
        </div>

        <div className="edit-field-row">
          <span className="field-label">닉네임</span>
          <input
            type="text"
            className={`nickname-input ${isEditing ? "editing" : ""}`}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            readOnly={!isEditing}
          />
          <button className="edit-button" onClick={handleEditToggle}>
            {isEditing ? "저장" : "변경"}
          </button>
        </div>
      </div>
    </MyPageLayout>
  );
}

export default ProfileEditPage;
