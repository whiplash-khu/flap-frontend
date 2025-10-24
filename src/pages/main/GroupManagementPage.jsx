// GroupManagementPage.jsx
import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import GroupDetailLayout from "../../components/layout/GroupDetailLayout";
import { deleteGroup } from "../../lib/groups";
import "./GroupManagementPage.css";

function GroupManagementPage() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const handleViewApplicants = () => {
    navigate(`/group/${groupId}/manage/applicants`);
  };

  const handleDisband = async () => {
    // 1) 정수 변환
    const id = Number(groupId);

    // 2) 유효성 검사
    if (!Number.isInteger(id)) {
      alert("잘못된 그룹 ID 입니다.");
      return;
    }

    const ok = window.confirm(
      "정말로 이 모임을 해산하시겠어요?\n이 작업은 되돌릴 수 없습니다."
    );
    if (!ok) return;

    try {
      setDeleting(true);
      // 3) 삭제 호출 시에도 정수 사용
      await deleteGroup(id); // DELETE /groups/26
      alert("모임이 해산되었습니다.");
      navigate("/", { replace: true });
    } catch (e) {
      console.error("[deleteGroup] error:", e?.response?.data || e);
      const msg =
        e?.response?.data?.message ||
        "모임 해산 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      alert(msg);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <GroupDetailLayout groupName="스트리트 푸드 파이터">
      <div className="management-container">
        <Link
          to={`/group/${groupId}/manage/settings`}
          className="management-link-card"
        >
          <span>모임 관리</span>
          <span>▶</span>
        </Link>

        <div className="application-card">
          <h2>가입 신청 현황</h2>
          <div className="status-display">
            <div className="status-count">
              <strong>2명</strong>
              <span>신청했어요!</span>
            </div>
            <button
              className="view-applicants-button"
              onClick={handleViewApplicants}
            >
              신청자 확인 &gt;
            </button>
          </div>
        </div>

        <button
          className="disband-button"
          onClick={handleDisband}
          disabled={deleting}
        >
          {deleting ? "해산 중..." : "모임 해산하기"}
        </button>
      </div>
    </GroupDetailLayout>
  );
}

export default GroupManagementPage;
