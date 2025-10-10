import React, { useEffect, useRef } from "react";

function YearMonthPicker({
  isOpen,
  onClose,
  currentDate,
  onYearChange,
  onMonthChange,
}) {
  const yearListRef = useRef(null);
  const monthListRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const selectedYearEl = yearListRef.current?.querySelector(".selected");
      if (selectedYearEl) {
        yearListRef.current.scrollTop =
          selectedYearEl.offsetTop -
          yearListRef.current.offsetHeight / 2 +
          selectedYearEl.offsetHeight / 2;
      }
      const selectedMonthEl = monthListRef.current?.querySelector(".selected");
      if (selectedMonthEl) {
        monthListRef.current.scrollTop =
          selectedMonthEl.offsetTop -
          monthListRef.current.offsetHeight / 2 +
          selectedMonthEl.offsetHeight / 2;
      }
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const pickerYears = Array.from({ length: 10 }, (_, i) => year - 5 + i);
  const pickerMonths = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="picker-backdrop" onClick={onClose}>
      <div
        className="year-month-picker-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="picker-columns">
          <div className="picker-column year-list" ref={yearListRef}>
            {pickerYears.map((y) => (
              <button
                key={y}
                className={`picker-button ${y === year ? "selected" : ""}`}
                onClick={() => onYearChange(y)}
              >
                {y}년
              </button>
            ))}
          </div>
          <div className="picker-column month-list" ref={monthListRef}>
            {pickerMonths.map((m) => (
              <button
                key={m}
                className={`picker-button ${m - 1 === month ? "selected" : ""}`}
                onClick={() => onMonthChange(m - 1)}
              >
                {m}월
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YearMonthPicker;
