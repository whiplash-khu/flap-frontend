import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignupLayout from "../../components/layout/SignupLayout";
import "./UserInfoPage.css";

function UserInfoPage() {
  const navigate = useNavigate();
  const { state: existingData } = useLocation(); // { email, token, password }

  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState(""); // 사용자는 YYYY.MM.DD 형식으로 입력한다고 가정
  const [gender, setGender] = useState("");       // "male" | "female"

  const handleNext = () => {
    if (!name || !birthdate || !gender) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    // YYYY.MM.DD → YYYY-MM-DD 로 변환
    const normalizedBirth = birthdate.replaceAll(".", "-").trim();

    const updatedData = {
      ...existingData, // email, token, password
      name,
      birthdate: normalizedBirth,
      isMale: gender === "male",
    };

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
