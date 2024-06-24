
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const RegisterMain = () => {
  const [nickname, setNickname] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
          console.log(id, password, nickname)
            const response = await axios.post(
                "http://192.168.0.98:8080/login/sign-up",
                {
                  loginid: id,
                  password: password,
                  nickname: nickname
                }
            );
            alert("회원가입에 성공하였습니다.");
            navigate("/login");
        } catch (error) {
            console.error("Error during sign-up:", error);
            alert("회원가입에 실패하였습니다. 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="register-container">
                <h2>회원가입</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nickname">닉네임</label>
                        <input
                            placeholder='닉네임'
                            id="nickname"
                            value={nickname}
                            onChange={handleNicknameChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="id">아이디</label>
                        <input
                            placeholder='아이디'
                            id="id"
                            value={id}
                            onChange={handleIdChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            placeholder='비밀번호'
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <button type="submit" className="register-button" disabled={loading}>
                        {loading ? "가입 중..." : "가입하기"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterMain;
