import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Modal,
  RefreshControl,
  ScrollView,
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
  const [quickFilter, setQuickFilter] = useState("All");
  const statuses = ["All", "Picked", "Delivered", "Cancelled", "Returned"];

  const [modalVisible, setModalVisible] = useState(false);
  const [modalStatuses, setModalStatuses] = useState<string[]>([]);
  const [minAmount, setMinAmount] = useState<string>("");
  const [maxAmount, setMaxAmount] = useState<string>("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  const [refreshing, setRefreshing] = useState(false);

  const filteredShipments = useMemo(() => {
    const searchLower = search.trim().toLowerCase();
    let result = allShipments.filter((s) => {
      const matchesSearch =
        s.trackingId.toLowerCase().includes(searchLower) ||
        s.client.toLowerCase().includes(searchLower) ||
        s.address.toLowerCase().includes(searchLower);
      return matchesSearch;
    });

    if (quickFilter !== "All") {
      result = result.filter((s) => s.status === quickFilter);
    }

    if (modalStatuses.length > 0) {
      result = result.filter((s) => modalStatuses.includes(s.status));
    }

    const min = Number(minAmount) || Number.NEGATIVE_INFINITY;
    const max = Number(maxAmount) || Number.POSITIVE_INFINITY;
    result = result.filter((s) => s.amount >= min && s.amount <= max);

    result.sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return sortBy === "newest" ? db - da : da - db;
    });

    return result;
  }, [search, quickFilter, modalStatuses, minAmount, maxAmount, sortBy]);

  const toggleModalStatus = (s: string) => {
    setModalStatuses((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const applyModalFilters = () => {
    setModalVisible(false);
  };

  const clearModalFilters = () => {
    setModalStatuses([]);
    setMinAmount("");
    setMaxAmount("");
    setSortBy("newest");
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 700);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Picked":
        return "#3B82F6";
      case "Delivered":
        return "#10B981";
      case "Cancelled":
        return "#EF4444";
      case "Returned":
        return "#F59E0B";
      default:
        return "#6B7280";
    }
  };

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.h1}>Shipments</Text>
            <Text style={styles.subtitle}>
              {filteredShipments.length} total
            </Text>
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setModalVisible(true)}
            accessibilityLabel='Open Filters'
          >
            <FontAwesome6 name='sliders' size={18} color='#fff' />
          </TouchableOpacity>
        </View>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <FontAwesome6 name='magnifying-glass' size={16} color='#9CA3AF' />
          <TextInput
            style={styles.searchInput}
            placeholder='Search tracking ID, client, address...'
            placeholderTextColor='#9CA3AF'
            value={search}
            onChangeText={setSearch}
            returnKeyType='search'
          />
        </View>

        {/* QUICK FILTER CHIPS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {statuses.map((status) => {
            const active = quickFilter === status;
            return (
              <TouchableOpacity
                key={status}
                style={[styles.filterBtn, active && styles.activeFilterBtn]}
                onPress={() => setQuickFilter(status)}
              >
                <Text
                  style={[styles.filterText, active && styles.activeFilterText]}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* SHIPMENTS LIST */}
        {filteredShipments.length === 0 ? (
          <View style={styles.emptyContainer}>
            <FontAwesome6 name='box-open' size={48} color='#D1D5DB' />
            <Text style={styles.emptyText}>No shipments found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
          </View>
        ) : (
          filteredShipments.map((item) => (
            <View key={item.id} style={styles.shipmentCard}>
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  <Text style={styles.trackingId}>{item.trackingId}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(item.status) },
                    ]}
                  >
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View>
                <Text style={styles.date}>{item.date}</Text>
              </View>

              <View style={styles.cardDivider} />

              <View style={styles.infoRow}>
                <FontAwesome6 name='user' size={13} color='#6B7280' />
                <Text style={styles.infoText}>{item.client}</Text>
              </View>

              <View style={styles.infoRow}>
                <FontAwesome6 name='location-dot' size={13} color='#6B7280' />
                <Text style={styles.infoText}>{item.address}</Text>
              </View>

              <View style={styles.infoRow}>
                <FontAwesome6
                  name='indian-rupee-sign'
                  size={13}
                  color='#6B7280'
                />
                <Text style={styles.infoText}>Rs {item.amount}</Text>
              </View>

              <View style={styles.cardActions}>
                <TouchableOpacity
                  onPress={() =>
                    router.push(`/client/shipmentdetails/${item.trackingId}`)
                  }
                  style={[styles.actionBtn, styles.viewBtn]}
                >
                  <Text style={styles.actionBtnText}>View Details</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    router.push(`/client/comment/${item.trackingId}`)
                  }
                  style={[styles.actionBtn, styles.commentBtn]}
                >
                  <FontAwesome6 name='comment' size={14} color='#fff' />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* FILTER MODAL */}
      <Modal visible={modalVisible} animationType='slide' transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setModalVisible(false)}
              >
                <FontAwesome6 name='xmark' size={20} color='#6B7280' />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalLabel}>Status</Text>
              <View style={styles.chipContainer}>
                {statuses
                  .filter((s) => s !== "All")
                  .map((s) => {
                    const picked = modalStatuses.includes(s);
                    return (
                      <TouchableOpacity
                        key={s}
                        style={[
                          styles.modalChip,
                          picked && styles.modalChipActive,
                        ]}
                        onPress={() => toggleModalStatus(s)}
                      >
                        <Text
                          style={[
                            styles.modalChipText,
                            picked && styles.modalChipTextActive,
                          ]}
                        >
                          {s}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
              </View>

              <Text style={styles.modalLabel}>Amount Range</Text>
              <View style={styles.rangeInputs}>
                <TextInput
                  placeholder='Min'
                  placeholderTextColor='#9CA3AF'
                  keyboardType='numeric'
                  value={minAmount}
                  onChangeText={setMinAmount}
                  style={styles.smallInput}
                />
                <Text style={styles.rangeSeparator}>—</Text>
                <TextInput
                  placeholder='Max'
                  placeholderTextColor='#9CA3AF'
                  keyboardType='numeric'
                  value={maxAmount}
                  onChangeText={setMaxAmount}
                  style={styles.smallInput}
                />
              </View>

              <Text style={styles.modalLabel}>Sort By</Text>
              <View style={styles.chipContainer}>
                <TouchableOpacity
                  style={[
                    styles.modalChip,
                    sortBy === "newest" && styles.modalChipActive,
                  ]}
                  onPress={() => setSortBy("newest")}
                >
                  <Text
                    style={[
                      styles.modalChipText,
                      sortBy === "newest" && styles.modalChipTextActive,
                    ]}
                  >
                    Newest First
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.modalChip,
                    sortBy === "oldest" && styles.modalChipActive,
                  ]}
                  onPress={() => setSortBy("oldest")}
                >
                  <Text
                    style={[
                      styles.modalChipText,
                      sortBy === "oldest" && styles.modalChipTextActive,
                    ]}
                  >
                    Oldest First
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalActionBtn, styles.clearBtn]}
                onPress={clearModalFilters}
              >
                <Text style={styles.clearBtnText}>Clear All</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalActionBtn, styles.applyBtn]}
                onPress={applyModalFilters}
              >
                <Text style={styles.applyBtnText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  h1: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  filterButton: {
    backgroundColor: "#4e84f9ff",
    width: 44,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    marginLeft: 10,
    color: "#111827",
  },

  filterRow: {
    paddingBottom: 20,
    gap: 10,
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
  },
  activeFilterBtn: {
    backgroundColor: "#2168ffff",
    borderColor: "#111827",
  },
  filterText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
  },
  activeFilterText: {
    color: "#fff",
  },

  shipmentCard: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  cardHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  trackingId: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  date: {
    fontSize: 13,
    color: "#9CA3AF",
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#374151",
  },
  cardActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  viewBtn: {
    backgroundColor: "#386cddff",
  },
  commentBtn: {
    backgroundColor: "#6366F1",
    flex: 0,
    paddingHorizontal: 16,
  },
  actionBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 4,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(27, 120, 251, 0.5)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 16,
    paddingBottom: 32,
    paddingHorizontal: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  modalClose: {
    padding: 4,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
    marginTop: 16,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  modalChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  modalChipActive: {
    backgroundColor: "#427effff",
    borderColor: "#1760fbff",
  },
  modalChipText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "500",
  },
  modalChipTextActive: {
    color: "#fff",
  },
  rangeInputs: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  smallInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#2b6effff",
  },
  rangeSeparator: {
    color: "#9CA3AF",
    fontSize: 16,
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  modalActionBtn: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  clearBtn: {
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  applyBtn: {
    backgroundColor: "#2066ffff",
  },
  clearBtnText: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "600",
  },
  applyBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
