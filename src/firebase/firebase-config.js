// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXr51W_KaLoVAOwEaQ-gGszirzek_UPI8",
  authDomain: "btl-mnm-nhom-5.firebaseapp.com",
  projectId: "btl-mnm-nhom-5",
  storageBucket: "btl-mnm-nhom-5.appspot.com",
  messagingSenderId: "914845152605",
  appId: "1:914845152605:web:ec8eb6cd29a1e3db6ba4b4",
  measurementId: "G-3PTCNNGV9W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
