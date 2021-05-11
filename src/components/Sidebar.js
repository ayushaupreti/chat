import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import db from '../firebase';
import './Sidebar.css';
import { useStateValue } from '../StateProvider';

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id, 
                data: doc.data()
            })
            ))
        ));
        return () => {
            unsubscribe();
        }
    }, []);

    const createChat = () => {
        const roomName = prompt("Please enter a name for the chat room");
        if (roomName) {
            db.collection('rooms').add({
                name: roomName
            });
        }
    };

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <IconButton>
                    <Avatar src={user?.photoURL} />
                </IconButton>
                <div className="sidebar_headerbottom">
                    <IconButton onClick={createChat}>
                        <AddCircleIcon style={{ color: "white" }} fontSize="large" />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon style={{ color: "white" }} fontSize="large"/>
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_content">
                <div className="sidebar_search">
                    <div className="sidebar_searchContainer">
                        <SearchOutlined />
                        <input placeholder="Search" type="text" />
                    </div>
                </div>
                <div className="sidebar_chatlist">
                    {rooms.map(room => (
                        <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
