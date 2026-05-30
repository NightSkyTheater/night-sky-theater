import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase 설정 (너가 복사한 config)
const firebaseConfig = {
  apiKey: "AIzaSyDv6x4KdopE_P2b7M2se6Ve9hTnL9ap2RY",
  authDomain: "nightskytheater-ea9f7.firebaseapp.com",
  projectId: "nightskytheater-ea9f7",
  storageBucket: "nightskytheater-ea9f7.firebasestorage.app",
  messagingSenderId: "984201062649",
  appId: "1:984201062649:web:5f77dca77c9b4037e0da28",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore(DB) 연결
export const db = getFirestore(app);