import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
import { VerificationProgressBar } from '@/components/common/VerificationProgressBar';

export default function BankDetailsScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const [holderName, setHolderName] = useState('Amrutha Rao');
  const [accountNumber, setAccountNumber] = useState('50100489123019');
  const [confirmAccount, setConfirmAccount] = useState('50100489123019');
  const [ifsc, setIfsc] = useState('HDFC0001248');
  const [bankName, setBankName] = useState('HDFC Bank - Siripuram Branch, Visakhapatnam');
  const [chequeUploaded, setChequeUploaded] = useState(true);

  const handleNext = () => {
    if (!accountNumber.trim() || !ifsc.trim() || !holderName.trim()) {
      Alert.alert('Required', 'Please fill in all banking details.');
      return;
    }
    if (accountNumber !== confirmAccount) {
      Alert.alert('Mismatch', 'Account numbers do not match.');
      return;
    }
    router.push('/verification/fssai-registration');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <Header title="Bank Details" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Stage 3 Progress & Highlighted Hero Heading */}
        <VerificationProgressBar
          currentStage={3}
          stageName="Bank Account Details"
          stageTitle="Bank Account Settlement"
          stageSubtitle="Weekly earnings and sales settlements will be transferred directly to this account."
          categoryTag="STAGE 3 • DIRECT PAYOUTS"
          iconName="wallet-outline"
          accentColor="#2563EB"
          tintBg="#EFF6FF"
          tintBorder="#BFDBFE"
        />

        <View style={styles.card}>
          <CustomInput
            label="Account Holder Name"
            required
            leftIcon="person-outline"
            value={holderName}
            onChangeText={setHolderName}
            placeholder="As registered with your bank"
          />

          <CustomInput
            label="Bank Account Number"
            required
            leftIcon="business-outline"
            value={accountNumber}
            onChangeText={setAccountNumber}
            keyboardType="numeric"
            placeholder="e.g. 50100489123019"
          />

          <CustomInput
            label="Confirm Account Number"
            required
            leftIcon="business-outline"
            value={confirmAccount}
            onChangeText={setConfirmAccount}
            keyboardType="numeric"
            placeholder="Re-enter account number"
          />

          <CustomInput
            label="IFSC Code"
            required
            leftIcon="barcode-outline"
            value={ifsc}
            onChangeText={(txt) => {
              setIfsc(txt.toUpperCase());
              if (txt.length >= 11) {
                setBankName('HDFC Bank - Siripuram Branch, Visakhapatnam');
              }
            }}
            autoCapitalize="characters"
            maxLength={11}
            placeholder="HDFC0001248"
          />

          <CustomInput
            label="Bank & Branch Name"
            value={bankName}
            editable={false}
            placeholder="Auto-detected from IFSC"
          />

          <Text style={styles.uploadTitle}>Cancelled Cheque or Passbook Photo</Text>
          <TouchableOpacity
            style={[styles.uploadBox, chequeUploaded && styles.uploadBoxSuccess]}
            onPress={() => setChequeUploaded(!chequeUploaded)}
            activeOpacity={0.75}
          >
            <Ionicons
              name={chequeUploaded ? 'checkmark-circle' : 'cloud-upload-outline'}
              size={24}
              color={chequeUploaded ? '#10B981' : HomeBazColors.primary}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.uploadMainText}>
                {chequeUploaded ? 'cancelled_cheque.jpg (Uploaded)' : 'Upload Cheque / Passbook'}
              </Text>
              <Text style={styles.uploadSubText}>Clear picture showing account name & IFSC</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Save & Proceed to FSSAI Registration  →"
          onPress={handleNext}
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECF5',
  },
  uploadTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
    marginBottom: 8,
    marginTop: 6,
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
  uploadMainText: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  uploadSubText: {
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
