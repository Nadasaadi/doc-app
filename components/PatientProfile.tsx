"use client"

import { useState } from "react"

import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native"

import { Bell, Search, Mic, Video, Calendar, Clock, Star, Bookmark, Home, Mail, Settings } from "lucide-react"
import SettingsScreen from "./SettingsScreen"
import { useAuth } from "../contexts/AuthContext"

// Mock data for visual completeness (since the hook might be empty initially)
const POPULAR_DOCTORS = [
  {
    id: 1,
    name: "Dr. Ali Khan",
    speciality: "Cardiology",
    rating: 4.9,
    reviews: 190,
    image: "https://i.pravatar.cc/150?u=doctor1",
  },
  {
    id: 2,
    name: "Dr. Sarah Smith",
    speciality: "Dermatology",
    rating: 4.8,
    reviews: 124,
    image: "https://i.pravatar.cc/150?u=doctor2",
  },
]

const CATEGORIES = ["All", "Cardiology", "Dermatology", "Neurology"]

export default function PatientProfile({ user }: any) {
  const [currentScreen, setCurrentScreen] = useState<"home" | "settings">("home")
  const { logout } = useAuth()

  // Use the first appointment or a mock one for the "Upcoming" card
  const nextAppointment = user?.appointments?.[0] || {
    doctorName: "Dr. Ali Khan",
    speciality: "Cardiology",
    date: "18 Nov, Monday",
    time: "8pm - 8:30 pm",
  }

  const handleLogout = async () => {
    await logout()
  }

  if (currentScreen === "settings") {
    return <SettingsScreen user={user} onLogout={handleLogout} onBack={() => setCurrentScreen("home")} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image source={{ uri: "https://i.pravatar.cc/150?u=patient" }} style={styles.avatar} />
            <View>
              <Text style={styles.greeting}>Good morning!</Text>
              <Text style={styles.userName}>
                {user?.firstName || "Sajibur"} {user?.lastName || "Rahman"}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bellButton}>
            <Bell size={24} color="#1e293b" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        <Text style={styles.mainTitle}>How are you feeling{"\n"}today?</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#94a3b8" style={styles.searchIcon} />
          <TextInput
            placeholder="Search a doctor, medicines, etc..."
            placeholderTextColor="#94a3b8"
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.micButton}>
            <Mic size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.appointmentCard}>
          <View style={styles.cardHeader}>
            <View style={styles.doctorInfo}>
              <Image source={{ uri: "https://i.pravatar.cc/150?u=doctor1" }} style={styles.doctorAvatar} />
              <View>
                <Text style={styles.cardDoctorName}>{nextAppointment.doctorName}</Text>
                <Text style={styles.cardSpeciality}>{nextAppointment.speciality}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.videoButton}>
              <Video size={24} color="#4B7FFB" />
            </TouchableOpacity>
          </View>

          <View style={styles.scheduleContainer}>
            <View style={styles.scheduleItem}>
              <Calendar size={16} color="rgba(255,255,255,0.7)" />
              <Text style={styles.scheduleText}>{nextAppointment.date}</Text>
            </View>
            <View style={styles.scheduleItem}>
              <Clock size={16} color="rgba(255,255,255,0.7)" />
              <Text style={styles.scheduleText}>{nextAppointment.time}</Text>
            </View>
          </View>

          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.rescheduleButton}>
              <Text style={styles.rescheduleText}>Re-Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton}>
              <Text style={styles.profileButtonText}>View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Popular Doctors */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Doctors</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {CATEGORIES.map((cat, index) => (
            <TouchableOpacity key={index} style={[styles.categoryChip, index === 0 && styles.activeCategoryChip]}>
              <Text style={[styles.categoryText, index === 0 && styles.activeCategoryText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.doctorsList}>
          {POPULAR_DOCTORS.map((doctor) => (
            <View key={doctor.id} style={styles.doctorListItem}>
              <Image source={{ uri: doctor.image }} style={styles.doctorListImage} />
              <View style={styles.doctorListInfo}>
                <Text style={styles.doctorListName}>{doctor.name}</Text>
                <Text style={styles.doctorListSpeciality}>{doctor.speciality}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.ratingText}>{doctor.rating}</Text>
                  <Text style={styles.reviewsText}> | {doctor.reviews} Reviews</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Bookmark size={20} color="#94a3b8" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Spacer for bottom nav */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItemActive}>
            <Home size={20} color="#FFFFFF" />
            <Text style={styles.navTextActive}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Calendar size={24} color="#94a3b8" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Mail size={24} color="#94a3b8" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen("settings")}>
            <Settings size={24} color="#94a3b8" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Light gray/blue background
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  greeting: {
    fontSize: 14,
    color: "#64748b",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  userName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },
  bellButton: {
    width: 40,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 24,
    lineHeight: 36,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#0f172a",
  },
  micButton: {
    padding: 8,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },
  seeAllText: {
    fontSize: 14,
    color: "#64a3b8",
  },
  appointmentCard: {
    backgroundColor: "#4B7FFB", // Primary Blue
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#4B7FFB",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  doctorInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  doctorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
  },
  cardDoctorName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  cardSpeciality: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  videoButton: {
    width: 44,
    height: 44,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  scheduleContainer: {
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  scheduleItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  scheduleText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  cardActions: {
    flexDirection: "row",
    gap: 12,
  },
  rescheduleButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  rescheduleText: {
    color: "#4B7FFB",
    fontWeight: "600",
    fontSize: 15,
  },
  profileButton: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 14,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  profileButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },
  categoriesScroll: {
    marginBottom: 20,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  activeCategoryChip: {
    backgroundColor: "#4B7FFB",
    borderColor: "#4B7FFB",
  },
  categoryText: {
    color: "#64a3b8",
    fontWeight: "500",
  },
  activeCategoryText: {
    color: "#FFFFFF",
  },
  doctorsList: {
    gap: 16,
  },
  doctorListItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  doctorListImage: {
    width: 64,
    height: 64,
    borderRadius: 16,
    marginRight: 16,
    backgroundColor: "#F1F5F9",
  },
  doctorListInfo: {
    flex: 1,
  },
  doctorListName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 4,
  },
  doctorListSpeciality: {
    fontSize: 14,
    color: "#64a3b8",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f172a",
  },
  reviewsText: {
    fontSize: 14,
    color: "#94a3b8",
  },
  bottomNavContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backdropFilter: "blur(10px)", // Works on web, ignored on native
  },
  navItem: {
    padding: 12,
  },
  navItemActive: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4B7FFB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    gap: 8,
  },
  navTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
})
