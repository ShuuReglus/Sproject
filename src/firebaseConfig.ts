// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCn7bODrQ-qTBEugStuYyLTCSAF7l6535A",
  authDomain: "sin-sproject.firebaseapp.com",
  projectId: "sin-sproject",
  storageBucket: "sin-sproject.firebasestorage.app",
  messagingSenderId: "442519160916",
  appId: "1:442519160916:web:609c6f5e6e5932ab1685c1",
  measurementId: "G-XGD2CXTCHR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
