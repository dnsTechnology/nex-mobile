import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Shipments() {
  const pickedShipments = [
    {
      id: "1",
      trackingId: "NXP-12541",
      date: "2025-01-12",
      client: "Bishal Store",
      amount: 450,
      address: "Baneswor, Kathmandu",
    },
    {
      id: "2",
      trackingId: "NXP-12542",
      date: "2025-01-12",
      client: "Sajilo Mart",
      amount: 350,
      address: "Putalisadak, Kathmandu",
    },
    {
      id: "3",
      trackingId: "NXP-12543",
      date: "2025-01-11",
      client: "Tech Hub",
      amount: 520,
      address: "Kalanki, Kathmandu",
    },
    {
      id: "4",
      trackingId: "NXP-12544",
      date: "2025-01-10",
      client: "City Mart",
      amount: 480,
      address: "Maharajgunj, Kathmandu",
    },
    {
      id: "5",
      trackingId: "NXP-12545",
      date: "2025-01-09",
      client: "Alpha Traders",
      amount: 510,
      address: "Koteshwor, Kathmandu",
    },
    {
      id: "6",
      trackingId: "NXP-12546",
      date: "2025-01-08",
      client: "Tech Hub",
      amount: 530,
      address: "Kalanki, Kathmandu",
    },
  ];

  const handleExportPDF = () => {
    console.log("Exporting PDF...");
  };

  const handlePrint = () => {
    console.log("Printing...");
  };

  return (
    <FlatList
      style={styles.container}
      data={pickedShipments}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View>
          <Text style={styles.h1}>Currently Shipping</Text>
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.shipmentCard}>
          <Text style={styles.item}>ID: {item.trackingId}</Text>
          <Text style={styles.item}>Client: {item.client}</Text>
          <Text style={styles.item}>Amount: Rs {item.amount}</Text>
          <Text style={styles.item}>Date: {item.date}</Text>
          <Text style={styles.item}>Address: {item.address}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    paddingTop: 10,
  },

  h1: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },

  btn: {
    backgroundColor: "#6200EE",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
  },

  btnText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },

  shipmentCard: {
    backgroundColor: "#FAFAFA",
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  item: {
    fontSize: 15,
    marginVertical: 2,
  },
});
