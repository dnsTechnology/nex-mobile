import { router } from "expo-router";
import { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDashboardMutation } from "../api/clientApi";

export default function Home() {
  const [dashboard, { isLoading, error }] = useDashboardMutation();
  useEffect(() => {
    async function getData() {
      const res = await dashboard({});
      console.log(res);
    }
    getData();
  }, []);
  const stats = [
    { label: "All", value: 335 },
    { label: "Active", value: 6 },
    { label: "Canceled", value: 44 },
    { label: "Delivered", value: 80 },
    { label: "Today's Picked", value: 0 },
    { label: "Today's Shipments", value: 0 },
    { label: "Delivered Not Verified", value: 1 },
    { label: "Requested For Return", value: 14 },
    { label: "Requested For Exchange", value: 92 },
    { label: "Created but Not Picked", value: 99 },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F9FAFB",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#4F46E5",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 3,
    marginBottom: 12,
    shadowColor: "#837a7aff",
    shadowOpacity: 0.01,
    elevation: 1,
  },

  cardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  cardLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
});
