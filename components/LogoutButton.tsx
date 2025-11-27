// app/profile/components/LogoutButton.tsx
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { styles } from "../app/styles";
export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={logout}>
      <Text style={styles.logoutText}>Déconnexion</Text>
    </TouchableOpacity>
  );
}
