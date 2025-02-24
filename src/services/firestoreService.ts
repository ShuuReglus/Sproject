// src/services/firestoreService.ts
import { addDoc, collection, getDocs } from "firebase/firestore";

import { db } from "../firebaseConfig";

// ランキングデータを追加する関数
export const addRanking = async (name: string, score: number) => {
  try {
    await addDoc(collection(db, "rankings"), {
      name,
      score,
      createdAt: new Date(),
    });
    console.log("ランキング追加成功");
  } catch (error) {
    console.error("ランキング追加失敗", error);
  }
};

// Firestoreからランキングデータを取得する関数
export const getRankings = async () => {
  try {
    const snapshot = await getDocs(collection(db, "rankings"));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("ランキング取得失敗", error);
    return [];
  }
};
