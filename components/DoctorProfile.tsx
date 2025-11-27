// app/profile/components/DoctorProfile.tsx
import React from "react";
import { ScrollView, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useAppointments } from "../hooks/useAppointments";
import { router } from "expo-router";
import { styles } from "../app/styles";
import LogoutButton from "./LogoutButton";

export default function DoctorProfile({ user }: any) {
  const { appointments, loading } = useAppointments(user);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Bonjour</Text>
      <Text style={styles.name}>Dr. {user.firstName} {user.lastName}</Text>

      {/* Patients list */}
      <Text style={styles.sectionTitle}>Patients aujourd’hui</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1DA1F2" />
      ) : appointments.length ? (
        appointments.slice(0, 5).map((p) => (
          <Text key={p.id} style={styles.patientName}>
            {p.patientName} - {p.time}
          </Text>
        ))
      ) : (
        <Text style={styles.noData}>Aucun rendez-vous</Text>
      )}

      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => router.push("/profile/edit-doctor")}
      >
        <Text style={styles.editBtnText}>Modifier profil</Text>
      </TouchableOpacity>

      <LogoutButton />
    </ScrollView>
  );
}
