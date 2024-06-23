import React, { useState, useEffect } from 'react';
import './styles.css';

function CreateStudy() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [curriculum, setCurriculum] = useState('');
  const [mainSubject, setMainSubject] = useState('');
  const [goals, setGoals] = useState('');

  

  const handleSubmit = async (e) => {
    console.log("제출되었습니다.")
    console.log("title : ",title);
    console.log("content: ",content);
    console.log("curriculum: ",curriculum);
    console.log("mainSubject: ",mainSubject);
    console.log("goals : ", goals);
    e.preventDefault(); // Prevent default form submission behavior
    
    const formData = {
      title,
      content,
      curriculum,
      main_subject: mainSubject,
      goals,
    };

    try {
      const response = await fetch('http://192.168.0.98:8080/study', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Study created successfully:', await response.json());
      } else {
        console.error('Failed to create study:', response);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h1>스터디 생성 페이지입니다</h1>
      <div className="createStudy-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">스터디제목</label>
            <input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder='스터디 제목을 입력해주세요'/>
          </div>
          <div className="form-group">
            <label htmlFor="content">소개글</label>
            <textarea id="content" value={content} onChange={e => setContent(e.target.value)} placeholder='소개글을 입력해주세요'/>
          </div>
          <div className="form-group">
            <label htmlFor="curriculum">커리큘럼</label>
            <input id="curriculum" value={curriculum} onChange={e => setCurriculum(e.target.value)} placeholder='스터디 커리큘럼을 입력해주세요'/>
          </div>
          <div className="form-group">
            <label htmlFor="mainSubject">주제</label>
            <input id="mainSubject" value={mainSubject} onChange={e => setMainSubject(e.target.value)} placeholder='스터디 주제를 입력해주세요'/>
          </div>
          <div className="form-group">
            <label htmlFor="goals">목표</label>
            <input id="goals" value={goals} onChange={e => setGoals(e.target.value)} placeholder='스터디 목표를 입력해주세요'/>
          </div>
          <button type="submit" className="submit-button">등록</button>
        </form>
      </div>
    </div>
  );
}

export default CreateStudy;