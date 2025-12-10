import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDashboardMutation } from "../api/clientApi";
import { Loader } from "../components/Loader";
import { ClientDashboard, IClient } from "../types/clientTypes";

export default function Home() {
  const [dashboard] = useDashboardMutation();

  const [clientInfo, setClientInfo] = useState<IClient | null>(null);
  const [statsData, setStatsData] = useState<ClientDashboard | null>(null);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  // to avoid infinite loop
  const [retryAttempted, setRetryAttempted] = useState(false);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setApiError(false);

      const res = await dashboard({});

      if (res?.data?.result?.success) {
        const client = JSON.parse(res?.data?.result?.clientInformation || "{}");
        const stats = JSON.parse(res?.data?.result?.data || "{}");

        // if empty data → trigger retry
        if (
          !client ||
          Object.keys(client).length === 0 ||
          !stats ||
          Object.keys(stats).length === 0
        ) {
          if (!retryAttempted) {
            setRetryAttempted(true);
            return fetchDashboard(); // retry once
          }
        }

        setClientInfo(client);
        setStatsData(stats);
      } else {
        // retry if first fail
        if (!retryAttempted) {
          setRetryAttempted(true);
          return fetchDashboard();
        }
        setApiError(true);
      }
    } catch (err) {
      console.log("Dashboard Error:", err);

      if (!retryAttempted) {
        setRetryAttempted(true);
        return fetchDashboard();
      }

      setApiError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // ---------- UI HANDLING ----------
  if (loading) return <Loader />;

  if (apiError) return <Text>Error loading dashboard.</Text>;

  if (!clientInfo || !statsData)
    return <Text>No data found. Try again later.</Text>;

  // ---------- Stats ----------
  const stats = [
    { label: "All", value: statsData?.allShipments?.[0]?.count || 0 },
    {
      label: "Active",
      value: statsData?.activePendingShipments?.[0]?.count || 0,
    },
    { label: "Canceled", value: statsData?.canceledShipments?.[0]?.count || 0 },
    {
      label: "Delivered",
      value: statsData?.deliveredShipments?.[0]?.count || 0,
    },
    {
      label: "Today's Picked",
      value: statsData?.todayPickedShipment?.[0]?.count || 0,
    },
    {
      label: "Today's Shipments",
      value: statsData?.todaysEnteredShipments?.[0]?.count || 0,
    },
    {
      label: "Delivered Not Verified",
      value: statsData?.deliveredNotVerified?.[0]?.count || 0,
    },
    {
      label: "Requested For Return",
      value: statsData?.requestedForReturnShipments?.[0]?.count || 0,
    },
    {
      label: "Requested For Exchange",
      value: statsData?.requestedForExchangeShipments?.[0]?.count || 0,
    },
    {
      label: "Created but Not Picked",
      value: statsData?.createdAllShipments?.[0]?.count || 0,
    },
  ];

  // ---------- UI ----------
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{clientInfo?.name} Dashboard</Text>

      {/* Create New Shipment Button */}
      <TouchableOpacity
        onPress={() => router.push("/client/create")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>+ Create New Shipment</Text>
      </TouchableOpacity>

      {/* Stats Grid */}
      <View style={styles.grid}>
        {stats.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardValue}>{item.value}</Text>
            <Text style={styles.cardLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F9FAFB" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  button: {
    backgroundColor: "#4F46E5",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  buttonText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 16 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 4,
    marginBottom: 12,
    elevation: 1,
  },
  cardValue: { fontSize: 20, fontWeight: "bold" },
  cardLabel: { fontSize: 14, marginTop: 4, color: "#6B7280" },
});
