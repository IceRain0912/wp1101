import { message} from 'antd'
import { useEffect} from 'react';
import useChat from '../Hooks/useChat';
import styled from 'styled-components';
import ChatRoom from './ChatRoom';

const LOCALSTORAGE_KEY = "save-me";

const App = () => {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const {status} = useChat();
  const displayStatus = (payload) => {
    if(payload.msg) {
      const {type, msg} = payload;
      const content = {
        content: msg, duration : 0.5
      }
      switch (type) {
        case "success": 
          message.success(content);
          break;
        case "error":
        default: 
          message.error(content);
          break;
      }
    }
  }
  useEffect(() => {
    displayStatus(status)}, [status])

  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 500px;
    margin: auto;
  `;

  return (
    <Wrapper>
      <ChatRoom />
    </Wrapper>
  )
}

export default App
