import React from 'react'


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
  
  function S_home() {
    return (
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
    )
  }

  export default S_home