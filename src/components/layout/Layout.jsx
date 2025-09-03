import { useState } from "react";
import styles from "./Layout.module.css";

const TABS = ["게시판", "일정", "출석", "회비", "가입"];

export default function Layout() {
  const [active, setActive] = useState("게시판");

  return (
    <div className={styles.root}>
      <div className={styles.phone}>
        <div className={styles.top}>
          <button className={styles.iconBtn} aria-label="뒤로가기">
            <ChevronLeft />
          </button>
          <button className={styles.iconBtn} aria-label="프로필">
            <UserIcon />
          </button>
        </div>

        <div className={styles.titleWrap}>
          <h1 className={styles.title}>스트리트 푸드 파이터</h1>
          <p className={styles.subtitle}>매주 화요일 | 오후 6시</p>
        </div>

        <div className={styles.panel}>
          <nav className={styles.tabs}>
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                className={`${styles.tab} ${active === t ? styles.active : ""}`}
                onClick={() => setActive(t)}
              >
                {t}
              </button>
            ))}
          </nav>

          <div className={styles.contentFrame}>
            <div className={styles.placeholder}>{active} 콘텐츠 영역</div>
          </div>
        </div>

        <div className={styles.homeIndicator} />
      </div>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M15 19L8 12L15 5" stroke="#111" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 21a8 8 0 10-16 0" stroke="#111" strokeWidth="2"
            strokeLinecap="round" />
      <circle cx="12" cy="8" r="4" stroke="#111" strokeWidth="2" />
    </svg>
  );
}
