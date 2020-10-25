import React, {useState, useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {authService, dbService} from "./fbase.js";
import Login from "./components/Login";
export default function Host() {
    const [init, setInit ] = useState(null);
    const [userObj, setUserObj] = useState(null);
    const [myData, setMyData] = useState({});
    const [userAcces, setUserAccess] = useState(false);
    const gameId = new URLSearchParams(useLocation().search).get('gameId');
    useEffect(()=>{
        authService.onAuthStateChanged((user)=>{
            if(user){
                setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                });
                checkRightUser(user.uid);
            }else{
                setUserObj(null);
            }
            setInit(true);
        })
    }, []);
    const checkRightUser = async (uid) => {
        var docRef = dbService.doc("users/"+uid);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                doc.data().project.projects.forEach(quiz => {
                    if(quiz.gameId == gameId){
                        setUserAccess(true);
                    }
                })
            } else {
                setUserAccess(false);
            }
        })
    }
    return (
        <div>
            {
                init? (
                    Boolean(userObj) ? (
                        userAcces ? (
                            <p>{gameId}</p>
                        ) : (
                            <p>You don't have access in this account</p>
                        )
                    ) :(
                        <Login />
                    )
                ) : (
                    <p>Initializing...</p>
                )
            }
        </div>
    );
}
