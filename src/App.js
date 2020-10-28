import React, {useEffect}          from 'react';
import './App.css';
import IMessage                    from "./components/IMessage";
import {login, logout, selectUser} from "./features/userSlice";
import {useDispatch, useSelector}  from "react-redux";
import Login                       from "./components/Login";
import {auth}                      from "./config/firebase";

function App() {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user is logged In
                dispatch(login({
                    uid        : authUser.uid,
                    photo      : authUser.photoURL,
                    email      : authUser.email,
                    displayName: authUser.displayName
                }));
            } else {
                //user is logged Out
                dispatch(logout());
            }
        })
    }, []);
    return (
        <div className="App">
            {user ? <IMessage/> : <Login/>}
        </div>
    );
}

export default App;
