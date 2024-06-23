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
        console.log("Fetched questions:", response.data); // 데이터 로그 확인
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        // Handle error (e.g., show error message)
      }
    };

    fetchQuestions();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>QnA 페이지</h1>
      <div className="qn-a">
        {/* Filter inputs/selects */}
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
          {/* Add more tag options */}
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

        {/* Question list */}
        <div className="q-a">질문 리스트</div>
        <div className="group-2">
          {questions.map((question) => (
            <div className="overlap" key={question.id}>
              <div className="text-wrapper-9">{question.title}</div>
              <p className="p">{question.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QnaPage;
