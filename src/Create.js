import React, { useState, useEffect } from "react";
import { authService, dbService } from "./fbase.js";
import Login from "./components/Login";
import TopMenu from "./components/TopMenu";

function Create() {
  const [init, setInit] = useState(null);
  const [userObj, setUserObj] = useState(null);
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
  const creatDB = async (event) => {
    event.preventDefault();
    await dbService.doc("users/"+userObj.uid).set({
      project: {
        projects: [
          {
            "title": "Untitle-1",
            "description" : "first project",
            "cover-img": "https://page.ml/css/img/page-ml-logo.png",
            "Visibility": "only-you",
            "Lobby-music" : "default",
            "projects":[
              {
                "question":"who is the first president of United State?",
                "background": {
                  "type":"img",
                  "url":"https://page.ml/css/img/page-ml-logo.png",
                },
                "choices": [
                  {
                    "name": "John",
                    "result": "false",
                  },
                  {
                    "name": "George",
                    "result": "true",
                  },
                  {
                    "name": "Thomas",
                    "result": "false",
                  },
                  {
                    "name": "Jay",
                    "result": "false",
                  }
                ]
              }
            ]
          }
        ],
      }
    })
  };
  const loadDB = async (event) => {
      event.preventDefault();
      var docRef = dbService.doc("users/"+userObj.uid);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data().project.projects[0].title);
        } else {
            console.log("No such document!");
        }
    })
  }
  return (
    <>
      {init ? (
        !Boolean(userObj) ? (
          <div>
            <TopMenu/>
            <Login />
          </div>
        ) : (
            <div>
                <TopMenu/>
                <button onClick={creatDB}>createButton</button>
                <button onClick={loadDB}>LoadButton</button>
            </div>
        )
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default Create;