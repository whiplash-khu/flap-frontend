import React from "react";
import { Link } from "react-router-dom";
import MyPageLayout from "../../components/layout/GroupDetailLayout";
import "./GroupSettingsPage.css";

function GroupSettingsPage() {
  return (
    <MyPageLayout title="모임 관리">
      <div className="settings-page-content">
        <div className="settings-list">
          <Link to="#" className="settings-item">
            <span>모임 관리</span>
            <span className="arrow-icon">▶</span>
          </Link>
          {/* 나중에 추가 */}
        </div>
      </div>
    </MyPageLayout>
  );
}

export default GroupSettingsPage;
