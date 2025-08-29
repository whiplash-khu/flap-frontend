import React from "react";
import GroupPageHeader from "../components/common/Organisms/GroupPageHeader";
import PostList from "../components/common/Organisms/PostList";
import FloatingButton from "../components/common/Molecules/FloatingButton";

export default function GroupPage(){
  return (
    <>
      <GroupPageHeader title="스트리트 푸드 파이터" subtitle="매주 화요일 | 오후 6시" />
      <PostList />
      <FloatingButton onClick={()=>alert("글쓰기 클릭")} />
    </>
  );
}
