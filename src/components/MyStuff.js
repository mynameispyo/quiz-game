import React, { useState, useEffect } from "react";
import { authService, dbService } from "../fbase.js";
import {Link } from "react-router-dom";

function MyStuff({userObj, changeEditQuizState}) {
    const [myProjects, setMyProjects] = useState([]);
    const [init, setInit] = useState(false);
    useEffect(() => {
        loadDB();
    }, []);
  const loadDB = async () => {
      var docRef = dbService.doc("users/"+userObj.uid);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            setMyProjects(doc.data().project.projects);
        } else {
            creatDB();
        }
    })
    setInit(true);
  }
  const creatDB = async () => {
    const documents = {
      "project": {
        "projects": [
        ],
      }
    }
    console.log(documents);
    await dbService.doc("users/"+userObj.uid).set(documents);
  };
  return (
    <>
        {
            init? (
                myProjects.map(function(project){
                    return (
                        <div key={project.gameId}>
                            <p>{project.title}</p>
                            <Link to={"host?gameId="+project.gameId}>Play</Link>
                            <p onClick={changeEditQuizState}>Edit Quiz</p>
                        </div>
                    )
                })
            ) :(
                <p>Loading...</p>
            )
        }
        
    </>
  );
}

export default MyStuff;