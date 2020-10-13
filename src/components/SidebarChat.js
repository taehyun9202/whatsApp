import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import './SidebarChat.css';
import { Link } from 'react-router-dom'
import db from '../firebase';

function SidebarChat({ id, name, addNewChat }) {
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState([])

    const createChat = () => {
        const roomName = prompt("Please enter name for chat")
    }

    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot =>(
                setMessages(snapshot.docs.map((doc) => doc.data()))
            ))
        }
    }, [id])
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <div className="avatar">
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                </div>
                <div className="chatInfo">
                    <h3>{name}</h3>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ): (
        <div onClick={createChat}>
            <div className="sidebarChat">
                <h3>Add new chat</h3>
            </div>
        </div>
    )
}

export default SidebarChat
