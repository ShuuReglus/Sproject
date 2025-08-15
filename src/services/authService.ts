import {
  createUserWithEmailAndPassword,
  //getAuth,
  type UserCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; //getFirestore,

import { auth, db } from "../firebaseConfig";

interface RegisterUserProps {
  email: string;
  password: string;
  username: string;
}

// ユーザー登録＆Firestoreに保存
export const registerUser = async ({
  email,
  password,
  username,
}: RegisterUserProps): Promise<UserCredential> => {
  try {
    // Firebase Authenticationでユーザー作成
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    console.log("ユーザー登録成功:", userCredential.user);
    const user = userCredential.user;

    // Firestoreにユーザーデータ保存
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      username: username,
      createdAt: new Date().toISOString(),
    });

    console.log("User registered successfully:", user.uid);
    return userCredential;
  } catch (error) {
    console.error("Error registering user:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};
