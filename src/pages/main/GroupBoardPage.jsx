import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import GroupDetailLayout from "../../components/layout/GroupDetailLayout";
import {
  FaRegCheckCircle,
  FaRegCommentDots,
  FaEllipsisV,
} from "react-icons/fa";
import "./GroupBoardPage.css";

const generateMockPosts = (page, limit) => {
  const posts = [];
  const startId = (page - 1) * limit + 1;
  for (let i = 0; i < limit; i++) {
    const id = startId + i;
    posts.push({
      id: id,
      title:
        id % 3 === 0 ? `[공지] ${id}번째 공지사항` : `[잡담] ${id}번째 잡담`,
      author: `너구리${id % 5}`,
      comments: Math.floor(Math.random() * 10),
      likes: Math.floor(Math.random() * 20),
      date: `2025/07/${String((id % 30) + 1).padStart(2, "0")}`,
      content: `이것은 ${id}번째 게시물의 내용입니다.`,
    });
  }
  return posts;
};

const PAGE_LIMIT = 10;

function GroupBoardPage() {
  const { groupId } = useParams();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();
  const loadMoreRef = useRef(null);

  const loadMorePosts = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const newPosts = generateMockPosts(nextPage, PAGE_LIMIT);
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setPage(nextPage);
      }
      if (nextPage >= 5) {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 1000);
  }, [page, isLoading, hasMore]);

  useEffect(() => {
    if (page === 0) {
      loadMorePosts();
    }
  }, [loadMorePosts, page]);

  useEffect(() => {
    const options = { root: null, rootMargin: "20px", threshold: 1.0 };
    observerRef.current = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading && hasMore) {
        loadMorePosts();
      }
    }, options);

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observerRef.current.observe(currentRef);
    }

    return () => {
      if (observerRef.current && currentRef) {
        observerRef.current.unobserve(currentRef);
      }
    };
  }, [loadMorePosts, isLoading, hasMore]);

  return (
    <GroupDetailLayout groupName="스트리트 푸드 파이터">
      <div className="post-list-container">
        {posts.map((post) => (
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
        {isLoading && (
          <div>
            <p style={{ textAlign: "center", color: "#888" }}>
              게시물 로딩 중...
            </p>
          </div>
        )}
        {hasMore && (
          <div
            ref={loadMoreRef}
            style={{ height: "50px" }}
            aria-hidden="true"
          />
        )}
        {!hasMore && posts.length > 0 && (
          <div>
            <p style={{ textAlign: "center", color: "#aaa" }}>
              모든 게시물을 불러왔습니다.
            </p>
          </div>
        )}
      </div>
      <div>
        <Link to={`/group/${groupId}/board/new`} className="create-post-fab">
          +
        </Link>
      </div>
    </GroupDetailLayout>
  );
}

export default GroupBoardPage;
