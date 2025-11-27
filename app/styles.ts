import { StyleSheet } from "react-native";

export const TWITTER_BLUE = "#1DA1F2";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  /* ==== HEADER ==== */
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

  /* ==== QUESTION CARD ==== */
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

  /* ==== SECTIONS ==== */
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

  /* ==== APPOINTMENT CARD ==== */
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

  /* ==== LOGOUT ==== */
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

  /* ==== DOCTOR HEADER ==== */
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

  /* ==== STATS DOCTOR ==== */
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

  /* ==== PATIENT CARDS FOR DOCTOR ==== */
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
    /* ==== EDIT BUTTON (Doctor Profile) ==== */
  editBtn: {
    backgroundColor: TWITTER_BLUE,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  editBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  /* ==== DOCTOR PROFILE FIELDS ==== */
  doctorSection: {
    backgroundColor: "#f7f9f9",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },

  fieldRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#657786",
  },

  fieldValue: {
    fontSize: 14,
    color: "#0f1419",
    maxWidth: "60%",
  },

  /* ==== DOCTOR STATUS ==== */
  doctorStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 8,
  },

  doctorStatusText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
  },

  
});
