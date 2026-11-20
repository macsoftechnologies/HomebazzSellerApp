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
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';
import { CustomInput } from '@/components/common/CustomInput';
import { GradientButton } from '@/components/common/GradientButton';

export default function PersonalDetailsScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const [fullName, setFullName] = useState('Amrutha Rao');
  const [phone, setPhone] = useState('9876543210');
  const [email, setEmail] = useState('amrutha.foods@homebazz.in');
  const [altPhone, setAltPhone] = useState('9848011223');
  const [dob, setDob] = useState('14/08/1988');
  const [gender, setGender] = useState<'Female' | 'Male' | 'Other'>('Female');

  const handleNext = () => {
    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      Alert.alert('Required Fields', 'Please complete your full name, phone, and email.');
      return;
    }
    router.push('/registration/business-details');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <Header title="Personal Details" showBack />

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: '40%' }]} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Tell us about yourself</Text>
        <Text style={styles.subheading}>
          Your primary identity details for seller registration & KYC.
        </Text>

        <View style={styles.formCard}>
          <CustomInput
            label="Full Name (as per Aadhaar/PAN)"
            required
            leftIcon="person-outline"
            value={fullName}
            onChangeText={setFullName}
            placeholder="e.g. Lakshmi Devi / Rajesh Rao"
          />

          <CustomInput
            label="Primary Mobile Number"
            required
            leftIcon="call-outline"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={10}
            placeholder="10-digit mobile number"
          />

          <CustomInput
            label="Email Address"
            required
            leftIcon="mail-outline"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="yourname@gmail.com"
          />

          <CustomInput
            label="Alternate Contact (Optional)"
            leftIcon="call-outline"
            value={altPhone}
            onChangeText={setAltPhone}
            keyboardType="phone-pad"
            maxLength={10}
            placeholder="Family member contact"
          />

          <CustomInput
            label="Date of Birth"
            leftIcon="calendar-outline"
            value={dob}
            onChangeText={setDob}
            placeholder="DD/MM/YYYY"
          />

          {/* Gender Selector */}
          <View style={styles.genderContainer}>
            <Text style={styles.genderLabel}>Gender</Text>
            <View style={styles.genderRow}>
              {(['Female', 'Male', 'Other'] as const).map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[
                    styles.genderPill,
                    gender === g && styles.genderPillSelected,
                  ]}
                  onPress={() => setGender(g)}
                  activeOpacity={0.75}
                >
                  <Text
                    style={[
                      styles.genderText,
                      gender === g && styles.genderTextSelected,
                    ]}
                  >
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Continue to Business Details  →"
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
  progressBar: {
    height: 4,
    backgroundColor: '#EFEFF5',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: HomeBazColors.primary,
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
    marginBottom: 20,
    lineHeight: 18,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECF5',
  },
  genderContainer: {
    marginTop: 4,
  },
  genderLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: HomeBazColors.textPrimary,
    marginBottom: 8,
  },
  genderRow: {
    flexDirection: 'row',
    gap: 10,
  },
  genderPill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E8E5F2',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  genderPillSelected: {
    borderColor: HomeBazColors.primary,
    backgroundColor: HomeBazColors.primarySoft,
  },
  genderText: {
    fontSize: 13,
    fontWeight: '600',
    color: HomeBazColors.textSecondary,
  },
  genderTextSelected: {
    color: HomeBazColors.primary,
    fontWeight: '700',
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
