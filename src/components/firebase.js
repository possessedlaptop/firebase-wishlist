
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvet1NLAHNoad19FzKfsRsT4v17Xudz-M",
  authDomain: "fir-wishlist-e2f0c.firebaseapp.com",
  projectId: "fir-wishlist-e2f0c",
  storageBucket: "fir-wishlist-e2f0c.appspot.com",
  messagingSenderId: "804894235054",
  appId: "1:804894235054:web:a8365d17eb62401d6a503f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };