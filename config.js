import firebase from 'firebase'
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyA9bD_UgH3jxYsjey8lKzg7y9tPGY-1E-g",
    authDomain: "book-santa-57570.firebaseapp.com",
    projectId: "book-santa-57570",
    storageBucket: "book-santa-57570.appspot.com",
    messagingSenderId: "32928430219",
    appId: "1:32928430219:web:c8ab6e6d181796d8c93c8e",
    measurementId: "G-KD1Y8WVZYK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();