"use client"

import React from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Switch,
} from "react-native"
import {
  ChevronRight,
  LogOut,
  Moon,
  Sun,
  Globe,
  Bell,
  Lock,
  HelpCircle,
  Info,
  User,
} from "lucide-react-native"

const COLORS = {
  primary: "#4B7FFB",
  background: "#F8FAFC",
  white: "#FFFFFF",
  text: "#0f172a",
  textLight: "#64748b",
  border: "#E2E8F0",
  danger: "#EF4444",
}

interface SettingsScreenProps {
  user: any
  onLogout: () => void
  onBack: () => void
}

export default function SettingsScreen({ user, onLogout, onBack }: SettingsScreenProps) {
  const [darkMode, setDarkMode] = React.useState(false)
  const [notifications, setNotifications] = React.useState(true)
  const [language, setLanguage] = React.useState<"fr" | "en">("fr")

  if (!user) {
    return <Text>Loading...</Text>
  }

  const SettingItem = ({
    icon: Icon,
    title,
    subtitle,
    onPress,
    showArrow = true,
    rightElement,
  }: {
    icon: any
    title: string
    subtitle?: string
    onPress?: () => void
    showArrow?: boolean
    rightElement?: React.ReactNode
  }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Icon size={20} color={COLORS.primary} />
        </View>
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightElement || (showArrow && <ChevronRight size={20} color={COLORS.textLight} />)}
    </TouchableOpacity>
  )

  const SectionHeader = ({ title }: { title: string }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ChevronRight size={24} color={COLORS.text} style={{ transform: [{ rotate: "180deg" }] }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <Image source={{ uri: "https://i.pravatar.cc/150?u=patient" }} style={styles.profileAvatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {user.firstName || "Jean"} {user.lastName || "Dupont"}
            </Text>
            <Text style={styles.profileEmail}>{user.email || "jean.dupont@example.com"}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>
                {user.role === "medecin" ? "Médecin" : "Patient"}
              </Text>
            </View>
          </View>
        </View>

        {/* Appearance Section */}
        <SectionHeader title="Apparence" />
        <View style={styles.section}>
          <SettingItem
            icon={darkMode ? Moon : Sun}
            title="Mode sombre"
            subtitle={darkMode ? "Activé" : "Désactivé"}
            showArrow={false}
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: "#E2E8F0", true: COLORS.primary }}
                thumbColor="#FFFFFF"
              />
            }
          />
        </View>

        {/* Language Section */}
        <SectionHeader title="Langue" />
        <View style={styles.section}>
          <SettingItem
            icon={Globe}
            title="Langue de l'application"
            subtitle={language === "fr" ? "Français" : "English"}
            onPress={() => setLanguage(language === "fr" ? "en" : "fr")}
          />
        </View>

        {/* Notifications Section */}
        <SectionHeader title="Notifications" />
        <View style={styles.section}>
          <SettingItem
            icon={Bell}
            title="Notifications push"
            subtitle={notifications ? "Activées" : "Désactivées"}
            showArrow={false}
            rightElement={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: "#E2E8F0", true: COLORS.primary }}
                thumbColor="#FFFFFF"
              />
            }
          />
        </View>

        {/* Account Section */}
        <SectionHeader title="Compte" />
        <View style={styles.section}>
          <SettingItem icon={User} title="Modifier le profil" onPress={() => console.log("Edit profile")} />
          <SettingItem icon={Lock} title="Confidentialité et sécurité" onPress={() => console.log("Privacy")} />
        </View>

        {/* Support Section */}
        <SectionHeader title="Support" />
        <View style={styles.section}>
          <SettingItem icon={HelpCircle} title="Centre d'aide" onPress={() => console.log("Help")} />
          <SettingItem icon={Info} title="À propos" subtitle="Version 1.0.0" onPress={() => console.log("About")} />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <LogOut size={20} color={COLORS.danger} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

// Styles identiques à ton code initial
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 16, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  backButton: { width: 40, height: 40, justifyContent: "center", alignItems: "center" },
  headerTitle: { fontSize: 20, fontWeight: "700", color: COLORS.text },
  scrollContent: { padding: 20 },
  profileCard: { flexDirection: "row", backgroundColor: COLORS.white, borderRadius: 20, padding: 20, marginBottom: 24 },
  profileAvatar: { width: 64, height: 64, borderRadius: 32, marginRight: 16 },
  profileInfo: { flex: 1, justifyContent: "center" },
  profileName: { fontSize: 18, fontWeight: "700", color: COLORS.text, marginBottom: 4 },
  profileEmail: { fontSize: 14, color: COLORS.textLight, marginBottom: 8 },
  roleBadge: { alignSelf: "flex-start", backgroundColor: "#E0EDFF", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  roleBadgeText: { fontSize: 12, fontWeight: "600", color: COLORS.primary },
  sectionHeader: { fontSize: 14, fontWeight: "700", color: COLORS.textLight, marginBottom: 12, marginTop: 8, textTransform: "uppercase", letterSpacing: 0.5 },
  section: { backgroundColor: COLORS.white, borderRadius: 16, marginBottom: 16, overflow: "hidden" },
  settingItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  settingLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  iconContainer: { width: 40, height: 40, borderRadius: 12, backgroundColor: "#E0EDFF", justifyContent: "center", alignItems: "center", marginRight: 12 },
  settingTextContainer: { flex: 1 },
  settingTitle: { fontSize: 16, fontWeight: "600", color: COLORS.text, marginBottom: 2 },
  settingSubtitle: { fontSize: 13, color: COLORS.textLight },
  logoutButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginTop: 8, borderWidth: 1, borderColor: "#FEE2E2", gap: 8 },
  logoutText: { fontSize: 16, fontWeight: "600", color: COLORS.danger },
})
