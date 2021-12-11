import {Input} from "antd";
import {UserOutlined} from "@ant-design/icons";
import Title from "../Components/Title";
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
const SignIn  = ({me, setMe, setSignedIn}) => (
    <>
        <Title>
            <h1>My Chat Room</h1>
        </Title>
        <Input.Search 
        prefix={<UserOutlined />}
        value={me} enterButton="Sign in"
        onChange={(e) => setMe(e.target.value)}
        onSearch={(name)=> {if(!name) displayStatus({
            type: 'error',
            msg: 'Missing user name',
        })
        else setSignedIn(true)}}
        placeholder="Enter your name" 
        size="large" style={{width:300, margin:50}}
        onSearch={()=>setSignedIn(true)}
        />
    </>
);
export default SignIn;