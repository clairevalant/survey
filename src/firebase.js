import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCQi9PyVQDW38Tpf9gdXsDm1ZbKcNgAL4E",
  authDomain: "questionnaire-83533.firebaseapp.com",
  databaseURL: "https://questionnaire-83533.firebaseio.com",
  projectId: "questionnaire-83533",
  storageBucket: "questionnaire-83533.appspot.com",
  messagingSenderId: "125821248028",
  appId: "1:125821248028:web:4c70d9291fd1a1720875d9",
  measurementId: "G-LPPQ367LH5"
};
firebase.initializeApp(firebaseConfig);

export default firebase;

