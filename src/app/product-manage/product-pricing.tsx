import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';
import { CustomInput } from '@/components/common/CustomInput';
import { GradientButton } from '@/components/common/GradientButton';

export default function ProductPricingScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const [sellingPrice, setSellingPrice] = useState('250');
  const [costPrice, setCostPrice] = useState('140');

  const priceNum = parseFloat(sellingPrice) || 0;
  const costNum = parseFloat(costPrice) || 0;

  // HomeBaz PDF Model A: 10% commission + 2% gateway
  const platformFee = Math.round(priceNum * 0.1);
  const paymentFee = Math.round(priceNum * 0.02);
  const netEarnings = Math.max(0, priceNum - platformFee - paymentFee);
  const netProfit = Math.max(0, netEarnings - costNum);
  const marginPercent = priceNum > 0 ? Math.round((netProfit / priceNum) * 100) : 0;

  const handleSave = () => {
    Alert.alert('Saved', 'Pricing updated successfully!');
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <Header title="Product Pricing & Payout" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Pricing & Net Earnings</Text>
        <Text style={styles.subheading}>
          Transparent breakdown of HomeBaz 10% commission and your actual take-home earnings.
        </Text>

        <View style={styles.card}>
          <CustomInput
            label="Customer Selling Price (₹)"
            required
            leftIcon="cash-outline"
            value={sellingPrice}
            onChangeText={setSellingPrice}
            keyboardType="numeric"
            placeholder="250"
          />

          <CustomInput
            label="Estimated Production Cost (₹) (Optional)"
            leftIcon="receipt-outline"
            value={costPrice}
            onChangeText={setCostPrice}
            keyboardType="numeric"
            helperText="Raw materials, jar packaging, oil & spice ingredients"
            placeholder="140"
          />

          {/* Real-time Earnings Calculator Breakdown */}
          <View style={styles.calculatorBox}>
            <Text style={styles.calcTitle}>Per Unit Payout Breakdown</Text>

            <View style={styles.calcRow}>
              <Text style={styles.calcLabel}>Customer Price</Text>
              <Text style={styles.calcVal}>₹{priceNum}</Text>
            </View>

            <View style={styles.calcRow}>
              <Text style={styles.calcLabel}>HomeBaz Commission (10%)</Text>
              <Text style={styles.calcDeduct}>- ₹{platformFee}</Text>
            </View>

            <View style={styles.calcRow}>
              <Text style={styles.calcLabel}>Payment Gateway & Processing (2%)</Text>
              <Text style={styles.calcDeduct}>- ₹{paymentFee}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.calcRow}>
              <Text style={styles.totalLabel}>Your Take-Home Payout</Text>
              <Text style={styles.totalVal}>₹{netEarnings}</Text>
            </View>

            <View style={styles.profitBanner}>
              <Ionicons name="trending-up" size={18} color="#10B981" />
              <Text style={styles.profitText}>
                Estimated Net Profit: ₹{netProfit} / jar ({marginPercent}% margin)
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Save Pricing"
          onPress={handleSave}
          size="large"
        />
      </View>
    </KeyboardAvoidingView>
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
  heading: {
    fontSize: 20,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    marginBottom: 6,
  },
  subheading: {
    fontSize: 13,
    color: HomeBazColors.textSecondary,
    marginBottom: 18,
    lineHeight: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECF5',
  },
  calculatorBox: {
    backgroundColor: '#FAF9FE',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECE7FA',
    marginTop: 10,
  },
  calcTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    marginBottom: 12,
  },
  calcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  calcLabel: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
  },
  calcVal: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  calcDeduct: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.danger,
  },
  divider: {
    height: 1,
    backgroundColor: '#EBE8F3',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: HomeBazColors.primaryDark,
  },
  totalVal: {
    fontSize: 18,
    fontWeight: '800',
    color: HomeBazColors.primary,
  },
  profitBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ECFDF5',
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
  },
  profitText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#065F46',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ECECF5',
  
    elevation: 20,
    zIndex: 100,
    paddingTop: 12,},
});
