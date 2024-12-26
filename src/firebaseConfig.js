import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4tXmWxcbZGekspCYLju38xug4m3m5KZU",
    authDomain: "gym-management-system-5eb0e.firebaseapp.com",
    projectId: "gym-management-system-5eb0e",
    storageBucket: "gym-management-system-5eb0e.firebasestorage.app",
    messagingSenderId: "651039222536",
    appId: "1:651039222536:web:8f3ab52c3a2a203e0c1abd",
    measurementId: "G-3GDHLMW21Q"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };