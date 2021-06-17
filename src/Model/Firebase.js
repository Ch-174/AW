import "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyB_C_JAp7CIIB0itKtc5_wW9bmfHo2I9Cc",
    authDomain: "aluguerfilme.firebaseapp.com",
    projectId: "aluguerfilme",
    storageBucket: "aluguerfilme.appspot.com",
    messagingSenderId: "422482778621",
    appId: "1:422482778621:web:be635f59c8322779c8a194",
    measurementId: "G-DZDEKRMDES"
  };

if (!firebase.app) firebase.initializeApp(firebaseConfig);

export default firebase