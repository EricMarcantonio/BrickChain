import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA6d32f861YVCjA-Zi9U85mbAGWISHqteM",
    authDomain: "brickhacks-7.firebaseapp.com",
    projectId: "brickhacks-7",
    storageBucket: "brickhacks-7.appspot.com",
    messagingSenderId: "350107466899",
    appId: "1:350107466899:web:114e8e8578137a5e12e166",
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export default firebase;