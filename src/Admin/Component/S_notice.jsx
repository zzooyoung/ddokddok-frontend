import React, { useState, useEffect } from "react";
import axios from "axios";
import "./notice_styles.css";
import CreateNoticeModal from "./CreateNoticeModal";

const formatTime = (isoDate) => {
  const date = new Date(isoDate);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${minutes} ${ampm}`;
};

function S_notice() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotices, setFilteredNotices] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchNoticeData = async () => {
      try {
        const response = await axios.post(
          "http://192.168.239.11:8080/notice/list",
          null,
          {
            params: {
              sort: "latest", // 'latest' 대신 정렬 상태 변수 사용
              page: 1,
              perPage: 10,
            },
          }
        );
        setNotices(response.data);
        setFilteredNotices(response.data); // Initialize filteredNotices
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticeData();
  }, []);

  useEffect(() => {
    const results = notices.filter((notice) =>
      notice.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotices(results);
  }, [searchTerm, notices]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={openModal}>공지 작성하기</button>
        <CreateNoticeModal isOpen={isModalOpen} onClose={closeModal} />
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="공지사항 검색"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {filteredNotices.map((notice) => (
        <div key={notice.notice_id} className="notice-wrapper">
          <div className="title">{notice.title}</div>
          <div className="content">{notice.content}</div>
          <div className="created_at">{formatTime(notice.created_at)}</div>
        </div>
      ))}
    </div>
  );
}

export default S_notice;

/*
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./notice_styles.css";

const formatTime = (isoDate) => {
  const date = new Date(isoDate);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutes} ${ampm}`;
};

function S_notice() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNotices, setFilteredNotices] = useState([]);

  useEffect(() => {
    const fetchNoticeData = async () => {
      try {
        const response = await axios.post(
          "http://192.168.0.98:8080/notice/list",
          null,
          {
            params: {
              sort: 'latest', // 'latest' 대신 정렬 상태 변수 사용
              page: 1,
              perPage: 10
            },
          }
        );
        setNotices(response.data);
        setFilteredNotices(response.data); // Initialize filteredNotices
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticeData();
  }, []);

  useEffect(() => {
    const results = notices.filter(notice =>
      notice.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotices(results);
  }, [searchTerm, notices]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="공지사항 검색"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {filteredNotices.map(notice => (
        <div key={notice.notice_id} className="notice-wrapper">
          <div className="title">{notice.title}</div>
          <div className="content">{notice.content}</div>
          <div className="created_at">{formatTime(notice.created_at)}</div>
        </div>
      ))}
    </div>
  );
}

export default S_notice;
*/

////////////////////

/*
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./notice_styles.css";


const formatTime = (isoDate) => {
  const date = new Date(isoDate);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutes} ${ampm}`;
};


function S_notice() {
  const [notices, setNotices] = useState([]); // 최상위 레벨로 이동
  const [loading, setLoading] = useState(true); // 최상위 레벨로 이동
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNotices, setFilteredNotices] = useState([]);

  useEffect(() => {
    const fetchNoticeData = async () => {
      try {
        const response = await axios.post(
          "http://192.168.0.98:8080/notice/list",
          null,
          {
            params: {
              sort: 'latest', // 'latest' 대신 정렬 상태 변수 사용
              page: 1,
              perPage:10
          },

          }
    
        );
        setNotices(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticeData();
  }, []); // sortOrder가 변경될 때마다 데이터를 다시 가져옵니다.

  if (loading) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const results = notices.filter(notice =>
      notice.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotices(results);
  }, [searchTerm, notices]);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  return (
    <div>

      <div className="search-container">
        <input
          type="text"
          placeholder="멤버 이름을 검색하세요"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {notices.map(notice => (
        <div key={notice.notice_id}>
          <div class="notice-wrapper">
            <div className="title">{notice.title}</div>
            <div className="content">{notice.content}</div>
            <div className="created_at">{formatTime(notice.created_at)}</div>
          </div>
        </div>
      ))}
      
    </div>
  )
}

export default S_notice
*/
