import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAVPrrwm9iUDpcc6rg_2UwGiEUT0c0HxsA",
  authDomain: "whatsappclone-ayu.firebaseapp.com",
  projectId: "whatsappclone-ayu",
  storageBucket: "whatsappclone-ayu.appspot.com",
  messagingSenderId: "550318961218",
  appId: "1:550318961218:web:1535532a366f0baf2df3db"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;