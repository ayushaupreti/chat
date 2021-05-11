import React, {useEffect, useState, useRef} from 'react';
import { Avatar, IconButton } from '@material-ui/core';
// import SendIcon from '@material-ui/icons/Send';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import "./Chat.css";
import { useParams } from 'react-router';
import {useStateValue} from '../StateProvider';
import db from '../firebase';
import firebase from 'firebase';
import moment from 'moment';

function Chat() {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();
    const messageEl = useRef(null);
    
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 100));
    }, []);

    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ));
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ));
        }
    }, [roomId]);

    useEffect(() => {
        if(messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight});
            });
        }
    }, [messageEl])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            user: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen on {" "} {moment(new Date(messages[messages.length - 1]?.timestamp?.toDate())).format("ddd MMM D, h:mm a")}</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <InfoOutlinedIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body" ref={messageEl}>
                {messages.map(message => (
                    <p className={`chat_message ${message.user === user.displayName && 'chat_reciever'}`}>
                        <span className="chat_name">{message.user}</span>
                        {message.message}
                        <span className="chat_timestamp">{moment(new Date(message.timestamp?.toDate())).format("h:mm a")}</span>
                    </p>
                ))}
            </div>
            <div className="chat_footer">
                <InsertEmoticonIcon/>
                <form>
                    <input value={input} placeholder="Type a message" type="text" onChange={e => setInput(e.target.value)}/>
                    <button type="submit" onClick={sendMessage}>Send</button>
                    {/* <IconButton>
                        <SendIcon style={{ color: "#ff8d8d" }} onClick={sendMessage}/>
                    </IconButton> */}
                </form>
            </div>
        </div>
    )
}

export default Chat
