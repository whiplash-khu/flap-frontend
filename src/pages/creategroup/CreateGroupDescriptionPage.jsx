import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignupLayout from "../../components/layout/SignupLayout";
import "./CreateGroupDescriptionPage.css";

function CreateGroupPage2() {
  const navigate = useNavigate();
  const location = useLocation();
  const existingData = location.state;

  const [description, setDescription] = useState("");
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

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleNext = () => {
    const updatedData = { ...existingData, description, tags };
    console.log("2단계까지의 데이터:", updatedData);

    navigate("/creategroup/questions", { state: updatedData });
  };

  return (
    <SignupLayout
      title="모임 생성"
      buttonText="다음"
      onButtonClick={handleNext}
    >
      <h2 className="main-heading">
        모임을 더<br />
        자세히 꾸며보세요.
      </h2>

      <div className="input-group">
        <label>상세 설명</label>
        <textarea
          placeholder="자유롭게 작성해 주세요!"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="description-textarea"
        />
      </div>

      <div className="input-group">
        <label>태그 설정</label>
        <div className="tag-list">
          {tags.map((tag) => (
            <div key={tag} className="tag-item">
              #{tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="remove-tag-button"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="자유롭게 설정해 주세요!"
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyDown={handleAddTag}
        />
      </div>
    </SignupLayout>
  );
}

export default CreateGroupPage2;
