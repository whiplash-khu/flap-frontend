import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../components/context/UserContext";
import MyPageLayout from "../../components/layout/MyPageLayout";
import "./SecurityPage.css";
import { api } from "../../lib/api";

function SecurityPage() {
  const navigate = useNavigate();

  const [user, setUser] = useContext(UserContext);

  //const [isMale, setisMale] = useState(user.isMale);
  const [isMale_isEditing, isMale_setIsEditing] = useState(false);

  //const [school, setSchool] = useState(user.school);
  const [school_isEditing, school_setIsEditing] = useState(false);

  //const [admissionYear, setAdmissionYear] = useState(user.admissionYear);
  const [admissionYear_isEditing, admissionYear_setIsEditing] = useState(false);

  console.log(user.birthdate);

  //const [birthdate, setBirthdate] = useState(user.birthdate);
  const [birthdate_isEditing, birthdate_setIsEditing] = useState(false);

  //const [password, setPassword] = useState(user);
  const [isEditing, setIsEditing] = useState(false);

  const handleIsMaleEditToggle = async() => {
    if (isMale_isEditing) {
      await api.patch(`/users/${user.id}`, { isMale : user.isMale});

      console.log(`새로운 성별 저장: ${user.isMale}`);
    }
    isMale_setIsEditing(!isMale_isEditing);
  };

  const handleAdmissionYearEditToggle = async() => {
    if (admissionYear_isEditing) {
      await api.patch(`/users/${user.id}`, { admissionYear : user.admissionYear});

      console.log(`새로운 학번 저장: ${user.admissionYear}`);
    }
    admissionYear_setIsEditing(!admissionYear_isEditing);
  };

  const handleSchoolEditToggle = async() => {
    if (school_isEditing) {
      await api.patch(`/users/${user.id}`, { school : user.school});

      console.log(`새로운 학교 저장: ${user.school}`);
    }
    school_setIsEditing(!school_isEditing);
  };

  const handleBirthdateEditToggle = async() => {
    if (birthdate_isEditing) {
      await api.patch(`/users/${user.id}`, { birthdate : user.birthdate});

      console.log(`새로운 학교 저장: ${user.birthdate}`);
    }
    birthdate_setIsEditing(!birthdate_isEditing);
  };
  const handleLogout = () => {
    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  return (
    <MyPageLayout title="개인정보 및 보안">
      <div className="security-container">
        <div className="info-section">

          <div className="info-row">
            <span className="info-label">이메일</span>
            <span className="info-value">{user.email}</span>
          </div>

          <div className="edit-field-row">
            <span className="field-label">성별</span>
            <select 
            className={`isMale-input ${isMale_isEditing ? "editing" : ""}`}
            disabled={!isMale_isEditing}
            defaultValue={user.isMale}
            onChange={(e) => setUser({
              ...user,
              isMale: e.target.value === 'true'
            })}>
              <option value="true" selected={user.isMale}>남자</option>
              <option value="false" selected={!user.isMale}>여자</option>
            </select>

            <button className="edit-button" onClick={handleIsMaleEditToggle}>
              {isMale_isEditing ? "저장" : "변경"}
            </button>
          </div>

          <div className="edit-field-row">
            <span className="field-label">학교</span>
            <input
              type="text"
              className={`school-input ${school_isEditing ? "editing" : ""}`}
              value={user.school}
              onChange={(e) => setUser({
                ...user,
                school: e.target.value
              })}
              disabled={!school_isEditing}
            />

            <button className="edit-button" onClick={handleSchoolEditToggle}>
              {school_isEditing ? "저장" : "변경"}
            </button>
          </div>

          <div className="edit-field-row">
            <span className="field-label">학번</span>
            <input
              type="text"
              className={`admissionYear-input ${admissionYear_isEditing ? "editing" : ""}`}
              value={user.admissionYear}
              onChange={(e) => setUser({
                ...user,
                admissionYear: e.target.value
              })}
              disabled={!admissionYear_isEditing}
            />

            <button className="edit-button" onClick={handleAdmissionYearEditToggle}>
              {admissionYear_isEditing ? "저장" : "변경"}
            </button>
          </div>

          <div className="edit-field-row">
            <span className="field-label">생년월일</span>
            <input
              type="text"
              className={`birthdate-input ${birthdate_isEditing ? "editing" : ""}`}
              value={user.birthdate.slice(0, 10)}
              onChange={(e) => setUser({
                ...user,
                birthdate: e.target.value
              })}
              disabled={!birthdate_isEditing}
            />

            <button className="edit-button" onClick={handleBirthdateEditToggle}>
              {birthdate_isEditing ? "저장" : "변경"}
            </button>
          </div>

          <div className="info-row">
            <Link to="/mypage/change-password" className="link-style">
              비밀번호 변경
            </Link>
          </div>
          
        </div>

        <div className="action-section">
          <button className="action-link" onClick={handleLogout}>
            로그아웃
          </button>
          <Link to="/mypage/withdraw" className="action-link danger">
            계정 탈퇴하기
          </Link>
        </div>
      </div>
    </MyPageLayout>
  );
}

export default SecurityPage;
