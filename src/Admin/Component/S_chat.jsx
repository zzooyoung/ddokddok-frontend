import React from 'react'
import styled from 'styled-components';
//npm install styled-components

function S_chat() {
  return (
    <ChatWrapper>
      {/* 채팅 컴포넌트 내용 */}
      <ChatPage>
        {/*채팅 페이지 */}
        <ChatContent>
        </ChatContent>
        <ChatInputWrap>
        </ChatInputWrap>
      </ChatPage>
    </ChatWrapper>
  )
}

export default S_chat


const ChatWrapper = styled.div`
  width: 100%;
  height:500px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  
`;


const ChatPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 500px; // 채팅 페이지 전체 높이
  margin: auto; // 페이지 중앙에 위치
  border: 1px solid black;
  background-color: white;
`;

const ChatContent = styled.div`
  flex: 1; // 나머지 공간을 모두 차지
  padding: 10px;
  overflow-y: auto; // 내용이 많아지면 스크롤 가능
  border-bottom: 1px solid black; // 하단에 경계선 추가
`;

const ChatInputWrap = styled.div`
  height: 50px; // 입력 영역 높이
  padding: 10px;
  background-color: #e0f7fa; // 입력 영역 배경색
`;