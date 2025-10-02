import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignupLayout from "../components/SignupLayout";
import "./SchoolInfoPage.css";

function SchoolInfoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const existingData = location.state;

  const [school, setSchool] = useState("");
  const [entryYear, setEntryYear] = useState("");

  const handleNext = () => {
    if (!school || !entryYear) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    const finalSignupData = { ...existingData, school, entryYear };

    console.log("--- 최종 회원가입 데이터 ---");
    console.log(finalSignupData);

    navigate("/signup/complete", { state: finalSignupData });
  };

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
