import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPGPRAVMWi4VNDGMRtXdOWuQ7v2_MmkYs",
  authDomain: "conhecagaranhuns.firebaseapp.com",
  projectId: "conhecagaranhuns",
  storageBucket: "conhecagaranhuns.firebasestorage.app",
  messagingSenderId: "1060117832305",
  appId: "1:1060117832305:web:065f84d1dfc365468771d0",
  measurementId: "G-79QXV4X6MC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
