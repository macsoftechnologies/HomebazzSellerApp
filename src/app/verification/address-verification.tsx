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

export default function AddressVerificationScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const [proofType, setProofType] = useState('Electricity Bill');
  const [uploaded, setUploaded] = useState(true);

  const proofOptions = [
    'Electricity Bill (APEPDCL)',
    'Water Tax Receipt',
    'Registered Rental Agreement',
    'Bank Passbook / Statement',
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Address Verification" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Kitchen Location Proof</Text>
        <Text style={styles.subheading}>
          Verify the physical address where food/craft is prepared in Visakhapatnam.
        </Text>

        <View style={styles.addressCard}>
          <Text style={styles.addressLabel}>Registered Pickup Address:</Text>
          <Text style={styles.addressText}>
            12-4-45, Beach Road, Siripuram, Visakhapatnam, Andhra Pradesh - 530016
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Select Address Proof Document</Text>
          {proofOptions.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[
                styles.optionRow,
                proofType === opt && styles.optionRowSelected,
              ]}
              onPress={() => setProofType(opt)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={proofType === opt ? 'radio-button-on' : 'radio-button-off'}
                size={18}
                color={proofType === opt ? HomeBazColors.primary : '#9B97B0'}
              />
              <Text
                style={[
                  styles.optionText,
                  proofType === opt && styles.optionTextSelected,
                ]}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          ))}

          <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Upload Document</Text>
          <TouchableOpacity
            style={[styles.uploadBox, uploaded && styles.uploadBoxSuccess]}
            onPress={() => setUploaded(!uploaded)}
            activeOpacity={0.75}
          >
            <Ionicons
              name={uploaded ? 'checkmark-circle' : 'cloud-upload-outline'}
              size={28}
              color={uploaded ? '#10B981' : HomeBazColors.primary}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.uploadTitle}>
                {proofType} {uploaded ? '(Uploaded: apepdcl_bill_oct.pdf)' : ''}
              </Text>
              <Text style={styles.uploadSubtitle}>PDF, PNG or JPG up to 10MB</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Save & Proceed to Bank Details  →"
          onPress={() => router.push('/verification/bank-details')}
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
    marginBottom: 16,
    lineHeight: 18,
  },
  addressCard: {
    backgroundColor: HomeBazColors.primarySoft,
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2DCF7',
  },
  addressLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: HomeBazColors.primaryDark,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  addressText: {
    fontSize: 13,
    fontWeight: '600',
    color: HomeBazColors.textPrimary,
    lineHeight: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECF5',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EBE8F3',
    marginBottom: 8,
  },
  optionRowSelected: {
    borderColor: HomeBazColors.primary,
    backgroundColor: '#FAF9FE',
  },
  optionText: {
    fontSize: 13,
    fontWeight: '600',
    color: HomeBazColors.textSecondary,
  },
  optionTextSelected: {
    color: HomeBazColors.textPrimary,
    fontWeight: '700',
  },
  uploadBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#FAF9FE',
  },
  uploadBoxSuccess: {
    borderColor: '#A7F3D0',
    backgroundColor: '#ECFDF5',
    borderStyle: 'solid',
  },
  uploadTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  uploadSubtitle: {
    fontSize: 11,
    color: HomeBazColors.textSecondary,
    marginTop: 2,
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
