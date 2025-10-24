import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignupLayout from "../../components/layout/SignupLayout";
import { api } from "../../lib/api";   // ← axios 인스턴스
import "./SchoolInfoPage.css";

function SchoolInfoPage() {
  const navigate = useNavigate();
  const { state: existingData } = useLocation(); // { email, token, password, name, birthdate, isMale }

  const [school, setSchool] = useState("");
  const [entryYear, setEntryYear] = useState("");
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!school || !entryYear) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    if (!existingData?.token) {
      alert("이메일 인증 토큰이 없습니다. 처음부터 다시 진행해주세요.");
      return;
    }

    const payload = {
      password: existingData.password,
      name: existingData.name,
      birthdate: existingData.birthdate,  // YYYY-MM-DD
      isMale: existingData.isMale,
      school,
      admissionYear: Number(entryYear),
      token: existingData.token,          // /auth/verification 응답 토큰
    };

    try {
      setLoading(true);
      const { data } = await api.post("/users", payload);
      // 성공 예시: { status: "success", data: { id: 10 } }
      const newUserId = data?.data?.id;

      navigate("/signup/complete", {
        state: { userId: newUserId, email: existingData.email },
        replace: true,
      });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "회원가입 중 오류가 발생했습니다.";
      alert(msg);
    } finally {
      setLoading(false);
    }
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
        buttonText={loading ? "등록 중..." : "다음"}
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
            disabled={loading}
          />
        </div>
        <div className="input-group">
          <label>입학년도</label>
          <button
            className="year-select-box"
            onClick={() => setIsPickerOpen(true)}
            disabled={loading}
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
