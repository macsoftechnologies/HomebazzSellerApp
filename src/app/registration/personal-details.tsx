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
import { LinearGradient } from 'expo-linear-gradient';
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

      {/* Modern Multi-Step Progress Tracker */}
      <View style={styles.stepTrackContainer}>
        <View style={styles.stepHeaderRow}>
          <Text style={styles.stepIndicatorText}>Step 1 of 4 • Personal Profile</Text>
          <Text style={styles.stepPercentText}>25% Completed</Text>
        </View>
        <View style={styles.progressBarTrack}>
          <LinearGradient
            colors={['#8B5CF6', '#6C5CE7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: '25%' }]}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Highlighted Hero Heading Card for "Tell us about yourself" */}
        <View style={styles.heroHeadingCard}>
          <LinearGradient
            colors={['#F5F2FD', '#EDE9FE', '#FFFFFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroHeadingGradient}
          >
            <View style={styles.heroAccentBar} />

            <View style={styles.heroContentRow}>
              <View style={styles.heroTextCol}>
                <View style={styles.categoryPill}>
                  <Ionicons name="shield-checkmark" size={11} color="#6C5CE7" />
                  <Text style={styles.categoryPillText}>PRIMARY IDENTITY • KYC COMPLIANT</Text>
                </View>

                {/* Highlighted Heading Color */}
                <Text style={styles.highlightedHeading}>Tell us about yourself</Text>
                <Text style={styles.heroSubheading}>
                  Your primary personal details for seller registration, identity verification & payouts.
                </Text>
              </View>

              <View style={styles.heroIconSquircle}>
                <Ionicons name="person" size={24} color="#6C5CE7" />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Elevated Form Card */}
        <View style={styles.formCard}>
          <CustomInput
            label="Full Name (as per Aadhaar/PAN)"
            required
            leftIcon="person-outline"
            value={fullName}
            onChangeText={setFullName}
            placeholder="e.g. Amrutha Rao / Lakshmi Devi"
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

          {/* Gender Selector with Modern Squircle Pills */}
          <View style={styles.genderContainer}>
            <Text style={styles.genderLabel}>Gender</Text>
            <View style={styles.genderRow}>
              {(
                [
                  { label: 'Female', icon: 'woman-outline' as const },
                  { label: 'Male', icon: 'man-outline' as const },
                  { label: 'Other', icon: 'person-outline' as const },
                ] as const
              ).map((g) => {
                const isSelected = gender === g.label;
                return (
                  <TouchableOpacity
                    key={g.label}
                    style={[
                      styles.genderPill,
                      isSelected && styles.genderPillSelected,
                    ]}
                    onPress={() => setGender(g.label)}
                    activeOpacity={0.75}
                  >
                    <Ionicons
                      name={g.icon}
                      size={16}
                      color={isSelected ? '#6C5CE7' : '#6B7280'}
                    />
                    <Text
                      style={[
                        styles.genderText,
                        isSelected && styles.genderTextSelected,
                      ]}
                    >
                      {g.label}
                    </Text>
                    {isSelected && (
                      <Ionicons name="checkmark-circle" size={14} color="#6C5CE7" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Security & Privacy Assurance */}
          <View style={styles.privacyNote}>
            <Ionicons name="lock-closed" size={13} color="#059669" />
            <Text style={styles.privacyNoteText}>
              Your information is encrypted with 256-bit SSL and used solely for seller KYC.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Bar */}
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
  stepTrackContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDE9FE',
  },
  stepHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepIndicatorText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C5CE7',
    letterSpacing: 0.3,
  },
  stepPercentText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#4B5563',
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  heroHeadingCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#E6E0F8',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  heroHeadingGradient: {
    position: 'relative',
    padding: 16,
  },
  heroAccentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
    backgroundColor: '#6C5CE7',
  },
  heroContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 6,
  },
  heroTextCol: {
    flex: 1,
    paddingRight: 10,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: '#EDE9FE',
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  categoryPillText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#6C5CE7',
    letterSpacing: 0.5,
  },
  highlightedHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2E1065',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  heroSubheading: {
    fontSize: 12.5,
    color: '#4B5563',
    lineHeight: 17,
  },
  heroIconSquircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#EDE9FE',
    borderWidth: 1,
    borderColor: '#DDD6FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#ECECF5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  genderContainer: {
    marginTop: 6,
    marginBottom: 14,
  },
  genderLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
    marginBottom: 8,
  },
  genderRow: {
    flexDirection: 'row',
    gap: 10,
  },
  genderPill: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 11,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFC',
  },
  genderPillSelected: {
    borderColor: '#6C5CE7',
    backgroundColor: '#F5F2FD',
  },
  genderText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },
  genderTextSelected: {
    color: '#6C5CE7',
    fontWeight: '700',
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    marginTop: 8,
  },
  privacyNoteText: {
    fontSize: 11.5,
    color: '#166534',
    lineHeight: 16,
    flex: 1,
    fontWeight: '500',
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
    paddingTop: 12,
  },
});
