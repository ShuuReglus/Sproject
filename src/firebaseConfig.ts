import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, Auth, inMemoryPersistence, browserLocalPersistence } from 'firebase/auth';  // 必要な永続化オプションをインポート
import * as SecureStore from 'expo-secure-store';  // expo-secure-storeをインポート
import { getFirestore } from 'firebase/firestore';

// Firebaseの設定
const firebaseConfig = {
  apiKey: "AIzaSyCn7bODrQ-qTBEugStuYyLTCSAF7l6535A",
  authDomain: "sin-sproject.firebaseapp.com",
  projectId: "sin-sproject",
  storageBucket: "sin-sproject.firebasestorage.app",
  messagingSenderId: "442519160916",
  appId: "1:442519160916:web:e379203c254c4a831685c1",
  measurementId: "G-QTX6MJGGDJ",
};

// Firebaseアプリの初期化
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Firebase認証の初期化
const auth: Auth = initializeAuth(app, {
  persistence: inMemoryPersistence,  // 永続化の方法としてinMemoryPersistenceを使用
});

// Firestoreの初期化
const db = getFirestore(app);

export { auth, db };






















