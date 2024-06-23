import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import { useLocation } from 'react-router-dom';
// Import content components
import ParticipateStudy_StudyAllContent from './ParticipateStudy_StudyAllContent';
import ParticipateStudy_OngoingContent from './ParticipateStudy_OngoingContent';
import ParticipateStudy_FinishedContent from './ParticipateStudy_FinishedContent';

import CreateStudy_PrepContent from './CreateStudy_PrepContent';
import CreateStudy_OngoingContent from './CreateStudy_OngoingContent';
import CreateStudy_FinishedContent from './CreateStudy_FinishedContent';




const Mypage = () => {
  const location = useLocation();
  const { param1 } = location.state || {};
  console.log("Parameter from previous page:", param1);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const id = sessionStorage.getItem("member_id")
        console.log("member_id" ,id);
        const response = await axios.get("http://192.168.0.98:8080/userinfo");
        console.log("User info:", response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const profileImageURL = "https://item.kakaocdn.net/do/a7fd7c0630f8aea8419a565fb2773bbc82f3bd8c9735553d03f6f982e10ebe70";
  const [activeCategory1, setActiveCategory1] = useState('studyAll');
  const [activeCategory2, setActiveCategory2] = useState('prep');

  const handleCategoryChange1 = (category) => {
    setActiveCategory1(category);
  };

  const handleCategoryChange2 = (category) => {
    setActiveCategory2(category);
  };

  return (
    <div className="mypage-container">
      {/* Profile Section */}
      <div className="profile-container">
        <h2 className="title">나의 프로필</h2>
        <div className="user_id">nickname</div>
        <div>
          <img src={profileImageURL} alt="Profile" />
        </div>
        <button className="profileEditBtn">개인정보 수정</button>
      </div>

      {/* Participated Studies Section */}
      <div className="participateStudy-container">
        <h2 className="title">내가 참여하는 스터디</h2>
        <div className="category1">
          <button
            className={`cateBtn1 ${activeCategory1 === 'studyAll' ? 'activeBtn' : ''}`}
            onClick={() => handleCategoryChange1('studyAll')}
          >
            전체보기
          </button>
          <button
            className={`cateBtn1 ${activeCategory1 === 'ongoing' ? 'activeBtn' : ''}`}
            onClick={() => handleCategoryChange1('ongoing')}
          >
            진행중인 스터디
          </button>
          <button
            className={`cateBtn1 ${activeCategory1 === 'finished' ? 'activeBtn' : ''}`}
            onClick={() => handleCategoryChange1('finished')}
          >
            종료된 스터디
          </button>
        </div>
        <div>
          {activeCategory1 === 'studyAll' && <ParticipateStudy_StudyAllContent />}
          {activeCategory1 === 'ongoing' && <ParticipateStudy_OngoingContent />}
          {activeCategory1 === 'finished' && <ParticipateStudy_FinishedContent />}
        </div>
      </div>

      {/* Created Studies Section */}
      <div className="createStudy-container">
        <h2 className="title">내가 개설한 스터디</h2>
        <div className="category2">
          <button
            className={`cateBtn2 ${activeCategory2 === 'prep' ? 'activeBtn' : ''}`}
            onClick={() => handleCategoryChange2('prep')}
          >
            오픈준비중인 스터디
          </button>
          <button
            className={`cateBtn2 ${activeCategory2 === 'ongoing' ? 'activeBtn' : ''}`}
            onClick={() => handleCategoryChange2('ongoing')}
          >
            진행중인 스터디
          </button>
          <button
            className={`cateBtn2 ${activeCategory2 === 'finished' ? 'activeBtn' : ''}`}
            onClick={() => handleCategoryChange2('finished')}
          >
            종료된 스터디
          </button>
        </div>
        <div>
          {activeCategory2 === 'prep' && <CreateStudy_PrepContent />}
          {activeCategory2 === 'ongoing' && <CreateStudy_OngoingContent />}
          {activeCategory2 === 'finished' && <CreateStudy_FinishedContent />}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
