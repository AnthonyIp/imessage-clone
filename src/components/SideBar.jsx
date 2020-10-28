import React, {useEffect, useState} from 'react';

import Avatar                 from "@material-ui/core/Avatar";
import SearchIcon             from "@material-ui/icons/Search";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import IconButton             from "@material-ui/core/IconButton";
import SettingsIcon           from '@material-ui/icons/Settings';

import './SideBar.scss';
import SideBarChat            from "./SideBarChat";
import {useSelector}          from "react-redux";
import {selectUser}           from "../features/userSlice";
import db, {auth}             from "../config/firebase";

const SideBar = () => {
    const [chats, setChats] = useState([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        db.collection('chats')
          .onSnapshot((snapshot) => (
                  setChats(snapshot.docs.map((doc) => ({
                      id  : doc.id,
                      data: doc.data(),
                  })))
              )
          )
    }, []);

    const handleAddChats = () => {
        const chatName = prompt('Veuillez définir le nom de la conversation');
        if (chatName) {
            db.collection('chats').add({
                chatName: chatName,
            })
        }
    }

    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <div className="sidebar__headerTop">
                    <Avatar src={user.photo} className="sidebar__headerAvatar"/>
                    <h1>Discussions</h1>
                    <IconButton variant="outlined" className='sidebar__headerSetting'>
                        <SettingsIcon onClick={() => auth.signOut()}/>
                    </IconButton>
                    <IconButton variant="outlined" className='sidebar__headerInputButton'>
                        <RateReviewOutlinedIcon onClick={handleAddChats}/>
                    </IconButton>
                </div>
                <div className="sidebar__headerBottom">
                    <div className="sidebar__headerInputSearch">
                        <SearchIcon/>
                        <input type="text" placeholder="Rechercher dans Messager"/>
                    </div>
                </div>
            </div>

            <div className="sidebar__chats">
                {
                    chats.map(({id, data: {chatName}}) => (
                            <SideBarChat key={id} id={id} chatName={chatName}/>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default SideBar;
