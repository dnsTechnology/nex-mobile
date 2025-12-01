import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
export default function Create() {
  // Customer Info
  const [primaryPhone, setPrimaryPhone] = useState("");
  const [optionalPhone, setOptionalPhone] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  // Delivery Address
  const [destination, setDestination] = useState("");
  const [landmark, setLandmark] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);

  // Package Details
  const [packageType, setPackageType] = useState("Parcel");
  const [serviceType, setServiceType] = useState("Home Delivery");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [weight, setWeight] = useState("1");
  const [totalPieces, setTotalPieces] = useState("1");
  const [goodsValue, setGoodsValue] = useState("1");
  const [codAmount, setCodAmount] = useState("0");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = () => {
    // Simple validation
    if (!primaryPhone || !customerName || !destination || !landmark) {
      alert("Please fill all required fields (*)");
      return;
    }

    const shipmentData = {
      primaryPhone,
      optionalPhone,
      customerName,
      customerEmail,
      destination,
      landmark,
      saveAddress,
      packageType,
      serviceType,
      paymentMethod,
      weight,
      totalPieces,
      goodsValue,
      codAmount,
      instructions,
    };

    console.log("Shipment Created:", shipmentData);
    alert("Shipment Created Successfully!");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Customer Information</Text>

      <Text style={styles.label}>Primary Mobile *</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter primary phone number'
        keyboardType='phone-pad'
        value={primaryPhone}
        onChangeText={setPrimaryPhone}
      />

      <Text style={styles.label}>Optional Phone (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter optional phone number'
        keyboardType='phone-pad'
        value={optionalPhone}
        onChangeText={setOptionalPhone}
      />

      <Text style={styles.label}>Customer Name *</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter customer name'
        value={customerName}
        onChangeText={setCustomerName}
      />

      <Text style={styles.label}>Customer Email (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter customer email'
        keyboardType='email-address'
        value={customerEmail}
        onChangeText={setCustomerEmail}
      />

      <Text style={styles.sectionTitle}>Delivery Address</Text>

      <Text style={styles.label}>Destination *</Text>
      <TextInput
        style={styles.input}
        placeholder='Click to select destination'
        value={destination}
        onChangeText={setDestination}
      />

      <Text style={styles.label}>Landmark *</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter nearest landmark'
        value={landmark}
        onChangeText={setLandmark}
      />

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
        <Picker.Item label='Parcel' value='parcel' />
        <Picker.Item label='Document' value='document' />
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
        <Picker.Item label='Home Delivery' value='delivery' />
        <Picker.Item label='Self Pickup' value='self_pickup' />
        <Picker.Item label='Exchange' value='exchange' />
        <Picker.Item label='Return' value='return' />
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
        <Picker.Item label='COD' value='COD' />
        <Picker.Item label='Paid' value='paid' />
      </Picker>

      <Text style={styles.label}>Weight (kg) *</Text>
      <TextInput
        style={styles.input}
        keyboardType='decimal-pad'
        value={weight}
        onChangeText={setWeight}
      />

      <Text style={styles.label}>Total Pieces</Text>
      <TextInput
        style={styles.input}
        keyboardType='number-pad'
        value={totalPieces}
        onChangeText={setTotalPieces}
      />

      <Text style={styles.label}>Goods Value (Quantity)</Text>
      <TextInput
        style={styles.input}
        keyboardType='decimal-pad'
        value={goodsValue}
        onChangeText={setGoodsValue}
      />

      <Text style={styles.label}>COD Amount</Text>
      <TextInput
        style={styles.input}
        keyboardType='decimal-pad'
        value={codAmount}
        onChangeText={setCodAmount}
      />

      <Text style={styles.label}>Delivery Instructions</Text>
      <TextInput
        style={styles.input}
        placeholder='Any special instructions'
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
});
