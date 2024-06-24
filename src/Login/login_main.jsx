import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const LoginMain = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();
  const myStorage = window.sessionStorage;

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPw(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(id);
      console.log(pw);
      const response = await axios.post("http://192.168.239.11:8080/login", {
        loginid: id,
        password: pw,
      });
      console.log("Login successful:", response.data);
      console.log("session : ", sessionStorage.getItem("id"));

      if (response.data) {
        console.log(response.data[0].member_id);
        sessionStorage.setItem("id", response.data[0].member_id);
        console.log(sessionStorage.getItem("id"));
        navigate("/mypage", { state: { param1: response.data } });
      }
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div>
      <div className="login-container">
        <h2>로그인</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">아이디</label>
            <input
              placeholder="아이디"
              id="id"
              value={id}
              onChange={handleIdChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              placeholder="비밀번호"
              type="password"
              id="password"
              value={pw}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
        <button
          type="button"
          onClick={handleRegisterClick}
          className="register-button"
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default LoginMain;
