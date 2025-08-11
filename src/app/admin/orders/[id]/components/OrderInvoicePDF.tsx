// components/OrderInvoicePDF.tsx
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Helper for formatting currency
const formatCurrency = (amount: number) => `${amount?.toFixed(2) || '0.00'}`;
// 1. Register Bangla font
Font.register({
  family: 'NotoSansBengali',
  src: '/NotoSansBengali-Regular.ttf', // Path to your font file
});
// Styles
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 11, fontFamily: 'Helvetica' },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  invoiceTitle: { fontSize: 18, fontWeight: 'bold' },
  invoiceDate: { marginTop: 4 },
  invoiceBox: {
    border: '1px solid #ddd',
    padding: 10,
    marginBottom: 20,
  },
  orderInfo: { marginBottom: 10 },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  columnBox: { width: '32%' },
  label: { fontWeight: 'bold', marginBottom: 2 },
  text: {
    fontFamily: 'NotoSansBengali',
    fontSize: 14,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#eef6fb',
    padding: 6,
    borderBottom: '1px solid #ccc',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 6,
    borderBottom: '0.5px solid #eee',
  },
  cell: { fontSize: 10 },
  totalSection: {
    paddingTop: 10,
    paddingLeft: 6,
    paddingRight: 6,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  totalLabel: { fontWeight: 'bold' },
  thankYou: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default function OrderInvoicePDF({ orderDetails }: { orderDetails: any }) {
  if (!orderDetails) return null;

  const { user, order_items } = orderDetails;
  const customerName = orderDetails?.name;
  const customerPhone = orderDetails?.phone || '';
  const address = `${orderDetails.area}, ${orderDetails.sub_district}, ${orderDetails.district}, ${orderDetails.division}`;

  // Calculate sum of unit prices (multiplied by quantity)
  const totalUnitPrice = order_items?.reduce(
    (sum: number, item: any) => sum + (item.product?.price || 0) * (item.quantity || 1),
    0
  );

  // Calculate total discount: handle both 'flat' and 'percentage' types
  const totalDiscount = order_items?.reduce((sum: number, item: any) => {
    const price = item.product?.price || 0;
    const discount = item.product?.discount || 0;
    const discountType = item.product?.discount_type;
    const quantity = item.quantity || 1;
    let discountAmount = 0;
    if (discountType === 'flat') {
      // Flat means a fixed price deduction per unit
      discountAmount = discount * quantity;
    } else if (discountType === 'percentage') {
      discountAmount = ((price * discount) / 100) * quantity;
    }
    return sum + discountAmount;
  }, 0);
  // Coupon discount (assuming orderDetails.discount is coupon discount)
  const couponDiscount = orderDetails?.discount || 0;

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
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Image
              src="/images/logo/brandLogo.jpeg" // Make sure this path is correct and accessible
              style={{ width: 72, height: 32, marginRight: 6 }}
            />
            <Text>Darkak</Text>
          </View>
        </View>

        {/* Order Summary Box */}
        <View style={styles.invoiceBox}>
          <View style={styles.orderInfo}>
            <Text style={{ fontWeight: 'bold' }}>Order #{orderDetails.orderId}</Text>
            <Text>Date : {new Date(orderDetails.date).toDateString()}</Text>
          </View>

          <View style={styles.sectionRow}>
            <View style={styles.columnBox}>
              <Text style={styles.label}>Payment</Text>
              <Text>
                {orderDetails.paymentType === 'cod' ? 'Cash On Delivery' : orderDetails.paymentType}
              </Text>
            </View>
            <View style={styles.columnBox}>
              <Text style={styles.label}>Billed To (User)</Text>
              <Text style={styles.text}>{customerName}</Text>
              <Text style={styles.text}>{customerPhone}</Text>
              <Text style={styles.text}>{address}</Text>
            </View>
            <View style={styles.columnBox}>
              <Text style={styles.label}>Shipping To (User)</Text>
              <Text style={styles.text}>{customerName}</Text>
              <Text style={styles.text}>{customerPhone}</Text>
              <Text style={styles.text}>{address}</Text>
            </View>
          </View>
        </View>

        {/* Table Headers */}
        <View style={styles.tableHeader}>
          <Text style={[{ width: '15%' }, styles.cell]}>IMAGE</Text>
          <Text style={[{ width: '35%' }, styles.cell]}>ITEM DESCRIPTION</Text>
          <Text style={[{ width: '35%' }, styles.cell]}>ITEM CODE</Text>
          <Text style={[{ width: '10%', textAlign: 'center' }, styles.cell]}>QTY</Text>
          <Text style={[{ width: '20%', textAlign: 'right' }, styles.cell]}>UNIT PRICE</Text>
          <Text style={[{ width: '20%', textAlign: 'right' }, styles.cell]}>Discount</Text>
          <Text style={[{ width: '20%', textAlign: 'right' }, styles.cell]}>TOTAL</Text>
        </View>

        {/* Products */}
        {order_items?.map((item: any, i: number) => {
          const { product, quantity } = item;
          const discountedPrice = product.price - (product.price * product.discount) / 100;
          return (
            <View key={i} style={styles.tableRow}>
              <View style={{ width: '15%', paddingRight: 4 }}>
                <Image
                  src={product.thumbnail}
                  style={{ width: 40, height: 40, objectFit: 'contain' }}
                />
              </View>
              <Text style={[{ width: '35%', paddingRight: 4 }, styles.cell]}>{product.title}</Text>
              <Text style={[{ width: '35%' }, styles.cell]}>{product.code}</Text>
              <Text style={[{ width: '10%', textAlign: 'center' }, styles.cell]}>{quantity}</Text>
              <Text style={[{ width: '20%', textAlign: 'right' }, styles.cell]}>
                {product.price}
              </Text>
              <Text style={[{ width: '20%', textAlign: 'right' }, styles.cell]}>
                {product?.discount_type === 'flat' && 'Tk'} {product.discount}{' '}
                {product?.discount_type === 'percentage' && '%'}
              </Text>
              <Text style={[{ width: '20%', textAlign: 'right' }, styles.cell]}>
                Tk {formatCurrency(discountedPrice * quantity)}
              </Text>
            </View>
          );
        })}

        {/* Totals */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text>Total Item Price</Text>
            <Text>Tk {formatCurrency(totalUnitPrice)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Discount</Text>
            <Text>-{formatCurrency(totalDiscount + couponDiscount)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Delivery Fee</Text>
            <Text>+{formatCurrency(orderDetails.deliveryFee)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Tax</Text>
            <Text>+{formatCurrency(orderDetails.tax)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalLabel}>
              Tk{' '}
              {totalUnitPrice -
                (totalDiscount + orderDetails.discount) +
                orderDetails.deliveryFee +
                orderDetails.tax}
            </Text>
          </View>
        </View>

        <Text style={styles.thankYou}>Thanks for the purchase.</Text>
      </Page>
    </Document>
  );
}
