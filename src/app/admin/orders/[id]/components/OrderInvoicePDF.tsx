// components/OrderInvoicePDF.tsx
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Helper for formatting currency
const formatCurrency = (amount: number) => `$${amount?.toFixed(2) || "0.00"}`;

// Styles
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 11, fontFamily: "Helvetica" },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  invoiceTitle: { fontSize: 18, fontWeight: "bold" },
  invoiceDate: { marginTop: 4 },
  invoiceBox: {
    border: "1px solid #ddd",
    padding: 10,
    marginBottom: 20,
  },
  orderInfo: { marginBottom: 10 },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  columnBox: { width: "32%" },
  label: { fontWeight: "bold", marginBottom: 2 },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#eef6fb",
    padding: 6,
    borderBottom: "1px solid #ccc",
  },
  tableRow: {
    flexDirection: "row",
    padding: 6,
    borderBottom: "0.5px solid #eee",
  },
  cell: { fontSize: 10 },
  totalSection: {
    paddingTop: 10,
    paddingLeft: 6,
    paddingRight: 6,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  totalLabel: { fontWeight: "bold" },
  thankYou: {
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
});

export default function OrderInvoicePDF({
  orderDetails,
}: {
  orderDetails: any;
}) {
  if (!orderDetails) return null;

  console.log("orderDetails", orderDetails);

  const { user, order_items } = orderDetails;
  const customerName = orderDetails?.name;
  const customerPhone = orderDetails?.phone || "";
  const address = `${orderDetails.area}, ${orderDetails.sub_district}, ${orderDetails.district}, ${orderDetails.division}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceDate}>
              Invoice Date : {new Date(orderDetails.date).toDateString()}
            </Text>
          </View>
          <View>
            <Text>Dhaka Bangladesh</Text>
          </View>
        </View>

        {/* Order Summary Box */}
        <View style={styles.invoiceBox}>
          <View style={styles.orderInfo}>
            <Text style={{ fontWeight: "bold" }}>
              Order #{orderDetails.orderId}
            </Text>
            <Text>Date : {new Date(orderDetails.date).toDateString()}</Text>
          </View>

          <View style={styles.sectionRow}>
            <View style={styles.columnBox}>
              <Text style={styles.label}>Payment</Text>
              <Text>
                {orderDetails.paymentType === "cod"
                  ? "Cash On Delivery"
                  : orderDetails.paymentType}
              </Text>
            </View>
            <View style={styles.columnBox}>
              <Text style={styles.label}>Billed To (User)</Text>
              <Text>{customerName}</Text>
              <Text>{customerPhone}</Text>
              <Text>{address}</Text>
            </View>
            <View style={styles.columnBox}>
              <Text style={styles.label}>Shipping To (User)</Text>
              <Text>{customerName}</Text>
              <Text>{customerPhone}</Text>
              <Text>{address}</Text>
            </View>
          </View>
        </View>

        {/* Table Headers */}
        <View style={styles.tableHeader}>
          <Text style={[{ width: "15%" }, styles.cell]}>IMAGE</Text>
          <Text style={[{ width: "35%" }, styles.cell]}>ITEM DESCRIPTION</Text>
          <Text style={[{ width: "10%", textAlign: "center" }, styles.cell]}>
            QTY
          </Text>
          <Text style={[{ width: "20%", textAlign: "right" }, styles.cell]}>
            UNIT PRICE
          </Text>
          <Text style={[{ width: "20%", textAlign: "right" }, styles.cell]}>
            TOTAL
          </Text>
        </View>

        {/* Products */}
        {order_items?.map((item: any, i: number) => {
          const { product, quantity } = item;
          const discountedPrice =
            product.price - (product.price * product.discount) / 100;
          return (
            <View key={i} style={styles.tableRow}>
              <View style={{ width: "15%", paddingRight: 4 }}>
                <Image
                  src={product.thumbnail}
                  style={{ objectFit: "contain", width: 20, height: 20 }}
                />
              </View>
              <Text style={[{ width: "35%" }, styles.cell]}>
                {product.title}
              </Text>
              <Text
                style={[{ width: "10%", textAlign: "center" }, styles.cell]}
              >
                {quantity}
              </Text>
              <Text style={[{ width: "20%", textAlign: "right" }, styles.cell]}>
                {formatCurrency(discountedPrice)}
              </Text>
              <Text style={[{ width: "20%", textAlign: "right" }, styles.cell]}>
                {formatCurrency(discountedPrice * quantity)}
              </Text>
            </View>
          );
        })}

        {/* Totals */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text>Total Item Price</Text>
            <Text>{formatCurrency(orderDetails.subTotal)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Delivery Fee</Text>
            <Text>{formatCurrency(orderDetails.deliveryFee)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Discount</Text>
            <Text>-{formatCurrency(orderDetails.discount)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Tax</Text>
            <Text>{formatCurrency(orderDetails.tax)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalLabel}>
              {formatCurrency(orderDetails.total)}
            </Text>
          </View>
        </View>

        <Text style={styles.thankYou}>Thanks for the purchase.</Text>
      </Page>
    </Document>
  );
}
