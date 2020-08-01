import firebase from 'firebase';
require("dotenv").config();

const firebaseApp = firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: "instagram-redo-f122f.firebaseapp.com",
    databaseURL: "https://instagram-redo-f122f.firebaseio.com",
    projectId: "instagram-redo-f122f",
    storageBucket: "instagram-redo-f122f.appspot.com",
    messagingSenderId: "885172372859",
    appId: "1:885172372859:web:5d13aea4b5cec8714ea9de",
    measurementId: "G-STNX3ME7KH"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {
    db,
    auth,
    storage
};