import imgWithUrl from "../apis/imgWithUrl";
import { useNavigate } from "react-router-dom";

// OngoingContent.js
const CreateStudy_OngoingContent = ({ params }) => {
  const navigate = useNavigate();
  console.log("params:", params);

  return (
    <div className="cateBtn2">
      <div className="cateBtn2Content">
        {params && params.map((data, idx) => (
          data.status === 'ing' && (
            <div onClick={()=>{navigate("/admin")}} key={idx} className="developer-status">
              <div className="study-icon">
                <img src={imgWithUrl(data.image_url)} alt="Study" /> {/* Ensure imgWithUrl is working */}
              </div>
              <div className="study-info">
                <p className="study-status">{data.status === 'ing' ? "진행중" : data.status}</p>
              </div>
              <p className="study-detail">{data.title}</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default CreateStudy_OngoingContent; 