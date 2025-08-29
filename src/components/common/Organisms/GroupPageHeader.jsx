import React, { useState } from "react";
import HeaderBar from "../Molecules/HeaderBar";
import TabBar from "../Molecules/TabBar";

export default function GroupPageHeader({ title, subtitle }) {
  const [active, setActive] = useState("게시판");
  return (
    <div>
      <HeaderBar title={title} subtitle={subtitle} />
      <div style={{ padding: "0 12px 12px" }}>
        <TabBar tabs={["게시판","일정","출석","회비","관리"]} active={active} onChange={setActive} />
      </div>
    </div>
  );
}

