// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWfwpdrVrktb9s-9thrW7GujpjvpAPVag",
  authDomain: "jumat23okt-5e3d6.firebaseapp.com",
  projectId: "jumat23okt-5e3d6",
  storageBucket: "jumat23okt-5e3d6.appspot.com",
  messagingSenderId: "561632556147",
  appId: "1:561632556147:web:9a32d08f891ad521b96606",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);