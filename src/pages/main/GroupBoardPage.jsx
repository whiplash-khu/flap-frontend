import React from "react";
import { Link, useParams } from "react-router-dom";
import GroupDetailLayout from "../../components/layout/GroupDetailLayout";
import "./GroupBoardPage.css";

const mockPosts = [
  {
    id: 1,
    title: "[공지] 저녁 메뉴 정하기 투표",
    author: "너구리",
    comments: 6,
    likes: 8,
  },
  {
    id: 2,
    title: "[메뉴] 라면 먹을까?",
    author: "너구리",
    comments: 0,
    likes: 0,
  },
];

function GroupBoardPage() {
  const { groupId } = useParams();

  return (
    <GroupDetailLayout groupName="스트리트 푸드 파이터">
      <div className="post-list-container">
        {mockPosts.map((post) => (
          <div key={post.id} className="post-item">
            <p className="post-title">{post.title}</p>
            <div className="post-meta">
              <span>{post.author}</span>
              <div className="post-stats">
                <span>좋아요 {post.likes}</span>
                <span>댓글 {post.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link to={`/group/${groupId}/board/new`} className="create-post-fab">
        +
      </Link>
    </GroupDetailLayout>
  );
}

export default GroupBoardPage;
