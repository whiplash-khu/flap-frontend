import React from "react";
import "./ToggleSwitch.css";

function ToggleSwitch({ isOn, onToggle }) {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isOn} onChange={onToggle} />
      <span className="slider"></span>
    </label>
  );
}

export default ToggleSwitch;
