import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PaymentDetails() {
  const handleAccept = () => {
    Alert.alert("Accepted", "You have accepted this payment.");
  };

  const handleReject = () => {
    Alert.alert("Rejected", "You have rejected this payment.");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 16 }}
    >
      <View style={styles.card}>
        <Text style={styles.heading}>Payment Details</Text>

        <Text style={styles.item}>
          <Text style={styles.label}>Amount (DR): </Text>
          <Text style={styles.value}>Rs. 1880</Text>
        </Text>

        <Text style={styles.item}>
          <Text style={styles.label}>Amount (CR): </Text>
          <Text style={styles.value}>Rs. 1880</Text>
        </Text>

        <Text style={styles.item}>
          <Text style={styles.label}>Remaining Balance: </Text>
          <Text style={styles.value}>Rs. 0 (DR)</Text>
        </Text>

        <Text style={styles.item}>
          <Text style={styles.label}>Total Balance: </Text>
          <Text style={styles.value}>Rs. 720</Text>
        </Text>

        <Text style={styles.item}>
          <Text style={styles.label}>Payment Method: </Text>
          <Text style={styles.value}>Khalti</Text>
        </Text>

        <Text style={styles.item}>
          <Text style={styles.label}>Payment Mode: </Text>
          <Text style={styles.value}>Full</Text>
        </Text>

        <Text style={styles.item}>
          <Text style={styles.label}>Status: </Text>
          <Text style={[styles.value, styles.paid]}>Paid</Text>
        </Text>

        <Text style={styles.item}>
          <Text style={styles.label}>Initial Date: </Text>
          <Text style={styles.value}>9/24/2025</Text>
        </Text>

        <Text style={styles.item}>
          <Text style={styles.label}>Created At: </Text>
          <Text style={styles.value}>10/26/2025, 1:05:09 PM</Text>
        </Text>

        <Text style={[styles.item, { marginTop: 12 }]}>
          <Text style={styles.label}>📄 Description: </Text>
          <Text style={styles.description}>
            A payment of Rs. 1880 was made to sarad.org for date 9/24/2025.
            Remaining balance: Rs. 0. Payment is done by Khalti.
          </Text>
        </Text>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.acceptButton]}
            onPress={handleAccept}
          >
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.rejectButton]}
            onPress={handleReject}
          >
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 2,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e40af",
    marginBottom: 16,
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 22,
  },
  label: {
    fontWeight: "600",
    color: "#333",
  },
  value: {
    fontWeight: "700",
    color: "#000",
  },
  paid: {
    color: "green",
  },
  description: {
    fontWeight: "500",
    color: "#555",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 4,
    marginHorizontal: 5,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  acceptButton: {
    backgroundColor: "#1e40af",
  },
  rejectButton: {
    backgroundColor: "#ef4444",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
