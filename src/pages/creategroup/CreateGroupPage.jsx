import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupLayout from "../../components/SignupLayout";
import CalendarCard from "../../components/common/Molecules/CalendarCard";
import "./CreateGroupPage.css";

function CreateGroupPage1() {
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState("");
  const [intro, setIntro] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateSelectionMode, setDateSelectionMode] = useState("start");

  const handleOpenCalendar = (mode) => {
    setDateSelectionMode(mode);
    setIsCalendarOpen(true);
  };

  const handleDateChange = (date) => {
    if (dateSelectionMode === "start") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    setIsCalendarOpen(false);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  const handleNext = () => {
    if (!groupName || !intro || !startDate || !endDate) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const groupData = { groupName, intro, startDate, endDate };
    console.log("1단계 데이터:", groupData);
    navigate("/creategroup/description", { state: groupData });
  };

  return (
    <>
      <SignupLayout
        title="모임 생성"
        buttonText="다음"
        onButtonClick={handleNext}
      >
        <h2 className="main-heading">
          새로운 비행을
          <br />
          시작해볼까요?
        </h2>

        <div className="input-group">
          <label>모임 이름</label>
          <input
            type="text"
            placeholder="자유롭게 지어주세요!"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>활동 기간</label>
          <div className="date-range-box">
            <button onClick={() => handleOpenCalendar("start")}>
              {startDate ? formatDate(startDate) : "2025년 9월 1일"}
            </button>
            <span>→</span>
            <button onClick={() => handleOpenCalendar("end")}>
              {endDate ? formatDate(endDate) : "2025년 12월 31일"}
            </button>
          </div>
        </div>

        <div className="input-group">
          <label>한줄 소개</label>
          <input
            type="text"
            placeholder="자유롭게 작성해주세요."
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
          />
        </div>
      </SignupLayout>

      {isCalendarOpen && (
        <div
          className="picker-backdrop"
          onClick={() => setIsCalendarOpen(false)}
        >
          <div
            className="calendar-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <CalendarCard
              selectedDate={dateSelectionMode === "start" ? startDate : endDate}
              onDateChange={handleDateChange}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default CreateGroupPage1;
