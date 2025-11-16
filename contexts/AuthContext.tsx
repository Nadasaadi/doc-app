// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export interface User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  role: "patient" | "medecin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Écoute l'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        console.log("Connexion détectée, UID:", firebaseUser.uid);

        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            console.log("Profil chargé depuis Firestore:", data);

            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email!,
              firstName: data.firstName,
              lastName: data.lastName,
              username: data.username,
              role: data.role,
            });
          } else {
            console.warn("Document utilisateur non trouvé dans Firestore");
            setUser(null);
          }
        } catch (error: any) {
          console.error("Erreur lecture Firestore:", error.message);
          setUser(null);
        }
      } else {
        console.log("Aucun utilisateur connecté");
        setUser(null);
      }

      // DÉBLOQUE LA REDIRECTION
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Connexion
  const login = async (email: string, password: string) => {
    console.log("Tentative login:", email);
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Login appelé, onAuthStateChanged va rediriger...");
  };

  // Inscription
  const signup = async (data: any) => {
    const { email, password, role, ...profile } = data;

    try {
      console.log("Inscription démarrée:", email);

      // 1. Créer dans Auth
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;
      console.log("Utilisateur créé dans Auth, UID:", uid);

      // 2. Préparer les données
      const userData = { uid, email, role, ...profile };
      console.log("Données à sauvegarder:", userData);

      // 3. Sauvegarder dans Firestore
      await setDoc(doc(db, "users", uid), userData);
      console.log("Profil sauvegardé dans Firestore !");

      // FORCER LA MISE À JOUR (pour signup immédiat)
      setUser(userData);
      setLoading(false);

    } catch (err: any) {
      console.error("ERREUR INSCRIPTION:", err.code, err.message);
      throw err;
    }
  };

  // Déconnexion
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    console.log("Déconnexion réussie");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);