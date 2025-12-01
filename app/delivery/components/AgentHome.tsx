import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AgentHome() {
  const summaryBlocks = [
    { id: "1", title: "Today's Picked", count: 12, color: "#6200EE" },
    { id: "2", title: "All Picked", count: 42, color: "#03DAC6" },
    { id: "3", title: "Canceled", count: 5, color: "#B00020" },
    { id: "4", title: "Refundable", count: 8, color: "#FFB300" },
  ];

  const pickedShipments = [
    { id: "1", trackingId: "NXP-12541", client: "Bishal Store", amount: 450 },
    { id: "2", trackingId: "NXP-12542", client: "Sajilo Mart", amount: 350 },
    { id: "3", trackingId: "NXP-12543", client: "Tech Hub", amount: 520 },
    { id: "4", trackingId: "NXP-12544", client: "Mega Mart", amount: 620 },
  ];

  const renderBlock = ({ item }: any) => (
    <TouchableOpacity style={[styles.block, { backgroundColor: item.color }]}>
      <Text style={styles.blockCount}>{item.count}</Text>
      <Text style={styles.blockTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderShipment = ({ item }: any) => (
    <View style={styles.shipmentCard}>
      <Text style={styles.itemText}>ID: {item.trackingId}</Text>
      <Text style={styles.itemText}>Client: {item.client}</Text>
      <Text style={styles.itemText}>Amount: Rs {item.amount}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>Dashboard</Text>

      {/* Top Summary Blocks */}
      <FlatList
        data={summaryBlocks}
        renderItem={renderBlock}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      {/* All Picked Shipments */}
      <Text style={styles.sectionTitle}>Picked Shipments</Text>
      <FlatList
        data={pickedShipments}
        renderItem={renderShipment}
        keyExtractor={(item) => item.id}
        scrollEnabled={false} // scroll handled by ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
      />
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
  h1: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  block: {
    width: 120,
    height: 100,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  blockCount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  blockTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFF",
    marginTop: 5,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  shipmentCard: {
    backgroundColor: "#FAFAFA",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  itemText: {
    fontSize: 15,
    marginVertical: 2,
  },
});
