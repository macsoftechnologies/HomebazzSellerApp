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

      {/* Modern Multi-Step Progress Tracker */}
      <View style={styles.stepTrackContainer}>
        <View style={styles.stepHeaderRow}>
          <Text style={styles.stepIndicatorText}>Step 4 of 4 • Kitchen & Pickup Address</Text>
          <Text style={styles.stepPercentText}>100% Completed</Text>
        </View>
        <View style={styles.progressBarTrack}>
          <LinearGradient
            colors={['#8B5CF6', '#10B981']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: '100%' }]}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Highlighted Hero Heading Card for "Kitchen & Pickup Address" */}
        <View style={styles.heroHeadingCard}>
          <LinearGradient
            colors={['#ECFDF5', '#D1FAE5', '#FFFFFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroHeadingGradient}
          >
            <View style={styles.heroAccentBar} />

            <View style={styles.heroContentRow}>
              <View style={styles.heroTextCol}>
                <View style={styles.categoryPill}>
                  <Ionicons name="location" size={11} color="#059669" />
                  <Text style={styles.categoryPillText}>PICKUP FULFILLMENT • LOGISTICS HUB</Text>
                </View>

                {/* Highlighted Heading Color */}
                <Text style={styles.highlightedHeading}>Kitchen & Pickup Address</Text>
                <Text style={styles.heroSubheading}>
                  Where HomeBaz delivery partners will arrive to collect freshly packed customer orders.
                </Text>
              </View>

              <View style={styles.heroIconSquircle}>
                <Ionicons name="location" size={24} color="#059669" />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Address Form Card */}
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
            placeholder="e.g. Near Siripuram Circle / Park"
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

          {/* Service Area Verified Tag */}
          <View style={styles.pincodeStatusBadge}>
            <Ionicons name="checkmark-circle" size={14} color="#059669" />
            <Text style={styles.pincodeStatusText}>
              HomeBaz Express Rider Fleet active in pincode {pincode}
            </Text>
          </View>

          <CustomInput
            label="State (Registered Jurisdiction)"
            required
            value={state}
            onChangeText={setState}
            placeholder="Andhra Pradesh"
            editable={false}
          />

          <CustomInput
            label="Doorstep Pickup Instructions (For Delivery Riders)"
            value={pickupNote}
            onChangeText={setPickupNote}
            multiline
            numberOfLines={3}
            placeholder="e.g. Ground floor kitchen entrance, call before arriving..."
          />

          {/* Rider Handover Instruction Note */}
          <View style={styles.pickupGuidance}>
            <Ionicons name="bicycle-outline" size={16} color="#4F46E5" />
            <Text style={styles.pickupGuidanceText}>
              Riders are instructed to verify packaging seal and OTP confirmation before leaving your premises.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Bar */}
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
    color: '#059669',
    letterSpacing: 0.3,
  },
  stepPercentText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#059669',
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
    borderColor: '#A7F3D0',
    shadowColor: '#059669',
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
    backgroundColor: '#059669',
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
    backgroundColor: '#D1FAE5',
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  categoryPillText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#065F46',
    letterSpacing: 0.5,
  },
  highlightedHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: '#064E3B',
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
    backgroundColor: '#D1FAE5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
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
  rowInputs: {
    flexDirection: 'row',
  },
  pincodeStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    marginBottom: 14,
  },
  pincodeStatusText: {
    fontSize: 11.5,
    color: '#166534',
    fontWeight: '600',
    flex: 1,
  },
  pickupGuidance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#EEF2FF',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E7FF',
    marginTop: 8,
  },
  pickupGuidanceText: {
    fontSize: 11.5,
    color: '#3730A3',
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
    ...StyleSheet.absoluteFill,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 390,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 28,
    elevation: 24,
    borderWidth: 1,
    borderColor: 'rgba(235, 230, 252, 0.8)',
  },
  modalTopAccentStripe: {
    height: 5,
    width: '100%',
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F4F2FA',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalContent: {
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 22,
    alignItems: 'center',
  },
  badgeWrapper: {
    marginBottom: 14,
  },
  badgeBackground: {
    width: 76,
    height: 76,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#DFD8F7',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 6,
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
    gap: 6,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 12,
  },
  milestonePillText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#065F46',
    letterSpacing: 0.5,
  },
  modalTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#1F1B33',
    textAlign: 'center',
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#65607A',
    textAlign: 'center',
    lineHeight: 18.5,
    marginBottom: 18,
    paddingHorizontal: 4,
  },
  storeNameHighlight: {
    fontWeight: '700',
    color: '#6C5CE7',
  },
  roadmapCard: {
    width: '100%',
    backgroundColor: '#FAF9FE',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ECE7F8',
    marginBottom: 14,
  },
  roadmapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F0ECF8',
  },
  roadmapHeaderText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6C5CE7',
    letterSpacing: 0.6,
  },
  roadmapStepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepNumBadge: {
    width: 22,
    height: 22,
    borderRadius: 7,
    backgroundColor: '#6C5CE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumBadgeInactive: {
    backgroundColor: '#E5E0F2',
  },
  stepNumText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
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
    fontSize: 12.5,
    fontWeight: '700',
    color: '#1F1B33',
  },
  stepDesc: {
    fontSize: 11,
    color: '#8A85A3',
  },
  stepStatusTag: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  stepStatusTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#6C5CE7',
    letterSpacing: 0.4,
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 16,
  },
  securityText: {
    fontSize: 10.5,
    color: '#8A85A3',
    fontWeight: '500',
  },
  modalCtaBtn: {
    width: '100%',
    marginBottom: 10,
  },
  secondaryReviewBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  secondaryReviewBtnText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#65607A',
  },
});
