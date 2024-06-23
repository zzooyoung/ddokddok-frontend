import React, { useState, useEffect } from "react";
import axios from "axios";
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

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "http://192.168.239.11:8080/question/list",
          {
            params: filters,
          }
        );

        console.log("Fetched questions:", response.data);
        setQuestions(response.data.data || []); // 데이터 설정 (response.data.data가 정의되지 않은 경우 빈 배열 사용)
      } catch (error) {
        console.error("Error fetching questions:", error);
        // 에러 처리 (예: 에러 메시지 표시)

      }
    };

    fetchQuestions();
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
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
        <input
          type="number"
          name="page"
          value={filters.page}
          onChange={handleChange}
          placeholder="페이지 번호"
        />
        <input
          type="number"
          name="perPage"
          value={filters.perPage}
          onChange={handleChange}
          placeholder="페이지 당 항목 수"
        />


        <div className="qna-list">
          {questions.length > 0 ? (
            questions.map((question) => (
              <div className="question" key={question.question_id}>
                <div className="question-title">{question.title}</div>
                <p className="question-content">{question.content}</p>
                <p>작성자: {question.nickname}</p>
                <p>작성일: {new Date(question.created_at).toLocaleString()}</p>
                <p>좋아요 수: {question.likes_count}</p>
              </div>
            ))
          ) : (
            <p>질문이 없습니다.</p>
          )}

        </div>
      </div>
    </div>
  );
};

export default QnaPage;
