import { useContext, useState, useEffect } from "react";
import MyPageLayout from "../../components/layout/MyPageLayout";
import ToggleSwitch from "../../components/common/ToggleSwitch";
import UserContext from "../../components/context/UserContext";
import "./NotificationsPage.css";
import { api } from "../../lib/api";


function NotificationsPage() {
  // const [allNotifs, setAllNotifs] = useState(true);
  // const [appNotifs, setAppNotifs] = useState(true);
  // const [groupNotifs, setGroupNotifs] = useState(false);
  // const [scheduleNotifs, setScheduleNotifs] = useState(false);
  // const [newpostNotifs, setNewpostNotifs] = useState(false);
  // const [feeNotifs, setFeeNotifs] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isGroupNoticeEnabled, setIsGroupNoticeEnabled] = useState(false);
  const [isPostEnabled, setIsPostEnabled] = useState(false);
  const [isScheduleEnabled, setIsScheduleEnabled] = useState(false);
  const [isFeeEnabled, setIsFeeEnabled] = useState(false);

  const [user] = useContext(UserContext);
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/users/${user.id}/setting`);
        const data = res.data.data;

        setIsGroupNoticeEnabled(data.isGroupNoticeEnabled);
        setIsPostEnabled(data.isPostEnabled);
        setIsScheduleEnabled(data.isScheduleEnabled);
        setIsFeeEnabled(data.isFeeEnabled);
      } catch (err) {
        console.error("알림 설정 불러오기 실패:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const updateSetting = async (updatedFields) => {
    try {
      await api.patch(`/users/${user.id}/setting`, updatedFields);
    } catch (err) {
      console.error("알림 설정 업데이트 실패:", err);
    }
  };
  const handleToggle = (key, currentValue, setValue) => {
    const newValue = !currentValue;
    setValue(newValue);
    updateSetting({ [key]: newValue });
  };

  return (
    <MyPageLayout title="알림 설정">
      <div className="notification-list">
        <div className="notification-row">
          <span className="notification-label">모임 공지 알림</span>
          <ToggleSwitch
            isOn={isGroupNoticeEnabled}
            onToggle={() =>
              handleToggle(
                "isGroupNoticeEnabled",
                isGroupNoticeEnabled,
                setIsGroupNoticeEnabled
              )
            }
          />
        </div>

        <div className="notification-row">
          <span className="notification-label">새 글 알림</span>
          <ToggleSwitch
            isOn={isPostEnabled}
            onToggle={() =>
              handleToggle("isPostEnabled", isPostEnabled, setIsPostEnabled)
            }
          />
        </div>

        <div className="notification-row">
          <span className="notification-label">새 일정 알림</span>
          <ToggleSwitch
            isOn={isScheduleEnabled}
            onToggle={() =>
              handleToggle(
                "isScheduleEnabled",
                isScheduleEnabled,
                setIsScheduleEnabled
              )
            }
          />
        </div>

        <div className="notification-row">
          <span className="notification-label">회비 알림</span>
          <ToggleSwitch
            isOn={isFeeEnabled}
            onToggle={() =>
              handleToggle("isFeeEnabled", isFeeEnabled, setIsFeeEnabled)
            }
          />
        </div>
      </div>
    </MyPageLayout>
  );
}

export default NotificationsPage;