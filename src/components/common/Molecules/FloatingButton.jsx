import React from "react";
import { FaPlus } from "react-icons/fa";
import "./FloatingButton.css";
export default function FloatingButton({ onClick }) {
  return <button className="fab" onClick={onClick} aria-label="새 글 추가"><FaPlus/></button>;
}
