import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// manually need to write these above 3 lines commands to replace "import firebase from 'firebase' "


// Copied and pasted from firebase https://console.firebase.google.com/u/0/project/email-clone-yt-254c8/settings/general/web:M2Y1M2IxMDMtZDc1Ni00NjkxLTgwN2MtYjE3MmM1MDg4NWI3
const firebaseConfig = {
    apiKey: "AIzaSyCrKkYlEv7gzZReFEH9XOUhd7Ac0dko8dc",
    authDomain: "email-clone-yt-254c8.firebaseapp.com",
    projectId: "email-clone-yt-254c8",
    storageBucket: "email-clone-yt-254c8.appspot.com",
    messagingSenderId: "214079276937",
    appId: "1:214079276937:web:2249e2676c9369a4820358"
};


// Need to write manually these below codes as well
const firebaseApp = firebase.initializeApp(firebaseConfig) // it connects the frontend to backend 


// Need to goto https://console.firebase.google.com/u/0/project/email-clone-yt-254c8/firestore firestore database and create new database.
//  select 'Start in test mode' and click next

// In order to get the database from our code, we write this code
const db = firebaseApp.firestore();

// Help to do Authentication on this app, so goto https://console.firebase.google.com/u/0/project/email-clone-yt-254c8/authentication click get started
// IN sign-in method, select (enable) GOOGLE & EMAIL-PASSWORD
const auth = firebase.auth();

// Now we need GOOGLE Provider
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider};

// Now goto SendMail.js, In that connect your onSubmit to database