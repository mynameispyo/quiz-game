import React, { useState, useEffect } from "react";
import { authService, dbService } from "./fbase.js";
import { v4 as uuidv4 } from "uuid";
import Login from "./components/Login";
import TopMenu from "./components/TopMenu";
import MyStuff from "./components/MyStuff";
import EditQuiz from "./components/EditQuiz.js";

function Create() {
  const [init, setInit] = useState(null);
  const [userObj, setUserObj] = useState(null);
  const [editState, setEditState] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const changeEditQuizState = () => {setEditState(true);}
  return (
    <>
      {init ? (
        !Boolean(userObj) ? (
          <div>
            <TopMenu/>
            <Login />
          </div>
        ) : (
          !editState ?(
            <div>
                <TopMenu/>
                <MyStuff userObj={userObj} changeEditQuizState={changeEditQuizState}/>
            </div>
          ) : (
            <div>
              <EditQuiz />
            </div>
          )
        )
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default Create;