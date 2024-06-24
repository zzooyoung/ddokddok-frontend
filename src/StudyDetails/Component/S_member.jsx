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
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  // Get hours and minutes
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "AM" : "PM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;

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
          `http://192.168.239.11:8080/study/member?studyId=${1}`,
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
    <table>
      <thead className="memberStandard">
        <tr>
          <th>번호</th>
          <th>이름</th>
          <th>참여일</th>
        </tr>
      </thead>
      <tbody>
        {members
          .filter((member) => member.request_status === "APPROVED")
          .map((member) => (
            <tr key={member.study_member_id} className="memberContent">
              <td>
                <strong>No {member.study_member_id}</strong>
              </td>
              <td>{member.nickname}</td>
              <td>{formatDateAndTime(member.created_at)}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default S_member;
