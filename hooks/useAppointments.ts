// app/profile/hooks/useAppointments.ts
import { useEffect, useState } from "react";
import { db } from "../lib/firbase";
import { collection, query, where, getDocs } from "firebase/firestore";

export interface Appointment {
  id: string;
  doctorName?: string;
  patientName?: string;
  speciality?: string;
  date: string;
  time: string;
  status: string;
  doctorId?: string;
  patientId?: string;
}

export const useAppointments = (user: any) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchAppointments = async () => {
      setLoading(true);

      const ref = collection(db, "appointments");
      const q =
        user.role === "patient"
          ? query(ref, where("patientId", "==", user.uid))
          : query(ref, where("doctorId", "==", user.uid));

      const snapshot = await getDocs(q);
      const data: Appointment[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Appointment[];

      data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      setAppointments(data);
      setLoading(false);
    };

    fetchAppointments();
  }, [user]);

  return { appointments, loading };
};
