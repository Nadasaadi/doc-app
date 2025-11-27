"use client"

import { useState } from "react"
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
  Dimensions,
} from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { useAuth } from "../contexts/AuthContext"

// Palette de couleurs "Médicale" inspirée de l'image
const COLORS = {
  primary: "#2563EB", // Bleu royal vif
  secondary: "#60A5FA", // Bleu clair
  dark: "#1E3A8A", // Bleu nuit
  background: "#F8FAFC", // Blanc cassé très léger
  text: "#1E293B", // Gris foncé pour le texte
  textLight: "#64748B", // Gris moyen
  white: "#FFFFFF",
  inputBg: "#F1F5F9",
  error: "#EF4444",
}

const { width, height } = Dimensions.get("window")

export default function AuthScreen() {
  // Navigation state: 'splash' | 'signin' | 'signup'
  const [currentView, setCurrentView] = useState<"splash" | "signin" | "signup">("splash")

  const [role, setRole] = useState<"patient" | "medecin">("patient")
  const { login, signup } = useAuth()

  // Champs connexion
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Champs inscription
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")

  // États de chargement
  const [loginLoading, setLoginLoading] = useState(false)
  const [signupLoading, setSignupLoading] = useState(false)

  // === CONNEXION ===
  const handleLogin = async () => {
    if (!email || !password) return
    setLoginLoading(true)
    try {
      await login(email, password)
    } catch (err: any) {
      Alert.alert("Erreur", err.message)
    } finally {
      setLoginLoading(false)
    }
  }

  // === INSCRIPTION ===
  const handleSignUp = async () => {
    if (!firstName || !lastName || !username || !signupEmail || !signupPassword) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires.")
      return
    }
    if (signupPassword.length < 6) {
      Alert.alert("Erreur", "Le mot de passe doit contenir au moins 6 caractères.")
      return
    }

    setSignupLoading(true)
    try {
      await signup({
        firstName,
        lastName,
        username,
        email: signupEmail,
        password: signupPassword,
        role,
      })
      Alert.alert("Succès", "Compte créé !")
    } catch (err: any) {
      let msg = "Erreur inconnue."
      if (err.code === "auth/email-already-in-use") {
        msg = "Cet email est déjà utilisé."
      } else if (err.code === "auth/weak-password") {
        msg = "Mot de passe trop faible (6+ caractères)."
      } else {
        msg = err.message
      }
      Alert.alert("Erreur", msg)
    } finally {
      setSignupLoading(false)
    }
  }

  // Composant de fond avec les "blobs" bleus
  const BackgroundBlobs = () => (
    <View style={StyleSheet.absoluteFill}>
      {/* Grand cercle haut droite */}
      <View
        style={{
          position: "absolute",
          top: -100,
          right: -50,
          width: 300,
          height: 300,
          borderRadius: 150,
          backgroundColor: COLORS.secondary,
          opacity: 0.2,
        }}
      />
      {/* Cercle moyen gauche */}
      <View
        style={{
          position: "absolute",
          top: 100,
          left: -80,
          width: 200,
          height: 200,
          borderRadius: 100,
          backgroundColor: COLORS.primary,
          opacity: 0.15,
        }}
      />
      {/* Petit cercle bas droite */}
      <View
        style={{
          position: "absolute",
          bottom: -50,
          right: -20,
          width: 150,
          height: 150,
          borderRadius: 75,
          backgroundColor: COLORS.dark,
          opacity: 0.1,
        }}
      />
    </View>
  )

  // === VUE SPLASH ===
  if (currentView === "splash") {
    return (
      <View style={styles.splashContainer}>
        {/* Fond dégradé simulé par couleur unie + blobs */}
        <View style={[StyleSheet.absoluteFill, { backgroundColor: COLORS.primary }]}>
          {/* Blobs décoratifs pour le splash */}
          <View
            style={[
              styles.blob,
              { top: -50, right: -50, width: 200, height: 200, backgroundColor: "#FFFFFF", opacity: 0.1 },
            ]}
          />
          <View
            style={[
              styles.blob,
              { top: height * 0.3, left: -100, width: 300, height: 300, backgroundColor: "#FFFFFF", opacity: 0.1 },
            ]}
          />
          <View
            style={[
              styles.blob,
              { bottom: -50, left: 50, width: 150, height: 150, backgroundColor: "#FFFFFF", opacity: 0.2 },
            ]}
          />
        </View>

        <SafeAreaView style={styles.splashContent}>
          <View style={styles.splashHeader}>
            <Text style={styles.splashLogo}>Doc</Text>
          </View>

          <View style={styles.splashBody}>
            <Text style={styles.splashTitle}>Welcome Back!</Text>
            <Text style={styles.splashSubtitle}>Gérez votre santé et vos patients en toute simplicité.</Text>
          </View>

          <View style={styles.splashFooter}>
            <TouchableOpacity style={styles.splashButtonPrimary} onPress={() => setCurrentView("signup")}>
              <Text style={styles.splashButtonTextPrimary}>Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.splashButtonSecondary} onPress={() => setCurrentView("signin")}>
              <Text style={styles.splashButtonTextSecondary}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    )
  }

  // === VUE AUTH (LOGIN / SIGNUP) ===
  const isSignUp = currentView === "signup"

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <BackgroundBlobs />

        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setCurrentView("splash")} style={styles.backButton}>
                <Text style={styles.backButtonText}>{"< Back"}</Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
              <View style={styles.formCard}>
                <Text style={styles.title}>{isSignUp ? "Get Started" : "Welcome back"}</Text>

                {isSignUp ? (
                  // === FORMULAIRE INSCRIPTION ===
                  <>
                    {/* Sélecteur de Rôle */}
                    <View style={styles.roleContainer}>
                      <TouchableOpacity
                        style={[styles.roleButton, role === "patient" && styles.roleActive]}
                        onPress={() => setRole("patient")}
                      >
                        <Text style={[styles.roleText, role === "patient" && styles.roleTextActive]}>Patient</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.roleButton, role === "medecin" && styles.roleActive]}
                        onPress={() => setRole("medecin")}
                      >
                        <Text style={[styles.roleText, role === "medecin" && styles.roleTextActive]}>Médecin</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Full Name</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter Full Name"
                        value={firstName} // Simplification: using firstName for Full Name visual
                        onChangeText={setFirstName}
                        placeholderTextColor="#94A3B8"
                      />
                    </View>

                    {/* Hidden logic for splitting name if needed, or just add another field */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Last Name</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                        placeholderTextColor="#94A3B8"
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Username</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Choose a username"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        placeholderTextColor="#94A3B8"
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Email</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter Email"
                        value={signupEmail}
                        onChangeText={setSignupEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#94A3B8"
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Password</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter Password"
                        value={signupPassword}
                        onChangeText={setSignupPassword}
                        secureTextEntry
                        placeholderTextColor="#94A3B8"
                      />
                    </View>

                    <View style={styles.checkboxContainer}>
                      <View style={styles.checkbox} />
                      <Text style={styles.checkboxLabel}>
                        I agree to the processing of <Text style={{ color: COLORS.primary }}>Personal data</Text>
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={[styles.button, signupLoading && styles.buttonDisabled]}
                      onPress={handleSignUp}
                      disabled={signupLoading}
                    >
                      {signupLoading ? (
                        <ActivityIndicator color="#fff" size="small" />
                      ) : (
                        <Text style={styles.buttonText}>Sign up</Text>
                      )}
                    </TouchableOpacity>
                  </>
                ) : (
                  // === FORMULAIRE CONNEXION ===
                  <>
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Email</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="example@email.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#94A3B8"
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Password</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="••••••••••••"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholderTextColor="#94A3B8"
                      />
                    </View>

                    <View style={styles.rowBetween}>
                      <View style={styles.checkboxContainer}>
                        <View
                          style={[styles.checkbox, { borderColor: COLORS.primary, backgroundColor: COLORS.primary }]}
                        >
                          <Text style={{ color: "white", fontSize: 10, textAlign: "center" }}>✓</Text>
                        </View>
                        <Text style={styles.checkboxLabel}>Remember me</Text>
                      </View>
                      <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Forgot password?</Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      style={[styles.button, loginLoading && styles.buttonDisabled]}
                      onPress={handleLogin}
                      disabled={loginLoading}
                    >
                      {loginLoading ? (
                        <ActivityIndicator color="#fff" size="small" />
                      ) : (
                        <Text style={styles.buttonText}>Sign in</Text>
                      )}
                    </TouchableOpacity>
                  </>
                )}

                {/* Social Login Section */}
                <View style={styles.socialSection}>
                  <Text style={styles.socialText}>{isSignUp ? "Sign up with" : "Sign in with"}</Text>
                  <View style={styles.socialIcons}>
                    {["f", "t", "G", ""].map((icon, index) => (
                      <TouchableOpacity key={index} style={styles.socialButton}>
                        <Text style={styles.socialIconText}>{icon}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.footer}>
                  <Text style={styles.footerPrompt}>
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}
                  </Text>
                  <TouchableOpacity onPress={() => setCurrentView(isSignUp ? "signin" : "signup")}>
                    <Text style={styles.footerLink}>{isSignUp ? "Sign in" : "Sign up"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  splashContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  splashContent: {
    flex: 1,
    justifyContent: "space-between",
    padding: 30,
  },
  splashHeader: {
    marginTop: 50,
  },
  splashBody: {
    flex: 1,
    justifyContent: "center",
  },
  splashFooter: {
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },

  // Splash Elements
  splashLogo: {
    fontSize: 48,
    fontWeight: "800",
    color: COLORS.white,
  },
  splashTitle: {
    fontSize: 42,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 16,
    lineHeight: 48,
  },
  splashSubtitle: {
    fontSize: 18,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 26,
  },
  splashButtonPrimary: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  splashButtonSecondary: {
    flex: 1,
    backgroundColor: "transparent",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: 'rgba(255,255,255,0.3)',
  },
  splashButtonTextPrimary: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "700",
  },
  splashButtonTextSecondary: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
  },

  // Auth Views
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: COLORS.white, // Will be visible if background blobs are dark, otherwise change
    fontSize: 16,
    fontWeight: "600",
    // If background is light, override:
    textShadowColor: "rgba(0,0,0,0.1)",
    textShadowRadius: 4,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 30,
  },

  // Inputs
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    height: 50,
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: "transparent",
  },

  // Role Selector
  roleContainer: {
    flexDirection: "row",
    marginBottom: 24,
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    padding: 4,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  roleActive: {
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  roleText: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: "600",
  },
  roleTextActive: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  // Actions
  button: {
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  // Footer / Social
  socialSection: {
    marginTop: 30,
    alignItems: "center",
  },
  socialText: {
    color: COLORS.textLight,
    fontSize: 14,
    marginBottom: 16,
  },
  socialIcons: {
    flexDirection: "row",
    gap: 20,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.inputBg,
    justifyContent: "center",
    alignItems: "center",
  },
  socialIconText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    alignItems: "center",
  },
  footerPrompt: {
    color: COLORS.textLight,
    fontSize: 15,
  },
  footerLink: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 6,
  },

  // Utilities
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.textLight,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxLabel: {
    color: COLORS.textLight,
    fontSize: 13,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  forgotPassword: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "600",
  },
  blob: {
    position: "absolute",
    borderRadius: 999,
  },
})
