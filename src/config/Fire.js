
import firebase from 'firebase';

  var config = {
    apiKey: "AIzaSyC53O0DxwSAbAgEQTcj3eVwpuIPad3LqpQ",
    authDomain: "crapmap-c5c7f.firebaseapp.com",
    databaseURL: "https://crapmap-c5c7f.firebaseio.com",
    projectId: "crapmap-c5c7f",
    storageBucket: "crapmap-c5c7f.appspot.com",
    messagingSenderId: "164189189430"
  };

  firebase.initializeApp(config);

const fire = firebase.initializeApp(config);
export default fire;