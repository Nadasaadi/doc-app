// app/profile/index.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { router } from "expo-router";
import { db } from "../../lib/firbase";
import { collection, query, where, getDocs } from "firebase/firestore";

const TWITTER_BLUE = "#1DA1F2";

interface Appointment {
  id: string;
  doctorName?: string;
  patientName?: string;
  speciality?: string;
  date: string;
  time: string;
  status: string;
}

interface AppointmentData {
  doctorName?: string;
  patientName?: string;
  speciality?: string;
  date: string;
  time: string;
  status: string;
  patientId?: string;
  doctorId?: string;
}

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // HOOKS EN HAUT → TOUJOURS EXÉCUTÉS
  useEffect(() => {
    // Si pas d'utilisateur → redirection
    if (!user) {
      router.replace("/auth");
      return;
    }

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const appointmentsRef = collection(db, "appointments");
        let q;

        if (user.role === "patient") {
          q = query(appointmentsRef, where("patientId", "==", user.uid));
        } else {
          q = query(appointmentsRef, where("doctorId", "==", user.uid));
        }

        const snapshot = await getDocs(q);
        const appointmentsData: Appointment[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data() as AppointmentData | undefined;
          if (data) {
            appointmentsData.push({
              id: doc.id,
              ...data,
            } as Appointment);
          }
        });

        // Tri par date
        appointmentsData.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateA - dateB;
        });

        setAppointments(appointmentsData);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]); // dépendance : user (uid + role)

  // SI PAS D'UTILISATEUR → RETURN NULL (APRÈS useEffect)
  if (!user) {
    return null;
  }

  // RENDERING CONDITIONNEL
  if (user.role === "patient") {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bonjour</Text>
            <Text style={styles.name}>
              {user.firstName} {user.lastName}
            </Text>
          </View>
          <TouchableOpacity style={styles.notificationIcon}>
            <Text style={styles.notificationBadge}>3</Text>
          </TouchableOpacity>
        </View>

        {/* Question */}
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>
            Comment vous sentez-vous aujourd'hui ?
          </Text>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>Search</Text>
            <Text style={styles.searchPlaceholder}>
              Chercher un médecin...
            </Text>
          </View>
        </View>

        {/* Rendez-vous */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Rendez-vous prochains</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>Voir tous</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={TWITTER_BLUE} />
          ) : appointments.length > 0 ? (
            <View style={styles.appointmentCard}>
              <View style={styles.doctorInfo}>
                <View style={styles.doctorAvatar}>
                  <Text style={styles.avatarText}>
                    {appointments[0].doctorName?.charAt(0) || "D"}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.doctorName}>
                    {appointments[0].doctorName}
                  </Text>
                  <Text style={styles.doctorSpeciality}>
                    {appointments[0].speciality}
                  </Text>
                </View>
                <TouchableOpacity style={styles.videoIcon}>
                  <Text style={styles.videoIconText}>Video</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.appointmentDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>Calendar</Text>
                  <Text style={styles.detailText}>{appointments[0].date}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>Clock</Text>
                  <Text style={styles.detailText}>{appointments[0].time}</Text>
                </View>
              </View>

              <View style={styles.appointmentActions}>
                <TouchableOpacity style={styles.actionButtonSecondary}>
                  <Text style={styles.actionButtonText}>Reprogrammer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButtonPrimary}>
                  <Text style={styles.actionButtonPrimaryText}>
                    Voir le profil
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Text style={styles.noData}>Aucun rendez-vous prévu</Text>
          )}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    );
  }

  // RENDER MÉDECIN
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.doctorHeader}>
        <View style={styles.doctorHeaderContent}>
          <View style={styles.doctorHeaderAvatar}>
            <Text style={styles.doctorHeaderAvatarText}>
              {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.greeting}>Bonjour</Text>
            <Text style={styles.doctorHeaderName}>
              Dr. {user.firstName} {user.lastName}
            </Text>
          </View>
          <TouchableOpacity style={styles.notificationIcon}>
            <Text style={styles.notificationBadge}>5</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Patients</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>18</Text>
          <Text style={styles.statLabel}>RDV aujourd'hui</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>96%</Text>
          <Text style={styles.statLabel}>Complétés</Text>
        </View>
      </View>

      {/* Patients */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Patients aujourd'hui</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>Voir tous</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={TWITTER_BLUE} />
        ) : appointments.length > 0 ? (
          <FlatList
            data={appointments.slice(0, 5)}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.patientCard}>
                <View style={styles.patientInfo}>
                  <View style={styles.patientAvatar}>
                    <Text style={styles.avatarText}>
                      {item.patientName?.charAt(0) || "P"}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.patientName}>{item.patientName}</Text>
                    <Text style={styles.patientTime}>{item.time}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      item.status === "confirmed" && styles.statusConfirmed,
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {item.status === "confirmed" ? "Check" : "Hourglass"}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noData}>Aucun rendez-vous prévu</Text>
        )}
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// === STYLES (inchangés) ===
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
    color: "#657786",
    fontWeight: "500",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f1419",
  },
  notificationIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f0f3f4",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadge: {
    fontSize: 18,
    fontWeight: "700",
    color: TWITTER_BLUE,
  },
  questionCard: {
    backgroundColor: "#f7f9f9",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f1419",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#e1e8ed",
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchPlaceholder: {
    color: "#657786",
    fontSize: 14,
    flex: 1,
  },
  section: {
    marginBottom: 24,
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
    color: "#0f1419",
  },
  viewAll: {
    fontSize: 14,
    color: TWITTER_BLUE,
    fontWeight: "600",
  },
  appointmentCard: {
    backgroundColor: `${TWITTER_BLUE}15`,
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: TWITTER_BLUE,
  },
  doctorInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  doctorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: TWITTER_BLUE,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f1419",
  },
  doctorSpeciality: {
    fontSize: 12,
    color: "#657786",
    marginTop: 2,
  },
  videoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  videoIconText: {
    fontSize: 18,
  },
  appointmentDetails: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: `${TWITTER_BLUE}30`,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  detailText: {
    fontSize: 13,
    color: "#0f1419",
    fontWeight: "500",
  },
  appointmentActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButtonSecondary: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: TWITTER_BLUE,
    alignItems: "center",
  },
  actionButtonText: {
    color: TWITTER_BLUE,
    fontWeight: "600",
    fontSize: 13,
  },
  actionButtonPrimary: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: TWITTER_BLUE,
    alignItems: "center",
  },
  actionButtonPrimaryText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  logoutButton: {
    backgroundColor: "#e0245e",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  noData: {
    textAlign: "center",
    color: "#657786",
    fontSize: 14,
    marginVertical: 20,
  },
  doctorHeader: {
    marginBottom: 24,
  },
  doctorHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  doctorHeaderAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: TWITTER_BLUE,
    justifyContent: "center",
    alignItems: "center",
  },
  doctorHeaderAvatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  doctorHeaderName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f1419",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#f7f9f9",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: TWITTER_BLUE,
  },
  statLabel: {
    fontSize: 11,
    color: "#657786",
    marginTop: 4,
    textAlign: "center",
  },
  patientCard: {
    backgroundColor: "#f7f9f9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  patientInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  patientAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: TWITTER_BLUE,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  patientName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0f1419",
  },
  patientTime: {
    fontSize: 12,
    color: "#657786",
    marginTop: 2,
  },
  statusBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#fff3cd",
    justifyContent: "center",
    alignItems: "center",
  },
  statusConfirmed: {
    backgroundColor: "#d4edda",
  },
  statusText: {
    fontSize: 14,
  },
});