import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";            
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyANDwc9iFLh_-SaW4pcqU35MI_giqvFE-w",
    authDomain: "quiz-game-8efd8.firebaseapp.com",
    databaseURL: "https://quiz-game-8efd8.firebaseio.com",
    projectId: "quiz-game-8efd8",
    storageBucket: "quiz-game-8efd8.appspot.com",
    messagingSenderId: "296349709473",
    appId: "1:296349709473:web:ce115d5981b0ef7bf26ce0",
    measurementId: "G-8G63G38VD8"
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();