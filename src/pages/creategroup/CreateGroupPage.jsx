import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupLayout from "../../components/layout/SignupLayout";
import CalendarCard from "../../components/common/Molecules/CalendarCard";
import { api } from "../../lib/api";
import "./CreateGroupPage.css";

function CreateGroupPage1() {
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [media, setMedia] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateSelectionMode, setDateSelectionMode] = useState("start");
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleOpenCalendar = (mode) => {
    setDateSelectionMode(mode);
    setIsCalendarOpen(true);
  };

  const handleDateChange = (date) => {
    if (dateSelectionMode === "start") setStartDate(date);
    else setEndDate(date);
    setIsCalendarOpen(false);
  };

  const formatDate = (date) =>
    !date
      ? ""
      : `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

  const toYMD = (d) => (d ? d.toISOString().slice(0, 10) : "");

const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if(file === undefined) {
    alert("x");

    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await api.post("/medias", formData);
    const uploaded = res.data.data;
    setMedia(uploaded);
    setPreviewUrl(`https://s3.dhmo.kr/flap/${uploaded.hash}?t=${Date.now()}`);
  } catch (err) {
    console.error("이미지 업로드 실패:", err);
    alert("이미지 업로드 중 오류가 발생했습니다.");
  }
};

  const handleButtonClick = () => {
    const el = document.createElement("input");
    el.setAttribute("type", "file");
    el.setAttribute("accept", "image/*");
    el.addEventListener("change", handleFileChange);
    el.click();
  };

  const handleNext = () => {
    if (!groupName || !description || !startDate || !endDate) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    if (!media) {
      alert("대표 이미지를 업로드해주세요.");
      return;
    }

    const groupData = {
      name: groupName.trim(),
      introduction: description.trim(),
      startAt: toYMD(startDate),
      endAt: toYMD(endDate),
      mediaId: media.id, 
    };

    navigate("/creategroup/description", { state: groupData });
  };

  return (
    <>
      <SignupLayout title="모임 생성" buttonText="다음" onButtonClick={handleNext}>
        <h2 className="main-heading">
          새로운 비행을
          <br />
          시작해볼까요?
        </h2>

        <div className="profile-image-container">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="group"
              className="group-image-preview ticket-image"
            />
          ) : (
            <div className="image-placeholder"></div>
          )}

          <button className="change-photo-button" onClick={handleButtonClick}>
            대표 이미지 선택
          </button>
        </div>

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
              {startDate ? formatDate(startDate) : "시작일 선택"}
            </button>
            <span>→</span>
            <button onClick={() => handleOpenCalendar("end")}>
              {endDate ? formatDate(endDate) : "종료일 선택"}
            </button>
          </div>
        </div>

        <div className="input-group">
          <label>한줄 소개</label>
          <input
            type="text"
            placeholder="자유롭게 작성해주세요."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

// // src/pages/creategroup/CreateGroupPage.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import SignupLayout from "../../components/layout/SignupLayout";
// import CalendarCard from "../../components/common/Molecules/CalendarCard";
// import "./CreateGroupPage.css";

// function CreateGroupPage1() {
//   const navigate = useNavigate();

//   const [groupName, setGroupName] = useState("");
//   const [description, setDescription] = useState("");
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   const [isCalendarOpen, setIsCalendarOpen] = useState(false);
//   const [dateSelectionMode, setDateSelectionMode] = useState("start");

//   const [mediaId, setMediaId] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);

//   const handleOpenCalendar = (mode) => {
//     setDateSelectionMode(mode);
//     setIsCalendarOpen(true);
//   };

//   const handleDateChange = (date) => {
//     if (dateSelectionMode === "start") setStartDate(date);
//     else setEndDate(date);
//     setIsCalendarOpen(false);
//   };

//   const formatDate = (date) =>
//     !date ? "" : `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

//   const toYMD = (d) => (d ? d.toISOString().slice(0, 10) : "");

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setIsUploading(true);
//     const formData = new FormData();
//     formData.append("", file);

//     try {
//       const res = await api.post("/medias", formData);
//       const media = res.data.data;
//       setMediaId(media.id);
//       setPreview(`https://s3.dhmo.kr/flap/${media.hash}`);
//     } catch (err) {
//       console.error("이미지 업로드 실패:", err);
//       alert("이미지 업로드 중 오류가 발생했습니다.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleNext = () => {
//     if (!groupName || !description || !startDate || !endDate) {
//       alert("모든 필드를 입력해주세요.");
//       return;
//     }
//     if (groupName.length < 3 || groupName.length > 16) {
//       alert("모임 이름은 3~16자입니다.");
//       return;
//     }
//     if (description.length > 32) {
//       alert("한줄 소개는 32자 이내입니다.");
//       return;
//     }

//     const groupData = {
//       name: groupName.trim(),
//       introduction: description.trim(),
//       startAt: toYMD(startDate),
//       endAt: toYMD(endDate),
//       mediaId: media.id,
//     };
//     navigate("/creategroup/description", { state: groupData });
//   };

//   return (
//     <>
//       <SignupLayout title="모임 생성" buttonText="다음" onButtonClick={handleNext}>
//         <h2 className="main-heading">
//           새로운 비행을
//           <br />
//           시작해볼까요?
//         </h2>

//         <div className="input-group">
//           <label>모임 이름</label>
//           <input
//             type="text"
//             placeholder="자유롭게 지어주세요!"
//             value={groupName}
//             onChange={(e) => setGroupName(e.target.value)}
//           />
//         </div>

//         <div className="input-group">
//           <label>활동 기간</label>
//           <div className="date-range-box">
//             <button onClick={() => handleOpenCalendar("start")}>
//               {startDate ? formatDate(startDate) : "시작일 선택"}
//             </button>
//             <span>→</span>
//             <button onClick={() => handleOpenCalendar("end")}>
//               {endDate ? formatDate(endDate) : "종료일 선택"}
//             </button>
//           </div>
//         </div>

//         <div className="input-group">
//           <label>한줄 소개</label>
//           <input
//             type="text"
//             placeholder="자유롭게 작성해주세요."
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//       </SignupLayout>

//       {isCalendarOpen && (
//         <div className="picker-backdrop" onClick={() => setIsCalendarOpen(false)}>
//           <div className="calendar-modal-content" onClick={(e) => e.stopPropagation()}>
//             <CalendarCard
//               selectedDate={dateSelectionMode === "start" ? startDate : endDate}
//               onDateChange={handleDateChange}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default CreateGroupPage1;
