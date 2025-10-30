// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC62S6VNJDrCzO-XgOeHRkXUuRqKzwUmxM",
  authDomain: "smart-library-system-f5146.firebaseapp.com",
  databaseURL: "https://smart-library-system-f5146-default-rtdb.firebaseio.com",
  projectId: "smart-library-system-f5146",
  storageBucket: "smart-library-system-f5146.appspot.com",
  messagingSenderId: "116146169447",
  appId: "1:116146169447:web:6fe8b2f6c5a303d66fd6c2",
  measurementId: "G-YFD72X8LNB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase services
const auth = firebase.auth();
const database = firebase.database();
