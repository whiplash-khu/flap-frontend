// src/pages/SignupWelcomePage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupLayout from "../components/SignupLayout";
import TermsModal from "../components/TermsModal"; // 방금 만든 모달 컴포넌트

function SignupWelcomePage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleAgree = () => {
    setIsModalOpen(false);
    // 약관에 동의했으므로 다음 단계(이메일 입력)로 이동
    navigate("/signup/email");
  };

  return (
    <>
      <SignupLayout
        title="회원가입"
        buttonText="다음"
        onButtonClick={handleOpenModal}
      >
        <h2 className="main-heading" style={{ marginTop: "2rem" }}>
          FLAP에 오신 걸
          <br />
          환영해요!
        </h2>
        <p style={{ fontSize: "1rem", color: "#666" }}>
          서비스의 원활한 이용을 위해
          <br />
          아래 권한들을 허용해 주세요.
        </p>
      </SignupLayout>

      <TermsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAgree={handleAgree}
      />
    </>
  );
}

export default SignupWelcomePage;
