import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBHtUsXF17uFSnVVvbe82-1bVOz18TKvco",
    authDomain: "nims-poc.firebaseapp.com",
    databaseURL: "https://nims-poc.firebaseio.com",
    projectId: "nims-poc",
    storageBucket: "nims-poc.appspot.com",
    messagingSenderId: "697070882611",
    appId: "1:697070882611:web:b381a2791c1e28e1c3b846",
    measurementId: "G-1YS4NSPPMD"
  };

  

    let app = firebase.initializeApp(firebaseConfig);
    export const db = app.database();