import React, { useEffect, useState} from 'react';
import { Avatar } from '@material-ui/core';
import db from '../firebase';
import './SidebarChat.css';
import { Link } from 'react-router-dom';

function SidebarChat({ addNewChat, id, name }) {
    const [seed, setSeed] = useState('');
    const [message, setMessages] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random()*100));
    }, [])

    useEffect(() => {
        if(id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot((snapshot) => (
                setMessages(snapshot.docs.map((doc) => doc.data()))
            ));
        }
    }, [id])

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
                    <div className="sidebarChat_info">
                        <h2>{name}</h2>
                        <p>{message[0]?.message}</p>
                    </div>
            </div>
        </Link>
    ) : (
        <div className="sidebarChat" >
            <h2>Add new chat</h2>
        </div>
    );
}

export default SidebarChat
