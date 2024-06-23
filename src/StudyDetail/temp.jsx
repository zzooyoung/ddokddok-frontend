import * as React from "react";

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
    <img src={imageUrl} alt="Study visual representation" className="study-image" />
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
  <li className={`nav-item ${isActive ? 'active' : ''}`}>
    <a href="#" className="nav-link">
      {label}
    </a>
  </li>
);

function MyComponent() {
  return (
    <>
      <style jsx>{`
        /* Styles */
        .header {
          background-color: #fff;
          padding: 24px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          width: 132px;
          height: auto;
        }
        .nav-menu {
          display: flex;
          gap: 20px;
          align-items: center;
        }
        .nav-item {
          font-size: 32px;
          font-weight: 500;
        }
        .user-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .user-icon {
          width: 24px;
          height: 24px;
        }
        .login-btn {
          background-color: #000;
          color: #fff;
          padding: 14px 24px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
        }
        .divider {
          border-top: 1px solid #3f3f3f;
          margin: 23px 0;
        }
        .main-content {
          padding: 0 30px;
        }
        .section-title {
          font-size: 32px;
          font-weight: 500;
          margin: 46px 0 39px;
        }
        .study-banner {
          background-color: rgba(41, 200, 191, 0.88);
          color: #fffefe;
          padding: 53px 60px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .study-card {
          display: flex;
          justify-content: space-between;
          max-width: 1234px;
          width: 100%;
        }
        .study-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .study-tags {
          display: flex;
          gap: 14px;
          margin-bottom: 27px;
        }
        .tag {
          padding: 11px 16px;
          border-radius: 8px;
          font-size: 16px;
        }
        .category {
          background-color: #fff;
          color: #080808;
          border: 1px solid #3f3f3f;
        }
        .level {
          background-color: #fcb834;
          color: #080808;
        }
        .study-title {
          font-size: 50px;
          margin-bottom: 32px;
        }
        .study-date {
          font-size: 28px;
        }
        .study-image {
          width: 300px;
          height: 300px;
          object-fit: cover;
        }
        .dashboard {
          display: flex;
          gap: 20px;
          margin-top: 41px;
        }
        .sidebar {
          width: 25%;
        }
        .main-dashboard {
          width: 75%;
        }
        .nav-sidebar {
          background-color: #fff;
          border: 1px solid #3f3f3f;
          border-radius: 15px;
          padding: 1px 0 28px;
        }
        .nav-header {
          background-color: rgba(252, 184, 52, 0.7);
          padding: 25px 38px;
          font-size: 32px;
          font-weight: 500;
          margin-bottom: 33px;
        }
        .nav-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        .nav-item {
          padding: 10px 34px;
          font-size: 32px;
          font-weight: 500;
        }
        .nav-item.active {
          color: #f22222;
        }
        .dashboard-header {
          font-size: 48px;
          margin-bottom: 39px;
        }
        .stats-container {
          display: flex;
          gap: 20px;
        }
        .stats-card {
          background-color: #fff;
          border: 1px solid #808080;
          border-radius: 10px;
          padding: 31px 25px;
          width: 50%;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .stat-card {
          text-align: center;
        }
        .stat-label {
          font-size: 20px;
          margin-bottom: 27px;
        }
        .stat-value {
          font-size: 32px;
          margin-bottom: 19px;
        }
        .stat-description {
          font-size: 16px;
          color: #020715;
        }
        .progress-card {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .progress-title {
          font-size: 20px;
          margin-bottom: 30px;
        }
        .progress-value {
          font-size: 64px;
        }
        .study-intro {
          margin-top: 60px;
        }
        .intro-title {
          font-size: 24px;
          margin-bottom: 35px;
        }
        .intro-content {
          font-size: 24px;
        }
        @media (max-width: 991px) {
          .header,
          .main-content {
            padding: 24px 20px;
          }
          .study-banner {
            padding: 53px 20px;
          }
          .dashboard {
            flex-direction: column;
          }
          .sidebar,
          .main-dashboard {
            width: 100%;
          }
          .stats-container {
            flex-direction: column;
          }
          .stats-card {
            width: 100%;
          }
          .study-title {
            font-size: 40px;
          }
          .progress-value {
            font-size: 40px;
          }
        }
      `}</style>
      <header className="header">
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/ebaa6fb88e10a4a99a50d167e209017a143348a3719c22f0494d4600045ac69d?apiKey=c76cbc22e8484ee7adce376c21dd7f75&" alt="Website logo" className="logo" />
        <nav className="nav-menu">
          <a href="#" className="nav-item">스터디 보기</a>
          <a href="#" className="nav-item">Q & A</a>
        </nav>
        <div className="user-actions">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3f7323e097dcca37c2fe35c1d196493b42db92e27202683aea6ce91f62d15308?apiKey=c76cbc22e8484ee7adce376c21dd7f75&" alt="User icon" className="user-icon" />
          <a href="#" className="nav-item">MyPage</a>
          <a href="#" className="nav-item">사용자</a>
          <button className="login-btn">Login</button>
        </div>
      </header>
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
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c48cd3a1c0083f5047bdc1b999cdf983414d70ad27cc7adc72ff039ff5d463c9?apiKey=c76cbc22e8484ee7adce376c21dd7f75&" alt="" className="nav-icon" />
                홈
              </div>
              <ul className="nav-list">
                <NavItem label="공지" />
                <NavItem label="학습 페이지" />
                <NavItem label="스터디 멤버 보기" />
                <NavItem label="채팅" />
                <NavItem label="캘린더" />
                <NavItem label="과제" isActive={true} />
              </ul>
            </nav>
          </aside>
          <div className="main-dashboard">
            <h2 className="dashboard-header">현재 N주차 진행 중이에요 ! 아자아자 ~ !</h2>
            <div className="stats-container">
              <div className="stats-card">
                <div className="stats-grid">
                  <StatCard label="내 학습상황" value="16/52" description="진행 상황" />
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
                [채승지의 우당탕탕 spring 교실] 스터디입니다. 우수 스터디장 채승지님이 준비하신 우당탕탕의 사격술 스터디입니다. 해당 스터디는 Spring 즉 ! 봄에 진행하는 권총 사격술에 관하여 스터디가 진행됩니다. 현대 실전 권총 사격술의 아버지라 할 수 있는 사격 전문가인 <a href="https://namu.wiki/w/%EC%A0%9C%ED%94%84%20%EC%BF%A0%ED%8D%BC" target="_blank" rel="noopener noreferrer">제프 쿠퍼</a>는, 다음 네 가지 조항을 모든 총기의 기본 안전 수칙으로 제창했다.
                <ul>
                  <li>모든 총은 장전된 것으로 간주하라.(Treat every weapon as if it were loaded) 설령 장전이 돼 있지 않더라도, 장전된 것으로 간주하고 조심스럽게 취급해야 한다.</li>
                </ul>
                총기를 처음 접할 때 이 부분을 확실하게 교육시키지 않으면 언젠가는 총기 사고를 일으킬 수 있으므로 버릇을 잘 들이는 것이 중요하다.
                <ul>
                  <li>쏘려는 대상이 아닌 것에 총구를 절대 향하지 말라.(Never point your weapon at anything you don't intend to destroy) 총이 장전되어 있지 않다고 무시하는 사람은 1번 규칙을 다시 생각해봐라. 아래 3번 트리거 디시플린보다 상위 안전수칙인데, 그 이유는 만약 총기 상태가 심하게 좋지 않을 경우 방아쇠를 건드리지 않았는데도 격발될 수 있기 때문이다. 이 원칙을 'Muzzle Discipline'이라고 부르기도 한다. 대다수의 민간 사격장에서 총을 체인으로 고정하는데다 군대에서도 웬만하면 안전줄을 걸고 사격훈련을 하는 국내에서는 크게 부각되지 않지만, 각자 총을 챙겨와서 쏘는 게 일반적이며, 사로에 체인 따위는 없는 미국 등지의 민간 사격장에서는 총구를 반드시 사로 방향으로 두는 걸 기본 예절로 교육한다.</li>
                  <li>쏠 생각이 없다면, 손가락을 방아쇠에 걸지 말 것.(Keep your finger off the trigger until ready to fire) 오발의 60퍼센트가 이 규칙을 지키지 않아서 발생한다. 일명 Trigger Discipline/방아쇠 주의 수칙이라고 한다.</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default MyComponent;