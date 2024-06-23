import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudyListStyle.css"; // 통합된 CSS 파일을 import합니다.

import TagComponent from "./TagComponent";
import StudyCatalogue from "./StudyCatalogue";

const StudyList = () => {
  const [studies, setStudies] = useState([]);
  const [tags, setTags] = useState([]); // 태그 상태 추가
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("latest"); // 정렬 순서 상태 추가
  const [selectedTag, setSelectedTag] = useState(null); // 선택된 태그 상태 추가

  // 태그 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("http://192.168.0.98:8080/study/tag");
        setTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  // 스터디 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchStudies = async () => {
      setLoading(true); // 데이터를 다시 가져올 때 로딩 상태를 true로 설정
      try {
        const response = await axios.get(
          "http://192.168.0.98:8080/study/list",
          {
            params: {
              page: 1,
              perPage: 10,
              sort: sortOrder,
              tag: selectedTag, // 선택된 태그를 요청에 포함
            },
          }
        );
        setStudies(response.data);
      } catch (error) {
        console.error("Error fetching studies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudies();
  }, [sortOrder, selectedTag]); // sortOrder나 selectedTag가 변경될 때마다 데이터를 다시 가져옵니다.

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleTagChange = (tagId) => {
    const selectedTag =
      tags.find((tag) => tag.tag_id === tagId)?.tag_name || null;
    setSelectedTag(selectedTag);
  };

  const handleShowAll = () => {
    setSelectedTag(null);
  };

  return (
    <div className="study-list-screen">
      <div className="div-2">
        <div className="component-container">
          <button className="component" onClick={handleShowAll}>
            전체 보기
          </button>
          {tags.map((tag) => (
            <TagComponent
              key={tag.tag_id}
              className="component"
              tag={tag}
              onClick={() => handleTagChange(tag.tag_id)} // 함수 호출 수정
            />
          ))}
        </div>
        <div className="sort-buttons">
          <button onClick={() => handleSortChange("latest")}>최신순</button>
          <button onClick={() => handleSortChange("oldest")}>오래된 순</button>
        </div>
        <div className="divwrapper-container">
          {studies
            .filter(
              (study) =>
                !selectedTag ||
                study.tags.some((tag) => tag.tag_name === selectedTag)
            )
            .map((study) => (
              <StudyCatalogue
                key={study.study_id}
                className="div-wrapper"
                title={study.title}
                image={study.image_url}
                studyId={study.study_id} // studyId를 전달합니다.
              />
            ))}
        </div>
        {/* <div className="navigation">
          <div className="nav-item">이전</div>
          <div className="page-info">1 / 1</div>
          <div className="nav-item">다음</div>            페이지 넘기는 부분 -미구현(하드코딩)
        </div> */}
      </div>
    </div>
  );
};

export default StudyList;
