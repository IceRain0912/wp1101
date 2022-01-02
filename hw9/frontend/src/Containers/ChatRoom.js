import Title from '../Components/Title'
import Message from '../Components/Message'
import {CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION} from '../graphql';
import { Button, Input, Tag, Tabs } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client';
import ChatBox from "./Chatbox";
import ChatModal from "./ChatModal";
import useChatBox from "../Hooks/useChatBox";

const Wrapper = styled(Tabs)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 500px;
    margin: auto;
`;

const Chatroom = ({me, displayStatus}) => {

    const [body, setBody] = useState('')
    const [messageInput, setMessageInput] = useState("");
    const [activeKey, setActiveKey] = useState("");
    const {chatBoxes, createChatBox, removeChatBox} = useChatBox();
    const [modalVisible, setModalVisible] = useState(false);

    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

    const addChatBox = () => {
        setModalVisible(true);
    }


    return (
    <>
        <Title>
            <h1>{me}'s Chatroom</h1>
            <Button type="primary" danger>
                {" "}
                Clear
            </Button>
        </Title>
        <>
            <Wrapper tabBarStyle={{height: "36px"}}
            type='editable-card'
            activeKey= {activeKey}
            onChange={(key)=>{setActiveKey(key)}}
            onEdit={(targetKey, action) => {
                if(action === "add") addChatBox();
                else if(action === "remove") {
                    setActiveKey(removeChatBox(targetKey, activeKey));
                }
            }}>
            {chatBoxes.map((friend) => (
                <Tabs.TabPane tab={friend} closable={true} key={friend}>
                    <ChatBox me={me} friend={friend} key={friend} />
                </Tabs.TabPane>
            ))} 
            </Wrapper>

            <ChatModal 
            visible={modalVisible}
            onCreate={async ({name}) => {
                await startChat({
                    variables: {
                        name1: me,
                        name2: name,
                    },
                });
                setActiveKey(createChatBox(name));
                setModalVisible(false);
            }}
            onCancel={() => {
                setModalVisible(false);
            }}
            />
        </>
        <Input.Search
            value={messageInput}
            onChange={(e) => {setMessageInput(e.target.value)}}
            enterButton="Send"
            placeholder='Enter message here...'
            onSearch={(msg) => {
                if(!msg) {
                    displayStatus({
                        type: "error",
                        msg: "please enter message.",
                    });
                    return;
                }
                sendMessage({name: me, body: msg});
                setMessageInput("");
            }} />
    </>
    );
}

export default Chatroom;