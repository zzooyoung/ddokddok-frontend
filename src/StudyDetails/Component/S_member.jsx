import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

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
    <table>
      <thead className="memberStandard">
        <tr>
          <th>번호</th>
          <th>이름</th>
          <th>승인여부</th>
          <th>참여일</th>
        </tr>
      </thead>
      <tbody>
        {members.map((member) => (
          <tr key={member.study_member_id} className="memberContent">
            <td>
              <strong>No {member.study_member_id}</strong>
            </td>
            <td>{member.nickname}</td>
            <td>{member.request_status}</td>
            <td>{member.created_at}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default S_member;
