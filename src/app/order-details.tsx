import React, { useState } from 'react';
import {
  Linking,
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
import { StatusBadge } from '@/components/common/StatusBadge';
import { ProductThumbnail } from '@/components/common/ProductThumbnail';
import { GradientButton } from '@/components/common/GradientButton';
import { MOCK_ORDERS } from '@/data/mockData';

export default function OrderDetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { orderId } = useLocalSearchParams();
  const order = MOCK_ORDERS.find((o) => o.id === orderId) || MOCK_ORDERS[0];
  const [currentStatus, setCurrentStatus] = useState(order.status);
  const bottomBarPadding = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);

  const handleCallCustomer = () => {
    Linking.openURL(`tel:${order.customerPhone}`);
  };

  const handleAcceptOrder = () => {
    router.push({
      pathname: '/order-manage/accept-order',
      params: { orderId: order.id },
    });
  };

  const handleRejectOrder = () => {
    router.push({
      pathname: '/order-manage/reject-order',
      params: { orderId: order.id },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Header title="Order Details" showBack />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 + bottomBarPadding }]}
      >
        {/* Order ID & Time Header Card */}
        <View style={styles.topCard}>
          <View style={styles.orderIdRow}>
            <Text style={styles.orderIdText}>{order.id}</Text>
            <StatusBadge status={currentStatus} size="small" />
          </View>
          <Text style={styles.placedOnText}>Placed on: Nov 12, 2026, 02:14 PM</Text>
        </View>

        {/* Customer Details Card */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Customer Details</Text>
          </View>

          <View style={styles.customerRow}>
            <View style={styles.customerInfoCol}>
              <View style={styles.detailRow}>
                <Ionicons name="person-outline" size={16} color="#8E8AA0" />
                <Text style={styles.customerName}>{order.customerName}</Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="call-outline" size={16} color="#8E8AA0" />
                <Text style={styles.customerPhone}>{order.customerPhone}</Text>
              </View>

              <View style={[styles.detailRow, { alignItems: 'flex-start' }]}>
                <Ionicons
                  name="location-outline"
                  size={16}
                  color="#8E8AA0"
                  style={{ marginTop: 2 }}
                />
                <Text style={styles.customerAddress}>{order.customerAddress}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.callButton}
              onPress={handleCallCustomer}
              activeOpacity={0.7}
            >
              <Ionicons name="call" size={18} color={HomeBazColors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Items Card */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>
            Order Items ({order.items.length})
          </Text>

          <View style={styles.itemsList}>
            {order.items.map((item, index) => (
              <View key={item.id || index} style={styles.itemRow}>
                <ProductThumbnail size={44} imageSource={item.image} />

                <View style={styles.itemMeta}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQuantity}>
                    ₹{item.price} × {item.quantity}
                  </Text>
                </View>

                <Text style={styles.itemTotal}>₹{item.total}</Text>
              </View>
            ))}
          </View>

          {/* Total Amount Divider */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{order.totalAmount}</Text>
          </View>
        </View>

        {/* Order Workflow Shortcuts */}
        <View style={styles.workflowCard}>
          <Text style={styles.workflowTitle}>Order Lifecycle Actions</Text>
          <View style={styles.workflowButtonsGrid}>
            <TouchableOpacity
              style={styles.workflowChip}
              onPress={() =>
                router.push({
                  pathname: '/order-manage/order-preparation',
                  params: { orderId: order.id },
                })
              }
            >
              <Ionicons name="timer-outline" size={14} color={HomeBazColors.primary} />
              <Text style={styles.workflowChipText}>Kitchen Prep Timer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.workflowChip}
              onPress={() =>
                router.push({
                  pathname: '/order-manage/ready-for-pickup',
                  params: { orderId: order.id },
                })
              }
            >
              <Ionicons name="barcode-outline" size={14} color={HomeBazColors.primary} />
              <Text style={styles.workflowChipText}>Ready & Label</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.workflowChip}
              onPress={() =>
                router.push({
                  pathname: '/order-manage/delivery-partner-assigned',
                  params: { orderId: order.id },
                })
              }
            >
              <Ionicons name="bicycle-outline" size={14} color={HomeBazColors.primary} />
              <Text style={styles.workflowChipText}>Rider Assigned</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.workflowChip}
              onPress={() =>
                router.push({
                  pathname: '/order-manage/handover-confirmation',
                  params: { orderId: order.id },
                })
              }
            >
              <Ionicons name="checkmark-done" size={14} color={HomeBazColors.primary} />
              <Text style={styles.workflowChipText}>Handover OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Sticky Action Buttons */}
      <View style={[styles.bottomBar, { paddingBottom: bottomBarPadding }]}>
        {currentStatus === 'New' ? (
          <>
            <GradientButton
              title="Accept Order"
              onPress={handleAcceptOrder}
              size="large"
              style={styles.acceptButton}
            />
            <GradientButton
              title="Cancel"
              variant="outline"
              onPress={handleRejectOrder}
              size="large"
              style={styles.cancelButton}
            />
          </>
        ) : currentStatus === 'Cancelled' ? (
          <View style={styles.cancelledBanner}>
            <Ionicons name="close-circle" size={20} color="#DC2626" />
            <Text style={styles.cancelledBannerText}>
              Order was cancelled • 100% Refund Initiated
            </Text>
          </View>
        ) : currentStatus === 'Delivered' ? (
          <View style={styles.deliveredBanner}>
            <Ionicons name="checkmark-circle" size={20} color="#059669" />
            <Text style={styles.deliveredBannerText}>
              Order delivered successfully to customer
            </Text>
          </View>
        ) : (
          <GradientButton
            title="Manage Order Workflow  →"
            onPress={() =>
              router.push({
                pathname: '/order-manage/order-preparation',
                params: { orderId: order.id },
              })
            }
            size="large"
            style={{ width: '100%' }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  statusBarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    backgroundColor: '#FFFFFF',
  },
  clockText: {
    fontWeight: '700',
    color: '#1E1B39',
    fontSize: 14,
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 110,
  },
  topCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECF5',
    marginBottom: 14,
  },
  orderIdRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  orderIdText: {
    fontSize: 17,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
  },
  placedOnText: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    fontWeight: '500',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECF5',
    marginBottom: 14,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
    marginBottom: 10,
  },
  customerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  customerInfoCol: {
    flex: 1,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  customerName: {
    fontSize: 14,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  customerPhone: {
    fontSize: 13,
    color: HomeBazColors.textSecondary,
    fontWeight: '500',
  },
  customerAddress: {
    fontSize: 13,
    color: HomeBazColors.textSecondary,
    lineHeight: 18,
    flex: 1,
  },
  callButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: HomeBazColors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  itemsList: {
    gap: 12,
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemMeta: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  itemQuantity: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    marginTop: 2,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0EFF6',
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: HomeBazColors.primary,
  },
  workflowCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ECECF5',
  },
  workflowTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textSecondary,
    marginBottom: 10,
  },
  workflowButtonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  workflowChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: HomeBazColors.primarySoft,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
  },
  workflowChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: HomeBazColors.primaryDark,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 14,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1.5,
    borderTopColor: '#ECE9F6',
    shadowColor: '#1C1342',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 20,
    zIndex: 100,
  },
  acceptButton: {
    flex: 2,
  },
  cancelButton: {
    flex: 1,
  },
  cancelledBanner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  cancelledBannerText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#DC2626',
  },
  deliveredBanner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  deliveredBannerText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#16A34A',
  },
});
