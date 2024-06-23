import React from "react";
import Text from "./Text";
import TextArea from "./TextArea";
import "./style.css";

const StudyHome = () => {
  return (
    //이미지 넣으면 전체 감싸는 div 추가할 것
    <div className="div-wrapper-screen">
      <h1>이미지 들어가야함</h1>
      <div className="container">
        <Text className="text" content="스터디 제목" />
        <TextArea
          className="textarea"
          placeholder="스터디 제목을 수정해주세요!"
        />
      </div>

      <h1>태그 들어가야함</h1>

      <div className="container">
        <Text className="text" content="스터디 소개" />
        <textarea
          className="textarea"
          placeholder="스터디 소개 부분을 수정해주세요!"
        />
      </div>

      <div className="buttons">
        <button className="cancelButton">취소</button>
        <button className="saveButton">수정 완료</button>
      </div>
    </div>
  );
};

export default StudyHome;
