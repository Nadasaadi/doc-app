// app/auth.tsx
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../contexts/AuthContext";

const TWITTER_BLUE = "#1DA1F2";

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState<"patient" | "medecin">("patient");
  const { login, signup } = useAuth();

  // Champs connexion
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Champs inscription
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // États de chargement
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  // === CONNEXION ===
 const handleLogin = async () => {
  if (!email || !password) return;
  setLoginLoading(true);
  console.log("Tentative login:", email);
  try {
    await login(email, password);
    console.log("Login appelé, redirection en cours...");
  } catch (err: any) {
    console.error("Erreur login:", err.code, err.message);
    Alert.alert("Erreur", err.message);
  } finally {
    setLoginLoading(false);
  }
};

  // === INSCRIPTION ===
  const handleSignUp = async () => {
    if (!firstName || !lastName || !username || !signupEmail || !signupPassword) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires.");
      return;
    }
    if (signupPassword.length < 6) {
      Alert.alert("Erreur", "Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

  setSignupLoading(true);
  try {
    await signup({
      firstName,
      lastName,
      username,
      email: signupEmail,
      password: signupPassword,
      role,
    });
    Alert.alert("Succès", "Compte créé !");
  } catch (err: any) {
    console.error("Erreur dans handleSignUp:", err);
    let msg = "Erreur inconnue.";
    if (err.code === "auth/email-already-in-use") {
      msg = "Cet email est déjà utilisé.";
    } else if (err.code === "auth/weak-password") {
      msg = "Mot de passe trop faible (6+ caractères).";
    } else {
      msg = err.message;
    }
    Alert.alert("Erreur", msg);
  } finally {
    setSignupLoading(false);
  }

  };
  

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, width: "100%" }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Logo */}
            <Text style={styles.logo}>Doc</Text>

            {/* Titre */}
            <Text style={styles.title}>{isSignUp ? "Créer un compte" : "Connexion"}</Text>

            {/* === INSCRIPTION === */}
            {isSignUp ? (
              <>
                {/* Rôle */}
                <View style={styles.roleContainer}>
                  <TouchableOpacity
                    style={[styles.roleButton, role === "patient" && styles.roleActive]}
                    onPress={() => setRole("patient")}
                  >
                    <Text style={[styles.roleText, role === "patient" && styles.roleTextActive]}>
                      Patient
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.roleButton, role === "medecin" && styles.roleActive]}
                    onPress={() => setRole("medecin")}
                  >
                    <Text style={[styles.roleText, role === "medecin" && styles.roleTextActive]}>
                      Médecin
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Champs */}
                <TextInput
                  style={styles.input}
                  placeholder="Prénom"
                  value={firstName}
                  onChangeText={setFirstName}
                  autoCapitalize="words"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Nom"
                  value={lastName}
                  onChangeText={setLastName}
                  autoCapitalize="words"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={signupEmail}
                  onChangeText={setSignupEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Mot de passe (6+ caractères)"
                  value={signupPassword}
                  onChangeText={setSignupPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />

                {/* Bouton */}
                <TouchableOpacity
                  style={[styles.button, signupLoading && styles.buttonDisabled]}
                  onPress={handleSignUp}
                  disabled={signupLoading}
                >
                  {signupLoading ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text style={styles.buttonText}>Créer le compte</Text>
                  )}
                </TouchableOpacity>
              </>
            ) : (
              <>
                {/* === CONNEXION === */}
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Mot de passe"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />

                <TouchableOpacity
                  style={[styles.button, loginLoading && styles.buttonDisabled]}
                  onPress={handleLogin}
                  disabled={loginLoading}
                >
                  {loginLoading ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text style={styles.buttonText}>Se connecter</Text>
                  )}
                </TouchableOpacity>
              </>
            )}

            {/* Basculer entre modes */}
            <View style={styles.footer}>
              <Text style={styles.footerPrompt}>
                {isSignUp ? "Déjà un compte ?" : "Pas de compte ?"}
              </Text>
              <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
                <Text style={styles.footerLink}>
                  {isSignUp ? "Se connecter" : "S'inscrire"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// === STYLES ===
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 40,
    width: "100%",
  },
  logo: {
    fontSize: 64,
    fontWeight: "800",
    color: TWITTER_BLUE,
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0f1419",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: "#e1e8ed",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 14,
    backgroundColor: "#F7F9F9",
    color: "#0f1419",
    width: "100%",
  },
  button: {
    height: 52,
    backgroundColor: TWITTER_BLUE,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    alignItems: "center",
  },
  footerPrompt: {
    color: "#657786",
    fontSize: 15,
  },
  footerLink: {
    color: TWITTER_BLUE,
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 6,
  },
  roleContainer: {
    flexDirection: "row",
    marginBottom: 16,
    width: "100%",
    gap: 10,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: "#e1e8ed",
    borderRadius: 12,
    backgroundColor: "#F7F9F9",
    alignItems: "center",
  },
  roleActive: {
    backgroundColor: TWITTER_BLUE,
    borderColor: TWITTER_BLUE,
  },
  roleText: {
    fontSize: 15,
    color: "#657786",
    fontWeight: "600",
  },
  roleTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
});