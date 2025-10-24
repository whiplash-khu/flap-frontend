import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import GroupDetailLayout from "../../components/layout/GroupDetailLayout";
import CalendarCard from "../../components/common/Molecules/CalendarCard";
import { FiMapPin, FiClock, FiMoreVertical } from "react-icons/fi";
import { createSchedule, deleteSchedule } from "../../lib/schedules";
import "./GroupSchedulePage.css";

const initialSchedules = [
  {
    id: 1,
    title: "햄버거 최대 몇 개? 챌린지",
    location: "맥도날드 경희대 국제캠퍼스점",
    date: "2025-07-22",
    start: "18:00",
    end: "20:00",
  },
];

const ymd = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

function toISO(dateStr, timeStr) {
  const dt = new Date(`${dateStr}T${timeStr}:00`);
  return dt.toISOString();
}

export default function GroupSchedulePage() {
  const { groupId } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedules, setSchedules] = useState(initialSchedules);

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    location: "",
    date: "",
    start: "19:00",
    end: "20:00",
    description: "",
  });

  const schedulesOfSelected = useMemo(() => {
    const key = ymd(selectedDate);
    return schedules.filter((s) => s.date === key);
  }, [schedules, selectedDate]);

  const handleDateChange = (d) => setSelectedDate(d);

  const openModal = () => {
    setForm({
      title: "",
      location: "",
      date: ymd(selectedDate),
      start: "19:00",
      end: "20:00",
      description: "",
    });
    setOpen(true);
  };

  const saveSchedule = async () => {
    if (!form.title.trim()) return alert("일정 제목을 입력해주세요.");
    if (!form.date) return alert("날짜를 선택해주세요.");
    try {
      setSaving(true);
      const payload = {
        name: form.title.trim(),
        startAt: toISO(form.date, form.start || "00:00"),
        endAt: toISO(form.date, form.end || "00:00"),
        address: form.location.trim() || "미정",
        description: form.description.trim() || "",
      };
      const { data } = await createSchedule(groupId, payload);
      const newId = data?.data?.id;

      setSchedules((prev) => [
        ...prev,
        {
          id: newId ?? Date.now(),
          title: form.title.trim(),
          location: form.location.trim() || "미정",
          date: form.date,
          start: form.start || "00:00",
          end: form.end || "00:00",
        },
      ]);
      setOpen(false);
    } catch (e) {
      console.error("[createSchedule] error:", e?.response?.data || e);
      alert(e?.response?.data?.message || "일정 생성 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (scheduleId) => {
    if (!window.confirm("이 일정을 삭제할까요?")) return;
    try {
      setDeletingId(scheduleId);
      await deleteSchedule(groupId, scheduleId);
      setSchedules((prev) => prev.filter((s) => s.id !== scheduleId));
    } catch (e) {
      console.error("[deleteSchedule] error:", e?.response?.data || e);
      alert(e?.response?.data?.message || "일정 삭제에 실패했습니다.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <GroupDetailLayout groupName="스트리트 푸드 파이터">
      <div className="schedule-page-container">
        <div className="calendar-wrapper">
          <CalendarCard
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />
        </div>

        <div className="upcoming-schedules">
          <h4>다음 일정</h4>

          {schedulesOfSelected.length === 0 ? (
            <div className="empty-card">선택한 날짜에 등록된 일정이 없어요.</div>
          ) : (
            schedulesOfSelected.map((s) => (
              <div key={s.id} className="schedule-card">
                <div className="schedule-card__header">
                  <h5 className="schedule-card__title">{s.title}</h5>
                  <button
                    className="icon-kebab"
                    aria-label="delete schedule"
                    title="이 일정 삭제"
                    onClick={() => handleDelete(s.id)}
                    disabled={deletingId === s.id}
                  >
                    {deletingId === s.id ? "…" : <FiMoreVertical />}
                  </button>
                </div>

                <div className="schedule-card__row">
                  <FiMapPin className="row-icon" />
                  <span className="row-text">{s.location}</span>
                </div>

                <div className="schedule-card__row">
                  <FiClock className="row-icon" />
                  <span className="row-text">
                    {s.date.replace(/-/g, ".").slice(2)} {s.start}~{s.end}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <button className="schedule-primary-btn" onClick={openModal}>
          일정 등록
        </button>
      </div>

      {open && (
        <div
          className="schedule-modal__backdrop"
          onClick={() => setOpen(false)}
        >
          <div className="schedule-modal" onClick={(e) => e.stopPropagation()}>
            <h3>일정 등록</h3>

            <label className="field">
              <span>제목</span>
              <input
                type="text"
                placeholder="일정 제목"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </label>

            <label className="field">
              <span>장소</span>
              <input
                type="text"
                placeholder="장소 입력"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </label>

            <div className="field-2col">
              <label className="field">
                <span>날짜</span>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </label>
              <label className="field">
                <span>시작</span>
                <input
                  type="time"
                  value={form.start}
                  onChange={(e) => setForm({ ...form, start: e.target.value })}
                />
              </label>
              <label className="field">
                <span>종료</span>
                <input
                  type="time"
                  value={form.end}
                  onChange={(e) => setForm({ ...form, end: e.target.value })}
                />
              </label>
            </div>

            <label className="field">
              <span>설명 (선택)</span>
              <input
                type="text"
                placeholder="간단한 설명"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </label>

            <div className="modal-actions">
              <button className="btn-outline" onClick={() => setOpen(false)}>
                취소
              </button>
              <button className="btn-solid" onClick={saveSchedule} disabled={saving}>
                {saving ? "저장 중..." : "저장"}
              </button>
            </div>
          </div>
        </div>
      )}
    </GroupDetailLayout>
  );
}
