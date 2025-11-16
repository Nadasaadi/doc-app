// app/_layout.tsx
import { Slot, Redirect } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { View, Text, ActivityIndicator } from "react-native";

// Composant de redirection
function AuthRedirect() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
        <Text style={{ fontSize: 60, fontWeight: "800", color: "#1DA1F2" }}>Doc</Text>
        <ActivityIndicator size="large" color="#1DA1F2" />
      </View>
    );
  }

  return <Redirect href={user ? "/profile" : "/auth"} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthRedirect />
      <Slot />
    </AuthProvider>
  );
}