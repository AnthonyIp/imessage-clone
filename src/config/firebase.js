import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAfwfdzHq2JVT_a40wXROkrUMFeeUW-Qyw",
    authDomain: "imessage-clone-35390.firebaseapp.com",
    databaseURL: "https://imessage-clone-35390.firebaseio.com",
    projectId: "imessage-clone-35390",
    storageBucket: "imessage-clone-35390.appspot.com",
    messagingSenderId: "334963443768",
    appId: "1:334963443768:web:d0cf1a7424fd95a4ce3ecd",
    measurementId: "G-6JMX1VNTF5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;