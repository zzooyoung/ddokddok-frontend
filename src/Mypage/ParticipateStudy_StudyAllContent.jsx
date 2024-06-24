import imgWithUrl from "../apis/imgWithUrl";
const ParticipateStudy_StudyAllContent = (params) => {
  console.log("params:", params)
  // const items = params.map((data, idx)=> {
    
  // });
  return (
    <div className="cateBtn2Content">

      <div className="developer-status">
      <div className="study-icon">
        <img src={imgWithUrl(params.image_url)} alt="Developer" /> {/* 이미지 경로 확인 필요 */}
      </div>
      <div className="study-info">
        <h3 className="study-category">{}</h3>
        <p className="study-status">진행중...</p>
      </div>
      <p className="study-detail">승지의 우당탕탕 백엔드 스터디</p>
    </div>
    </div>
  );
  
  };
  
  export default ParticipateStudy_StudyAllContent; 