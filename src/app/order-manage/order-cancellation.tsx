import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';

export default function OrderCancellationScreen() {
  const router = useRouter();

  const cancellations = [
    {
      id: '#HB123440',
      date: 'Nov 10, 2026',
      reason: 'Customer requested cancellation (Order placed by mistake)',
      refundStatus: 'Full Refund ₹450 processed via UPI',
      type: 'Customer Cancelled',
    },
    {
      id: '#HB123412',
      date: 'Nov 04, 2026',
      reason: 'Tomato Pickle batch sold out in retail store',
      refundStatus: 'Full Refund ₹280 credited to customer',
      type: 'Seller Declined',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Order Cancellation Log" showBack />

      <FlatList
        data={cancellations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={20} color={HomeBazColors.primary} />
            <Text style={styles.infoText}>
              HomeBaz tracks cancellations transparently. Small kitchen variances under 2% have zero penalty fees.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cancelCard}>
            <View style={styles.topRow}>
              <Text style={styles.orderId}>{item.id}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.type}</Text>
              </View>
            </View>

            <Text style={styles.reasonText}>{item.reason}</Text>

            <View style={styles.refundRow}>
              <Ionicons name="cash-outline" size={14} color="#10B981" />
              <Text style={styles.refundText}>{item.refundStatus}</Text>
            </View>

            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  listContent: {
    padding: 16,
    paddingBottom: 30,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: HomeBazColors.primarySoft,
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2DCF7',
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: HomeBazColors.primaryDark,
    lineHeight: 17,
  },
  cancelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECF5',
    marginBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 15,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
  },
  badge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: '#DC2626',
    fontSize: 11,
    fontWeight: '700',
  },
  reasonText: {
    fontSize: 13,
    color: HomeBazColors.textPrimary,
    lineHeight: 18,
    marginBottom: 10,
  },
  refundRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  refundText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  dateText: {
    fontSize: 11,
    color: '#9B97B0',
  },
});
