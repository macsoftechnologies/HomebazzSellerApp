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
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';
import { MOCK_PAYOUTS, PayoutRecord } from '@/data/mockData';

export default function PayoutHistoryScreen() {
  const router = useRouter();

  const renderPayoutItem = ({ item }: { item: PayoutRecord }) => (
    <View style={styles.payoutCard}>
      {/* Left accent stripe */}
      <LinearGradient
        colors={['#10B981', '#34D399']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.cardStripe}
      />

      <View style={styles.cardInnerPadding}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.payoutAmount}>₹{item.amount.toLocaleString('en-IN')}</Text>
            <Text style={styles.periodText}>{item.period}</Text>
          </View>

          <View style={styles.statusPill}>
            <Ionicons name="checkmark-circle" size={13} color="#059669" />
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        <View style={styles.detailsCol}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Direct Credit Bank</Text>
            <View style={styles.detailValRow}>
              <Ionicons name="business-outline" size={12} color="#6C5CE7" />
              <Text style={styles.detailVal}>{item.bankAccount}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bank UTR Reference</Text>
            <Text style={styles.detailValMono}>{item.utrNumber}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Orders Included</Text>
            <Text style={styles.detailVal}>{item.ordersCovered} Completed Orders</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transfer Date</Text>
            <Text style={styles.detailVal}>{item.date}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.invoiceBtn}
          onPress={() =>
            Alert.alert(
              'Tax Invoice PDF',
              `Downloading official GST and settlement invoice for ${item.period} (UTR: ${item.utrNumber})`
            )
          }
          activeOpacity={0.7}
        >
          <Ionicons name="download-outline" size={15} color="#6C5CE7" />
          <Text style={styles.invoiceBtnText}>Download Official Tax Invoice PDF</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Payout History" showBack />

      <FlatList
        style={styles.list}
        data={MOCK_PAYOUTS}
        keyExtractor={(item) => item.id}
        renderItem={renderPayoutItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.cycleCard}>
            <View style={styles.cycleIconBox}>
              <Ionicons name="calendar-outline" size={22} color="#6C5CE7" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cycleTitle}>Weekly Auto-Settlement Cycle</Text>
              <Text style={styles.cycleDesc}>
                Payouts are automatically deposited directly to your verified HDFC bank account every Wednesday by 11:00 AM for the previous Monday–Sunday deliveries.
              </Text>
            </View>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingTop: 12,
    paddingBottom: 34,
    flexGrow: 1,
  },
  cycleCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#F5F3FC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E7E0F8',
    marginBottom: 16,
  },
  cycleIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cycleTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#43339B',
    marginBottom: 3,
  },
  cycleDesc: {
    fontSize: 12,
    color: '#6E6696',
    lineHeight: 17,
  },
  payoutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#ECEAF4',
    marginBottom: 14,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#1F1A3A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3.5,
  },
  cardInnerPadding: {
    padding: 16,
    paddingLeft: 18,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  payoutAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: HomeBazColors.textPrimary,
    letterSpacing: -0.4,
  },
  periodText: {
    fontSize: 12,
    color: '#716C8A',
    marginTop: 2,
    fontWeight: '500',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: '#059669',
    fontSize: 11,
    fontWeight: '700',
  },
  detailsCol: {
    gap: 8,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F2F0F8',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#716C8A',
  },
  detailValRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailVal: {
    fontSize: 12,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  detailValMono: {
    fontSize: 12,
    fontWeight: '700',
    color: '#534C74',
    letterSpacing: 0.2,
  },
  invoiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    backgroundColor: '#F7F5FE',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EBE6FA',
  },
  invoiceBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C5CE7',
  },
});
