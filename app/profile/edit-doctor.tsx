import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firbase";
import { useAuth } from "../../contexts/AuthContext";

export default function EditDoctorProfile() {
  const router = useRouter();
  const { user } = useAuth();

  const [speciality, setSpeciality] = useState("");
  const [bio, setBio] = useState("");
  const [experienceYears, setExperienceYears] = useState("");

  const [loading, setLoading] = useState(true);

  // Load doctor data if exists
  useEffect(() => {
    if (!user) return;

    const loadDoctorData = async () => {
      try {
        const ref = doc(db, "doctors", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setSpeciality(data.speciality || "");
          setBio(data.bio || "");
          setExperienceYears(data.experienceYears ? String(data.experienceYears) : "");
        }
      } catch (error) {
        console.error("Error loading doctor profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctorData();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    try {
      await setDoc(doc(db, "doctors", user.uid), {
        speciality,
        bio,
        experienceYears: Number(experienceYears),
        updatedAt: new Date(),
      });

      Alert.alert("Succès", "Votre profil médecin a été mis à jour !");
      router.push("/profile");

    } catch (error) {
      console.error("Error saving doctor profile:", error);
      Alert.alert("Erreur", "Impossible d'enregistrer les données.");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Modifier Profil Médecin</Text>

      {/* Speciality */}
      <Text style={styles.label}>Spécialité</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: Cardiologue, Dermatologue..."
        value={speciality}
        onChangeText={setSpeciality}
      />

      {/* Bio */}
      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Présentez-vous..."
        value={bio}
        onChangeText={setBio}
        multiline
      />

      {/* Experience */}
      <Text style={styles.label}>Années d'expérience</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: 5"
        keyboardType="numeric"
        value={experienceYears}
        onChangeText={setExperienceYears}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Enregistrer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  saveBtn: {
    backgroundColor: "#007AFF",
    padding: 15,
    marginTop: 30,
    borderRadius: 10,
  },
  saveBtnText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
