import React, {useState, useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {authService, dbService} from "./fbase.js";
import Login from "./components/Login";
import TopMenu from "./components/TopMenu";

export default function Profile() {
    const [init, setInit ] = useState(null);
    const [userObj, setUserObj] = useState(null);
    useEffect(()=>{
        authService.onAuthStateChanged((user)=>{
            if(user){
                setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                });
            }else{
                setUserObj(null);
            }
            setInit(true);
        })
    }, []);
    const onLogOutClick = () => {
        authService.signOut();
        window.location.reload();
    };
    const playId = new URLSearchParams(useLocation().search).get('playId');
    return (
        <div>
            {
                init? (
                    !Boolean(userObj) ? (
                        <div>
                            <TopMenu/>
                            <Login />
                        </div>
                    ) : (
                        <div>
                            <TopMenu/>
                            <p>{userObj.displayName}</p>
                            <button onClick={onLogOutClick}>Logout</button>
                        </div>
                    )
                ) : (
                    <p>Initializing...</p>
                )
            }
        </div>
    );
}

