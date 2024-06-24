import React from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = "/";
    };

    const handleProtectedNavigation = (path) => {
        if (sessionStorage.length > 0) {
            navigate(path);
        } else {
            alert("로그인 후 이용 가능합니다.");
        }
    };

    return (
        <header className="header">
            <Link to="/">
                <img src={logo} alt="Logo" className="header-logo" />
            </Link>
            <nav className="header-nav">
                <ul>
                    <li><a href="#" onClick={() => handleProtectedNavigation("/studylist")}>스터디보기</a></li>
                    <li><a href="#" onClick={() => handleProtectedNavigation("/qna")}>Q&A</a></li>
                    <li><a href="#" onClick={() => handleProtectedNavigation("/mypage")}>마이페이지</a></li>
                    <li className="header-right">
                        {sessionStorage.length > 0 ? 
                            <a href="#" onClick={handleLogout}>로그아웃</a> : 
                            <Link to="/login">로그인</Link>
                        }
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
