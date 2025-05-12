
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBOZyGAS1GM8bHxlG-zrfwg2-X5WsCy8E4',
  authDomain: 'doc-ai-entity-extraction.firebaseapp.com',
  projectId: 'doc-ai-entity-extraction',
  storageBucket: 'doc-ai-entity-extraction.firebasestorage.app',
  messagingSenderId: '406601301977',
  appId: '1:406601301977:web:497e8586098fdb37d463c8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { auth, db };
