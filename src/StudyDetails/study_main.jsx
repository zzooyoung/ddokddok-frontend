import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css"; // 통합된 CSS 파일을 import합니다.

import Home from "./Component/S_home.jsx";
import Notice from "./Component/S_notice";
import LearningPage from "./Component/S_learningpage";
import Chat from "./Component/S_chat";
import Member from "./Component/S_member";
import Hw from "./Component/S_hw";
import Calender from "./Component/S_calender";

const StudyCard = ({ category, level, title, date, imageUrl }) => (
  <div className="study-card">
    <div className="study-info">
      <div className="study-tags">
        <span className="tag category">{category}</span>
        <span className="tag level">{level}</span>
      </div>
      <h3 className="study-title">{title}</h3>
      <p className="study-date">{date}</p>
    </div>
    <img
      src={imageUrl}
      alt="Study visual representation"
      className="study-image"
    />
  </div>
);

const StatCard = ({ label, value, description }) => (
  <div className="stat-card">
    <h4 className="stat-label">{label}</h4>
    <p className="stat-value">{value}</p>
    <p className="stat-description">{description}</p>
  </div>
);

const NavItem = ({ label, isActive = false }) => (
  <li className={`nav-item ${isActive ? "active" : ""}`}>
    <a href="#" className="nav-link">
      {label}
    </a>
  </li>
);

const Study = (studyId) => {
  const [loading, setLoading] = useState(true);
  const [activeComponent, setActiveComponent] = useState("");

  const components = {
    home: <Home />,
    notice: <Notice />,
    learningPage: <LearningPage />,
    chat: <Chat />,
    members: <Member />,
    hw: <Hw />,
    calender: <Calender />,
  };

  const NavItem = ({ label, componentName, isActive = false }) => (
    <li
      className={`nav-item ${isActive ? "active" : ""}`}
      onClick={() => setActiveComponent(componentName)} // 컴포넌트 이름을 상태로 설정
    >
      <a href="#" className="nav-link">
        {label}
      </a>
    </li>
  );

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await axios.post(
          "http://192.168.239.11:8080/study/detailList?studyId=1",
          null,
          {
            params: {
              studyId: studyId,
            },
          }
        );
      } catch (error) {
        console.error("Error fetching studies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="divider"></div>
      <main className="main-content">
        <h2 className="section-title">나의 스터디</h2>
        <section className="study-banner">
          <StudyCard
            category="백엔드"
            level="기초"
            title="승지의 우당탕탕 spring 교실"
            date="2024.05.31 ~ 2024.09.21"
            imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/75f4b070d35b0130574be81fd4d176d1ea9dc4371422545aa7789c035cbe4b60?apiKey=c76cbc22e8484ee7adce376c21dd7f75&"
          />
        </section>
        <div className="dashboard">
          <aside className="sidebar">
            <nav className="nav-sidebar">
              <div className="nav-header"></div>
              <ul className="nav-list">
                <NavItem
                  label="홈"
                  componentName="home"
                  isActive={activeComponent === "home"}
                />
                <NavItem
                  label="공지"
                  componentName="notice"
                  isActive={activeComponent === "notice"}
                />
                <NavItem
                  label="학습 페이지"
                  componentName="learningPage"
                  isActive={activeComponent === "learningPage"}
                />
                <NavItem
                  label="스터디 멤버 보기"
                  componentName="members"
                  isActive={activeComponent === "members"}
                />
                <NavItem
                  label="채팅"
                  componentName="chat"
                  isActive={activeComponent === "chat"}
                />
                <NavItem
                  label="캘린더"
                  componentName="calendar"
                  isActive={activeComponent === "calendar"}
                />
                <NavItem
                  label="과제"
                  componentName="hw"
                  isActive={activeComponent === "hw"}
                />
              </ul>
            </nav>
          </aside>
          <div className="main-dashboard">
            <h2 className="dashboard-header">
              현재 N주차 진행 중이에요 ! 아자아자 ~ !
            </h2>
            <div>
              {activeComponent === "home" && <Home />}
              {activeComponent === "notice" && <Notice />}
              {activeComponent === "learningPage" && <LearningPage />}
              {activeComponent === "members" && <Member />}
              {activeComponent === "chat" && <Chat />}
              {activeComponent === "calendar" && <Calender />}
              {activeComponent === "hw" && <Hw />}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Study;
