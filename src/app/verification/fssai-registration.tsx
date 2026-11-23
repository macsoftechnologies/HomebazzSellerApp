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

export default function FssaiRegistrationScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const [hasFssai, setHasFssai] = useState(true);
  const [fssaiNumber, setFssaiNumber] = useState('10123028000491');
  const [validUntil, setValidUntil] = useState('14/11/2028');
  const [certUploaded, setCertUploaded] = useState(true);
  const [safetyPledgeChecked, setSafetyPledgeChecked] = useState(true);

  const handleNext = () => {
    if (hasFssai && (!fssaiNumber.trim() || fssaiNumber.length !== 14)) {
      Alert.alert('FSSAI Validation', 'Please enter a valid 14-digit FSSAI Registration number.');
      return;
    }
    router.push('/verification/business-documents');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <Header title="FSSAI Registration" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Stage 4 Progress & Highlighted Hero Heading */}
        <VerificationProgressBar
          currentStage={4}
          stageName="FSSAI Registration"
          stageTitle="Food Safety Compliance (FSSAI)"
          stageSubtitle="Per Indian Food Safety Regulations, all homemade food producers require a 14-digit FSSAI registration."
          categoryTag="STAGE 4 • FOOD SAFETY LICENSE"
          iconName="shield-checkmark-outline"
          accentColor="#D97706"
          tintBg="#FFFBEB"
          tintBorder="#FDE68A"
        />

        <View style={styles.card}>
          {/* Toggle Do you have FSSAI? */}
          <View style={styles.fssaiChoiceRow}>
            <TouchableOpacity
              style={[styles.choiceBtn, hasFssai && styles.choiceBtnActive]}
              onPress={() => setHasFssai(true)}
              activeOpacity={0.75}
            >
              <Ionicons
                name="shield-checkmark"
                size={18}
                color={hasFssai ? '#FFFFFF' : HomeBazColors.primary}
              />
              <Text style={[styles.choiceText, hasFssai && styles.choiceTextActive]}>
                I Have FSSAI
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.choiceBtn, !hasFssai && styles.choiceBtnActive]}
              onPress={() => setHasFssai(false)}
              activeOpacity={0.75}
            >
              <Ionicons
                name="help-circle-outline"
                size={18}
                color={!hasFssai ? '#FFFFFF' : '#8E8AA0'}
              />
              <Text style={[styles.choiceText, !hasFssai && styles.choiceTextActive]}>
                Need Help Getting FSSAI
              </Text>
            </TouchableOpacity>
          </View>

          {hasFssai ? (
            <>
              <CustomInput
                label="14-Digit FSSAI Registration Number"
                required
                leftIcon="shield-checkmark-outline"
                value={fssaiNumber}
                onChangeText={setFssaiNumber}
                keyboardType="numeric"
                maxLength={14}
                placeholder="e.g. 10123028000491"
              />

              <CustomInput
                label="License Validity (Valid Until)"
                required
                leftIcon="calendar-outline"
                value={validUntil}
                onChangeText={setValidUntil}
                placeholder="DD/MM/YYYY"
              />

              <Text style={styles.uploadTitle}>FSSAI Certificate Document</Text>
              <TouchableOpacity
                style={[styles.uploadBox, certUploaded && styles.uploadBoxSuccess]}
                onPress={() => setCertUploaded(!certUploaded)}
                activeOpacity={0.75}
              >
                <Ionicons
                  name={certUploaded ? 'checkmark-circle' : 'cloud-upload-outline'}
                  size={24}
                  color={certUploaded ? '#10B981' : HomeBazColors.primary}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.uploadMainText}>
                    {certUploaded ? 'fssai_cert_10123028.pdf (Uploaded)' : 'Upload Certificate PDF / Image'}
                  </Text>
                  <Text style={styles.uploadSubText}>Official FSSAI registration certificate</Text>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.assistanceCard}>
              <View style={styles.assistanceHeader}>
                <Ionicons name="sparkles" size={20} color={HomeBazColors.primary} />
                <Text style={styles.assistanceTitle}>HomeBaz FSSAI Fast-Track</Text>
              </View>
              <Text style={styles.assistanceBody}>
                Don’t have FSSAI yet? No worries! Our seller compliance team assists home cooks in obtaining the basic ₹100 annual FSSAI registration within 3 working days.
              </Text>
              <TouchableOpacity
                style={styles.applyAssistanceBtn}
                onPress={() => Alert.alert('Assistance Requested', 'Our support team will contact you via WhatsApp to help file your FSSAI registration.')}
              >
                <Text style={styles.applyAssistanceText}>Request FSSAI Filing Support</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Safety Pledge Checkbox */}
          <TouchableOpacity
            style={styles.pledgeRow}
            onPress={() => setSafetyPledgeChecked(!safetyPledgeChecked)}
            activeOpacity={0.8}
          >
            <View style={[styles.pledgeBox, safetyPledgeChecked && styles.pledgeBoxChecked]}>
              {safetyPledgeChecked && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
            </View>
            <Text style={styles.pledgeText}>
              I declare that all food items are prepared in a clean and hygienic domestic kitchen with safe potable water and food-grade packaging.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Save & Proceed to Business Documents  →"
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
  fssaiChoiceRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  choiceBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E8E5F2',
    backgroundColor: '#FFFFFF',
  },
  choiceBtnActive: {
    backgroundColor: HomeBazColors.primary,
    borderColor: HomeBazColors.primary,
  },
  choiceText: {
    fontSize: 12,
    fontWeight: '700',
    color: HomeBazColors.textSecondary,
  },
  choiceTextActive: {
    color: '#FFFFFF',
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
    marginBottom: 16,
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
  assistanceCard: {
    backgroundColor: HomeBazColors.primarySoft,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  assistanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  assistanceTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: HomeBazColors.primaryDark,
  },
  assistanceBody: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    lineHeight: 17,
    marginBottom: 12,
  },
  applyAssistanceBtn: {
    backgroundColor: HomeBazColors.primary,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyAssistanceText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  pledgeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 4,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0EFF6',
  },
  pledgeBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#C7C3DF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  pledgeBoxChecked: {
    backgroundColor: HomeBazColors.primary,
    borderColor: HomeBazColors.primary,
  },
  pledgeText: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    lineHeight: 17,
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
