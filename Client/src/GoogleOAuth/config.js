import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD_vTZ4BbXeH0r5BsWkO0ZJEcUnyidBZrc",
  authDomain: "td-leave.firebaseapp.com",
  projectId: "td-leave",
  storageBucket: "td-leave.appspot.com",
  messagingSenderId: "907300732555",
  appId: "1:907300732555:web:f4c0ca6ee94bf77c435e8e",
  measurementId: "G-VGWWK4DY2M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
