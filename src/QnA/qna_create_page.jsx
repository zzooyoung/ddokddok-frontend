import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./style.css";

const QnaCreatePage = () => {
  const { study_id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [studies, setStudies] = useState([]);
  const [selectedStudy, setSelectedStudy] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const memberId = sessionStorage.getItem("id");
        const response = await axios.post(
          "http://192.168.239.11:8080/mypage/show_study/joined?sort=latest&page=1&perPage=20",
          {
            sort: "latest",
            page: 1,
            perPage: 20,
            member_id: memberId,
          }
        );
        setStudies(response.data);
      } catch (error) {
        console.error("Error fetching studies:", error);
        setError("스터디 목록을 불러오는 중에 오류가 발생했습니다.");
      }
    };

    fetchStudies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const memberId = sessionStorage.getItem("id");
      const response = await axios.post("http://192.168.239.11:8080/question", {
        title,
        content,
        studyId: selectedStudy,
        member_id: memberId,
      });

      setTitle("");
      setContent("");
      setSelectedStudy("");
      setSuccess("질문이 성공적으로 생성되었습니다.");
    } catch (error) {
      console.error("Error creating question:", error);
      setError("질문 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>QnA 생성 페이지</h1>
      <form onSubmit={handleSubmit} className="qna-form">
        <div className="form-group">
          <label htmlFor="title">타이틀</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="타이틀을 입력하세요"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="study">스터디 선택</label>
          <select
            id="study"
            value={selectedStudy}
            onChange={(e) => setSelectedStudy(e.target.value)}
            required
          >
            <option value="" disabled>
              스터디를 선택하세요
            </option>
            {studies.map((study) => (
              <option key={study.study_id} value={study.study_id}>
                {study.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
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
