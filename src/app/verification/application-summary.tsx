import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Platform} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';
import { GradientButton } from '@/components/common/GradientButton';
import { SELLER_PROFILE } from '@/data/mockData';

export default function ApplicationSummaryScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      router.replace('/verification/application-submitted');
    }, 900);
  };

  const sections = [
    {
      title: 'Store & Personal Details',
      route: '/registration/personal-details',
      items: [
        { label: 'Store Name', value: SELLER_PROFILE.storeName },
        { label: 'Seller Name', value: SELLER_PROFILE.bankDetails.accountHolder },
        { label: 'Phone', value: SELLER_PROFILE.phone },
        { label: 'Email', value: SELLER_PROFILE.email },
      ],
    },
    {
      title: 'Kitchen & Pickup Address',
      route: '/registration/address-details',
      items: [
        { label: 'Pickup Point', value: SELLER_PROFILE.address },
        { label: 'Hub City', value: 'Visakhapatnam, Andhra Pradesh' },
      ],
    },
    {
      title: 'Banking & Payout',
      route: '/verification/bank-details',
      items: [
        { label: 'Account Holder', value: SELLER_PROFILE.bankDetails.accountHolder },
        { label: 'Bank', value: SELLER_PROFILE.bankDetails.bankName },
        { label: 'Account No', value: SELLER_PROFILE.bankDetails.accountNumber },
        { label: 'IFSC', value: SELLER_PROFILE.bankDetails.ifsc },
      ],
    },
    {
      title: 'Food Safety & Compliance',
      route: '/verification/fssai-registration',
      items: [
        { label: 'FSSAI License No', value: SELLER_PROFILE.fssaiNumber },
        { label: 'Status', value: 'Active (Expires 14/11/2028)' },
        { label: 'GST Status', value: 'Exempt (< ₹20L turnover)' },
      ],
    },
    {
      title: 'Audit Samples & Capacity',
      route: '/verification/product-sample-upload',
      items: [
        { label: 'Sample Products', value: 'Gongura, Avakaya, Lemon Pickles' },
        { label: 'Daily Capacity', value: '25 Jars (12 Kg)' },
        { label: 'Lead Time', value: '24 Hours' },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Application Summary" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Review Your Details</Text>
        <Text style={styles.subheading}>
          Verify that all information is accurate before submitting for HomeBaz Quality Review.
        </Text>

        {sections.map((sec, index) => (
          <View key={index} style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>{sec.title}</Text>
              <TouchableOpacity
                onPress={() => router.push(sec.route as any)}
                activeOpacity={0.7}
              >
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.itemsCol}>
              {sec.items.map((item, idx) => (
                <View key={idx} style={styles.itemRow}>
                  <Text style={styles.itemLabel}>{item.label}</Text>
                  <Text style={styles.itemValue}>{item.value}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.agreeCard}>
          <Ionicons name="checkmark-circle" size={20} color="#10B981" />
          <Text style={styles.agreeText}>
            By submitting, you agree to the HomeBaz Seller Code of Conduct, 10% standard platform commission, and hygienic quality standards.
          </Text>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Submit Application for Review  →"
          onPress={handleSubmit}
          loading={submitting}
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
    padding: 20,
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
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECF5',
    marginBottom: 14,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F1F8',
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
  },
  editText: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.primary,
  },
  itemsCol: {
    gap: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemLabel: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    flex: 1,
  },
  itemValue: {
    fontSize: 12,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
    flex: 1.4,
    textAlign: 'right',
  },
  agreeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginTop: 4,
  },
  agreeText: {
    fontSize: 11,
    color: '#065F46',
    lineHeight: 16,
    flex: 1,
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
