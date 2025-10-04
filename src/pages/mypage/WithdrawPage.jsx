import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyPageLayout from "../../components/MyPageLayout";
import "./WithdrawPage.css";

function WithdrawPage() {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);

  const handleWithdraw = () => {
    if (isAgreed) {
      console.log("계정 탈퇴 처리...");
      //탈퇴 API 연결
      navigate("/mypage/withdraw-complete");
    }
  };

  return (
    <MyPageLayout title="계정 탈퇴하기">
      <div className="withdraw-container">
        <div className="withdraw-content">
          <h2>FLAP을 떠나신다니 아쉬워요.</h2>
          <p className="description">
            그동안 FLAP과 함께 비행해주셔서 감사합니다. <br />
            계정을 삭제하기 전에 아래 내용을 꼭 확인해주세요.
          </p>

          <div className="warning-box">
            <p className="warning-title">
              계정을 삭제하면 다음 정보가 영구적으로 사라져요.
            </p>
            <ul>
              <li>프로필 정보: 닉네임, 프로필 사진 등 모든 프로필 정보</li>
              <li>참여 기록: 직접 작성한 모든 게시글 및 댓글</li>
              <li>가입한 모임: 내가 운영하거나 가입했던 모든 모임의 기록</li>
              <li>내가 만든 모임: 내가 운영하던 모임의 모든 정보와 자료</li>
            </ul>
          </div>

          <label className="agree-checkbox-row">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={() => setIsAgreed(!isAgreed)}
            />
            위 내용을 모두 확인했으며, 계정 탈퇴에 동의합니다.
          </label>
        </div>

        <div className="withdraw-footer">
          <button
            className="withdraw-button"
            onClick={handleWithdraw}
            disabled={!isAgreed}
          >
            탈퇴하기
          </button>
          <button className="cancel-button" onClick={() => navigate(-1)}>
            취소
          </button>
        </div>
      </div>
    </MyPageLayout>
  );
}

export default WithdrawPage;
