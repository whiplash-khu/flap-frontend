import React from "react";
import "./TabBar.css";

export default function TabBar({ tabs=["게시판","일정","출석","회비","관리"], active, onChange }) {
  return (
    <nav className="tabbar" role="tablist">
      {tabs.map(t => (
        <button 
          key={t} 
          role="tab" 
          aria-selected={active===t} 
          className={`tab-item ${active===t?"active":""}`} 
          onClick={()=>onChange && onChange(t)}
        >
          {t}
        </button>
      ))}
    </nav>
  );
}
