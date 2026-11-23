import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeBazColors } from '@/constants/theme';
import { HomeBazLogo } from '@/components/common/HomeBazLogo';
import { CustomInput } from '@/components/common/CustomInput';
import { GradientButton } from '@/components/common/GradientButton';

export default function SellerLoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, Platform.OS === 'android' ? 36 : 24) + 40;
  const [identifier, setIdentifier] = useState('amrutha.foods@homebazz.in');
  const [password, setPassword] = useState('Amrutha@2026');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Entrance & Ambient Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const ballAnim1 = useRef(new Animated.Value(0)).current;
  const ballAnim2 = useRef(new Animated.Value(0)).current;
  const ballAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 6,
        tension: 45,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    // Floating Background Animated Ball 1 (Top-Right Purple Orb)
    const loop1 = Animated.loop(
      Animated.sequence([
        Animated.timing(ballAnim1, {
          toValue: 1,
          duration: 3800,
          useNativeDriver: true,
        }),
        Animated.timing(ballAnim1, {
          toValue: 0,
          duration: 3800,
          useNativeDriver: true,
        }),
      ])
    );

    // Floating Background Animated Ball 2 (Mid-Left Warm Amber Orb)
    const loop2 = Animated.loop(
      Animated.sequence([
        Animated.timing(ballAnim2, {
          toValue: 1,
          duration: 4400,
          useNativeDriver: true,
        }),
        Animated.timing(ballAnim2, {
          toValue: 0,
          duration: 4400,
          useNativeDriver: true,
        }),
      ])
    );

    // Floating Background Animated Ball 3 (Bottom-Right Indigo Orb)
    const loop3 = Animated.loop(
      Animated.sequence([
        Animated.timing(ballAnim3, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(ballAnim3, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true,
        }),
      ])
    );

    loop1.start();
    loop2.start();
    loop3.start();

    return () => {
      loop1.stop();
      loop2.stop();
      loop3.stop();
    };
  }, [fadeAnim, slideAnim, scaleAnim, ballAnim1, ballAnim2, ballAnim3]);

  const handleLogin = () => {
    if (!identifier.trim()) {
      setErrorMessage('Please enter your registered email or mobile number');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);

    // Simulate authentic login transition to seller dashboard
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)' as any);
    }, 650);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />

      {/* Base Light Background */}
      <LinearGradient
        colors={['#FAF9FE', '#F3EEFC', '#EDE6FA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* COMPLETE SCREEN BACKGROUND ANIMATED FLOATING BALLS */}
      {/* Animated Ball 1: Top-Right Soft Purple Ball */}
      <Animated.View
        style={[
          styles.ambientBallTopRight,
          {
            transform: [
              {
                translateY: ballAnim1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-18, 18],
                }),
              },
              {
                scale: ballAnim1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.94, 1.12],
                }),
              },
            ],
            opacity: ballAnim1.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.55, 0.85, 0.55],
            }),
          },
        ]}
        pointerEvents="none"
      >
        <LinearGradient
          colors={['rgba(124, 92, 231, 0.25)', 'rgba(168, 85, 247, 0.12)', 'transparent']}
          start={{ x: 0.2, y: 0.2 }}
          end={{ x: 1, y: 1 }}
          style={styles.ambientBallInner}
        />
      </Animated.View>

      {/* Animated Ball 2: Mid-Left Warm Amber/Peach Ball */}
      <Animated.View
        style={[
          styles.ambientBallMidLeft,
          {
            transform: [
              {
                translateY: ballAnim2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [16, -16],
                }),
              },
              {
                translateX: ballAnim2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-10, 12],
                }),
              },
              {
                scale: ballAnim2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1.08, 0.92],
                }),
              },
            ],
            opacity: ballAnim2.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.50, 0.80, 0.50],
            }),
          },
        ]}
        pointerEvents="none"
      >
        <LinearGradient
          colors={['rgba(251, 191, 36, 0.24)', 'rgba(245, 158, 11, 0.12)', 'transparent']}
          start={{ x: 0.3, y: 0.3 }}
          end={{ x: 1, y: 1 }}
          style={styles.ambientBallInner}
        />
      </Animated.View>

      {/* Animated Ball 3: Bottom-Right Soft Violet/Indigo Ball */}
      <Animated.View
        style={[
          styles.ambientBallBottomRight,
          {
            transform: [
              {
                translateY: ballAnim3.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-15, 15],
                }),
              },
              {
                scale: ballAnim3.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.92, 1.10],
                }),
              },
            ],
            opacity: ballAnim3.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.45, 0.75, 0.45],
            }),
          },
        ]}
        pointerEvents="none"
      >
        <LinearGradient
          colors={['rgba(99, 102, 241, 0.22)', 'rgba(168, 85, 247, 0.12)', 'transparent']}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={styles.ambientBallInner}
        />
      </Animated.View>

      {/* Animated Ball 4: Top-Left Subtle Rose Orb */}
      <Animated.View
        style={[
          styles.ambientBallTopLeft,
          {
            transform: [
              {
                translateX: ballAnim1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-8, 8],
                }),
              },
            ],
            opacity: ballAnim1.interpolate({
              inputRange: [0, 1],
              outputRange: [0.4, 0.7],
            }),
          },
        ]}
        pointerEvents="none"
      >
        <LinearGradient
          colors={['rgba(236, 72, 153, 0.16)', 'rgba(168, 85, 247, 0.08)', 'transparent']}
          start={{ x: 0.3, y: 0.3 }}
          end={{ x: 1, y: 1 }}
          style={styles.ambientBallInner}
        />
      </Animated.View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top, 16) + 10,
            paddingBottom: bottomClearance,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Logo Header Card */}
        <Animated.View
          style={[
            styles.brandSection,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.logoBadge}>
            <HomeBazLogo size={68} />
          </View>
        </Animated.View>

        {/* Title Section */}
        <Animated.View
          style={[
            styles.titleSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>Seller Login</Text>
          <Text style={styles.subtitle}>
            Manage your kitchen orders, menu catalog & payouts
          </Text>
        </Animated.View>

        {/* ======================================================== */}
        {/* CARD 1: SELLER LOGIN CARD (LEFT PURPLE -> RIGHT AMBER)   */}
        {/* ======================================================== */}
        <Animated.View
          style={[
            styles.cardShadowWrapper,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={['#E8DFFC', '#F6F1FE', '#FFEBD1']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradientFormCard}
          >
            {/* Card Header Tag Row */}
            <View style={styles.cardHeaderRow}>
              <View style={styles.partnerPill}>
                <Ionicons name="lock-closed" size={11} color="#6C5CE7" />
                <Text style={styles.partnerPillText}>REGISTERED SELLER ACCESS</Text>
              </View>
              <View style={styles.sslBadge}>
                <Ionicons name="shield-checkmark" size={11} color="#059669" />
                <Text style={styles.sslBadgeText}>256-Bit SSL</Text>
              </View>
            </View>

            {/* Input Fields */}
            <View style={styles.inputsContainer}>
              <CustomInput
                label="Registered Email or Mobile"
                placeholder="e.g. yourname@gmail.com / 9876543210"
                leftIcon="mail-outline"
                value={identifier}
                onChangeText={(text) => {
                  setIdentifier(text);
                  if (errorMessage) setErrorMessage('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <CustomInput
                label="Store Password"
                placeholder="Enter password"
                leftIcon="key-outline"
                isPassword
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {errorMessage ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={14} color="#DC2626" />
                <Text style={styles.errorBoxText}>{errorMessage}</Text>
              </View>
            ) : null}

            {/* Forgot Password Link */}
            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={() => alert('Password reset verification link sent to your registered email & phone.')}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Primary Action Button: Login to Dashboard */}
            <GradientButton
              title="Login to Dashboard  →"
              onPress={handleLogin}
              loading={isLoading}
              size="large"
              style={styles.loginBtn}
            />

            {/* Trust Assurance Strip at bottom of Card 1 */}
            <View style={styles.loginTrustStrip}>
              <Ionicons name="checkmark-circle-outline" size={13} color="#059669" />
              <Text style={styles.loginTrustStripText}>
                Instant access to live order dispatch & settlements
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* ======================================================== */}
        {/* CARD 2: BECOME A HOMEMADE SELLER (LEFT AMBER -> RIGHT PURPLE) */}
        {/* ======================================================== */}
        <Animated.View
          style={[
            styles.cardShadowWrapper,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={['#FFEAD0', '#F6F0FE', '#E8DEFA']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradientRegisterCard}
          >
            {/* Top Badge Pill */}
            <View style={styles.registerBadgePill}>
              <Ionicons name="sparkles" size={13} color="#6C5CE7" />
              <Text style={styles.registerBadgeText}>JOIN HOMEBAZZ PARTNER FLEET</Text>
            </View>

            {/* Title & Value Proposition */}
            <View style={styles.registerContentCol}>
              <Text style={styles.newSellerTitle}>Are you a home cook or artisan?</Text>
              <Text style={styles.newSellerDesc}>
                Turn your family recipes, homemade pickles, sweets & craft talents into a growing business with zero registration fees.
              </Text>
            </View>

            {/* Primary Action Button: Register New Seller */}
            <TouchableOpacity
              onPress={() => router.push('/registration/onboarding')}
              activeOpacity={0.85}
              style={styles.registerLinkButton}
            >
              <LinearGradient
                colors={['#6C5CE7', '#5037BA']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.registerGradientBtn}
              >
                <Ionicons name="storefront" size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.registerLinkText}>Register as New Seller  →</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Secondary Action: Track Existing Application */}
            <TouchableOpacity
              onPress={() => router.push('/verification/verification-status')}
              activeOpacity={0.7}
              style={styles.trackLinkButton}
            >
              <Ionicons
                name="shield-checkmark-outline"
                size={14}
                color="#6C5CE7"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.trackLinkText}>Track Verification Application</Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9FE',
  },
  /* Animated Floating Background Balls (Complete Screen Coverage) */
  ambientBallTopRight: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 260,
    height: 260,
    borderRadius: 130,
  },
  ambientBallMidLeft: {
    position: 'absolute',
    top: '36%',
    left: -50,
    width: 230,
    height: 230,
    borderRadius: 115,
  },
  ambientBallBottomRight: {
    position: 'absolute',
    bottom: -50,
    right: -40,
    width: 270,
    height: 270,
    borderRadius: 135,
  },
  ambientBallTopLeft: {
    position: 'absolute',
    top: 70,
    left: -35,
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  ambientBallInner: {
    width: '100%',
    height: '100%',
    borderRadius: 150,
  },
  scrollContent: {
    paddingHorizontal: 18,
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: 12,
  },
  logoBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1.5,
    borderColor: '#EFEBF8',
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1C1342',
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B6780',
    marginTop: 4,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 18,
  },

  /* Card Shadow & Container Wrappers */
  cardShadowWrapper: {
    marginBottom: 16,
    borderRadius: 22,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },

  /* CARD 1: Light Gradient Form Card (Left Purple -> Right Amber) */
  gradientFormCard: {
    borderRadius: 22,
    padding: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(108, 92, 231, 0.22)',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(108, 92, 231, 0.12)',
  },
  partnerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD4F6',
    paddingHorizontal: 9,
    paddingVertical: 3.5,
    borderRadius: 8,
  },
  partnerPillText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#6C5CE7',
    letterSpacing: 0.4,
  },
  sslBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  sslBadgeText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#059669',
  },
  inputsContainer: {
    gap: 2,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEF2F2',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
    marginBottom: 10,
  },
  errorBoxText: {
    fontSize: 11.5,
    color: '#DC2626',
    fontWeight: '600',
    flex: 1,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 16,
    marginTop: 2,
    paddingVertical: 4,
  },
  forgotPasswordText: {
    color: '#6C5CE7',
    fontSize: 12.5,
    fontWeight: '700',
  },
  loginBtn: {
    marginBottom: 12,
  },
  loginTrustStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingTop: 6,
    paddingBottom: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
  },
  loginTrustStripText: {
    fontSize: 11,
    color: '#4B4660',
    fontWeight: '600',
  },

  /* CARD 2: Light Gradient Registration Card (Left Amber -> Right Purple) */
  gradientRegisterCard: {
    borderRadius: 22,
    padding: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(217, 119, 6, 0.22)',
    alignItems: 'center',
  },
  registerBadgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD4F6',
    paddingHorizontal: 10,
    paddingVertical: 3.5,
    borderRadius: 12,
    marginBottom: 10,
  },
  registerBadgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#6C5CE7',
    letterSpacing: 0.5,
  },
  registerContentCol: {
    alignItems: 'center',
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  newSellerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1C1342',
    marginBottom: 4,
    textAlign: 'center',
  },
  newSellerDesc: {
    fontSize: 12,
    color: '#65607A',
    textAlign: 'center',
    lineHeight: 17,
  },
  registerLinkButton: {
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 10,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 3,
  },
  registerGradientBtn: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerLinkText: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  trackLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  trackLinkText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#6C5CE7',
  },
});
