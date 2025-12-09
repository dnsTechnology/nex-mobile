import Barcode from "@kichiyaki/react-native-barcode-generator";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function ShipmentDetails() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Shipment Details</Text>

      {/* Header */}
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 15 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#2066ffff",
            padding: 9,
            borderBlockColor: "#2066ffff",
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "#dee3ebff", fontWeight: "bold" }}>
            Edit Shipment
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#2066ffff",
            padding: 9,
            borderBlockColor: "#2066ffff",
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "#dee3ebff", fontWeight: "bold" }}>
            Cancel Shipment
          </Text>
        </TouchableOpacity>
      </View>

      {/* QR + Barcode */}
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>sarad.org</Text>
        <Text>Baneshwor, Kathmandu</Text>
        <Text>+977- 9840046844</Text>
        <Text>sarad.dev.np@gmail.com</Text>

        <View style={{ marginTop: 20, gap: 10, alignItems: "center" }}>
          <QRCode value='3883983057' size={140} />
          <Barcode
            value='3883983057'
            format='CODE128'
            width={1.6}
            height={80}
            lineColor='#000'
          />
        </View>
      </View>

      {/* Invoice */}
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Invoice Details</Text>
        <Text style={styles.row}>Tracking ID: 3883983057</Text>
        <Text style={styles.row}>Type: delivery</Text>
        <Text style={styles.row}>Date: 11/10/2025, 11:55:00 AM</Text>
        <Text style={styles.row}>Delivered Date: Invalid Date</Text>
      </View>

      {/* Receiver */}
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Receiver</Text>
        <Text style={styles.row}>Name: sarad bhatta</Text>
        <Text style={styles.row}>
          Address: apple, Lalitpur, Bagmati, Nakhipot
        </Text>
        <Text style={styles.row}>Phone: 9840046848</Text>
      </View>

      {/* Shipment Details */}
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Shipment Details</Text>
        <Text style={styles.row}>Parcel, paid</Text>
        <Text style={styles.row}>1 Pcs, 1 KG</Text>
        <Text style={styles.row}>Shipping Price: Rs 50</Text>
      </View>

      {/* Pickup Agent */}
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Pickup Agent</Text>
        <Text>No agent assigned for this shipment.</Text>
      </View>

      {/* Delivery Boy */}
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Delivery Boy</Text>
        <Text>Name: sarad bhatt</Text>
        <Text>Email: saradbhatt2@gmail.com</Text>
        <Text>Phone: 9840046844</Text>
        <Text>Address: Kathmandu, Nepal</Text>
      </View>

      {/* Forward to Branch */}
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Forward to Branch</Text>
        <Text>No branch assigned for this shipment.</Text>
      </View>

      {/* Final Agent */}
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Final Agent</Text>
        <Text>No final agent assigned.</Text>
      </View>

      {/* Remarks */}
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Remarks</Text>
        <Text>lorem</Text>
      </View>

      {/* Shipment Updates */}
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Shipment Updates</Text>

        <View style={styles.updateBlock}>
          <Text>
            Status: Shipment created successfully by admin at the hub. Ready for
            delivery.
          </Text>
          <Text>Date: 11/10/2025, 11:55:00 AM</Text>
        </View>

        <View style={styles.updateBlock}>
          <Text>
            Status: shipment handover to the delivery boy wait for your shipment
          </Text>
          <Text>Date: 11/30/2025, 3:09:58 PM</Text>
        </View>

        <View style={styles.updateBlock}>
          <Text>
            Status: Shipment added to delivery queue by sarad bhatt and its
            currently delivering now.
          </Text>
          <Text>Date: 11/30/2025, 3:37:18 PM</Text>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  box: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 15,
    borderRadius: 7,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 16,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  row: {
    marginBottom: 3,
  },
  updateBlock: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    marginBottom: 8,
  },
});
