import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import "./CreateGroupCompletePage.css";

function CreateGroupCompletePage() {
  const navigate = useNavigate();
  const { state } = useLocation(); // { name,introduction,description,startAt,endAt,questions,tags,mediaId? }
  const [loading, setLoading] = useState(false);
  const [createdId, setCreatedId] = useState(null);

  useEffect(() => {
    if (!state) {
      alert("생성 데이터가 없습니다. 처음부터 다시 진행해주세요.");
      navigate("/creategroup/create", { replace: true });
      return;
    }

    let aborted = false;

    (async () => {
      try {
        setLoading(true);

        // 1) 값 정리 및 간단 검증
        const name = (state.name || "").trim();
        const introduction = (state.introduction || "").trim();
        const description = (state.description || "").trim();
        const startAt = state.startAt; // "YYYY-MM-DD"
        const endAt = state.endAt;     // "YYYY-MM-DD"
        const questions = Array.isArray(state.questions)
          ? state.questions.map((q) => (q || "").trim()).filter(Boolean)
          : [];
        const tags = Array.isArray(state.tags)
          ? state.tags.map((t) => (t || "").trim()).filter(Boolean)
          : [];

        if (name.length < 3 || name.length > 16) {
          throw new Error("모임 이름은 3~16자여야 합니다.");
        }
        if (description.length > 320) {
          throw new Error("한줄 소개는 320자 이하여야 합니다.");
        }
        if (introduction.length === 0 || description.length > 32) {
          throw new Error("상세 설명은 1~32자여야 합니다.");
        }
        if (!/^\d{4}-\d{2}-\d{2}$/.test(startAt) || !/^\d{4}-\d{2}-\d{2}$/.test(endAt)) {
          throw new Error("활동 기간 형식이 올바르지 않습니다.(YYYY-MM-DD)");
        }
        if (questions.length === 0) {
          throw new Error("가입 질문을 1개 이상 작성해주세요.");
        }

        const payload = {
          name,
          introduction,
          description,
          startAt,
          endAt,
          mediaId: 1,
          questions,
          tags,
        };

        console.log("[CreateGroup] request payload:", payload);

        const { data } = await api.post("/groups", payload);

        console.log("[CreateGroup] response:", data);
        if (!aborted) setCreatedId(data?.data?.id || null);
      } catch (e) {
        if (aborted) return;

        console.error("[CreateGroup] error:", {
          message: e?.message,
          status: e?.response?.status,
          data: e?.response?.data,
        });

        const msg =
          e?.response?.data?.message ||
          e?.response?.data?.error ||
          e.message ||
          "모임 생성 중 오류가 발생했습니다.";
        alert(msg);
        navigate("/creategroup/create", { replace: true });
      } finally {
        if (!aborted) setLoading(false);
      }
    })();

    return () => {
      aborted = true;
    };
  }, [state, navigate]);

  const handleDone = () => {
    if (createdId) navigate(`/group/${createdId}/board`, { replace: true });
    else navigate("/", { replace: true });
  };

  return (
    <div className="group-complete-page">
      <div className="group-complete-container">
        <div className="group-complete-content">
          <h1>
            {loading ? "모임을 생성하는 중..." : (
              <>
                모든 준비가
                <br />
                끝났어요!
              </>
            )}
          </h1>
          {!loading && (
            <p>
              크루원이 모일 때까지 <br /> 기다려 보아요.
            </p>
          )}
        </div>
        <div className="group-complete-footer">
          <button onClick={handleDone} disabled={loading}>
            {createdId ? "모임으로 이동" : "홈으로"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateGroupCompletePage;
