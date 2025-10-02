import React from "react";
export default function Badge({ count }) {
  return (
    <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(0,0,0,0.04)",padding:"6px 10px",borderRadius:999}}>
      <svg width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.2L4.8 12 3.4 13.4 9 19l12-12L19.6 5z"/></svg>
      <span style={{fontSize:13}}>{count}</span>
    </div>
  );
}
