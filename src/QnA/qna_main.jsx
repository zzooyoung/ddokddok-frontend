import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

const QnaPage = () => {
  const [questions, setQuestions] = useState([]);
  const [tags, setTags] = useState([]); // 태그 상태 추가
  const [filters, setFilters] = useState({
    keyword: "",
    tagId: "",
    sort: "asc",
    page: 1,
    perPage: 10,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loginError, setLoginError] = useState(null); // 로그인 오류 상태 추가

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "http://192.168.0.98:8080/question/list",
          {
            params: filters,
          }
        );

        console.log("Fetched questions:", response.data);
        setQuestions(response.data || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("질문을 불러오는 중에 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [filters]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("http://192.168.0.98:8080/study/tag");
        setTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleCreateClick = () => {
    const currentUserId = sessionStorage.getItem("id");
    if (!currentUserId) {
      setLoginError("로그인 해주세요.");
    } else {
      navigate("create");
    }
  };

  const handleQuestionClick = (question_id) => {
    navigate(`/question/${question_id}`);
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

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
          {tags.map((tag) => (
            <option key={tag.tag_id} value={tag.tag_id}>
              {tag.tag_name}
            </option>
          ))}
        </select>
        <select name="sort" value={filters.sort} onChange={handleChange}>
          <option value="asc">오름차순</option>
          <option value="desc">내림차순</option>
        </select>

        <button onClick={handleCreateClick} className="create-button">
          QnA 생성 페이지로 이동
        </button>
        {loginError && <p className="error">{loginError}</p>}

        <div className="qna-list">
          {questions.length > 0 ? (
            questions.map((question) => (
              <div
                className="question"
                key={question.question_id}
                onClick={() => handleQuestionClick(question.question_id)}
              >
                <div className="question-stats">
                  <div className="answers-count">
                    <p>답변</p>
                    <p className="count">{question.answers_count || 0}</p>
                  </div>
                </div>
                <div className="question-content-wrapper">
                  <div className="question-header">
                    <h2 className="question-title">{question.title}</h2>
                    <div className="question-user">
                      <img
                        src="https://via.placeholder.com/50"
                        alt="user"
                        className="user-avatar"
                      />
                      <p className="user-name">{question.nickname}</p>
                    </div>
                  </div>
                  <p className="question-content">{question.content}</p>
                  <div className="question-footer">
                    {question.tags.map((tag) => (
                      <span key={tag.tag_id} className="tag">
                        {tag.tag_name}
                      </span>
                    ))}
                  </div>
                  <div className="question-footer2">
                    <span className="created-at">
                      {new Date(question.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
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
