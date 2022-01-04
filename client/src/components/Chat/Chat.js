import React, { useState,useEffect } from "react";
import io, { Socket } from 'socket.io-client';
import queryString from 'query-string';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Messages from '../Messages/Messages';
import Input from '../Input/Input';
import TextContainer from '../TextContainer/TextContainer';
let messages_array = new Map();
let socket;
const ENDPOINT="http://localhost:5000";

export default function Chat(){
    const [name, setName]=useState('');
    const [room, setRoom]=useState('');
    const [users, setUsers]=useState('');
    const [message, setMessage]=useState('');
    const [messages, setMessages]=useState('');
        useEffect(()=>{
            socket = io(ENDPOINT,{ transports : ['websocket'] });
            const {name,room}=queryString.parse(window.location.search);
            setName(name);  setRoom(room);
            socket.emit('join',{name, room});
            return()=>{
                socket.emit('disconnect');
                socket.off();
            }
        },[ENDPOINT,window.location.search]);

        useEffect(() => {
            socket.on('message', (message) => {
              setMessages(messages =>[...messages_array, message]);
            });
            
            socket.on("roomData", ({ users }) => {
              setUsers(users);
            });
        }, []);

        const sendMessage = (event) =>{
            event.preventDefault();
            if(message)
                socket.emit('sendMessage',message,()=>setMessage(''));
        }

    return(
        <div className="outerContainer">
        <div className="container">
        
          {/* <InfoBar room={room} /> */}
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      {/* <TextContainer users={users}/> */}
    </div>
    );
}