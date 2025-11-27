// app/profile/index.tsx
import React from "react";
import { router } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import PatientProfile from "../../components/PatientProfile";
import DoctorProfile from "../../components/DoctorProfile";

export default function ProfileScreen() {
  const { user } = useAuth();

  if (!user) {
    router.replace("/auth");
    return null;
  }

  if (user.role === "patient") {
    return <PatientProfile user={user} />;
  }

  return <DoctorProfile user={user} />;
}
