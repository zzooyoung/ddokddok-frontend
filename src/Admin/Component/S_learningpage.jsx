import React, { useState, useEffect } from "react";
import axios from "axios";
import "./learningpage_styles.css";

function S_learningpage() {
    const [curriculums, setCurriculums] = useState([]); // 최상위 레벨로 이동
    const [loading, setLoading] = useState(true); // 최상위 레벨로 이동
    const [sortOrder, setSortOrder] = useState('latest'); // 최상위 레벨로 이동

    useEffect(() => {
        const fetchCurriculumData = async () => {
          try {
            const response = await axios.post(
              "http://192.168.0.98:8080/study/chapterList",
              null,
              {
                params: {
                    studyId: 19,
                    sort: sortOrder, // 'latest' 대신 정렬 상태 변수 사용
                    page: 1,
                    perPage:10
                },
              }
            );
            setCurriculums(response.data);
            console.log(response.data);
          } catch (error) {
            console.error("Error fetching studies:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchCurriculumData();
    }, [sortOrder]); // sortOrder가 변경될 때마다 데이터를 다시 가져옵니다.
    
    if (loading) {
        return <div>Loading...</div>;
    }  
    return (
        <div>
  
            {curriculums.map(curriculum => (
            <div key={curriculum.curriculum_id}>
                <div class="row-wrapper">
                <div className="row1"><strong>Chapter {curriculum.curriculum_no}</strong> </div>
                <div className="row2">{curriculum.content}</div>
                </div>
            </div>
      ))}
        </div>
    );
}

export default S_learningpage;




/*
import React, { useState, useEffect } from "react";
import axios from "axios";

function S_learningpage() {


    useEffect(() => {
        const [studies, setStudies] = useState([]);
        const [loading, setLoading] = useState(true);
        const [sortOrder, setSortOrder] = useState('latest'); 

        const fetchStudies = async () => {
          try {
            const response = await axios.post(
              "http://192.168.0.98:8080/study/chapterList",
              null,
              {
                params: {
                    studyId: 19,
                    sort: 'latest',
                    page: 1,
                    perPage:10
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
      }, ['latest']); // sortOrder가 변경될 때마다 데이터를 다시 가져옵니다.
    
      if (loading) {
        return <div>Loading...</div>;
      }  
  return (
    <div>
      여기는 학습페이지
    </div>
  )
}

export default S_learningpage
*/