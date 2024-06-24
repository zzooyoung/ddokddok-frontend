import React from 'react';
import imgWithUrl from "../apis/imgWithUrl";
import { useNavigate } from 'react-router-dom';

const ParticipateStudy_StudyAllContent = ({ params }) => {
  console.log("params:", params);
  const navigate = useNavigate();

  return (
    <div className="cateBtn2">
        <div className="cateBtn2Content">
          {params && params.map((data, idx) => (
            <div onClick={()=>{navigate("/study#")}} className="developer-status">
              <div>
                <img className="study-img" src={imgWithUrl(data.image_url)} alt="Study" /> {/* Ensure imgWithUrl is working */}
              </div>
              <div className="study-info">
                <h3 className="study-category">{data.tags[0]?.tag_name}</h3>
                <p className="study-status">{data.status === "ing" ? "진행중" : "종료"}</p>
              </div>
              <p className="study-detail">{data.title}</p>
            </div>
          ))}
        </div>
    </div>
  );
};
export default ParticipateStudy_StudyAllContent;
