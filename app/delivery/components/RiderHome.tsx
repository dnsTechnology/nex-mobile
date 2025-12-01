import { Link, router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const dummyShipments = Array.from({ length: 23 }).map((_, i) => ({
  id: i + 1,
  shipmentId: `SHIP-${1000 + i}`,
  sender: `Sender ${i + 1}`,
  receiver: `Receiver ${i + 1}`,
  status: i % 2 === 0 ? "Pending" : "In Transit",
  address: `Street ${i + 1}, City ${i + 1}`,
}));

export default function RiderHome() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = dummyShipments.filter((s) =>
    s.shipmentId.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const shipmentsToShow = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleNext = () => page < totalPages && setPage(page + 1);
  const handlePrev = () => page > 1 && setPage(page - 1);

  // FlatList Header
  const ListHeader = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>All Shipments</Text>
        <Link style={styles.viewAll} href={"/delivery/shipments"}>
          View All
        </Link>
      </View>
      <TextInput
        style={styles.input}
        placeholder='Search Shipments'
        value={search}
        onChangeText={setSearch}
      />
    </>
  );

  return (
    <FlatList
      data={shipmentsToShow}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={ListHeader}
      contentContainerStyle={{ paddingBottom: 20 }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{item.shipmentId}</Text>
          <Text style={styles.cardText}>Status: {item.status}</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoBlock}>
              <Text style={styles.infoTitle}>Sender</Text>
              <Text>{item.sender}</Text>
              <Text>{item.address}</Text>
            </View>
            <View style={styles.infoBlock}>
              <Text style={styles.infoTitle}>Receiver</Text>
              <Text>{item.receiver}</Text>
              <Text>{item.address}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/delivery/queue")}
            style={styles.queueBtn}
          >
            <Text style={styles.queueBtnText}>Add to Queue</Text>
          </TouchableOpacity>
        </View>
      )}
      ListFooterComponent={
        <View style={styles.pagination}>
          <TouchableOpacity
            onPress={handlePrev}
            disabled={page === 1}
            style={[styles.pageBtn, page === 1 && styles.disabledBtn]}
          >
            <Text style={styles.pageText}>Previous</Text>
          </TouchableOpacity>

          <Text style={styles.pageNumber}>
            Page {page} of {totalPages}
          </Text>

          <TouchableOpacity
            onPress={handleNext}
            disabled={page === totalPages}
            style={[styles.pageBtn, page === totalPages && styles.disabledBtn]}
          >
            <Text style={styles.pageText}>Next</Text>
          </TouchableOpacity>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  title: { fontSize: 24, fontWeight: "bold" },
  viewAll: { fontSize: 16, fontWeight: "bold", color: "#6200EE" },

  input: {
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 14,
    fontSize: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    marginHorizontal: 20,
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  cardText: { fontSize: 14, color: "#666", marginBottom: 10 },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoBlock: { width: "48%" },
  infoTitle: { fontWeight: "600", marginBottom: 3 },

  queueBtn: {
    backgroundColor: "#6200EE",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  queueBtnText: { color: "#fff", fontWeight: "bold" },

  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  pageBtn: {
    backgroundColor: "#6200EE",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  disabledBtn: { backgroundColor: "#aaa" },
  pageText: { color: "#fff", fontWeight: "600" },
  pageNumber: { fontWeight: "600" },
});
