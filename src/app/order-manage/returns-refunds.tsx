import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';

export default function ReturnsRefundsScreen() {
  const router = useRouter();

  const claims = [
    {
      id: 'RET-8921',
      orderId: '#HB123438',
      customer: 'K. Srilatha',
      product: 'Gongura Pickle 250g',
      reason: 'Jar damaged during courier delivery transit',
      status: 'Transit Insurance Covered',
      amount: '₹250',
      date: 'Nov 09, 2026',
      sellerLiability: '₹0 (HomeBaz Courier Liability)',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Returns & Refunds" showBack />

      <FlatList
        data={claims}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.policyCard}>
            <Ionicons name="shield-checkmark" size={24} color="#10B981" />
            <View style={{ flex: 1 }}>
              <Text style={styles.policyTitle}>Home Food Return Policy</Text>
              <Text style={styles.policyBody}>
                Per FSSAI hygiene norms, opened perishable food items cannot be returned. Damaged jars in transit are 100% insured by HomeBaz delivery partners.
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.claimCard}>
            <View style={styles.topRow}>
              <View>
                <Text style={styles.claimId}>{item.id}</Text>
                <Text style={styles.orderId}>Order {item.orderId}</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>

            <Text style={styles.prodName}>{item.product}</Text>
            <Text style={styles.reasonText}>{item.reason}</Text>

            <View style={styles.liabilityRow}>
              <Text style={styles.liabilityLabel}>Seller Liability:</Text>
              <Text style={styles.liabilityVal}>{item.sellerLiability}</Text>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.detailsBtn}
                onPress={() => Alert.alert('Claim Verified', 'This return was fully reimbursed to the buyer through HomeBaz Transit Protection.')}
              >
                <Text style={styles.detailsBtnText}>View Protection Details</Text>
              </TouchableOpacity>
            </View>
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
  policyCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 16,
  },
  policyTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#065F46',
    marginBottom: 4,
  },
  policyBody: {
    fontSize: 12,
    color: '#047857',
    lineHeight: 17,
  },
  claimCard: {
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
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  claimId: {
    fontSize: 15,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
  },
  orderId: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    fontWeight: '500',
  },
  statusBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: '#2563EB',
    fontSize: 10,
    fontWeight: '700',
  },
  prodName: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
    marginBottom: 4,
  },
  reasonText: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    marginBottom: 10,
  },
  liabilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F2F1F8',
    marginBottom: 10,
  },
  liabilityLabel: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
  },
  liabilityVal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  detailsBtn: {
    backgroundColor: HomeBazColors.primarySoft,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  detailsBtnText: {
    color: HomeBazColors.primaryDark,
    fontSize: 11,
    fontWeight: '700',
  },
});
