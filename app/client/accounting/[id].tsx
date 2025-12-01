import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AccountingByIdAndDate() {
  const [selectedDate, setSelectedDate] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Dummy Records
  const allRecords = Array.from({ length: 30 }).map((_, index) => ({
    id: index + 1,
    date: "Nov 30, 2025",
    delivered: 0,
    total: "Rs. 0",
    cash: "Rs. 0",
    esewa: "Rs. 0",
    cod: "Rs. 0.00",
    shipping: "Rs. 0.00",
  }));

  const totalPages = Math.ceil(allRecords.length / pageSize);
  const records = allRecords.slice((page - 1) * pageSize, page * pageSize);

  const onDateChange = (event, date) => {
    setShowPicker(false);
    if (date) {
      const formatted = date.toISOString().split("T")[0];
      setSelectedDate(formatted);
    }
  };

  return (
    <View style={styles.container}>
      {/* ONLY THIS PART SCROLLS */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* FIXED TOP FILTER */}
        <View style={styles.filterBox}>
          <Text style={styles.filterLabel}>Filter by Date</Text>

          <TouchableOpacity
            style={styles.dateSelect}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.dateText}>{selectedDate || "Select Date"}</Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={new Date()}
              mode='date'
              display='calendar'
              onChange={onDateChange}
            />
          )}
        </View>
        {records.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.date}>{item.date}</Text>

            <View style={styles.rowBetween}>
              <Text>Delivered</Text>
              <Text style={styles.value}>{item.delivered}</Text>
            </View>

            <View style={styles.rowBetween}>
              <Text>Total</Text>
              <Text style={styles.value}>{item.total}</Text>
            </View>

            <View style={styles.rowBetween}>
              <Text>Cash</Text>
              <Text style={styles.value}>{item.cash}</Text>
            </View>

            <View style={styles.rowBetween}>
              <Text>Esewa</Text>
              <Text style={styles.value}>{item.esewa}</Text>
            </View>

            <View style={styles.rowBetween}>
              <Text>COD Amount</Text>
              <Text style={styles.value}>{item.cod}</Text>
            </View>

            <View style={styles.rowBetween}>
              <Text>Shipping Charge</Text>
              <Text style={styles.value}>{item.shipping}</Text>
            </View>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        ))}
        {/* FIXED BOTTOM PAGINATION */}
        <View style={styles.pagination}>
          <TouchableOpacity
            disabled={page === 1}
            style={[styles.pageBtn, page === 1 && styles.disabled]}
            onPress={() => setPage(page - 1)}
          >
            <Text style={styles.pageText}>Previous</Text>
          </TouchableOpacity>

          <Text style={styles.pageNumber}>
            Page {page} / {totalPages}
          </Text>

          <TouchableOpacity
            disabled={page === totalPages}
            style={[styles.pageBtn, page === totalPages && styles.disabled]}
            onPress={() => setPage(page + 1)}
          >
            <Text style={styles.pageText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  filterBox: {
    marginBottom: 16,
  },

  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },

  dateSelect: {
    backgroundColor: "#fff",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },

  dateText: {
    fontSize: 16,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 6,
    marginBottom: 14,
  },

  date: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 10,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },

  value: {
    fontWeight: "600",
  },

  button: {
    marginTop: 12,
    backgroundColor: "#4287f5",
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },

  pageBtn: {
    backgroundColor: "#4287f5",
    padding: 10,
    borderRadius: 6,
  },

  pageText: {
    color: "#fff",
    fontWeight: "700",
  },

  disabled: {
    backgroundColor: "#9bbef5",
  },

  pageNumber: {
    fontSize: 16,
    fontWeight: "700",
  },
});
