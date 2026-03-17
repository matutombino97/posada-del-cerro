import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "la-posada-del-cerro.firebaseapp.com",
  projectId: "la-posada-del-cerro",
  storageBucket: "la-posada-del-cerro.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Demo Mode Detection
export const isDemoMode = firebaseConfig.apiKey === "YOUR_API_KEY" || firebaseConfig.apiKey === "";
