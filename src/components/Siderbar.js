import React, { useState, useEffect } from 'react'
import './Siderbar.css'
import { Avatar, IconButton } from '@material-ui/core'
import DonutLargeOutlined from '@material-ui/icons/DonutLargeOutlined'
import ChatOutlined from '@material-ui/icons/ChatOutlined'
import MoreVertOutlined from '@material-ui/icons/MoreVertOutlined'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import SidebarChat from './SidebarChat'
import db from '../firebase'
import { useStateValue } from './StateProvider'


function Siderbar() {
    const [{ user }, dispathch] = useStateValue();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        ))
    }, [])
    return (
        <div className="sidebar">
            <div className="header">
                <Avatar src={user?.photoURL}/>
                <div className="headerRight">
                    <IconButton>
                        <DonutLargeOutlined />
                    </IconButton>
                    <IconButton>
                        <ChatOutlined />
                    </IconButton>
                    <IconButton>
                        <MoreVertOutlined />
                    </IconButton>
                </div>
            </div>
            <div className="search">
                <div className="searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text"/>
                </div>
            </div>
            <div className="chats">
                <SidebarChat addNewChat />
                {rooms.map(room => (
                    <div className="chatroom">
                        <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Siderbar
