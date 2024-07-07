import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC03qzI6HzcwhqCPde5iuYO7eD9EYIpvi8",
  authDomain: "semanacultural-d9f26.firebaseapp.com",
  projectId: "semanacultural-d9f26",
  storageBucket: "semanacultural-d9f26.appspot.com",
  messagingSenderId: "964970648790",
  appId: "1:964970648790:web:f6b88410d4252049eba577"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();