import React, {forwardRef} from 'react';

import './Message.scss';
import Avatar              from "@material-ui/core/Avatar";
import {useSelector}       from "react-redux";
import {selectUser}        from "../features/userSlice";

const Message = forwardRef(({id, contents: {timestamp, displayName, email, message, photo, uid}}, ref) => {
    const user = useSelector(selectUser)
    return (
        <div className={`message ${user.email === email && "message__sender"}`} ref={ref}>
            <Avatar src={photo} className="message__photo"/>
            <p>{message}</p>
            <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
        </div>
    );
});

export default Message;