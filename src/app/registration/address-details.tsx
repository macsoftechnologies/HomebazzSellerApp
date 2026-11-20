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
  Modal,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';
import { CustomInput } from '@/components/common/CustomInput';
import { GradientButton } from '@/components/common/GradientButton';
import { SELLER_PROFILE } from '@/data/mockData';

export default function AddressDetailsScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const [doorNo, setDoorNo] = useState('12-4-45');
  const [street, setStreet] = useState('Beach Road, Siripuram');
  const [landmark, setLandmark] = useState('Near Siripuram Circle');
  const [city, setCity] = useState('Visakhapatnam');
  const [state, setState] = useState('Andhra Pradesh');
  const [pincode, setPincode] = useState('530016');
  const [pickupNote, setPickupNote] = useState(
    'Ground floor kitchen entrance. Available for pickup between 10 AM to 7 PM.'
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFinishRegistration = () => {
    if (!doorNo.trim() || !street.trim() || !pincode.trim()) {
      setErrorMessage('Please complete Door / House No., Street, and 6-digit Pincode.');
      return;
    }
    setErrorMessage('');
    setShowSuccessModal(true);
  };

  const handleProceedToVerification = () => {
    setShowSuccessModal(false);
    router.push('/verification/identity-verification');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <Header title="Address Details" showBack />

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: '100%' }]} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Kitchen & Pickup Address</Text>
        <Text style={styles.subheading}>
          Where our delivery partners will arrive to collect packed customer orders.
        </Text>

        <View style={styles.formCard}>
          <CustomInput
            label="Door / Flat / House No."
            required
            leftIcon="home-outline"
            value={doorNo}
            onChangeText={setDoorNo}
            placeholder="e.g. Flat 302, 12-4-45"
          />

          <CustomInput
            label="Street & Area Name"
            required
            leftIcon="location-outline"
            value={street}
            onChangeText={setStreet}
            placeholder="e.g. Beach Road / MVP Colony"
          />

          <CustomInput
            label="Landmark"
            leftIcon="navigate-outline"
            value={landmark}
            onChangeText={setLandmark}
            placeholder="e.g. Near Children’s Park"
          />

          <View style={styles.rowInputs}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <CustomInput
                label="City / District"
                required
                value={city}
                onChangeText={setCity}
                placeholder="Visakhapatnam"
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <CustomInput
                label="Pincode"
                required
                value={pincode}
                onChangeText={setPincode}
                keyboardType="numeric"
                maxLength={6}
                placeholder="530016"
              />
            </View>
          </View>

          <CustomInput
            label="State"
            required
            value={state}
            onChangeText={setState}
            placeholder="Andhra Pradesh"
            editable={false}
          />

          <CustomInput
            label="Doorstep Pickup Instructions"
            value={pickupNote}
            onChangeText={setPickupNote}
            multiline
            numberOfLines={3}
            placeholder="Instructions for HomeBaz pickup rider..."
          />
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        {errorMessage ? (
          <View style={styles.errorBanner}>
            <Ionicons name="alert-circle" size={16} color="#DC2626" />
            <Text style={styles.errorBannerText}>{errorMessage}</Text>
          </View>
        ) : null}

        <GradientButton
          title="Save Address & Start Verification  →"
          onPress={handleFinishRegistration}
          size="large"
        />
      </View>

      {/* Professional Registration Completed Milestone Modal */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={styles.modalBackdropPressable}
            onPress={() => setShowSuccessModal(false)}
          />

          <View style={styles.modalContainer}>
            {/* Top Brand Accent Gradient Stripe */}
            <LinearGradient
              colors={['#8A65F2', '#6C5CE7', '#47229E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.modalTopAccentStripe}
            />

            {/* Close Button at Top Right */}
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setShowSuccessModal(false)}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close" size={18} color="#8A85A3" />
            </TouchableOpacity>

            <View style={styles.modalContent}>
              {/* Shield & Sparkles Celebration Badge (Squircle - NO BALLS) */}
              <View style={styles.badgeWrapper}>
                <LinearGradient
                  colors={['#F5F2FD', '#EAE3FB']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.badgeBackground}
                >
                  <Ionicons name="shield-checkmark" size={38} color="#6C5CE7" />

                  {/* Floating Gold Sparkle Accent */}
                  <View style={styles.badgeSparkleTop}>
                    <Ionicons name="sparkles" size={15} color="#F59E0B" />
                  </View>

                  {/* Floating Cyan Diamond Accent */}
                  <View style={styles.badgeSparkleBottom}>
                    <Ionicons name="sparkles" size={12} color="#06B6D4" />
                  </View>
                </LinearGradient>
              </View>

              {/* Status Milestone Pill */}
              <View style={styles.milestonePill}>
                <Ionicons name="checkmark-circle" size={13} color="#059669" />
                <Text style={styles.milestonePillText}>STAGE 1 COMPLETE • STORE INITIATED</Text>
              </View>

              {/* Title & Description */}
              <Text style={styles.modalTitle}>Registration Completed!</Text>
              <Text style={styles.modalSubtitle}>
                Your seller account for <Text style={styles.storeNameHighlight}>{SELLER_PROFILE.storeName}</Text> has been created. Complete your verification to start receiving customer orders and bank payouts.
              </Text>

              {/* 3-Step Verification Roadmap Preview Card */}
              <View style={styles.roadmapCard}>
                <View style={styles.roadmapHeader}>
                  <Ionicons name="flash" size={13} color="#6C5CE7" />
                  <Text style={styles.roadmapHeaderText}>7-STAGE VERIFICATION ROADMAP</Text>
                </View>

                {/* Step 1 */}
                <View style={styles.roadmapStepRow}>
                  <View style={styles.stepNumBadge}>
                    <Text style={styles.stepNumText}>1</Text>
                  </View>
                  <View style={styles.stepInfoCol}>
                    <Text style={styles.stepTitle}>Identity KYC</Text>
                    <Text style={styles.stepDesc}>Aadhaar & PAN instant photo check</Text>
                  </View>
                  <View style={styles.stepStatusTag}>
                    <Text style={styles.stepStatusTagText}>NEXT UP</Text>
                  </View>
                </View>

                {/* Step 2 */}
                <View style={styles.roadmapStepRow}>
                  <View style={[styles.stepNumBadge, styles.stepNumBadgeInactive]}>
                    <Text style={styles.stepNumTextInactive}>2</Text>
                  </View>
                  <View style={styles.stepInfoCol}>
                    <Text style={styles.stepTitle}>FSSAI Food License</Text>
                    <Text style={styles.stepDesc}>14-digit food safety certificate</Text>
                  </View>
                </View>

                {/* Step 3 */}
                <View style={[styles.roadmapStepRow, { marginBottom: 0 }]}>
                  <View style={[styles.stepNumBadge, styles.stepNumBadgeInactive]}>
                    <Text style={styles.stepNumTextInactive}>3</Text>
                  </View>
                  <View style={styles.stepInfoCol}>
                    <Text style={styles.stepTitle}>Bank Settlement Account</Text>
                    <Text style={styles.stepDesc}>Direct daily earnings deposits</Text>
                  </View>
                </View>
              </View>

              {/* Security & Compliance Guarantee */}
              <View style={styles.securityRow}>
                <Ionicons name="lock-closed-outline" size={12} color="#8A85A3" />
                <Text style={styles.securityText}>FSSAI Compliant • 256-Bit SSL Encrypted Partner Gateway</Text>
              </View>

              {/* Primary Call to Action Button */}
              <GradientButton
                title="Proceed to Verification  →"
                onPress={handleProceedToVerification}
                size="large"
                style={styles.modalCtaBtn}
              />

              {/* Secondary Review Action */}
              <TouchableOpacity
                style={styles.secondaryReviewBtn}
                onPress={() => setShowSuccessModal(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.secondaryReviewBtnText}>Review Address Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  rowInputs: {
    flexDirection: 'row',
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
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  errorBannerText: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: '600',
    flex: 1,
  },
  /* Registration Completed Modal Popup Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(18, 12, 38, 0.68)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBackdropPressable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#280F65',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 16,
  },
  modalTopAccentStripe: {
    height: 6,
    width: '100%',
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#F4F2F9',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalContent: {
    padding: 22,
    paddingTop: 18,
    alignItems: 'center',
  },
  badgeWrapper: {
    marginBottom: 14,
    position: 'relative',
  },
  badgeBackground: {
    width: 72,
    height: 72,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#DFD5F8',
  },
  badgeSparkleTop: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
  badgeSparkleBottom: {
    position: 'absolute',
    bottom: -2,
    left: -2,
  },
  milestonePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 8,
  },
  milestonePillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
    letterSpacing: 0.4,
  },
  modalTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#1E1B39',
    letterSpacing: -0.4,
    textAlign: 'center',
    marginBottom: 6,
  },
  modalSubtitle: {
    fontSize: 12.5,
    color: '#68647A',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  storeNameHighlight: {
    color: '#6C5CE7',
    fontWeight: '800',
  },
  roadmapCard: {
    width: '100%',
    backgroundColor: '#FAF9FE',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EDE8F8',
    padding: 12,
    marginBottom: 12,
  },
  roadmapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F0ECF8',
  },
  roadmapHeaderText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6C5CE7',
    letterSpacing: 0.5,
  },
  roadmapStepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
  },
  stepNumBadge: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: '#6C5CE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 9,
  },
  stepNumText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  stepNumBadgeInactive: {
    backgroundColor: '#ECE7F6',
  },
  stepNumTextInactive: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8A85A3',
  },
  stepInfoCol: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#1E1B39',
  },
  stepDesc: {
    fontSize: 10,
    color: '#8A85A3',
  },
  stepStatusTag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  stepStatusTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#4F46E5',
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
  },
  securityText: {
    fontSize: 10,
    color: '#8A85A3',
    fontWeight: '500',
  },
  modalCtaBtn: {
    width: '100%',
    marginBottom: 10,
  },
  secondaryReviewBtn: {
    paddingVertical: 6,
  },
  secondaryReviewBtnText: {
    fontSize: 12,
    color: '#8A85A3',
    fontWeight: '600',
  },
});
