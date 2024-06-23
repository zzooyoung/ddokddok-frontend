import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './styles.css';

const LoginMain = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        HandleLoginClick();
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const HandleLoginClick = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                "http://192.168.0.98:8080/login",
                null,
                {
                    params: {
                        loginid: id,
                        password: password
                    },
                }
            );
            console.log('Response:', response.data);
            navigate('/mypage');
        } catch (error) {
            console.error("Error fetching studies:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="login-container">
                <h2>로그인</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="id">아이디</label>
                        <input
                            placeholder='아이디'
                            type="text"
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
                    <button type="submit" className="login-button">로그인</button>
                </form>
                <button onClick={handleRegisterClick} className="register-button">
                    회원가입
                </button>
            </div>
        </div>
    );
};

export default LoginMain;
