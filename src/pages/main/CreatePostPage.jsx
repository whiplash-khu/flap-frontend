import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupLayout from "../../components/layout/GroupDetailLayout";
import "./CreatePostPage.css";

function CreatePostPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleRegister = () => {
    // TODO: 실제 게시물 등록 API 호출
    console.log({ title, content });
    alert("게시물이 등록되었습니다.");
    navigate(-1);
  };

  return (
    <SignupLayout
      title="게시판 글 등록"
      buttonText="등록"
      onButtonClick={handleRegister}
    >
      <div className="input-group">
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="input-group">
        <textarea
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="content-textarea"
        />
      </div>
    </SignupLayout>
  );
}

export default CreatePostPage;
