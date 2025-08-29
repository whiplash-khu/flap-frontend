import React from "react";
import IconButton from "../Atoms/IconButton";
import { FaArrowLeft, FaEllipsisV } from "react-icons/fa";
import "./HeaderBar.css";

export default function HeaderBar({ title, subtitle, onBack, onMenu }) {
  return (
    <header className="headerbar">
      <IconButton icon={<FaArrowLeft />} onClick={onBack} ariaLabel="뒤로가기" />
      <div className="header-center">
        <h1 className="header-title">{title}</h1>
        {subtitle && <div className="header-sub">{subtitle}</div>}
      </div>
      <IconButton icon={<FaEllipsisV />} onClick={onMenu} ariaLabel="옵션" />
    </header>
  );
}
