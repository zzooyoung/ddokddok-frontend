import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css"; // 통합된 CSS 파일을 import합니다.

import Component from "./Component";
import DivWrapper from "./DivWrapper";

const StudyList = () => {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("latest"); // 정렬 순서 상태 추가

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await axios.post(
          "http://192.168.0.98:8080/study/list",
          null,
          {
            params: {
              page: 1,
              perPage: 10,
              sort: sortOrder,
            },
          }
        );
        setStudies(response.data);
      } catch (error) {
        console.error("Error fetching studies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudies();
  }, [sortOrder]); // sortOrder가 변경될 때마다 데이터를 다시 가져옵니다.

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  return (
    <div className="div-wrapper-screen">
      <div className="div-2">
        <div className="component-container">
          {studies.map((study) => (
            <Component
              key={study.study_id}
              className="component"
              image={study.image_url}
            />
          ))}
        </div>
        <div className="sort-buttons">
          <button onClick={() => handleSortChange("latest")}>최신순</button>
          <button onClick={() => handleSortChange("oldest")}>오래된 순</button>
        </div>
        <div className="divwrapper-container">
          {studies.map((study) => (
            <DivWrapper
              key={study.study_id}
              className="div-wrapper"
              title={study.title}
              image={study.image_url}
              studyId={study.study_id} // studyId를 전달합니다.
            />
          ))}
        </div>
        <div className="navigation">
          <div className="nav-item">이전</div>
          <div className="page-info">1 / 1</div>
          <div className="nav-item">다음</div>
        </div>
      </div>
    </div>
  );
};

export default StudyList;
