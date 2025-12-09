import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
export default function AccountingExpand() {
  const params = useLocalSearchParams();
  const summary = {
    totalShipments: 42,
    totalCash: 12850,
    totalEsewa: 7600,
    paidToClient: 15000,
    remainingBalance: 5450,
    deliveryCharge: 1500,
  };

  const shipments = [
    {
      id: "1",
      date: "2025-01-12",
      trackingId: "NXC-85921",
      amount: 350,
      method: "Cash",
      status: "Delivered",
    },
    {
      id: "2",
      date: "2025-01-12",
      trackingId: "NXC-85922",
      amount: 620,
      method: "eSewa",
      status: "Delivered",
    },
    {
      id: "3",
      date: "2025-01-11",
      trackingId: "NXC-85923",
      amount: 250,
      method: "Cash",
      status: "Delivered",
    },
    {
      id: "4",
      date: "2025-01-11",
      trackingId: "NXC-85924",
      amount: 500,
      method: "eSewa",
      status: "Delivered",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.minicontainer}>
        <Text style={styles.h1}>Accounting of {params.date}</Text>

        {/* SUMMARY CARD */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>
            Total Shipments: {summary.totalShipments}
          </Text>
          <Text style={styles.summaryText}>
            Total Cash: Rs {summary.totalCash}
          </Text>
          <Text style={styles.summaryText}>
            Total eSewa: Rs {summary.totalEsewa}
          </Text>
          <Text style={styles.summaryText}>
            Deliver Charge: Rs {summary.deliveryCharge}
          </Text>
          <Text style={styles.summaryText}>
            Paid to Client: Rs {summary.paidToClient}
          </Text>
          <Text style={styles.summaryText}>
            Remaining Balance: Rs {summary.remainingBalance}
          </Text>
        </View>

        <Text style={styles.listTitle}>Delivered Shipments</Text>
        <View>
          {shipments?.map((item) => (
            <View style={styles.shipmentCard}>
              <Text style={styles.itemText}>ID: {item.trackingId}</Text>
              <Text style={styles.itemText}>Amount: Rs {item.amount}</Text>
              <Text style={styles.itemText}>Method: {item.method}</Text>
              <Text style={styles.itemText}>Date: {item.date}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  minicontainer: {
    paddingBottom: 18,
  },

  h1: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },

  summaryCard: {
    backgroundColor: "#F2F2F2",
    padding: 15,
    marginBottom: 20,
  },

  summaryText: {
    fontSize: 16,
    marginVertical: 3,
    fontWeight: "500",
  },

  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  shipmentCard: {
    backgroundColor: "#FAFAFA",
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  itemText: {
    fontSize: 15,
    marginVertical: 2,
  },
});
