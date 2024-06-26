import React from "react";
// npm install react-router-dom
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Common/header";

import Home from "./Home/home_main";
import Login from "./Login/login_main";
import Register from "./Register/register_main";

import Studylist from "./Studylist/studylist_main";
import QnA from "./QnA/qna_main";
import Mypage from "./Mypage/mypage_main";
import CreateStudy from "./CreateStudy/create_study";
import "./App.css";
import Study from "./StudyDetails/study_main";
import Admin from "./Admin/admin_main";
import CheifStudyHome from "./StudyDetails/Home/CheifStudyHome";

import QnaCreatePage from "./QnA/qna_create_page";
import QnaDetailPage from "./QnA/qna_detail_page";
import QnaUpdatePage from "./QnA/qna_update_page"; // QnaUpdatePage 컴포넌트 추가

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="main-container">
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/studylist" element={<Studylist />} />
              <Route path="/qna" element={<QnA />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/createstudy" element={<CreateStudy />} />
              <Route path="/study" element={<Study />} />
              <Route path="/admin" element={<Admin />} />
              <Route
                path="/StudyDetails/Home/Cheif"
                element={<CheifStudyHome />}
              />
              <Route path="/qna/create" element={<QnaCreatePage />} />
              <Route
                path="/question/:question_id"
                element={<QnaDetailPage />}
              />
              <Route path="/modify/:question_id" element={<QnaUpdatePage />} />{" "}
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
