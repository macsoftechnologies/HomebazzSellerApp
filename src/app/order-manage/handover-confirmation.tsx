import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';
import { GradientButton } from '@/components/common/GradientButton';
import { MOCK_ORDERS } from '@/data/mockData';

export default function HandoverConfirmationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const { orderId } = useLocalSearchParams();
  const order = MOCK_ORDERS.find((o) => o.id === orderId) || MOCK_ORDERS[0];

  const defaultPartner = {
    name: 'Ramesh Varma',
    phone: '9848011223',
    vehicleNumber: 'AP 31 BY 4921',
    rating: 4.9,
  };
  const partner = order.deliveryPartner || defaultPartner;

  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isHandedOver, setIsHandedOver] = useState(false);
  const inputRef = useRef<any>(null);

  // Animations for OTP active state & completion celebration
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const successScale = useRef(new Animated.Value(0.75)).current;
  const successFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Subtle pulsating glow on OTP hint
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  const handleVerifyOtp = () => {
    if (otp.length !== 4) {
      Alert.alert(
        'Incomplete OTP',
        'Please enter the 4-digit security code shown in the rider app.'
      );
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsHandedOver(true);

      // Trigger celebratory entrance animation
      Animated.parallel([
        Animated.spring(successScale, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(successFade, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
      ]).start();
    }, 700);
  };

  const handleQuickFill = () => {
    setOtp('4921');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header
        title={isHandedOver ? 'Dispatch Receipt' : 'Rider Handover'}
        showBack
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 110 + bottomClearance },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {!isHandedOver ? (
          /* ================= OTP VERIFICATION STATE ================= */
          <View style={styles.contentWrapper}>
            {/* Top Identity Graphic */}
            <View style={styles.topIconBox}>
              <LinearGradient
                colors={['#EDE9FE', '#DDD6FE']}
                style={styles.iconCircleGradient}
              >
                <Ionicons name="shield-checkmark" size={42} color={HomeBazColors.primary} />
              </LinearGradient>
              <View style={styles.lockBadge}>
                <Ionicons name="keypad" size={14} color="#FFFFFF" />
              </View>
            </View>

            <Text style={styles.pageTitle}>Verify Handover OTP</Text>
            <Text style={styles.pageSubtitle}>
              Ask delivery partner <Text style={styles.boldText}>{partner.name}</Text> for the 4-digit security code displayed on their rider screen.
            </Text>

            {/* Rider Identity Card */}
            <View style={styles.riderCard}>
              <View style={styles.riderLeft}>
                <View style={styles.riderAvatarBox}>
                  <Ionicons name="bicycle" size={24} color="#6C5CE7" />
                </View>
                <View>
                  <View style={styles.riderNameRow}>
                    <Text style={styles.riderNameText}>{partner.name}</Text>
                    <View style={styles.riderRatingPill}>
                      <Ionicons name="star" size={10} color="#F59E0B" />
                      <Text style={styles.riderRatingText}>{partner.rating}</Text>
                    </View>
                  </View>
                  <Text style={styles.riderVehicleText}>
                    Bike: {partner.vehicleNumber} • HomeBaz Express
                  </Text>
                </View>
              </View>

              <View style={styles.arrivedBadge}>
                <View style={styles.greenLiveDot} />
                <Text style={styles.arrivedBadgeText}>At Doorstep</Text>
              </View>
            </View>

            {/* 4-Digit Luxury OTP Box Containers */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => inputRef.current?.focus()}
              style={styles.otpBoxesRow}
            >
              {[0, 1, 2, 3].map((idx) => {
                const char = otp[idx] || '';
                const isFocused = otp.length === idx;
                return (
                  <View
                    key={idx}
                    style={[
                      styles.otpBox,
                      char ? styles.otpBoxFilled : null,
                      isFocused ? styles.otpBoxActive : null,
                    ]}
                  >
                    {char ? (
                      <Text style={styles.otpChar}>{char}</Text>
                    ) : (
                      <View style={styles.otpEmptyPlaceholder} />
                    )}
                  </View>
                );
              })}
            </TouchableOpacity>

            {/* Hidden Input to capture keypad input */}
            <TextInput
              ref={inputRef}
              style={styles.hiddenInput}
              value={otp}
              onChangeText={(val) => setOtp(val.replace(/[^0-9]/g, ''))}
              keyboardType="number-pad"
              maxLength={4}
              autoFocus
            />

            {/* Quick Demo Fill Pill */}
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <TouchableOpacity
                style={styles.quickFillPill}
                onPress={handleQuickFill}
                activeOpacity={0.8}
              >
                <Ionicons name="flash" size={14} color="#7C3AED" />
                <Text style={styles.quickFillText}>
                  Rider Code: <Text style={styles.quickFillCode}>4921</Text> (Tap to auto-fill)
                </Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Security Notice Box */}
            <View style={styles.securityNoticeCard}>
              <Ionicons name="information-circle-outline" size={18} color="#6C5CE7" style={{ marginTop: 1 }} />
              <Text style={styles.securityNoticeText}>
                Do not hand over the parcel until the OTP matches. This guarantees safe custody transfer and immediately triggers your weekly seller payout.
              </Text>
            </View>
          </View>
        ) : (
          /* ================= COMPLETED HANDOVER STATE ================= */
          <Animated.View
            style={[
              styles.successWrapper,
              {
                opacity: successFade,
                transform: [{ scale: successScale }],
              },
            ]}
          >
            {/* Celebratory Icon */}
            <View style={styles.celebrationCircle}>
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.celebrationGradient}
              >
                <Ionicons name="checkmark-done" size={54} color="#FFFFFF" />
              </LinearGradient>
              <View style={styles.sparkleBadge}>
                <Ionicons name="sparkles" size={16} color="#FDE047" />
              </View>
            </View>

            <Text style={styles.successHeadline}>Handover Completed!</Text>
            <Text style={styles.successSubline}>
              Order <Text style={styles.boldDarkText}>{order.id}</Text> is now in transit with rider {partner.name} to {order.customerName}.
            </Text>

            {/* Live Transit Tracker Card */}
            <View style={styles.transitStatusCard}>
              <View style={styles.transitStatusHeader}>
                <View style={styles.statusLivePill}>
                  <View style={styles.liveBlinkingDot} />
                  <Text style={styles.statusLiveText}>LIVE IN TRANSIT</Text>
                </View>
                <Text style={styles.estimatedDeliveryText}>ETA: 20 mins</Text>
              </View>

              <View style={styles.transitStepsRow}>
                <View style={styles.stepItem}>
                  <View style={[styles.stepDot, styles.stepDotDone]}>
                    <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                  </View>
                  <Text style={styles.stepLabel}>Packed</Text>
                </View>
                <View style={[styles.stepLine, styles.stepLineDone]} />
                <View style={styles.stepItem}>
                  <View style={[styles.stepDot, styles.stepDotDone]}>
                    <Ionicons name="bicycle" size={12} color="#FFFFFF" />
                  </View>
                  <Text style={styles.stepLabel}>Picked Up</Text>
                </View>
                <View style={styles.stepLine} />
                <View style={styles.stepItem}>
                  <View style={styles.stepDot}>
                    <Ionicons name="home-outline" size={12} color="#9B97B0" />
                  </View>
                  <Text style={styles.stepLabel}>Delivered</Text>
                </View>
              </View>
            </View>

            {/* Official Dispatch Handover Receipt Card */}
            <View style={styles.officialReceipt}>
              <View style={styles.receiptTitleRow}>
                <View style={styles.receiptTitleLeft}>
                  <Ionicons name="receipt-outline" size={18} color="#6C5CE7" />
                  <Text style={styles.receiptTitle}>Dispatch Summary</Text>
                </View>
                <Text style={styles.receiptIdText}>{order.id}</Text>
              </View>

              <View style={styles.receiptDivider} />

              <View style={styles.receiptItemRow}>
                <Text style={styles.receiptField}>Dispatched At</Text>
                <Text style={styles.receiptValue}>Just Now, 02:44 PM</Text>
              </View>

              <View style={styles.receiptItemRow}>
                <Text style={styles.receiptField}>Delivery Partner</Text>
                <Text style={styles.receiptValue}>{partner.name} ({partner.vehicleNumber})</Text>
              </View>

              <View style={styles.receiptItemRow}>
                <Text style={styles.receiptField}>Customer</Text>
                <Text style={styles.receiptValue}>{order.customerName}</Text>
              </View>

              <View style={styles.receiptItemRow}>
                <Text style={styles.receiptField}>Destination</Text>
                <Text style={styles.receiptValue} numberOfLines={1}>{order.customerAddress.split(',')[1] || 'Visakhapatnam'}</Text>
              </View>

              <View style={styles.receiptDivider} />

              <View style={styles.payoutHighlightRow}>
                <View>
                  <Text style={styles.payoutLabel}>Seller Settlement</Text>
                  <Text style={styles.payoutSubLabel}>Weekly Direct Bank Transfer</Text>
                </View>
                <Text style={styles.payoutAmountText}>+₹{order.totalAmount}</Text>
              </View>
            </View>
          </Animated.View>
        )}
      </ScrollView>

      {/* Floating Bottom Sticky Action Bar */}
      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        {!isHandedOver ? (
          <GradientButton
            title="Verify OTP & Complete Handover  →"
            onPress={handleVerifyOtp}
            loading={isVerifying}
            size="large"
          />
        ) : (
          <View style={styles.completedButtonsCol}>
            <GradientButton
              title="Return to Orders Dashboard  →"
              onPress={() => router.replace('/(tabs)/orders')}
              size="large"
              style={{ marginBottom: 10 }}
            />
            <TouchableOpacity
              style={styles.viewEarningsBtn}
              onPress={() => router.replace('/(tabs)/earnings')}
              activeOpacity={0.8}
            >
              <Ionicons name="wallet-outline" size={16} color="#6C5CE7" style={{ marginRight: 6 }} />
              <Text style={styles.viewEarningsText}>Check Earnings & Payout</Text>
            </TouchableOpacity>
          </View>
        )}
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
    alignItems: 'center',
  },
  contentWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 10,
  },
  topIconBox: {
    position: 'relative',
    marginBottom: 20,
  },
  iconCircleGradient: {
    width: 86,
    height: 86,
    borderRadius: 43,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  lockBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6C5CE7',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1C1342',
    letterSpacing: -0.4,
    marginBottom: 8,
    textAlign: 'center',
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#6B6780',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 22,
    paddingHorizontal: 16,
  },
  boldText: {
    fontWeight: '800',
    color: '#1C1342',
  },
  riderCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#ECE7F8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 26,
    shadowColor: '#1E1B39',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  riderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  riderAvatarBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3EFFF',
    borderWidth: 1,
    borderColor: '#DDD6FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  riderNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  riderNameText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1C1342',
  },
  riderRatingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 3,
  },
  riderRatingText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#92400E',
  },
  riderVehicleText: {
    fontSize: 11,
    color: '#6B6780',
    fontWeight: '600',
  },
  arrivedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  greenLiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  arrivedBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#065F46',
  },
  otpBoxesRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  otpBox: {
    width: 64,
    height: 68,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#E4DFFA',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  otpBoxActive: {
    borderColor: '#6C5CE7',
    backgroundColor: '#FAF8FF',
    shadowColor: '#6C5CE7',
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 5,
  },
  otpBoxFilled: {
    borderColor: '#6C5CE7',
    backgroundColor: '#FFFFFF',
  },
  otpChar: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1C1342',
  },
  otpEmptyPlaceholder: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#DCD6F7',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  quickFillPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F3EFFF',
    borderWidth: 1,
    borderColor: '#DDD6FE',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 26,
  },
  quickFillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C5CE7',
  },
  quickFillCode: {
    fontWeight: '900',
    color: '#4C28AA',
  },
  securityNoticeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FAF9FF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.2,
    borderColor: '#ECE7F8',
    gap: 10,
  },
  securityNoticeText: {
    flex: 1,
    fontSize: 11,
    color: '#555169',
    lineHeight: 16,
  },
  successWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 8,
  },
  celebrationCircle: {
    position: 'relative',
    marginBottom: 16,
  },
  celebrationGradient: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  sparkleBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#065F46',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successHeadline: {
    fontSize: 24,
    fontWeight: '900',
    color: '#065F46',
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  successSubline: {
    fontSize: 13,
    color: '#555169',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  boldDarkText: {
    fontWeight: '800',
    color: '#1C1342',
  },
  transitStatusCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#D1FAE5',
    marginBottom: 18,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  transitStatusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusLivePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  liveBlinkingDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#10B981',
  },
  statusLiveText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#065F46',
    letterSpacing: 0.4,
  },
  estimatedDeliveryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
  },
  transitStepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  stepItem: {
    alignItems: 'center',
    gap: 4,
  },
  stepDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F3F0FA',
    borderWidth: 1,
    borderColor: '#DDD6FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepDotDone: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  stepLine: {
    flex: 1,
    height: 3,
    backgroundColor: '#E8E5F2',
    marginHorizontal: 8,
    marginBottom: 16,
  },
  stepLineDone: {
    backgroundColor: '#10B981',
  },
  stepLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B6780',
  },
  officialReceipt: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#ECE7F8',
    shadowColor: '#1E1B39',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  receiptTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  receiptTitleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  receiptTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1C1342',
  },
  receiptIdText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6C5CE7',
  },
  receiptDivider: {
    height: 1,
    backgroundColor: '#F0EDFC',
    marginVertical: 12,
  },
  receiptItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  receiptField: {
    fontSize: 12,
    color: '#8E8AA0',
    fontWeight: '600',
  },
  receiptValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1C1342',
  },
  payoutHighlightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  payoutLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#065F46',
  },
  payoutSubLabel: {
    fontSize: 10,
    color: '#047857',
    fontWeight: '500',
  },
  payoutAmountText: {
    fontSize: 17,
    fontWeight: '900',
    color: '#059669',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 14,
    borderTopWidth: 1.5,
    borderTopColor: '#ECE9F6',
    shadowColor: '#1C1342',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
    zIndex: 100,
  },
  completedButtonsCol: {
    width: '100%',
  },
  viewEarningsBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  viewEarningsText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#6C5CE7',
  },
});
