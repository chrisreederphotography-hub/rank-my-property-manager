import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "hi-company",
  appId: "1:1064951022052:web:119ff292bdc42c5f8c47f1",
  storageBucket: "hi-company.firebasestorage.app",
  apiKey: "AIzaSyBjmREfAhTn4cVbaVKg-aRtWZ71IYFHIxY",
  authDomain: "hi-company.firebaseapp.com",
  messagingSenderId: "1064951022052",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db, app };
