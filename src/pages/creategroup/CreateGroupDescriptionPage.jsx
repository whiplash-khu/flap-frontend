import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignupLayout from "../../components/layout/SignupLayout";
import "./CreateGroupDescriptionPage.css";

function CreateGroupPage2() {
  const navigate = useNavigate();
  const { state: existingData } = useLocation(); // { name,introduction,startAt,endAt }

  const [introduction, setIntroduction] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");

  const handleAddTag = (e) => {
    if (e.key === "Enter" && currentTag.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) =>
    setTags(tags.filter((tag) => tag !== tagToRemove));

  const handleNext = () => {
    if (!introduction.trim()) {
      alert("상세 설명을 입력해주세요.");
      return;
    }
    if (introduction.length > 320) {
      alert("상세 설명은 320자 이내입니다.");
      return;
    }
    const updatedData = { ...existingData, introduction: introduction.trim() };
    navigate("/creategroup/questions", { state: updatedData });
  };

  return (
    <SignupLayout title="모임 생성" buttonText="다음" onButtonClick={handleNext}>
      <h2 className="main-heading">
        모임을 더<br />
        자세히 꾸며보세요.
      </h2>

      <div className="input-group">
        <label>상세 설명</label>
        <textarea
          placeholder="자유롭게 작성해 주세요!"
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          className="description-textarea"
        />
      </div>

      
    </SignupLayout>
  );
}

export default CreateGroupPage2;
