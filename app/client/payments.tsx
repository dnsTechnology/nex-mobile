import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type PaymentItem = {
  id: string;
  date: string;
  status: string;
  method: string;
  amount: string;
  paid: string;
  balance: string;
};

const paymentsData: PaymentItem[] = [
  {
    id: "1",
    date: "September 24, 2025",
    status: "Paid",
    method: "Khalti",
    amount: "Rs. 1,880.00",
    paid: "Rs. 1,880.00",
    balance: "0.00 Cr",
  },
  {
    id: "2",
    date: "September 23, 2025",
    status: "Pending",
    method: "Bank",
    amount: "Rs. 2,500.00",
    paid: "Rs. 0.00",
    balance: "2,500.00 Cr",
  },
  {
    id: "3",
    date: "September 22, 2025",
    status: "Paid",
    method: "Esewa",
    amount: "Rs. 1,500.00",
    paid: "Rs. 1,500.00",
    balance: "0.00 Cr",
  },

  {
    id: "4",
    date: "September 21, 2025",
    status: "Paid",
    method: "Khalti",
    amount: "Rs. 1,200.00",
    paid: "Rs. 1,200.00",
    balance: "0.00 Cr",
  },
  {
    id: "5",
    date: "September 20, 2025",
    status: "Pending",
    method: "Bank",
    amount: "Rs. 2,000.00",
    paid: "Rs. 0.00",
    balance: "2,000.00 Cr",
  },
  {
    id: "6",
    date: "September 19, 2025",
    status: "Paid",
    method: "Esewa",
    amount: "Rs. 1,800.00",
    paid: "Rs. 1,800.00",
    balance: "0.00 Cr",
  },
  {
    id: "7",
    date: "September 18, 2025",
    status: "Paid",
    method: "Khalti",
    amount: "Rs. 1,500.00",
    paid: "Rs. 1,500.00",
    balance: "0.00 Cr",
  },
  {
    id: "8",
    date: "September 17, 2025",
    status: "Pending",
    method: "Bank",
    amount: "Rs. 2,200.00",
    paid: "Rs. 0.00",
    balance: "2,200.00 Cr",
  },
  {
    id: "9",
    date: "September 16, 2025",
    status: "Paid",
    method: "Esewa",
    amount: "Rs. 1,700.00",
    paid: "Rs. 1,700.00",
    balance: "0.00 Cr",
  },
  // add more items here
];

export default function Payment() {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const paginatedData = paymentsData.slice(0, page * pageSize);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Payment Details</Text>
        </View>
        {paymentsData?.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.date}>{item.date}</Text>
              <Text
                style={[
                  styles.status,
                  item.status === "Paid" ? styles.paid : styles.pending,
                ]}
              >
                {item.status}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Method:</Text>
              <Text style={styles.value}>{item.method}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Amount:</Text>
              <Text style={styles.value}>{item.amount}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Paid:</Text>
              <Text style={styles.value}>{item.paid}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Balance:</Text>
              <Text style={styles.value}>{item.balance}</Text>
            </View>

            <TouchableOpacity
              onPress={() => router.push(`/client/paymentdetails/${39933939}`)}
              style={styles.detailsButton}
            >
              <Text style={styles.detailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
        ))}

        {paginatedData.length < paymentsData.length && (
          <TouchableOpacity
            style={styles.loadMore}
            onPress={() => setPage(page + 1)}
          >
            <Text style={styles.loadMoreText}>Load More</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    borderRadius: 6,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  date: {
    fontWeight: "600",
    fontSize: 16,
  },
  status: {
    fontWeight: "700",
    fontSize: 14,
  },
  paid: {
    color: "green",
  },
  pending: {
    color: "orange",
  },
  label: {
    fontWeight: "500",
  },
  value: {
    fontWeight: "600",
  },
  detailsButton: {
    marginTop: 10,
  },
  detailsText: {
    color: "#1e40af",
    fontWeight: "700",
  },
  loadMore: {
    padding: 12,
    backgroundColor: "#1e40af",
    alignItems: "center",
    borderRadius: 0,
  },
  loadMoreText: {
    color: "#fff",
    fontWeight: "700",
  },
});
