// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZY3wyWClWE6BX0Gwrm1yxrP0gWcQbSZg",
  authDomain: "diplomadofrontend.firebaseapp.com",
  projectId: "diplomadofrontend",
  storageBucket: "diplomadofrontend.appspot.com",
  messagingSenderId: "1047450460085",
  appId: "1:1047450460085:web:d98a6f79a61dde6f0243fc",
  measurementId: "G-R7F3GF9KNN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };