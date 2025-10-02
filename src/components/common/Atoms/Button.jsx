import React from "react";
export default function Button({ children, onClick, variant="primary" }) {
  const style = {
    background: variant==="primary" ? "var(--primary)" : "#eee",
    color: variant==="primary" ? "#fff" : "var(--primary)",
    border: "none",
    padding: "10px 14px",
    borderRadius: "12px",
    cursor: "pointer"
  };
  return <button style={style} onClick={onClick}>{children}</button>;
}
