import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./qna_detail_css.css";

const QnaDetailPage = () => {
  const { question_id } = useParams();
  const [question, setQuestion] = useState(null);
  const [tags, setTags] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.98:8080/question/id/${question_id}`
        );
        console.log(response.data);
        setQuestion(response.data.question); // 응답 데이터 구조에 맞게 설정
        setTags(response.data.tags || []); // tags 배열 설정
        setAnswers(response.data.answers || []); // answers 배열 설정
      } catch (error) {
        console.error("Error fetching question:", error);
        setError("질문을 불러오는 중에 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [question_id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://192.168.0.98:8080/question/${question_id}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting question:", error);
      setError("질문을 삭제하는 중에 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="container">
      {question ? (
        <div>
          <div className="question-header">
            <h1 className="question-title">
              {question.title}
              <div className="question-tags">
                {tags.map((tag) => (
                  <span key={tag.tag_id} className="question-tag">
                    #{tag.tag_name}
                  </span>
                ))}
              </div>
            </h1>
            <div className="question-meta">
              <div>
                <p>작성자: {question.nickname}</p>
                <p>작성일: {new Date(question.created_at).toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="question-content">{question.content}</div>

          <div>
            <h4>답변</h4>
            {answers.length > 0 ? (
              answers.map((answer) => (
                <div key={answer.answer_id} className="answer">
                  <div className="answer-meta">
                    <p>작성자: {answer.nickname}</p>
                    <p>
                      작성일: {new Date(answer.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="answer-content">{answer.content}</div>
                </div>
              ))
            ) : (
              <p>답변이 없습니다.</p>
            )}
          </div>

          <div className="actions">
            {question.nickname === "currentUserNickname" && (
              <>
                <button className="edit-button">수정</button>
                <button onClick={handleDelete} className="delete-button">
                  삭제
                </button>
              </>
            )}
            <button onClick={() => navigate("/qna")} className="edit-button">
              목록
            </button>
          </div>
        </div>
      ) : (
        <p>질문을 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default QnaDetailPage;
