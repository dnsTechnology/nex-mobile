import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Shipments() {
  const allShipments = [
    {
      id: "1",
      trackingId: "NXP-12541",
      date: "2025-01-12",
      client: "Bishal Store",
      amount: 450,
      address: "Baneswor, Kathmandu",
      status: "Picked",
    },
    {
      id: "2",
      trackingId: "NXP-12542",
      date: "2025-01-12",
      client: "Sajilo Mart",
      amount: 350,
      address: "Putalisadak, Kathmandu",
      status: "Delivered",
    },
    {
      id: "3",
      trackingId: "NXP-12543",
      date: "2025-01-11",
      client: "Tech Hub",
      amount: 520,
      address: "Kalanki, Kathmandu",
      status: "Cancelled",
    },
    {
      id: "4",
      trackingId: "NXP-12544",
      date: "2025-01-10",
      client: "City Mart",
      amount: 480,
      address: "Maharajgunj, Kathmandu",
      status: "Delivered",
    },
    {
      id: "5",
      trackingId: "NXP-12545",
      date: "2025-01-09",
      client: "Alpha Traders",
      amount: 510,
      address: "Koteshwor, Kathmandu",
      status: "Picked",
    },
    {
      id: "6",
      trackingId: "NXP-12546",
      date: "2025-01-08",
      client: "Tech Hub",
      amount: 530,
      address: "Kalanki, Kathmandu",
      status: "Returned",
    },
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Filter and search
  const filteredShipments = allShipments.filter((s) => {
    const matchesSearch =
      s.trackingId.toLowerCase().includes(search.toLowerCase()) ||
      s.client.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || s.status === filter;
    return matchesSearch && matchesFilter;
  });

  const statuses = ["All", "Picked", "Delivered", "Cancelled", "Returned"];

  const handleExportPDF = () => console.log("Exporting PDF...");
  const handlePrint = () => console.log("Printing...");

  return (
    <FlatList
      data={filteredShipments}
      style={styles.full}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={styles.container}>
          <Text style={styles.h1}>All Shipments</Text>

          <TextInput
            style={styles.searchInput}
            placeholder='Search by ID or client'
            value={search}
            onChangeText={setSearch}
          />

          <View style={styles.filterRow}>
            {statuses.map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.filterBtn,
                  filter === status && styles.activeFilterBtn,
                ]}
                onPress={() => setFilter(status)}
              >
                <Text
                  style={[
                    styles.filterText,
                    filter === status && styles.activeFilterText,
                  ]}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.shipmentCard}>
          <Text style={styles.item}>ID: {item.trackingId}</Text>
          <Text style={styles.item}>Client: {item.client}</Text>
          <Text style={styles.item}>Amount: Rs {item.amount}</Text>
          <Text style={styles.item}>Date: {item.date}</Text>
          <Text style={styles.item}>Address: {item.address}</Text>
          <Text style={styles.status}>Status: {item.status}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  full: {
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: "#",
  },
  h1: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  searchInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
  },
  filterRow: { flexDirection: "row", marginBottom: 10, flexWrap: "wrap" },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#F1F1F1",
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  activeFilterBtn: { backgroundColor: "#6200EE" },
  filterText: { fontSize: 14, color: "#333" },
  activeFilterText: { color: "#FFF" },
  buttonRow: { flexDirection: "row", gap: 10, marginBottom: 15 },
  btn: {
    backgroundColor: "#6200EE",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
  },
  btnText: { color: "#FFF", fontSize: 14, fontWeight: "600" },
  shipmentCard: {
    backgroundColor: "#FAFAFA",
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  item: { fontSize: 15, marginVertical: 2 },
  status: { fontSize: 14, marginTop: 4, fontWeight: "bold", color: "#6200EE" },
});
