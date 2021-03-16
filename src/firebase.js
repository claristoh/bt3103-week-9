import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBnYuvMmnuxtouNbOPg9dFwE4j49IeUJvY",
    authDomain: "bt3103-week-6-claris.firebaseapp.com",
    projectId: "bt3103-week-6-claris",
    storageBucket: "bt3103-week-6-claris.appspot.com",
    messagingSenderId: "1012119078290",
    appId: "1:1012119078290:web:3ed2e1691e0ddf3ab0ad4b",
    measurementId: "G-MWVWYGXZSS"
  };


firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;