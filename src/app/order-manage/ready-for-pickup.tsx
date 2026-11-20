import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';
import { GradientButton } from '@/components/common/GradientButton';
import { MOCK_ORDERS, SELLER_PROFILE } from '@/data/mockData';

export default function ReadyForPickupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { orderId } = useLocalSearchParams();
  const order = MOCK_ORDERS.find((o) => o.id === orderId) || MOCK_ORDERS[0];
  const bottomInset = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header
        title="Ready for Pickup"
        showBack
        rightAction={{
          icon: 'print-outline',
          onPress: () => Alert.alert('Print Label', 'Printing parcel label on connected Bluetooth printer.'),
        }}
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomInset }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statusBanner}>
          <Ionicons name="checkmark-circle" size={24} color="#10B981" />
          <View style={{ flex: 1 }}>
            <Text style={styles.statusTitle}>Parcel Packed & Sealed</Text>
            <Text style={styles.statusDesc}>
              A delivery rider will be assigned automatically for doorstep collection in Visakhapatnam.
            </Text>
          </View>
        </View>

        {/* HomeBaz Official Shipping Label Card */}
        <View style={styles.labelCard}>
          <View style={styles.labelHeader}>
            <Text style={styles.homebazBrand}>
              Home<Text style={{ color: HomeBazColors.primary }}>Bazz</Text> Express
            </Text>
            <Text style={styles.labelOrderTag}>{order.id}</Text>
          </View>

          {/* Barcode Graphic */}
          <View style={styles.barcodeBox}>
            <View style={styles.barcodeLines}>
              {[2, 4, 1, 3, 5, 2, 6, 3, 1, 4, 2, 5, 3, 1, 6, 2, 4, 3, 5, 1, 3, 4].map(
                (w, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.barLine,
                      { width: w, height: 42, marginRight: idx % 3 === 0 ? 3 : 2 },
                    ]}
                  />
                )
              )}
            </View>
            <Text style={styles.barcodeText}>* {order.id.replace('#', '')} *</Text>
          </View>

          <View style={styles.labelDivider} />

          <View style={styles.addressBlock}>
            <Text style={styles.addressTag}>FROM (MAKER):</Text>
            <Text style={styles.addrName}>{SELLER_PROFILE.storeName}</Text>
            <Text style={styles.addrDetails}>{SELLER_PROFILE.address}</Text>
          </View>

          <View style={styles.labelDivider} />

          <View style={styles.addressBlock}>
            <Text style={styles.addressTag}>SHIP TO (CUSTOMER):</Text>
            <Text style={styles.addrName}>{order.customerName}</Text>
            <Text style={styles.addrDetails}>{order.customerAddress}</Text>
            <Text style={styles.addrPhone}>Phone: +91 {order.customerPhone}</Text>
          </View>

          <View style={styles.labelDivider} />

          <View style={styles.labelFooter}>
            <Text style={styles.footerItem}>Items: {order.items.length} Jars</Text>
            <Text style={styles.footerItem}>COD: ₹0 (Prepaid UPI)</Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomInset }]}>
        <GradientButton
          title="Track Assigned Delivery Partner  →"
          onPress={() =>
            router.push({
              pathname: '/order-manage/delivery-partner-assigned',
              params: { orderId: order.id },
            })
          }
          size="large"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#065F46',
    marginBottom: 2,
  },
  statusDesc: {
    fontSize: 12,
    color: '#047857',
    lineHeight: 16,
  },
  labelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  labelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  homebazBrand: {
    fontSize: 18,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
  },
  labelOrderTag: {
    fontSize: 14,
    fontWeight: '800',
    color: HomeBazColors.primary,
  },
  barcodeBox: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  barcodeLines: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
  },
  barLine: {
    backgroundColor: '#1E1B39',
  },
  barcodeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#1E1B39',
    marginTop: 4,
  },
  labelDivider: {
    height: 1,
    backgroundColor: '#EBE8F3',
    marginVertical: 12,
  },
  addressBlock: {
    gap: 2,
  },
  addressTag: {
    fontSize: 10,
    fontWeight: '800',
    color: HomeBazColors.textSecondary,
    letterSpacing: 0.5,
  },
  addrName: {
    fontSize: 14,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
  },
  addrDetails: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    lineHeight: 16,
  },
  addrPhone: {
    fontSize: 12,
    fontWeight: '600',
    color: HomeBazColors.textPrimary,
    marginTop: 2,
  },
  labelFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerItem: {
    fontSize: 12,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 14,
    borderTopWidth: 1.5,
    borderTopColor: '#ECE9F6',
    shadowColor: '#1C1342',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
    zIndex: 100,
  },
});
