// src/components/TermsModal.jsx

import React from "react";
import "./TermsModal.css";

function TermsModal({ isOpen, onClose, onAgree }) {
  // isOpen이 false이면 아무것도 렌더링하지 않음
  if (!isOpen) {
    return null;
  }

  return (
    // 모달 배경 (뒷 배경을 어둡게 처리)
    <div className="modal-backdrop" onClick={onClose}>
      {/* 실제 모달 컨텐츠 (배경 클릭 시 닫히지 않도록 이벤트 전파 중단) */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>서비스 이용약관</h2>
        <div className="terms-text-box">
          <p>제1조 (목적)</p>
          <p>
            이 약관은 FLAP 서비스의 이용과 관련하여 회사와 회원 간의 권리, 의무
            및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>
          <p>...</p>
          <p>(약관 내용이 여기에 들어갑니다)</p>
        </div>
        <div className="modal-actions">
          <button onClick={onClose} className="close-button">
            취소
          </button>
          <button onClick={onAgree} className="agree-button">
            동의하고 계속하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default TermsModal;
