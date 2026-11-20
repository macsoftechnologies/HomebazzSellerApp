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
  const bottomClearance = Math.max(insets.bottom, Platform.OS === 'android' ? 36 : 24) + 84;
  const [identifier, setIdentifier] = useState('amrutha.foods@homebazz.in');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Entrance & Ambient Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    // Subtle ambient breathing pulse for background blobs
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 3500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 3500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim, slideAnim, scaleAnim, pulseAnim]);

  const handleLogin = () => {
    if (!identifier.trim()) {
      setErrorMessage('Please enter your email or mobile number');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);

    // Simulate authentic login transition
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)' as any);
    }, 700);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />

      {/* Ambient Gradient Background */}
      <LinearGradient
        colors={['#FAF8FF', '#F3EDFC', '#ECE5F9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Floating Animated Gradient Glow Blobs */}
      <Animated.View
        style={[
          styles.ambientBlobTop,
          {
            transform: [{ scale: pulseAnim }],
          },
        ]}
        pointerEvents="none"
      />
      <Animated.View
        style={[
          styles.ambientBlobBottom,
          {
            transform: [{ scale: pulseAnim }],
          },
        ]}
        pointerEvents="none"
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top, 20),
            paddingBottom: bottomClearance,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Animated Brand Identity Card */}
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
            <HomeBazLogo size={72} />
          </View>
        </Animated.View>

        {/* Animated Title & Subtitle */}
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
          <Text style={styles.subtitle}>Access your seller partner dashboard</Text>
        </Animated.View>

        {/* Elevated Form Card */}
        <Animated.View
          style={[
            styles.formCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <CustomInput
            placeholder="Email or Mobile Number"
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
            placeholder="Password"
            leftIcon="lock-closed-outline"
            isPassword
            value={password}
            onChangeText={setPassword}
          />

          {errorMessage ? (
            <Text style={styles.globalErrorText}>{errorMessage}</Text>
          ) : null}

          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={() => alert('Password reset link sent to your registered email.')}
            activeOpacity={0.7}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login -> Button */}
          <GradientButton
            title="Login to Dashboard  →"
            onPress={handleLogin}
            loading={isLoading}
            size="large"
            style={styles.loginBtn}
          />

          {/* Or Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Sign-in */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <View style={styles.googleIconBadge}>
              <Text style={styles.googleG}>G</Text>
            </View>
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Extended Registration Links Card */}
        <Animated.View style={[styles.registerCard, { opacity: fadeAnim }]}>
          <View style={styles.registerBadgePill}>
            <Ionicons name="sparkles" size={14} color="#6C5CE7" />
            <Text style={styles.registerBadgeText}>Partner With HomeBazz</Text>
          </View>

          <View style={styles.registerTextCol}>
            <Text style={styles.newSellerTitle}>Are you a home cook or artisan?</Text>
            <Text style={styles.newSellerDesc}>Start selling authentic food, pickles, sweets & handmade goods.</Text>
          </View>

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

          <TouchableOpacity
            onPress={() => router.push('/verification/verification-status')}
            activeOpacity={0.7}
            style={styles.trackLinkButton}
          >
            <Ionicons name="shield-checkmark-outline" size={15} color="#6C5CE7" style={{ marginRight: 6 }} />
            <Text style={styles.trackLinkText}>Track Verification Application</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8FF',
  },
  ambientBlobTop: {
    position: 'absolute',
    top: -60,
    right: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(124, 92, 231, 0.12)',
  },
  ambientBlobBottom: {
    position: 'absolute',
    bottom: -80,
    left: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(108, 92, 231, 0.10)',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  brandSection: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  logoBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 22,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 14,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ECE7F8',
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1C1342',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B6780',
    marginTop: 4,
    fontWeight: '500',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1.5,
    borderColor: '#EFEBF8',
    shadowColor: '#1C1342',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 6,
    marginBottom: 20,
  },
  globalErrorText: {
    color: HomeBazColors.danger,
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginTop: -4,
  },
  forgotPasswordText: {
    color: '#6C5CE7',
    fontSize: 13,
    fontWeight: '700',
  },
  loginBtn: {
    marginBottom: 20,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#EDE9F6',
  },
  dividerText: {
    paddingHorizontal: 14,
    color: '#9B97B0',
    fontSize: 13,
    fontWeight: '600',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E8E4F4',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  googleIconBadge: {
    marginRight: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleG: {
    fontSize: 15,
    fontWeight: '800',
    color: '#4285F4',
  },
  googleButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1342',
  },
  registerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#E8E3F8',
    alignItems: 'center',
    shadowColor: '#1C1342',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 10,
  },
  registerBadgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F3EFFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
    marginBottom: 12,
  },
  registerBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6C5CE7',
    letterSpacing: 0.3,
  },
  registerTextCol: {
    alignItems: 'center',
    marginBottom: 16,
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
    color: '#6B6780',
    textAlign: 'center',
    lineHeight: 18,
  },
  registerLinkButton: {
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 14,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  registerGradientBtn: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerLinkText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  trackLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  trackLinkText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6C5CE7',
  },
});
