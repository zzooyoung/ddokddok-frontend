import React, { useState } from "react";
import "./styles.css";

function CreateStudy() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null); // 이미지 파일을 저장할 상태 추가
  const [curriculum, setCurriculum] = useState([""]);
  const [mainSubject, setMainSubject] = useState("");
  const [goals, setGoals] = useState("");
  const [tags, setTags] = useState([""]);
  const [member_id, setMemberId] = useState("");

  const handleAddCurriculum = () => {
    setCurriculum([...curriculum, ""]);
  };

  const handleRemoveCurriculum = (index) => {
    const newCurriculum = curriculum.filter((_, i) => i !== index);
    setCurriculum(newCurriculum);
  };

  const handleChangeCurriculum = (value, index) => {
    const newCurriculum = [...curriculum];
    newCurriculum[index] = value;
    setCurriculum(newCurriculum);
  };

  const handleAddTags = () => {
    setTags([...tags, ""]);
  };

  const handleRemoveTags = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const handleChangeTags = (value, index) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image_url", imageFile); // 필드 이름을 서버와 일치시키기 위해 'image_url'로 설정
    formData.append("curriculum", JSON.stringify(curriculum));
    formData.append("main_subject", mainSubject);
    formData.append("goals", goals);
    formData.append("tags", JSON.stringify(tags));
    formData.append("member_id", member_id);

    try {
      const response = await fetch("http://192.168.239.11:8080/study", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Study created successfully:", await response.json());
      } else {
        console.error("Failed to create study:", response);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h1>스터디 생성 페이지입니다</h1>
      <div className="createStudy-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">스터디제목</label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="스터디 제목을 입력해주세요"
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">소개글</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="소개글을 입력해주세요"
              style={{ width: "100%", height: "150px" }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image_url">이미지</label>
            <input
              type="file"
              id="image_url"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>

          <div className="form-group">
            <label htmlFor="curriculum">커리큘럼</label>
            {curriculum.map((item, index) => (
              <div key={index} className="curriculum-row">
                <input
                  type="text"
                  value={item}
                  onChange={(e) =>
                    handleChangeCurriculum(e.target.value, index)
                  }
                  placeholder="스터디 커리큘럼을 입력해주세요"
                  className="curriculum-input"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveCurriculum(index)}
                  className="remove-btn"
                >
                  <strong>-</strong>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddCurriculum}
              className="add-btn"
            >
              커리큘럼 추가
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="main_subject">주제</label>
            <input
              id="main_subject"
              value={mainSubject}
              onChange={(e) => setMainSubject(e.target.value)}
              placeholder="스터디 주제를 입력해주세요"
            />
          </div>
          <div className="form-group">
            <label htmlFor="goals">목표</label>
            <input
              id="goals"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="스터디 목표를 입력해주세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">태그</label>
            {tags.map((item, index) => (
              <div key={index} className="tags-row">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleChangeTags(e.target.value, index)}
                  placeholder="스터디 태그 입력해주세요"
                  className="tags-input"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveTags(index)}
                  className="remove-btn"
                >
                  <strong>-</strong>
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddTags} className="add-btn">
              태그 추가
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="member_id">멤버아이디</label>
            <input
              id="member_id"
              value={member_id}
              onChange={(e) => setMemberId(e.target.value)}
              placeholder="스터디 멤버 아이디를 입력해주세요"
            />
          </div>
          <button type="submit" className="submit-button">
            등록
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateStudy;
