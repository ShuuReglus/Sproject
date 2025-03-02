//import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ← 修正
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCn7bODrQ-qTBEugStuYyLTCSAF7l6535A",
  authDomain: "sin-sproject.firebaseapp.com",
  projectId: "sin-sproject",
  storageBucket: "sin-sproject.firebasestorage.app",
  messagingSenderId: "442519160916",
  appId: "1:442519160916:web:e379203c254c4a831685c1",
  measurementId: "G-QTX6MJGGDJ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ← シンプルな初期化
const db = getFirestore(app);

export { auth, db };
