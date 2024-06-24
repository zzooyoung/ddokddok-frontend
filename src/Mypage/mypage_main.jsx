import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import default_img from '../assets/default_img.png';
import { useLocation } from 'react-router-dom';

// Import content components
import ParticipateStudy_StudyAllContent from './ParticipateStudy_StudyAllContent';
import ParticipateStudy_OngoingContent from './ParticipateStudy_OngoingContent';
import ParticipateStudy_FinishedContent from './ParticipateStudy_FinishedContent';

import CreateStudy_PrepContent from './CreateStudy_PrepContent';
import CreateStudy_OngoingContent from './CreateStudy_OngoingContent';
import CreateStudy_FinishedContent from './CreateStudy_FinishedContent';
import imgWithUrl from '../apis/imgWithUrl';


import { Link } from 'react-router-dom';

const Mypage = () => {
  const [nickname, setNickName] = useState('');
  const [profile, setProfile] = useState('');
  const [id, setId] = useState('');
  const location = useLocation();
  const [joinList, setJoinList] = useState();
  const [createList, setCreateList] = useState([]);
  const { param1 } = location.state || {};
  console.log("Parameter from previous page:", param1);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const memberId = sessionStorage.getItem("id");
        setId(memberId);
        console.log("member_id", memberId);

        const response = await axios.post("http://192.168.0.98:8080/userinfo", {
          "member_id": memberId,
        });

        console.log("User info:", response.data);
        setNickName(response.data.nickname);
        
        setProfile(response.data.profile_image_url == null ? default_img : imgWithUrl(response.data.profile_image_url));
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchJoinStudy = async () => {
      if (!id) return; // Prevent fetch without id

      try {
        const response1 = await axios.post("http://192.168.0.98:8080/mypage/show_study/joined?sort=latest&page=1&perPage=20",
          {
          sort: "latest",
          page: 1,
          perPage: 10,
          member_id: id,
        });
        console.log("Join info:", response1.data);
        setJoinList(response1.data);
        console.log("JoinList:", joinList);
      } catch (error) {
        console.error("Error fetching join study info:", error);
      }
    };
    fetchJoinStudy();
  }, [id]);

  useEffect(() => {
    const fetchCreateStudy = async () => {
      if (!id) return; // Prevent fetch without id

      try {
        const response2 = await axios.post("http://192.168.0.98:8080/mypage/show_study/created?sort=latest&page=1&perPage=20", {
          sort: "latest",
          page: 1,
          perPage: 10,
          member_id: id,
        });
        console.log("Create info:", response2.data);
        setCreateList(response2.data);
      } catch (error) {
        console.error("Error fetching create study info:", error);
      }
    };
    fetchCreateStudy();
  }, [id]);

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
        {/* <h2 className="title">나의 프로필</h2> */}
        <div className='profile-div'>
          <h2 className="user_id">{nickname}</h2>
          <div>
            <img className='user_profile' src={profile} alt="Profile"  />
          </div>
          {/* <button className="profileEditBtn">개인정보 수정</button> */}
        </div>
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
          {activeCategory1 === 'studyAll' && <ParticipateStudy_StudyAllContent params={joinList} />}
          {activeCategory1 === 'ongoing' && <ParticipateStudy_OngoingContent params={joinList} />}
          {activeCategory1 === 'finished' && <ParticipateStudy_FinishedContent params={joinList} />}
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
          {activeCategory2 === 'prep' && <CreateStudy_PrepContent params={createList} />}
          {activeCategory2 === 'ongoing' && <CreateStudy_OngoingContent params={createList} />}
          {activeCategory2 === 'finished' && <CreateStudy_FinishedContent params={createList} />}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
