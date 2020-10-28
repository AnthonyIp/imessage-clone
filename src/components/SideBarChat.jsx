import React, {useEffect, useState} from 'react';
import Avatar                       from "@material-ui/core/Avatar";
import './SideBarChat.scss';
import {useDispatch}                from "react-redux";
import {setChat}                    from "../features/chatSlice";
import db                           from "../config/firebase";
import * as timeago                 from "timeago.js";

const SideBarChat = ({id, chatName}) => {
    const dispatch = useDispatch();
    const [chatInfo, setChatInfo] = useState([]);

    useEffect(() => {
            db.collection('chats')
              .doc(id)
              .collection('messages')
              .orderBy('timestamp', 'desc')
              .onSnapshot(snapshot =>
                  setChatInfo(snapshot.docs.map(doc => doc.data()))
              );
    }, [id]);

    return (
        <div onClick={() => {
            dispatch(
                setChat({
                    chatId  : id,
                    chatName: chatName
                })
            )
        }} className="sidebarchat">
            <div className="sidebarchat__container">
                <Avatar className="sidebarchat__avatar" src={chatInfo[0]?.photo}/>
                <div className="sidebarchat__info">
                    <h3>{chatName}</h3>
                    <p>{chatInfo[0]?.message} <span>♦ {timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()))}</span></p>
                </div>
            </div>
        </div>
    );
};

export default SideBarChat;
