import WebSocket from "ws";
import express from 'express';
import dotenv from 'dotenv-defaults';
import mongoose  from "mongoose";
import http from 'http';
import {initData, sendData,sendStatus} from './wssConnect.js';
import Message from './models/message.js';
dotenv.config();
mongoose.connect(
  process.env.MONGO_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  })
  .then(()=> console.log("mongo db connection created"));

const port = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});
const db = mongoose.connection;
db.once('open',() =>{
  console.log("Database Connected.");
  wss.once('connection',(ws)=>{
    initData(ws)
  })
  wss.on('connection',(ws)=>{
    ws.onmessage = async (byteString) =>{
      const {data} = byteString
      const [task, payload] = JSON.parse(data)
      switch(task){
        case 'input':{
          const {name,body}=payload
          const message = new Message({name,body})
          try{
            await message.save();
          } 
          catch (e){
             throw new Error("Message DB save error: " + e);
          }
          sendData(['output',[payload]],ws)
          sendStatus({
            type: 'success',
            msg: 'Message sent.'
          }, ws)
          break
        }
        case 'clear':{
          Message.deleteMany({},()=>{
            sendData(['Cleared'], ws)
            sendStatus({type: 'info',msg: 'Message cache cleared.'})
          })
          break;
        }
        default: break
      }
    }
  })
  server.listen(port,()=> console.log(`server listening on port ${port}!`),)
});

