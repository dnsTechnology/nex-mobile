import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useCreateShipmentMutation,
  useGetallLandmarksMutation,
} from "../api/clientApi";
import { Location } from "../types/clientTypes";
export default function Create() {
  const [createShipment, { isLoading, isError, isSuccess }] =
    useCreateShipmentMutation();
  const [getLandmarks, { isLoading: isLandmarksLoading }] =
    useGetallLandmarksMutation();
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [primaryPhone, setPrimaryPhone] = useState("");
  const [optionalPhone, setOptionalPhone] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  // Delivery Address
  const [destination, setDestination] = useState<Location[]>([]);
  const [selectedDestination, setSelectedDestination] =
    useState<Location | null>(null);
  const [landmark, setLandmark] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);

  // Package Details
  const [packageType, setPackageType] = useState("Parcel");
  const [serviceType, setServiceType] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [weight, setWeight] = useState("1");
  const [totalPieces, setTotalPieces] = useState("1");
  const [goodsValue, setGoodsValue] = useState("1");
  const [codAmount, setCodAmount] = useState("0");
  const [instructions, setInstructions] = useState("");

  const fetchLandmarks = async () => {
    try {
      const res = await getLandmarks({ limit: 100, search: searchText });
      if (res?.data?.result?.success) {
        setDestination(JSON.parse(res?.data?.result?.data as string));
      } else {
        console.error("Failed to fetch landmarks");
      }
    } catch (error) {
      console.error("Error fetching landmarks:", error);
    }
  };

  useEffect(() => {
    fetchLandmarks();
  }, [searchText]);

  const handleSubmit = async () => {
    // Simple validation
    if (!primaryPhone || !customerName || !destination || !landmark) {
      alert("Please fill all required fields (*)");
      return;
    }

    const formData = {
      weight: weight.toString(),
      size: "small",
      quantity: goodsValue.toString(),
      item_type: packageType.toString(),
      shippingPrice: selectedDestination?.shippingPrice?.toString() || "0",
      shipmentPrice: codAmount.toString(),
      paymentMethod: paymentMethod.toString(),
      description: instructions.toString(),
    };

    const receiver = {
      name: customerName,
      mobile: primaryPhone,
      optionalMobile: optionalPhone,
      email: customerEmail,
      landmark: landmark,
      district: selectedDestination?.district?.name,
      province: selectedDestination?.province?.name,
      country: selectedDestination?.country?.name,
      city: selectedDestination?.name,
      shippingPrice: selectedDestination?.shippingPrice?.toString() || "0",
    };
    const type = serviceType.toString();
    try {
      const response = await createShipment({
        formData,
        receiver,
        type,
      });

      if (response?.data?.result?.success) {
        Alert.alert(
          response?.data?.result?.message || "Shipment Created Successfully!",
        );
        //clear all form fields
        setCustomerName("");
        setPrimaryPhone("");
        setOptionalPhone("");
        setCustomerEmail("");
        setLandmark("");
        setSelectedDestination(null);
        setServiceType("");
        setCodAmount("0");
        setInstructions("");
      } else {
        Alert.alert(
          response?.data?.result?.message || "Shipment Creation Failed!",
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Customer Information</Text>

      <Text style={styles.label}>Primary Mobile *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter primary phone number"
        keyboardType="phone-pad"
        value={primaryPhone}
        onChangeText={setPrimaryPhone}
      />

      <Text style={styles.label}>Optional Phone (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter optional phone number"
        keyboardType="phone-pad"
        value={optionalPhone}
        onChangeText={setOptionalPhone}
      />

      <Text style={styles.label}>Customer Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter customer name"
        value={customerName}
        onChangeText={setCustomerName}
      />

      <Text style={styles.label}>Customer Email (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter customer email"
        keyboardType="email-address"
        value={customerEmail}
        onChangeText={setCustomerEmail}
      />

      <Text style={styles.sectionTitle}>Delivery Address</Text>

      <Text style={styles.label}>Destination *</Text>
      <Text style={styles.label}>
        {selectedDestination
          ? selectedDestination.name + ", " + selectedDestination.shippingPrice
          : "Click to select destination"}
      </Text>

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={async () => {
          setShowModal(true);
          await fetchLandmarks();
        }}
      >
        <Text style={styles.textStyle}>Select Destination</Text>
      </Pressable>

      <Text style={styles.label}>Landmark *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter nearest landmark"
        value={landmark}
        onChangeText={setLandmark}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.backdrop}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Select Destination</Text>

            {/* Search Bar */}
            <TextInput
              style={styles.searchInput}
              placeholder="Search locations..."
              placeholderTextColor="#999"
              onChangeText={(text) => setSearchText(text)}
            />

            {/* Scroll List */}
            <ScrollView style={{ maxHeight: 350 }}>
              {destination?.map((item) => (
                <Pressable
                  key={item._id}
                  style={[
                    styles.destinationItem,
                    selectedDestination?._id === item._id &&
                      styles.selectedItem,
                  ]}
                  onPress={() => {
                    setSelectedDestination(item);
                    setShowModal(false);
                  }}
                >
                  <Text style={styles.destinationText}>{item.name}</Text>
                  <Text style={styles.destinationSubText}>
                    {item.district?.name}, {item.province?.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.label}>Package Type</Text>

      <Picker
        selectedValue={packageType}
        onValueChange={(itemValue) => setPackageType(itemValue)}
        style={{
          height: 50,
          width: "100%",
          color: "#333",
          backgroundColor: "#e0e0e0",
          borderRadius: 18,
          paddingHorizontal: 10,
          marginBottom: 12,
        }}
      >
        <Picker.Item label="Parcel" value="parcel" />
        <Picker.Item label="Document" value="document" />
      </Picker>

      <Text style={styles.label}>Service Type</Text>
      <Picker
        selectedValue={serviceType}
        onValueChange={(itemValue) => setServiceType(itemValue)}
        style={{
          height: 50,
          width: "100%",
          color: "#333",
          backgroundColor: "#e0e0e0",
          borderRadius: 18,
          paddingHorizontal: 10,
          marginBottom: 12,
        }}
      >
        <Picker.Item label="Home Delivery" value="delivery" />
        <Picker.Item label="Self Pickup" value="self_pickup" />
        <Picker.Item label="Exchange" value="exchange" />
        <Picker.Item label="Return" value="return" />
      </Picker>

      <Text style={styles.label}>Payment Method</Text>
      <Picker
        selectedValue={paymentMethod}
        onValueChange={(itemValue) => setPaymentMethod(itemValue)}
        style={{
          height: 50,
          width: "100%",
          color: "#333",
          backgroundColor: "#e0e0e0",
          borderRadius: 18,
          paddingHorizontal: 10,
          marginBottom: 12,
        }}
      >
        <Picker.Item label="COD" value="COD" />
        <Picker.Item label="Paid" value="paid" />
      </Picker>

      <Text style={styles.label}>Weight (kg) *</Text>
      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        value={weight}
        onChangeText={setWeight}
      />

      <Text style={styles.label}>Total Pieces</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={totalPieces}
        onChangeText={setTotalPieces}
      />

      <Text style={styles.label}>Goods Value (Quantity)</Text>
      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        value={goodsValue}
        onChangeText={setGoodsValue}
      />

      <Text style={styles.label}>COD Amount</Text>
      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        value={codAmount}
        onChangeText={setCodAmount}
      />

      <Text style={styles.label}>Delivery Instructions</Text>
      <TextInput
        style={styles.input}
        placeholder="Any special instructions"
        value={instructions}
        onChangeText={setInstructions}
      />

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Create Shipment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#FFF",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: { fontSize: 14, marginBottom: 5, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 14,
  },

  submitBtn: {
    backgroundColor: "#6200EE",
    paddingVertical: 15,
    borderRadius: 2,
    marginTop: 6,
    marginBottom: 28,
    alignItems: "center",
  },
  submitText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
  picker: {
    height: 50,
    width: "100%",
  },

  //Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },

  sheet: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: -3 },
  },

  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  destinationItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  selectedItem: {
    backgroundColor: "#f1e8ff",
  },

  destinationText: {
    fontSize: 16,
    fontWeight: "600",
  },

  destinationSubText: {
    fontSize: 13,
    color: "#666",
  },

  closeBtn: {
    marginTop: 10,
    backgroundColor: "#6200EE",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  closeBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
