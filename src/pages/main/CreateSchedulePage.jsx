import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import GroupDetailLayout from "../../components/layout/GroupDetailLayout";
import "./CreateSchedulePage.css";

function ScheduleCreatePage() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    datetime: "",
    location: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ 실제론 서버로 전송하거나 상태 업데이트
    console.log("등록된 일정:", formData);
    navigate(`/group/${groupId}/schedule`);
  };

  return (
    <GroupDetailLayout
      groupName="스트리트 푸드 파이터"
      groupSchedule="매주 화요일 | 오후 6시"
    >
      <div className="schedule-create-container">
        <form className="schedule-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="일정 이름을 입력해주세요."
            value={formData.title}
            onChange={handleChange}
            className="input-field"
            required
          />

          <div className="input-with-icon">
            <FaCalendarAlt className="input-icon" />
            <input
              type="text"
              name="datetime"
              placeholder="날짜와 시간을 입력해주세요."
              value={formData.datetime}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div className="input-with-icon">
            <FaMapMarkerAlt className="input-icon" />
            <input
              type="text"
              name="location"
              placeholder="장소를 입력해주세요."
              value={formData.location}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <textarea
            name="notes"
            placeholder="특이사항이 있다면 입력해주세요."
            value={formData.notes}
            onChange={handleChange}
            className="textarea-field"
          />

          <button type="submit" className="submit-button">
            등록
          </button>
        </form>
      </div>
    </GroupDetailLayout>
  );
}

export default ScheduleCreatePage;
