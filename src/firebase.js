// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB_1Y7SfGfveweNu16xasuDQuve6Jlkvxo',
  authDomain: 'financial-statement-cfe69.firebaseapp.com',
  projectId: 'financial-statement-cfe69',
  storageBucket: 'financial-statement-cfe69.appspot.com',
  messagingSenderId: '665605388743',
  appId: '1:665605388743:web:0e7ac83b836d468e8241e2',
  measurementId: 'G-53E4DMZQC6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
