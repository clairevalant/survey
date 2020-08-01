import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCiUh7mvdIJL2WFj1eBFh6xPvnWkkKqTVQ",
  authDomain: "dot-health-questionnaire.firebaseapp.com",
  databaseURL: "https://dot-health-questionnaire.firebaseio.com",
  projectId: "dot-health-questionnaire",
  storageBucket: "dot-health-questionnaire.appspot.com",
  messagingSenderId: "288378327056",
  appId: "1:288378327056:web:91f5b1983659a3d0ef7a95",
  measurementId: "G-DNVENMFC4B"
};
firebase.initializeApp(firebaseConfig);

export default firebase;

