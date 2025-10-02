import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignupLayout from "../../components/SignupLayout";
import "./UserInfoPage.css";

function UserInfoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const existingData = location.state;

  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");

  const handleNext = () => {
    if (!name || !birthdate || !gender) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    const updatedData = { ...existingData, name, birthdate, gender };
    console.log("현재까지의 회원가입 정보:", updatedData);

    navigate("/signup/school-info", { state: updatedData });
  };

  return (
    <SignupLayout title="회원가입" buttonText="다음" onButtonClick={handleNext}>
      <h2 className="main-heading">
        탑승자님의 신원을
        <br />
        확인 중이에요.
      </h2>
      <div className="input-group">
        <label>이름</label>
        <input
          type="text"
          placeholder="예) 홍길동"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>생년월일</label>
        <input
          type="text"
          placeholder="YYYY.MM.DD"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>성별</label>
        <div className="gender-selection">
          <button
            className={`gender-button ${gender === "male" ? "selected" : ""}`}
            onClick={() => setGender("male")}
          >
            남성
          </button>
          <button
            className={`gender-button ${gender === "female" ? "selected" : ""}`}
            onClick={() => setGender("female")}
          >
            여성
          </button>
        </div>
      </div>
    </SignupLayout>
  );
}

export default UserInfoPage;
