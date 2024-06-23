import React, { useState, useEffect } from "react";
import axios from "axios";
import "./member_styles.css";

const formatDateAndTime = (isoDate) => {
  const date = new Date(isoDate);
  let year = date.getFullYear().toString().slice(-2);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'AM' : 'PM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
};

function S_member() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await axios.get(`http://192.168.0.98:8080/study/member?studyId=${1}`);
        setMembers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, []);


  const handleAccept = async (memberId) => {
    const memberToAccept = members.find(member => member.member_id === memberId);
    if (memberToAccept) {
      try {
        // Send a POST request to the server to update the member status
        await axios.post(`http://192.168.0.98:8080/study/member/accept`, {
          member_id: sessionStorage.getItem("id"),
          memberId: memberId, // Make sure the field names match what your API expects
          studyId: memberToAccept.study_id, // Assuming study_id is available in the member object
        });
  
        // Update local state to reflect the new status of the member
        setMembers(prevMembers => prevMembers.map(member =>
          member.member_id === memberId ? { ...member, request_status: "APPROVED" } : member
        ));
      } catch (error) {
        console.error("Error accepting member:", error);
      }
    }
  };
  


  const handleReject = async (memberId) => {
    const memberToAccept = members.find(member => member.member_id === memberId);
    if (memberToAccept) {
      try {
        // Send a POST request to the server to update the member status
        await axios.post(`http://192.168.0.98:8080/study/member/refuse`, {
          member_id: sessionStorage.getItem("id"),
          memberId: memberId, // Make sure the field names match what your API expects
          studyId: memberToAccept.study_id, // Assuming study_id is available in the member object
        });
  
        // Update local state to reflect the new status of the member
        setMembers(prevMembers => prevMembers.map(member =>
          member.member_id === memberId ? { ...member, request_status: "REJECTED" } : member
        ));
      } catch (error) {
        console.error("Error accepting member:", error);
      }
    }
  };
  




  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>현재 참여중인 스터디원</h3>
      <table>
        <thead className="memberStandard">
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th>참여일</th>
            <th>추방</th>
          </tr>
        </thead>
        <tbody>
          {members.filter(member => member.request_status === "APPROVED").map((member) => (
            <tr key={member.study_member_id} className="memberContent">
              <td><strong>No {member.study_member_id}</strong></td>
              <td>{member.nickname}</td>
              <td>{formatDateAndTime(member.created_at)}</td>
              <td>
                <button onClick={() => handleReject(member.member_id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>수락 대기중인 스터디원</h3>
      <table>
        <thead className="memberStandard">
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th>참여일</th>
            <th>수락/거절</th>
          </tr>
        </thead>
        <tbody>
          {members.filter(member => member.request_status === "PENDING").map((member) => (
            <tr key={member.study_member_id} className="memberContent">
              <td><strong>No {member.study_member_id}</strong></td>
              <td>{member.nickname}</td>
              <td>{formatDateAndTime(member.created_at)}</td>
              <td>
                <button onClick={() => handleAccept(member.member_id)}>O</button>
                <button onClick={() => handleReject(member.member_id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default S_member;

/*
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./member_styles.css";

const formatDateAndTime = (isoDate) => {
  const date = new Date(isoDate);
  // Get the year, month, and day
  let year = date.getFullYear().toString().slice(-2); // Last two digits of the year
  let month = date.getMonth() + 1; // Month is 0-based, so add 1
  let day = date.getDate();

  // Format month and day to always be two digits
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  // Get hours and minutes
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'AM' : 'PM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;

  // Format the output
  return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
};

function S_member() {
  const [members, setMembers] = useState([]); // 최상위 레벨로 이동
  const [loading, setLoading] = useState(true); // 최상위 레벨로 이동

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.98:8080/study/member?studyId=${1}`,
          null
          //   {
          //     params: {
          //         studyId: 1
          //     },
          //   }
        );
        setMembers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, []); // sortOrder가 변경될 때마다 데이터를 다시 가져옵니다.

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>현재 참여중인 스터디원</h3>
      <table>
        <thead className="memberStandard">
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th>참여일</th>
          </tr>
        </thead>
        <tbody>
          {members.filter(member => member.request_status === "APPROVED").map((member) => (
            <tr key={member.study_member_id} className="memberContent">
              <td><strong>No {member.study_member_id}</strong></td>
              <td>{member.nickname}</td>
              <td>{formatDateAndTime(member.created_at)}</td>
            </tr>
          ))}
          </tbody>
      </table>

      <h3>수락 대기중인 스터디원</h3>
      <table>
        <thead className="memberStandard">
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th>참여일</th>
            <th>수락/거절</th>
          </tr>
        </thead>
        <tbody>
          {members.filter(member => member.request_status === "PENDING").map((member) => (
            <tr key={member.study_member_id} className="memberContent">
              <td><strong>No {member.study_member_id}</strong></td>
              <td>{member.nickname}</td>
              <td>{formatDateAndTime(member.created_at)}</td>
              <td><button>O</button> <button>X</button></td>
            </tr>
          ))}
          </tbody>
      </table>
    </div>
  );
}

export default S_member;
*/