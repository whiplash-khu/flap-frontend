// src/pages/SchoolInfoPage.jsx

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignupLayout from "../components/SignupLayout";
import "./SchoolInfoPage.css";

function SchoolInfoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const existingData = location.state;

  const [school, setSchool] = useState("");
  const [entryYear, setEntryYear] = useState(""); // 입학년도

  // src/pages/SchoolInfoPage.jsx 의 handleNext 함수

  const handleNext = () => {
    if (!school || !entryYear) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    const finalSignupData = { ...existingData, school, entryYear };

    console.log("--- 최종 회원가입 데이터 ---");
    console.log(finalSignupData);

    // alert을 제거하고, 새로 만든 완료 페이지로 모든 데이터를 전달하며 이동
    navigate("/signup/complete", { state: finalSignupData });
  };

  // 입학년도 옵션을 동적으로 생성 (예: 현재년도부터 10년 전까지)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <SignupLayout title="회원가입" buttonText="다음" onButtonClick={handleNext}>
      <h2 className="main-heading">
        함께 이륙할 준비를
        <br />
        마쳐볼까요?
      </h2>
      <div className="input-group">
        <label>학교</label>
        <input
          type="text"
          placeholder="예) 경희대학교"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>입학년도</label>
        <select
          value={entryYear}
          onChange={(e) => setEntryYear(e.target.value)}
        >
          <option value="" disabled>
            연도 선택 (학번)
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}년 ({String(year).slice(2)}학번)
            </option>
          ))}
        </select>
      </div>
    </SignupLayout>
  );
}

export default SchoolInfoPage;
