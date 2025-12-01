import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Accounting() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Your Accounting</Text>

      {/* Client Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Client Details</Text>

        <View style={styles.rowBetween}>
          <Text>Total Shipments</Text>
          <Text style={styles.value}>335</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text>Shipped</Text>
          <Text style={styles.value}>81</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text>Canceled</Text>
          <Text style={styles.value}>44</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text>Pending</Text>
          <Text style={styles.value}>5</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text>Shipping Price</Text>
          <Text style={styles.value}>Rs. 13074.40</Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push(`/client/accounting/${"282992929"}`)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>View Accounting</Text>
        </TouchableOpacity>
      </View>

      {/* Payment & Ledger */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Payment & Ledger</Text>

        <View style={styles.rowBetween}>
          <Text>Shipping Price</Text>
          <Text style={styles.value}>Rs. 13074.4</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text>Shipments Balance</Text>
          <Text style={styles.value}>Rs. 118895.5</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text>Total Balance</Text>
          <Text style={styles.value}>Rs. 105821.10</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Ledger</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonPayment}>View Payment Details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },

  value: {
    fontWeight: "600",
  },

  button: {
    marginTop: 14,
    backgroundColor: "#4A90E2",
    paddingVertical: 10,
    borderRadius: 2,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  buttonPayment: {
    color: "#fff",
    fontWeight: "600",
    borderRadius: 2,
    alignItems: "center",
  },
});
