import React from "react";
import "./Avatar.css";
export default function Avatar({ src, size="medium" }) {
  return <img className={`avatar ${size}`} src={src} alt="avatar" />;
}
