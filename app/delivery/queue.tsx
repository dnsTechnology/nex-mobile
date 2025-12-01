import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Queue() {
  const [status, setStatus] = useState("Queued"); // Queued, In Transit, Delivered

  const shipment = {
    shipmentId: "SHIP-1024",
    date: "2025-11-30",
    weight: "2.5 kg",
    type: "Express",
    sender: {
      name: "John Doe",
      phone: "+977 9800000000",
      address: "Street 12, Kathmandu",
    },
    receiver: {
      name: "Jane Smith",
      phone: "+977 9811111111",
      address: "Street 45, Pokhara",
    },
    notes: "Handle with care. Fragile items.",
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          paddingHorizontal: 4,
        }}
      >
        Shipment Queue Details
      </Text>
      {/* Card */}
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.cardHeader}>
          <Text style={styles.shipmentId}>{shipment.shipmentId}</Text>
        </View>

        {/* Status */}
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Status:</Text>
          <Text
            style={[
              styles.statusValue,
              status === "Queued" && { color: "#FF9800" },
              status === "In Transit" && { color: "#2196F3" },
              status === "Delivered" && { color: "#4CAF50" },
            ]}
          >
            {status}
          </Text>
        </View>

        {/* Shipment Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipment Info</Text>
          <Text>Date: {shipment.date}</Text>
          <Text>Weight: {shipment.weight}</Text>
          <Text>Type: {shipment.type}</Text>
          <Text>Notes: {shipment.notes}</Text>
        </View>

        {/* Sender Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sender Info</Text>
          <Text>Name: {shipment.sender.name}</Text>
          <Text>Phone: {shipment.sender.phone}</Text>
          <Text>Address: {shipment.sender.address}</Text>
        </View>

        {/* Receiver Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Receiver Info</Text>
          <Text>Name: {shipment.receiver.name}</Text>
          <Text>Phone: {shipment.receiver.phone}</Text>
          <Text>Address: {shipment.receiver.address}</Text>
        </View>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: "#FF9800" }]}
            onPress={() => setStatus("In Transit")}
          >
            <Text style={styles.actionText}>Mark As Cancelled</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: "#4CAF50" }]}
            onPress={() => setStatus("Delivered")}
          >
            <Text style={styles.actionText}>Mark Delivered</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: "#4CAF50" }]}
            onPress={() => setStatus("Delivered")}
          >
            <Text style={styles.actionText}>Mark As Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: "#4CAF50" }]}
            onPress={() => setStatus("Delivered")}
          >
            <Text style={styles.actionText}>Notify It's Paid</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  shipmentId: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  menuBtn: {
    padding: 5,
  },
  statusRow: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  statusLabel: { fontWeight: "600", marginRight: 5 },
  statusValue: { fontWeight: "bold" },

  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 5,
    color: "#6200EE",
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  actionText: { color: "#fff", fontWeight: "bold" },
});
