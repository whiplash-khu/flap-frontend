import React from "react";
import { Link } from "react-router-dom";

export default function Home(){
  return (
    <main style={{padding:20}}>
      <h2>Flap</h2>
      <p><Link to="/group">스트리트 푸드 파이터</Link></p>
    </main>
  );
}
