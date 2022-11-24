import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "td-leave.firebaseapp.com",
  projectId: "td-leave",
  storageBucket: "td-leave.appspot.com",
  messagingSenderId: "907300732555",
  appId: process.env.REACT_APP_APP_ID,
  measurementId: "G-VGWWK4DY2M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider};