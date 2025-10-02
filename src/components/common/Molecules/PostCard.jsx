import React from "react";
import { FaEllipsisV, FaCheckCircle } from "react-icons/fa";
import "./PostCard.css";

export default function PostCard({ title, author, date, content, votes=0 }) {
  return (
    <article className="post-card" aria-labelledby={`post-${title}`}>
      <div className="post-row">
        <h3 id={`post-${title}`} className="post-title">{title}</h3>
        <button className="post-menu" aria-label="게시물 옵션"><FaEllipsisV /></button>
      </div>
      <div className="post-meta">{author} · {date}</div>
      <p className="post-content">{content}</p>
      <div className="post-footer">
        <div className="badge"><FaCheckCircle/> <span>{votes}</span></div>
      </div>
    </article>
  );
}
