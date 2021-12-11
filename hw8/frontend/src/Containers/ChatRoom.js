import Title from '../Components/Title';
import Message from '../Components/Message';
import { Button, Input, message, Tag } from 'antd'
import {useState, useRef } from 'react';
import useChat from '../Hooks/useChat';


const ChatRoom = () => {
    const {messages, sendMessage, clearMessages} = useChat();
    const [username, setUsername] = useState('');
    const [body, setBody] = useState('')
    const bodyRef = useRef(null);
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
      return(
    <>
        <Title>
        <h1>Simple Chat</h1>
        <Button type="primary" danger onClick={clearMessages}>
        Clear
        </Button>
        </Title>
        <Message>
        <div className="App-messages">
        {messages.length === 0 ? (<p style={{ color: '#ccc' }}>
        No messages...
        </p>) : (messages.map(({name, body}, i) => (<p className="App-message" key={i}>
        <Tag color="blue">{name}</Tag> {body}
        </p>)))}
        </div>
        </Message>
        <Input
        onKeyDown={(e)=>{if(e.key==='Enter'){
        bodyRef.current.focus();
        }}}
        placeholder="Username"
        value = {username}
        onChange={(e) =>  setUsername(e.target.value)}
        style={{ marginBottom: 10 }}
        ></Input>
        <Input.Search
        ref = {bodyRef}
        enterButton="Send"
        value={body}
        onChange={(e)=>setBody(e.target.value)}
        placeholder="Type a message here..."
        onSearch = {(msg) => {
        if(!msg || !username){
            displayStatus({
            type: "error",
            msg: 'please enter a username and a message body.'
            })
            return;
        }
        sendMessage({name: username, body: msg}) 
        setBody('')}}
        ></Input.Search>
    </>);
}

export default ChatRoom;