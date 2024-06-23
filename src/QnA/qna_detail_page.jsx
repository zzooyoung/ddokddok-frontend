import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";

const QnaDetailPage = () => {
  const { question_id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.98:8080/question/id/${question_id}`
        );
        setQuestion(response.data);
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
    <div>
      {question ? (
        <div>
          <h1>{question.title}</h1>
          <p>{question.content}</p>
          <p>작성자: {question.nickname}</p>
          <p>작성일: {new Date(question.created_at).toLocaleString()}</p>
          {question.nickname === "currentUserNickname" && ( // replace with actual logic to check current user
            <button onClick={handleDelete} className="delete-button">
              삭제
            </button>
          )}
        </div>
      ) : (
        <p>질문을 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default QnaDetailPage;
