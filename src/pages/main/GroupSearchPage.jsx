import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./GroupSearchPage.css";

function GroupSearchPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    console.log("검색어:", searchTerm);
    // TODO: 실제 API 검색 로직 구현
  };

  return (
    <div className="search-page-container">
      <header className="search-header">
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            autoFocus
          />
        </div>
        <button className="cancel-button" onClick={() => navigate(-1)}>
          취소
        </button>
      </header>

      <main className="search-results-area">
        {searchTerm === "" && (
          <p className="placeholder-text">
            모임 이름, 태그 등으로 검색해보세요.
          </p>
        )}

        {results.map((group) => (
          <div key={group.id} className="result-item">
            <h4>{group.name}</h4>
            <p>{group.tags.join(" ")}</p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default GroupSearchPage;
