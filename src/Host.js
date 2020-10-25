import React, {useState, useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {authService, dbService} from "./fbase.js";
import Login from "./components/Login";
export default function Host() {
    const [init, setInit ] = useState(null);
    const [userObj, setUserObj] = useState(null);
    const [myData, setMyData] = useState({});
    const gameId = new URLSearchParams(useLocation().search).get('gameId');
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
    const checkRightUser = () => {
        let result = false;
        myData.project.projects.forEach(quiz => {
            if(quiz.gameId == gameId){
                result = true;
            }
        })
        
    }
    const loadDB = async () => {
        var docRef = await dbService.doc("users/"+userObj.uid);
  
        docRef.get().then(function(doc) {
            if (doc.exists) {
                setMyData(doc.data().project.projects);
            } else {
                console.log("fatal error occur");
            }
        })
    }
    return (
        <div>
            {
                init? (
                    Boolean(userObj) ? (
                        <p>{gameId}</p>
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
