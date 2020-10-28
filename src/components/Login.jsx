import React            from 'react';

import './Login.scss';
import {auth, provider} from "../config/firebase";
// import {auth, provider} from "../config/firebase";

const Login = () => {
    const signIn = () => {
        auth.signInWithPopup(provider)
            .catch((error) => alert(error.message));
    };
    return (
        <div className="login">
            <div className="login__logo">
                <img className="login__img"
                     src="https://upload.wikimedia.org/wikipedia/commons/5/56/IMessage_logo_%28Apple_Inc.%29.png"
                     alt="iMessage Logo"
                />
                <h1 className="text-center">IMessage</h1>
            </div>

            <button className="btn login__signin" onClick={signIn}>Sign In</button>
        </div>
    );
};

export default Login;
