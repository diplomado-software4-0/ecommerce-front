import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZY3wyWClWE6BX0Gwrm1yxrP0gWcQbSZg",
  authDomain: "diplomadofrontend.firebaseapp.com",
  projectId: "diplomadofrontend",
  storageBucket: "diplomadofrontend.appspot.com",
  messagingSenderId: "1047450460085",
  appId: "1:1047450460085:web:4787f9a7df83f7b70243fc",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
