// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJAThFy4vHqizakKYD-T9as0QPlGhA1dk",
  authDomain: "public-speaking-eff8d.firebaseapp.com",
  projectId: "public-speaking-eff8d",
  storageBucket: "public-speaking-eff8d.appspot.com",
  messagingSenderId: "500681171355",
  appId: "1:500681171355:web:e32503766301b26e71c13e",
  measurementId: "G-DCDRRP9R6C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);