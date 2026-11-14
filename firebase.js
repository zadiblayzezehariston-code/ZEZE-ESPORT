// Connexion du site à Firebase (comptes + base de données)
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC-geuauhwheri_2eYl2MY4jTey5y1KGSI",
  authDomain: "zeze-game-zone.firebaseapp.com",
  projectId: "zeze-game-zone",
  storageBucket: "zeze-game-zone.firebasestorage.app",
  messagingSenderId: "1095440562538",
  appId: "1:1095440562538:web:c2c69fe78e2eff23444d13"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export {
  onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";

export {
  doc, getDoc, writeBatch, collection, addDoc, query, where, getDocs, deleteDoc
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";
