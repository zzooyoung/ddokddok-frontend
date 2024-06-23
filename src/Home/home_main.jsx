import React, { useState, useEffect } from "react";
//npm install axios
import axios from "axios";
// npm install react-select
import Select from "react-select";
// npm install react-syntax-highlighter
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// npm install react-syntax-highlighter prism-react-renderer
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";

import "./styles.css";
import { useNavigate } from "react-router-dom";
import StudyCatalogue from "./StudyCatalogue";

const Main = () => {
  const navigate = useNavigate();
  const [studies, setStudies] = useState([]);

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
            },
          }
        );
        setStudies(response.data);
      } catch (error) {
        console.error("Error fetching studies:", error);
      }
    };
    fetchStudies();
  }, []);

  const createStudyClick = () => {
    navigate("/createStudy");
  };

  return (
    <div>
      <div className="main-container">
        <div className="content1">
          <div className="section1">
            <img></img>
          </div>
          <div className="section2">
            <p>똑똑은</p>
            <p>비대면 스터디 플랫폼입니다.</p>
          </div>
        </div>
        <button onClick={createStudyClick} className="create-study-button">
          스터디 생성 버튼
        </button>
        <div className="divwrapper-container">
          {studies.map((study) => (
            <StudyCatalogue
              key={study.study_id}
              className="div-wrapper"
              title={study.title}
              image={study.image_url}
              studyId={study.study_id} // studyId를 전달합니다.
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
