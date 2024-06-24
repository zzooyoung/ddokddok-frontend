import imgWithUrl from "../apis/imgWithUrl";
import { useNavigate } from "react-router-dom";

const CreateStudy_PrepContent = ({params}) => {
  console.log("params:", params);
  const navigate = useNavigate();

  return (
    <div className="cateBtn2">
      <div style={{flexDirection : "row"}} className="cateBtn2Content">
        {params && params.map((data, idx) => (
          data.status === "prep" && (
            <div onClick={()=>{navigate("/admin")}} key={idx} className="developer-status">
              <div className="study-icon">
                <img src={imgWithUrl(data.image_url)} alt="Study" /> {/* Ensure imgWithUrl is working */}
              </div>
              <div className="study-info">
                <p className="study-status">{data.status === "prep" ? "준비중" : data.status}</p>
              </div>
              <p className="study-detail">{data.title}</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
  };
  
  export default CreateStudy_PrepContent;  // 수정: 정확한 이름으로 export