import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDsdNIr525kSksK3Lj5Bt6ICT3zJC2nyrI",
    authDomain: "whatsapp-89fbb.firebaseapp.com",
    databaseURL: "https://whatsapp-89fbb.firebaseio.com",
    projectId: "whatsapp-89fbb",
    storageBucket: "whatsapp-89fbb.appspot.com",
    messagingSenderId: "654367368577",
    appId: "1:654367368577:web:28688696c4b7d6a2fef480",
    measurementId: "G-GNLCGC4G7N"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;