// src/components/QnaCreatePage.js

import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./style.css";

const QnaCreatePage = () => {
  const { study_id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        "http://192.168.0.98:8080/question/update",
        {
          question_id,
          title,
          content,
          member_id,
          study_id,
        }
      );

      setTitle("");
      setContent("");
      setSuccess("질문이 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("Error creating question:", error);
      setError("질문 수정에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>QnA 수정 페이지</h1>
      <form onSubmit={handleSubmit} className="qna-form">
        <div className="form-group">
          <label htmlFor="title">타이틀</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="타이틀을 수정해주세요"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 수정해주세요"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "생성 중..." : "질문 생성"}
        </button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default QnaCreatePage;
