import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SignupLayout from "../../components/layout/GroupDetailLayout";
import UserContext from "../../components/context/UserContext";
import { api } from "../../lib/api";

import "./CreatePostPage.css";

function CreatePostPage() {
  const navigate = useNavigate();
  const [user] = useContext(UserContext);
  const { groupId } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isNotice, setIsNotice] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const body = {
      title,
      content,
      isNotice,
    };

    try {
      setLoading(true);
      await api.post(`/groups/${groupId}/posts`, body);
      alert("게시물이 등록되었습니다.");
      navigate(-1);
    } catch (err) {
      console.error("게시물 등록 실패:", err);
      alert("게시물 등록 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
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

      <div className="notice-checkbox">
        <label>
          <input
            type="checkbox"
            checked={isNotice}
            onChange={() => setIsNotice(!isNotice)}
          />
          공지사항으로 등록
        </label>
      </div>

      <div className="register-button-wrapper">
        <button
          className="apply-button"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "등록 중..." : "등록"}
        </button>
      </div>
    </SignupLayout>
  );
}

export default CreatePostPage;


// function CreatePostPage() {
//   const navigate = useNavigate();
//   const [user] = useContext(UserContext);
//   const { groupId } = useParams();

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [isNotice, setIsNotice] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleRegister = async(e) => {
//     if (!user.title.trim() || !user.content.trim()) {
//       alert("제목과 내용을 모두 입력해주세요.");
//       return;
//     }

//     const body = {
//       title,
//       content,
//       isNotice
//     }

//     api.post(`/groups/${groupId}/posts`, body);
//     alert("게시물이 등록되었습니다.");
//     navigate(-1);
//   };

//   return (
//     <SignupLayout
//       title="게시판 글 등록"
//       buttonText="등록"
//       onButtonClick={handleRegister}
//     >
//       <div className="input-group">
//         <input
//           type="text"
//           placeholder="제목을 입력해주세요."
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </div>
//       <div className="input-group">
//         <textarea
//           placeholder="내용을 입력해주세요."
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="content-textarea"
//         />
//       </div>
//     </SignupLayout>
//   );
// }

// export default CreatePostPage;
