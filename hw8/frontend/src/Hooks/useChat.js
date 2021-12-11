import { useState } from "react";

const useChat = () => {
    const client = new WebSocket('ws://localhost:4000');
    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    }
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const clearMessages = () => {
        sendData(["clear"]);
    }
    const sendMessage = (payload) => {
        sendData(["input", payload]);
    }

    client.onmessage = (byteString) => {
        const {data} = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task){
            case "output": {
                setMessages(() => [...messages, ...payload]); break;
            }
            case "status": {
                setStatus(payload); break;
            }
            case "init": {
                setMessages(() => payload);
                break;
            }
            case "cleared": {
                setMessages([]);
                break;
            }
            default: break;
        }
    }

    return {
        status, 
        messages,
        sendMessage,
        clearMessages
    };
};
export default useChat;