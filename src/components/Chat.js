import { Avatar, IconButton } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import './Chat.css'
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertOutlined from '@material-ui/icons/MoreVertOutlined'
import InsertEmoticonOutlined from '@material-ui/icons/InsertEmoticonOutlined'
import MicOutlined from '@material-ui/icons/MicOutlined'
import { useParams } from 'react-router-dom';
import db from '../firebase';
import userEvent from '@testing-library/user-event';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';

function Chat() {
    const [input, setInput] = useState('');
    const [seed, setSeed] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    const sendMessage = e => {
        e.preventDefault();
        console.log(input)
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("")
    }

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) =>
            setRoomName(snapshot.data().name))

            db.collection('rooms').doc(roomId)
              .collection('messages').orderBy('timestamp', 'asc').onSnapshot
              ((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())));
        }
    }, [roomId])
    return (
        <div className="chat">
            <div className="header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 12115)}.svg`} />
                <div className="headerInfo">
                    <h3>{roomName}</h3>
                    <p>{new Date(messages[messages.length-1]?.timestamp.toDate()).toUTCString()}</p>
                </div>
                <div className="headerRight">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertOutlined />
                    </IconButton>
                </div>
            </div>
            <div className="body">
                {messages.map(message => (
                    <div className={user.displayName === message.name ? "chatMessage reciever" : "chatMessage"}>
                        <h5><strong className="messageSender">{message.name}</strong><small className="messageTime">{new Date(message.timestamp?.toDate()).toUTCString()}</small></h5>
                        <p className="message">{message.message}</p>
                    </div>
                ))}
            </div>
            <div className="footer">
                <InsertEmoticonOutlined />
                <form onSubmit>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message" />
                    <button type="submit" onClick={sendMessage}>Send Message</button>
                </form>
                <MicOutlined />
            </div>

        </div>
    )
}

export default Chat
