import { useState, useContext } from "react";
import MyPageLayout from "../../components/layout/MyPageLayout";
import UserContext from "../../components/context/UserContext";
import "./ProfileEditPage.css";
import { api } from "../../lib/api";

function ProfileEditPage() {
  const [user, setUser] = useContext(UserContext);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = async() => {
    if (isEditing) {
      await api.patch(`/users/${user.id}`, { name: user.name });

      console.log(`새로운 닉네임 저장: ${user.name}`);
    }
    setIsEditing(!isEditing);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if(file === undefined) {
      alert("x");

      return;
    }

    const formData = new FormData();

    formData.append('', file);
    let res = await api.post("/medias", formData);
    // const media = res.data.data;

    // (await api.post('/medias', formData)).data.data

    res = await api.patch(`/users/${user.id}`, { mediaId: res.data.data.id });
    user.media = res.data.data.media;

    setUser({
      ...user
    });

    document.querySelector(".profile-image-large").src =
        `https://s3.dhmo.kr/flap/${res.data.data.media.hash}?t=${Date.now()}`;
  }

  const handleButtonClick = async () => {
    const el = document.createElement('input');
    el.setAttribute('type', 'file');
    el.addEventListener('change', handleFileChange);
    el.click();
  }

  return (
    <MyPageLayout title="프로필 수정">
      <div className="profile-edit-container">
        <div className="profile-image-container">
          <img
            src={'https://s3.dhmo.kr/flap/' + user.media.hash}
            alt="profile"
            className="profile-image-large"
          />
          <button className="change-photo-button" onClick={handleButtonClick}>사진 변경</button>
        </div>

        <div className="edit-field-row">
          <span className="field-label">닉네임</span>
          <input
            type="text"
            className={`nickname-input ${isEditing ? "editing" : ""}`}
            value={user.name}
            onChange={(e) => setUser({
              ...user,
              name: e.target.value
            })}
            disabled={!isEditing}
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
