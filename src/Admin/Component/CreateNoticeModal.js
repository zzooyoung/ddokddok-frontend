import React, { useState, useEffect } from 'react';
import './CreateNoticeModal.css';

function CreateNoticeModal({ isOpen, onClose }) {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [studyId, setStudyId] = useState('');
  
  const handleSubmit = async (e) => {
    console.log("제출되었습니다.")
    console.log("title : ",title);
    console.log("content: ",content);
    e.preventDefault(); // Prevent default form submission behavior
    
    const formData = {
      title,
      content,
      studyId
    };

    try {
      const response = await fetch('http://192.168.0.98:8080/notice', {
        
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


  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <button onClick={onClose} className="close-button">닫기</button>
        </div>
        <h2 class="modal-title">공지 작성</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">스터디제목</label>
            <input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder='스터디 제목을 입력해주세요'/>
          </div>
          <div className="form-group">
            <label htmlFor="content">내용</label>
            <textarea id="content" value={content} onChange={e => setContent(e.target.value)} placeholder='소개글을 입력해주세요' style={{ width: '100%', height: '150px' }} />
        </div>

        <div className="form-group">
            <label htmlFor="studyId">스터디아이디</label>
            <textarea id="studyId" value={studyId} onChange={e => setStudyId(e.target.value)} placeholder='소개글을 입력해주세요' style={{ width: '100%', height: '150px' }} />
        </div>
        <button type="submit" className="submit-button">등록</button>
        </form>
        {/* CreateNotice 컴포넌트의 내용을 여기에 포함하거나, CreateNotice를 그대로 사용 */}
      </div>
    </div>
  );
}

export default CreateNoticeModal;