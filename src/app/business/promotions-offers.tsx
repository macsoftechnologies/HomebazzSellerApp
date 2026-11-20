import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
import { CustomInput } from '@/components/common/CustomInput';
import { GradientButton } from '@/components/common/GradientButton';

export default function PromotionsOffersScreen() {
  const router = useRouter();
  const [promos, setPromos] = useState([
    {
      code: 'HOME15',
      discount: '15% OFF',
      minOrder: 'Min Order ₹400',
      status: 'Active',
      redeemed: 34,
    },
    {
      code: 'VIZAGPICKLE',
      discount: '₹50 Flat OFF',
      minOrder: 'Min Order ₹500',
      status: 'Active',
      redeemed: 18,
    },
  ]);

  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [minOrder, setMinOrder] = useState('300');

  const handleCreateCoupon = () => {
    if (!code.trim() || !discountPercent.trim()) {
      Alert.alert('Required', 'Please enter Coupon Code and Discount percentage.');
      return;
    }
    setPromos([
      ...promos,
      {
        code: code.toUpperCase().trim(),
        discount: `${discountPercent}% OFF`,
        minOrder: `Min Order ₹${minOrder}`,
        status: 'Active',
        redeemed: 0,
      },
    ]);
    setCode('');
    setDiscountPercent('');
    Alert.alert('Coupon Created!', 'Your promotional discount is now live for buyers.');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <Header title="Promotions & Offers" showBack />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Active Store Coupons</Text>
        <Text style={styles.subheading}>
          Offers and discounts funded by your store to attract repeat orders.
        </Text>

        <View style={styles.promosList}>
          {promos.map((item, index) => (
            <View key={index} style={styles.promoCard}>
              <View style={styles.promoLeft}>
                <View style={styles.codeTag}>
                  <Text style={styles.codeText}>{item.code}</Text>
                </View>
                <Text style={styles.discountText}>{item.discount}</Text>
                <Text style={styles.minOrderText}>{item.minOrder}</Text>
              </View>

              <View style={styles.promoRight}>
                <View style={styles.activePill}>
                  <Text style={styles.activePillText}>{item.status}</Text>
                </View>
                <Text style={styles.redeemedText}>{item.redeemed} orders used</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Create New Promo Form */}
        <View style={styles.createCard}>
          <Text style={styles.createTitle}>Create New Discount Offer</Text>

          <CustomInput
            label="Coupon Code"
            required
            leftIcon="pricetag-outline"
            value={code}
            onChangeText={setCode}
            placeholder="e.g. SANKRANTI20"
            autoCapitalize="characters"
          />

          <View style={styles.rowInputs}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <CustomInput
                label="Discount (%)"
                required
                value={discountPercent}
                onChangeText={setDiscountPercent}
                keyboardType="numeric"
                placeholder="10"
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <CustomInput
                label="Min Order (₹)"
                value={minOrder}
                onChangeText={setMinOrder}
                keyboardType="numeric"
                placeholder="300"
              />
            </View>
          </View>

          <GradientButton
            title="+ Create Discount Coupon"
            onPress={handleCreateCoupon}
            size="medium"
          />
        </View>
      </ScrollView>
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
    paddingBottom: 40,
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
    marginBottom: 16,
    lineHeight: 18,
  },
  promosList: {
    gap: 12,
    marginBottom: 20,
  },
  promoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#ECECF5',
  },
  promoLeft: {
    gap: 4,
  },
  codeTag: {
    alignSelf: 'flex-start',
    backgroundColor: HomeBazColors.primarySoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DDD6FE',
    borderStyle: 'dashed',
  },
  codeText: {
    fontSize: 13,
    fontWeight: '800',
    color: HomeBazColors.primaryDark,
    letterSpacing: 1,
  },
  discountText: {
    fontSize: 16,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
  },
  minOrderText: {
    fontSize: 11,
    color: HomeBazColors.textSecondary,
  },
  promoRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  activePill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  activePillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  redeemedText: {
    fontSize: 11,
    color: HomeBazColors.textSecondary,
  },
  createCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#ECECF5',
  },
  createTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    marginBottom: 14,
  },
  rowInputs: {
    flexDirection: 'row',
  },
});
