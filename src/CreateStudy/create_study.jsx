import React from 'react'
import './styles.css';

function create_study() {

  
  
    const handleCategoryBtn = (e) => {

    };
      
  return (
    <div>
      -------------------
      스터디 생성 페이지입니다
      -------------------
      <div className="createStudy-container">
        <form >
            <div className="form-group">
                <label htmlFor="title">스터디제목</label>
                <input placeholder='스터디 제목을 입력해주세요'/>
            </div>


            <div className="form-group">
                <label htmlFor="category">카테고리</label>
                <button class="categoryBtn" onClick="handleCategoryBtn">백엔드</button>
                <button class="categoryBtn" onClick="handleCategoryBtn">프론트</button>
                <button class="categoryBtn" onClick="handleCategoryBtn">알고리즘</button>
                <button class="categoryBtn" onClick="handleCategoryBtn">Java</button>
                <button class="categoryBtn" onClick="handleCategoryBtn">node</button>

            </div>

            <div className="form-group">
                <label htmlFor="introduceText">소개글</label>
                <input placeholder='스터디 제목을 입력해주세요'/>
                <textarea name="postContent" />

                
            </div>


            <div className="form-group">
                <label htmlFor="studySession">스터디 생성 페이지</label>
                <input placeholder='스터디 제목을 입력해주세요'/>
            </div>

            <div className="form-group">
                <label htmlFor="mainImageUpload">메인이미지 업로드</label>
                <p>* 540px x 540px 로 업로드 됩니다.</p>
                
            </div>

            <div className="form-group">
                <label htmlFor="subject">주제</label>
                <input placeholder='스터디 주제를 입력해주세요'/>
            </div>

            <div className="form-group">
                <label htmlFor="goals">배경 및 목표</label>
                <input placeholder='스터디 배경 및 목표를 입력해주세요'/>
            </div>

            <div className="form-group">
                <label htmlFor="communication">커뮤니케이션</label>
                <input placeholder='스터디 멤버들과 커뮤니티케이션할 방법을 입력해주세요'/>
            </div>

            <div className="form-group">
                <label htmlFor="curriculum">커리큘럼</label>
                <input placeholder='스터디 멤버들과 커뮤니티케이션할 방법을 입력해주세요'/>
            </div>

            <div className="form-group">
                <label htmlFor="communication">학습 자료</label>
                <button>파일 업로드</button>
                <input placeholder='스터디 멤버들과 커뮤니티케이션할 방법을 입력해주세요'/>            
            </div>
        <button className="submit-button">등록</button>

        </form>

      </div>
    </div>
  )
}

export default create_study;