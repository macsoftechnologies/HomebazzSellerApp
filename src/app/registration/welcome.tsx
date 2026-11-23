import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeBazColors } from '@/constants/theme';
import { HomeBazLogo } from '@/components/common/HomeBazLogo';
import { GradientButton } from '@/components/common/GradientButton';

export default function WelcomePortalScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Smooth ambient gradient background animation (No circles/balls)
  const ambientAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Ambient color / translation drift
    const ambientLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(ambientAnim, {
          toValue: 1,
          duration: 4200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(ambientAnim, {
          toValue: 0,
          duration: 4200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // Floating subtle shimmer
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    // Subtle badge scale pulse
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.03,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    ambientLoop.start();
    floatLoop.start();
    pulseLoop.start();

    return () => {
      ambientLoop.stop();
      floatLoop.stop();
      pulseLoop.stop();
    };
  }, [ambientAnim, floatAnim, pulseAnim]);

  const features = [
    {
      id: 'fee',
      title: 'Zero Registration Fee',
      highlightTag: '100% FREE FOREVER',
      tagColor: '#059669',
      tagBg: '#ECFDF5',
      desc: 'Join HomeBaz artisan network with ₹0 upfront cost and zero recurring listing charges.',
      icon: 'sparkles' as const,
      iconColor: '#6C5CE7',
      iconBg: '#EDE9FE',
      borderColor: '#ECE7FA',
    },
    {
      id: 'pickup',
      title: 'Doorstep Pickup',
      highlightTag: 'EFFORTLESS LOGISTICS',
      tagColor: '#4F46E5',
      tagBg: '#EEF2FF',
      desc: 'Our verified delivery fleet arrives directly at your kitchen door to collect packed orders.',
      icon: 'bicycle-outline' as const,
      iconColor: '#4F46E5',
      iconBg: '#E0E7FF',
      borderColor: '#E0E7FF',
    },
    {
      id: 'settlements',
      title: 'Fast Weekly Settlements',
      highlightTag: 'GUARANTEED DIRECT PAYOUT',
      tagColor: '#D97706',
      tagBg: '#FEF3C7',
      desc: 'All customer earnings deposited directly to your bank account every Monday without delay.',
      icon: 'wallet-outline' as const,
      iconColor: '#D97706',
      iconBg: '#FEF3C7',
      borderColor: '#FDE68A',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Layer 1: Animated Moving Ambient Background Aura (Soft squircle gradients - NO BALLS) */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.movingAuraContainer,
          {
            transform: [
              {
                translateX: ambientAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-35, 35],
                }),
              },
              {
                translateY: ambientAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-15, 20],
                }),
              },
            ],
            opacity: ambientAnim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.45, 0.85, 0.45],
            }),
          },
        ]}
      >
        <LinearGradient
          colors={['rgba(237, 233, 254, 0.9)', 'rgba(254, 243, 199, 0.65)', 'rgba(245, 243, 255, 0.3)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.movingAuraGradient}
        />
      </Animated.View>

      {/* Layer 2: Secondary Soft Warm Shimmer Ribbon */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.warmShimmerRibbon,
          {
            transform: [
              {
                translateY: floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 25],
                }),
              },
            ],
            opacity: floatAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.35, 0.7],
            }),
          },
        ]}
      >
        <LinearGradient
          colors={['rgba(254, 240, 138, 0.35)', 'rgba(233, 213, 255, 0.4)', 'transparent']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.warmShimmerGradient}
        />
      </Animated.View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top, 16) + 8,
            paddingBottom: Math.max(insets.bottom, Platform.OS === 'android' ? 24 : 16) + 20,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Brand Portal Banner */}
        <View style={styles.topHeaderSection}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <View style={styles.portalBadge}>
              <Ionicons name="sparkles" size={13} color="#6C5CE7" />
              <Text style={styles.portalBadgeText}>OFFICIAL SELLER PARTNER PORTAL</Text>
            </View>
          </Animated.View>

          <View style={styles.logoWrapper}>
            <HomeBazLogo size={68} />
          </View>

          <Text style={styles.portalTagline}>
            "Every Home Has a Talent. Every Talent Deserves a Market."
          </Text>

          <View style={styles.artisanSubtextRow}>
            <View style={styles.subtextDot} />
            <Text style={styles.artisanSubtext}>Join 12,000+ Home Chefs & Local Artisans</Text>
            <View style={styles.subtextDot} />
          </View>
        </View>

        {/* 3 Prominent Feature Cards Stack */}
        <View style={styles.featuresStack}>
          {features.map((item) => (
            <View
              key={item.id}
              style={[
                styles.featureCard,
                { borderColor: item.borderColor },
              ]}
            >
              <View style={styles.featureCardHeader}>
                <View style={[styles.iconSquircle, { backgroundColor: item.iconBg }]}>
                  <Ionicons name={item.icon} size={20} color={item.iconColor} />
                </View>

                <View style={styles.featureTitleCol}>
                  <View style={styles.titleWithTagRow}>
                    <Text style={styles.featureTitle}>{item.title}</Text>
                    <View style={[styles.highlightTagPill, { backgroundColor: item.tagBg }]}>
                      <Text style={[styles.highlightTagText, { color: item.tagColor }]}>
                        {item.highlightTag}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.featureDesc}>{item.desc}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Trust Guarantee Strip */}
        <View style={styles.trustBanner}>
          <Ionicons name="shield-checkmark" size={16} color="#059669" />
          <Text style={styles.trustBannerText}>
            FSSAI Assistance • 100% Secure Payments • Dedicated Seller Support
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <GradientButton
            title="Start New Seller Registration  →"
            onPress={() => router.push('/registration/seller-type')}
            size="large"
            style={{ marginBottom: 12 }}
          />

          <GradientButton
            title="Track Existing Application"
            variant="outline"
            onPress={() => router.push('/verification/verification-status')}
            size="large"
            style={{ marginBottom: 14 }}
          />

          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => router.push('/login')}
            activeOpacity={0.7}
          >
            <Text style={styles.signInText}>
              Already have an active store? <Text style={styles.signInHighlight}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFE',
  },
  movingAuraContainer: {
    position: 'absolute',
    top: -40,
    left: -30,
    right: -30,
    height: 380,
    borderRadius: 24,
  },
  movingAuraGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  warmShimmerRibbon: {
    position: 'absolute',
    top: 240,
    left: -40,
    right: -40,
    height: 260,
    borderRadius: 24,
  },
  warmShimmerGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  scrollContent: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  topHeaderSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  portalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: '#EDE9FE',
    borderWidth: 1,
    borderColor: '#DDD6FE',
    marginBottom: 12,
  },
  portalBadgeText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#6C5CE7',
    letterSpacing: 0.6,
  },
  logoWrapper: {
    marginVertical: 4,
    alignItems: 'center',
  },
  portalTagline: {
    fontSize: 13.5,
    color: '#4B5563',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
    paddingHorizontal: 16,
    fontWeight: '500',
  },
  artisanSubtextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  subtextDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#9CA3AF',
  },
  artisanSubtext: {
    fontSize: 11.5,
    color: '#6B7280',
    fontWeight: '600',
  },
  featuresStack: {
    gap: 12,
    marginBottom: 16,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconSquircle: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  featureTitleCol: {
    flex: 1,
  },
  titleWithTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 4,
  },
  featureTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  highlightTagPill: {
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 6,
  },
  highlightTagText: {
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  featureDesc: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 17,
  },
  trustBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    marginBottom: 20,
  },
  trustBannerText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#166534',
    textAlign: 'center',
    flex: 1,
  },
  actionsSection: {
    width: '100%',
    paddingTop: 4,
  },
  signInButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  signInText: {
    fontSize: 13,
    color: HomeBazColors.textSecondary,
  },
  signInHighlight: {
    color: HomeBazColors.primary,
    fontWeight: '700',
  },
});
