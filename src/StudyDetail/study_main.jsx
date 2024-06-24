import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css"; // 통합된 CSS 파일을 import합니다.

const StudyCard = ({ category, level, title, date, imageUrl }) => (
  <div className="study-card">
    <div className="study-info">
      <div className="study-tags">
        <span className="tag category">{category}</span>
        <span className="tag level">{level}</span>
      </div>
      <h3 className="study-title">{title}</h3>
      <p className="study-date">{date}</p>
    </div>
    <img
      src={imageUrl}
      alt="Study visual representation"
      className="study-image"
    />
  </div>
);

const StatCard = ({ label, value, description }) => (
  <div className="stat-card">
    <h4 className="stat-label">{label}</h4>
    <p className="stat-value">{value}</p>
    <p className="stat-description">{description}</p>
  </div>
);

const NavItem = ({ label, isActive = false }) => (
  <li className={`nav-item ${isActive ? "active" : ""}`}>
    <a href="#" className="nav-link">
      {label}
    </a>
  </li>
);

const Study = (studyId) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await axios.post(
          "http://192.168.239.11:8080/study/detailList?studyId=1",
          null,
          {
            params: {
              studyId: studyId,
            },
          }
        );
      } catch (error) {
        console.error("Error fetching studies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="divider"></div>
      <main className="main-content">
        <h2 className="section-title">나의 스터디</h2>
        <section className="study-banner">
          <StudyCard
            category="백엔드"
            level="기초"
            title="승지의 우당탕탕 spring 교실"
            date="2024.05.31 ~ 2024.09.21"
            imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/75f4b070d35b0130574be81fd4d176d1ea9dc4371422545aa7789c035cbe4b60?apiKey=c76cbc22e8484ee7adce376c21dd7f75&"
          />
        </section>
        <div className="dashboard">
          <aside className="sidebar">
            <nav className="nav-sidebar">
              <div className="nav-header">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c48cd3a1c0083f5047bdc1b999cdf983414d70ad27cc7adc72ff039ff5d463c9?apiKey=c76cbc22e8484ee7adce376c21dd7f75&"
                  alt=""
                  className="nav-icon"
                />
                홈
              </div>
              <ul className="nav-list">
                <NavItem label="공지" href="" />
                <NavItem label="학습 페이지" />
                <NavItem label="스터디 멤버 보기" />
                <NavItem label="채팅" />
                <NavItem label="캘린더" />
                <NavItem label="과제" isActive={true} />
              </ul>
            </nav>
          </aside>
          <div className="main-dashboard">
            <h2 className="dashboard-header">
              현재 N주차 진행 중이에요 ! 아자아자 ~ !
            </h2>
            <div className="stats-container">
              <div className="stats-card">
                <div className="stats-grid">
                  <StatCard
                    label="내 학습상황"
                    value="16/52"
                    description="진행 상황"
                  />
                  <StatCard label="학습 시간" value="6h 28m" description="" />
                  <StatCard label="종료 일자" value="D-29" description="" />
                </div>
              </div>
              <div className="stats-card progress-card">
                <h3 className="progress-title">진행 상황</h3>
                <p className="progress-value">학습중</p>
              </div>
            </div>
            <section className="study-intro">
              <h3 className="intro-title">스터디 소개</h3>
              <div className="intro-content">
                초급자를 위해 준비한 <br />
                [채승지의 우당탕탕 spring 교실] 스터디입니다. 우수 스터디장
                채승지님이 준비하신 우당탕탕의 사격술 스터디입니다. 해당
                스터디는 Spring 즉 ! 봄에 진행하는 권총 사격술에 관하여 스터디가
                진행됩니다. 현대 실전 권총 사격술의 아버지라 할 수 있는 사격
                전문가인{" "}
                <a
                  href="https://namu.wiki/w/%EC%A0%9C%ED%94%84%20%EC%BF%A0%ED%8D%BC"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  제프 쿠퍼
                </a>
                는, 다음 네 가지 조항을 모든 총기의 기본 안전 수칙으로 제창했다.
                <ul>
                  <li>
                    모든 총은 장전된 것으로 간주하라.(Treat every weapon as if
                    it were loaded) 설령 장전이 돼 있지 않더라도, 장전된 것으로
                    간주하고 조심스럽게 취급해야 한다.
                  </li>
                </ul>
                총기를 처음 접할 때 이 부분을 확실하게 교육시키지 않으면
                언젠가는 총기 사고를 일으킬 수 있으므로 버릇을 잘 들이는 것이
                중요하다.
                <ul>
                  <li>
                    쏘려는 대상이 아닌 것에 총구를 절대 향하지 말라.(Never point
                    your weapon at anything you don't intend to destroy) 총이
                    장전되어 있지 않다고 무시하는 사람은 1번 규칙을 다시
                    생각해봐라. 아래 3번 트리거 디시플린보다 상위 안전수칙인데,
                    그 이유는 만약 총기 상태가 심하게 좋지 않을 경우 방아쇠를
                    건드리지 않았는데도 격발될 수 있기 때문이다. 이 원칙을
                    'Muzzle Discipline'이라고 부르기도 한다. 대다수의 민간
                    사격장에서 총을 체인으로 고정하는데다 군대에서도 웬만하면
                    안전줄을 걸고 사격훈련을 하는 국내에서는 크게 부각되지
                    않지만, 각자 총을 챙겨와서 쏘는 게 일반적이며, 사로에 체인
                    따위는 없는 미국 등지의 민간 사격장에서는 총구를 반드시 사로
                    방향으로 두는 걸 기본 예절로 교육한다.
                  </li>
                  <li>
                    쏠 생각이 없다면, 손가락을 방아쇠에 걸지 말 것.(Keep your
                    finger off the trigger until ready to fire) 오발의
                    60퍼센트가 이 규칙을 지키지 않아서 발생한다. 일명 Trigger
                    Discipline/방아쇠 주의 수칙이라고 한다.
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Study;
