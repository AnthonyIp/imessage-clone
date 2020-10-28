import React   from 'react';

import SideBar from "./SideBar";
import Chat    from "./Chat";

import './IMessage.scss';

const IMessage = () => {
    return (
        <div className="iMessage">
            <SideBar/>
            <Chat/>
        </div>
    );
};

export default IMessage;
