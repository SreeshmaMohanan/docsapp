// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdLClRXI0_XcN6XTJ2NA3-fyRDReZZ7SY",
  authDomain: "docs-app-90523.firebaseapp.com",
  projectId: "docs-app-90523",
  storageBucket: "docs-app-90523.appspot.com",
  messagingSenderId: "998304956324",
  appId: "1:998304956324:web:fa35162dc8cb154c9f8b31",
  measurementId: "G-WGHLLED9S4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db= getFirestore(app)