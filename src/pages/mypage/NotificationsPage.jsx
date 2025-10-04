import { useState } from "react";
import MyPageLayout from "../../components/MyPageLayout";
import ToggleSwitch from "../../components/common/ToggleSwitch";
import "./NotificationsPage.css";

function NotificationsPage() {
  const [allNotifs, setAllNotifs] = useState(true);
  const [appNotifs, setAppNotifs] = useState(true);
  const [groupNotifs, setGroupNotifs] = useState(false);
  const [scheduleNotifs, setScheduleNotifs] = useState(false);
  const [newpostNotifs, setNewpostNotifs] = useState(false);
  const [feeNotifs, setFeeNotifs] = useState(false);

  return (
    <MyPageLayout title="알림">
      <div className="notification-list">
        <div className="notification-row">
          <span className="notification-label">전체 알림 설정</span>
          <ToggleSwitch
            isOn={allNotifs}
            onToggle={() => setAllNotifs(!allNotifs)}
          />
        </div>
        <div className="notification-row">
          <span className="notification-label">앱 공지 알림</span>
          <ToggleSwitch
            isOn={appNotifs}
            onToggle={() => setAppNotifs(!appNotifs)}
          />
        </div>
        <div className="notification-row">
          <span className="notification-label">모임 공지 알림</span>
          <ToggleSwitch
            isOn={groupNotifs}
            onToggle={() => setGroupNotifs(!groupNotifs)}
          />
        </div>
        <div className="notification-row">
          <span className="notification-label">새 일정 알림</span>
          <ToggleSwitch
            isOn={scheduleNotifs}
            onToggle={() => setScheduleNotifs(!scheduleNotifs)}
          />
        </div>
        <div className="notification-row">
          <span className="notification-label">새 글 알림</span>
          <ToggleSwitch
            isOn={newpostNotifs}
            onToggle={() => setNewpostNotifs(!newpostNotifs)}
          />
        </div>
        <div className="notification-row">
          <span className="notification-label">회비 알림</span>
          <ToggleSwitch
            isOn={feeNotifs}
            onToggle={() => setFeeNotifs(!feeNotifs)}
          />
        </div>
      </div>
    </MyPageLayout>
  );
}

export default NotificationsPage;
