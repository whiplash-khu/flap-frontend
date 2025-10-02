import React from "react";
import PostCard from "../Molecules/PostCard";

const dummy = [
  { title:"[공지] 회비는 제때제때 냅시다 ——", author:"모임장", date:"2025/07/01", content:"왜냐면 제가 돈이 없기 때문입니다", votes:6 },
  { title:"!점메추", author:"너구리", date:"2025/07/19", content:"라면 먹을까 햄버거 먹을까", votes:6 },
  { title:"다음엔 샤브샤브 먹으러 가자", author:"피카츄", date:"2025/06/29", content:"샤브올데이 가보고 싶음", votes:6 }
];

export default function PostList() {
  return (
    <div style={{ padding:16, background: "var(--accent)", minHeight:"60vh" }}>
      {dummy.map((p,i) => <PostCard key={i} {...p} />)}
    </div>
  );
}
