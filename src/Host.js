import React, {useState, useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {authService, dbService} from "./fbase.js";

export default function Host() {
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
    const playId = new URLSearchParams(useLocation().search).get('playId');
    return (
        <div>
            {
                init? (
                    <p>hi</p>
                ) : (
                    <p>Initializing...</p>
                )
            }
        </div>
    );
}
