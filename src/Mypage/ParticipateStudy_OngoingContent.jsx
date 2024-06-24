import imgWithUrl from "../apis/imgWithUrl";


const ParticipateStudy_OngoingContent = ({ params }) => {
  console.log("params:", params);

  return (
    <div className="cateBtn2">
      <div className="cateBtn2Content">
        {params && params.map((data, idx) => (
          data.status === "ing" && (
            <div key={idx} className="developer-status">
              <div className="study-icon">
                <img src={imgWithUrl(data.image_url)} alt="Study" /> {/* Ensure imgWithUrl is working */}
              </div>
              <div className="study-info">
                <h3 className="study-category">{data.tags[0]?.tag_name}</h3>
                <p className="study-status">{data.status === "ing" ? "진행중..." : data.status}</p>
              </div>
              <p className="study-detail">{data.title}</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default ParticipateStudy_OngoingContent;
