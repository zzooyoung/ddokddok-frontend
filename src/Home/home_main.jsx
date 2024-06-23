import React, { useState } from 'react';
// npm install react-select
import Select from 'react-select';
// npm install react-syntax-highlighter
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// npm install react-syntax-highlighter prism-react-renderer
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';

import './styles.css';
import { useNavigate } from 'react-router-dom';



const Main = () => {

    const navigate=useNavigate();


    const createStudyClick=()=>{
        navigate('/createStudy');
    }



    return (
        <div>
            <div className="main-container">
                <div className="content1">
                    <div className="section1">
                        <img></img>
                    </div>
                    <div className="section2">
                        <p>똑똑은</p>
                        <p>비대면 스터디 플랫폼입니다.</p>
                    </div>
                </div>
                <button onClick={createStudyClick} className="create-study-button">스터디 생성 버튼</button>
            </div>
        </div>
    );
};

export default Main;