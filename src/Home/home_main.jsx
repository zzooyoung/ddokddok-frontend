import React, { useState, useEffect } from "react";
//npm install axios
import axios from "axios";
import introImg from "../assets/introImg.png";

import "./styles.css";
import { useNavigate } from "react-router-dom";
import StudyCatalogue from "./StudyCatalogue";

const Main = () => {
  const navigate = useNavigate();
  const [studies, setStudies] = useState([]);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await axios.get(
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
    <div className="main-container">
      <div className="introduce">
        <div className="rowValue">
          <div className="intro-img">
            <img src={introImg} alt="Logo" className="introImg" />
          </div>

          <div className="introduce-content">
            <div className="introduce-title">똑똑</div>
            <div className="introduce-text">비대면 스터디 플랫폼입니다.</div>
          </div>
        </div>

        <div className="rowValue">
          <div class="button-container">
            <button onClick={createStudyClick} className="create-study-button">
              스터디 생성 버튼
            </button>
          </div>
        </div>
      </div>

      <div className="studyList">
        <div className="divwrapper-container">
          {studies.slice(0, 3).map((study) => (
            <StudyCatalogue
              key={study.study_id}
              className="div-wrapper-img"
              title={study.title}
              image={study.image_url}
              studyId={study.study_id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
