import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';

export default function SettlementDetailsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Settlement Breakdown" showBack />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Order Settlement Structure</Text>
        <Text style={styles.subheading}>
          Complete itemized audit of deductions, commissions, and net seller bank credits.
        </Text>

        {/* Sample Order Settlement Example */}
        <View style={styles.card}>
          <LinearGradient
            colors={['#6C5CE7', '#A29BFE']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.cardStripe}
          />

          <View style={styles.cardInner}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.orderTitle}>Sample Order #HB123456</Text>
                <Text style={styles.orderDate}>Delivered Nov 12, 2026 • 3 Items</Text>
              </View>
              <View style={styles.verifiedTag}>
                <Ionicons name="checkmark-circle" size={13} color="#059669" />
                <Text style={styles.verifiedTagText}>Audited</Text>
              </View>
            </View>

            <View style={styles.lineItemsCol}>
              <View style={styles.lineItem}>
                <Text style={styles.lineLabel}>Gross Customer Product Price (3 Items)</Text>
                <Text style={styles.lineValue}>₹720.00</Text>
              </View>

              <View style={styles.lineItem}>
                <Text style={styles.lineLabel}>Customer Delivery Fee (Charged)</Text>
                <Text style={styles.lineValue}>₹40.00</Text>
              </View>

              <View style={styles.lineItem}>
                <Text style={styles.lineLabel}>Delivery Partner Payout (HomeBaz Express)</Text>
                <Text style={styles.lineDeduct}>- ₹40.00</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.lineItem}>
                <Text style={styles.lineLabel}>HomeBaz Platform Fee (10%)</Text>
                <Text style={styles.lineDeduct}>- ₹72.00</Text>
              </View>

              <View style={styles.lineItem}>
                <Text style={styles.lineLabel}>GST on Platform Commission (18%)</Text>
                <Text style={styles.lineDeduct}>- ₹12.96</Text>
              </View>

              <View style={styles.lineItem}>
                <Text style={styles.lineLabel}>UPI Payment Gateway Fee (2%)</Text>
                <Text style={styles.lineDeduct}>- ₹14.40</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.totalRow}>
                <View>
                  <Text style={styles.totalLabel}>Net Bank Settlement</Text>
                  <Text style={styles.totalSub}>Directly credited to HDFC •••• 8912</Text>
                </View>
                <Text style={styles.totalValue}>₹620.64</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Monthly Deduction Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Ionicons name="calculator-outline" size={18} color="#6C5CE7" />
            <Text style={styles.summaryHeading}>November Deductions Aggregate</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Gross Sales (117 Orders)</Text>
            <Text style={styles.summaryVal}>₹82,400.00</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Platform Fees (10%)</Text>
            <Text style={styles.summaryDeduct}>- ₹8,240.00</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>GST & Payment Processing</Text>
            <Text style={styles.summaryDeduct}>- ₹1,680.00</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summaryTotalLabel}>Net Credited to HDFC Bank</Text>
              <Text style={styles.summarySub}>88.0% Net Seller Margin</Text>
            </View>
            <Text style={styles.summaryTotalVal}>₹72,480.00</Text>
          </View>
        </View>
      </ScrollView>
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
    paddingTop: 12,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 20,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  subheading: {
    fontSize: 12,
    color: '#716C8A',
    marginBottom: 16,
    lineHeight: 17,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#ECEAF4',
    marginBottom: 16,
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
  cardInner: {
    padding: 16,
    paddingLeft: 18,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F2FA',
    paddingBottom: 10,
  },
  orderTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
  },
  orderDate: {
    fontSize: 11,
    color: '#8C88A2',
    marginTop: 2,
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  verifiedTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  lineItemsCol: {
    gap: 9,
  },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lineLabel: {
    fontSize: 12,
    color: '#716C8A',
    flex: 1,
    paddingRight: 8,
  },
  lineValue: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  lineDeduct: {
    fontSize: 13,
    fontWeight: '700',
    color: '#DC2626',
  },
  divider: {
    height: 1,
    backgroundColor: '#F2EFF8',
    marginVertical: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#4B3AA8',
  },
  totalSub: {
    fontSize: 11,
    color: '#8C88A2',
    marginTop: 1,
  },
  totalValue: {
    fontSize: 19,
    fontWeight: '900',
    color: '#059669',
  },
  summaryCard: {
    backgroundColor: '#FAF8FE',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.2,
    borderColor: '#ECE5FD',
    gap: 10,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  summaryHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#716C8A',
  },
  summaryVal: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  summaryDeduct: {
    fontSize: 13,
    fontWeight: '700',
    color: '#DC2626',
  },
  summaryTotalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#4B3AA8',
  },
  summarySub: {
    fontSize: 11,
    color: '#8C88A2',
    marginTop: 1,
  },
  summaryTotalVal: {
    fontSize: 20,
    fontWeight: '900',
    color: '#6C5CE7',
  },
});
