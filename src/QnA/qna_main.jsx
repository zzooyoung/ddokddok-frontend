import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

const QnaPage = () => {
  const [questions, setQuestions] = useState([]);
  const [filters, setFilters] = useState({
    keyword: "",
    tagId: "",
    sort: "asc",
    page: 1,
    perPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "http://192.168.0.98:8080/question/list",
          {
            params: filters,
          }
        );

        console.log("Fetched questions:", response.data.data);
        setQuestions(response.data.data || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Failed to fetch questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
      page: name === "perPage" ? 1 : prevFilters.page, // Reset to first page if items per page changes
    }));
  };

  const handlePageChange = (direction) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: Math.max(prevFilters.page + direction, 1),
    }));
  };

  const handleCreateClick = () => {
    navigate("create");
  };

  return (
    <div>
      <h1>QnA 페이지</h1>

      <div className="qna">
        <input
          type="text"
          name="keyword"
          value={filters.keyword}
          onChange={handleChange}
          placeholder="검색어 입력"
          className="text-wrapper"
        />
        <select name="tagId" value={filters.tagId} onChange={handleChange}>
          <option value="">태그 선택</option>
          <option value="1">태그 1</option>
          <option value="2">태그 2</option>
        </select>
        <select name="sort" value={filters.sort} onChange={handleChange}>
          <option value="asc">오름차순</option>
          <option value="desc">내림차순</option>
        </select>
        <select name="perPage" value={filters.perPage} onChange={handleChange}>
          <option value={10}>10개씩 보기</option>
          <option value={20}>20개씩 보기</option>
          <option value={50}>50개씩 보기</option>
        </select>

        <div className="qna-list">
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {questions.length > 0
            ? questions.map((question) => (
                <div className="question" key={question.question_id}>
                  <div className="question-title">{question.title}</div>
                  <p className="question-content">{question.content}</p>
                  <p>작성자: {question.nickname}</p>
                  <p>
                    작성일: {new Date(question.created_at).toLocaleString()}
                  </p>
                  <p>좋아요 수: {question.likes_count}</p>
                </div>
              ))
            : !loading && <p>질문이 없습니다.</p>}
        </div>

        <div className="pagination">
          <button
            onClick={() => handlePageChange(-1)}
            disabled={filters.page === 1}
          >
            이전 페이지
          </button>
          <span>페이지 {filters.page}</span>
          <button onClick={() => handlePageChange(1)}>다음 페이지</button>
          <button onClick={handleCreateClick}>질문 생성</button>
        </div>
      </div>
    </div>
  );
};

export default QnaPage;
