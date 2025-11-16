// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  initializeFirestore, 
  persistentLocalCache, 
  persistentSingleTabManager 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOncW8e9Tw3X1dwjXjieOFWj0MvenBWcQ",
  authDomain: "docapp-feb7e.firebaseapp.com",
  projectId: "docapp-feb7e",
  storageBucket: "docapp-feb7e.appspot.com",
  messagingSenderId: "912868870815",
  appId: "1:912868870815:android:9a464b732f3d936746b0aa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Cache persistant (offline DZ)
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentSingleTabManager(),
  }),
});

export { auth, db };