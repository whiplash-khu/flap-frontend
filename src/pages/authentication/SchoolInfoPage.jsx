import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignupLayout from "../../components/layout/SignupLayout";
import "./SchoolInfoPage.css";

function SchoolInfoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const existingData = location.state;

  const [school, setSchool] = useState("");
  const [entryYear, setEntryYear] = useState("");
  const [isPickerOpen, setIsPickerOpen] = useState(false);

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

  const handleYearSelect = (year) => {
    setEntryYear(year);
    setIsPickerOpen(false);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear - i);

  return (
    <>
      <SignupLayout
        title="회원가입"
        buttonText="다음"
        onButtonClick={handleNext}
      >
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

          <button
            className="year-select-box"
            onClick={() => setIsPickerOpen(true)}
          >
            {entryYear ? `${entryYear}년` : "연도 선택 (학번)"}
            <span className="arrow-down">▼</span>
          </button>
        </div>
      </SignupLayout>

      {isPickerOpen && (
        <div className="picker-backdrop" onClick={() => setIsPickerOpen(false)}>
          <div
            className="year-picker-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>학번 설정</h3>
            <div className="year-list">
              {years.map((year) => (
                <button
                  key={year}
                  className={`year-button ${
                    entryYear === year ? "selected" : ""
                  }`}
                  onClick={() => handleYearSelect(year)}
                >
                  {year}년
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SchoolInfoPage;
