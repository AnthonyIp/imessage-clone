import React, {useEffect, useRef, useState} from 'react';
import db                                   from "../config/firebase";
import firebase                             from 'firebase';
import {useSelector}                        from "react-redux";
import Message                              from "./Message";
import MicNone                              from "@material-ui/icons/MicNone";
import IconButton                           from "@material-ui/core/IconButton";
import SendIcon                             from '@material-ui/icons/Send';
import {selectChatId, selectChatName}       from "../features/chatSlice";
import {selectUser}                         from "../features/userSlice";
import './Chat.scss';
import FlipMove                             from "react-flip-move";

const Chat = () => {
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const chatId = useSelector(selectChatId);
    const chatName = useSelector(selectChatName);
    const user = useSelector(selectUser);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current.scrollIntoView({behavior: "smooth"});
    };

    useEffect(() => {
        if (chatId) {
            db.collection("chats")
              .doc(chatId)
              .collection("messages")
              .orderBy("timestamp", "asc")
              .onSnapshot((snapshot) =>
                  setMessages(
                      snapshot.docs.map((doc) => ({
                          id  : doc.id,
                          data: doc.data(),
                      }))
                  ));
        }
    }, [chatId]);

    useEffect(scrollToBottom, [messages]);

    const handleChangeMessage = ({target}) => {
        setInputMessage(target.value)
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        db.collection("chats").doc(chatId).collection("messages").add({
            timestamp  : firebase.firestore.FieldValue.serverTimestamp(),
            message    : inputMessage,
            uid        : user.uid,
            photo      : user.photo,
            email      : user.email,
            displayName: user.displayName,
        });
        setInputMessage("");
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <h4><span className="chat__name">{chatName}</span></h4>
                <strong>Details</strong>
            </div>

            {/* Chat Messages */}
            <div className="chat__messages">
                <FlipMove>
                    {
                        messages.map(({id, data}) => (
                            <Message key={id} contents={data}/>
                        ))
                    }
                </FlipMove>
                <div ref={chatEndRef}/>
            </div>

            {/* Chat Input */}
            <div className="chat__input">
                <form onSubmit={handleSendMessage}>
                    <input placeholder="iMessage" type="text" value={inputMessage} onChange={handleChangeMessage}/>
                    <IconButton>
                        <SendIcon className="chat__send" onClick={handleSendMessage}/>
                    </IconButton>
                    <IconButton>
                        <MicNone className="chat__mic"/>
                    </IconButton>
                </form>
            </div>
        </div>
    );
};

export default Chat;
