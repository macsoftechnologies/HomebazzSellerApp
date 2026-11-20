import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { HomeBazColors } from '@/constants/theme';
import { GradientButton } from '@/components/common/GradientButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 0,
      icon: 'restaurant-outline' as const,
      title: 'Share Your Homemade Recipes',
      subtitle:
        'Turn your traditional pickles, podis, snacks, and sweets into a thriving business across Andhra Pradesh.',
    },
    {
      id: 1,
      icon: 'bicycle-outline' as const,
      title: 'Zero Delivery Hassles',
      subtitle:
        'HomeBaz delivery partners pick up packed orders right from your home kitchen doorstep.',
    },
    {
      id: 2,
      icon: 'shield-checkmark-outline' as const,
      title: 'Empowerment & Quick Payouts',
      subtitle:
        'Transparent 10% commission, weekly bank payouts, and 100% genuine FSSAI quality verification.',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.push('/registration/welcome');
    }
  };

  const active = slides[currentSlide];

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, 16),
          paddingBottom: Math.max(insets.bottom, Platform.OS === 'android' ? 24 : 16) + 16,
        },
      ]}
    >
      <StatusBar barStyle="dark-content" />

      {/* Top Header Row with Skip */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={HomeBazColors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/registration/welcome')}
          activeOpacity={0.7}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Slide Illustration & Visual */}
      <View style={styles.slideContainer}>
        <LinearGradient
          colors={['#EDE6FA', '#F4F0FC']}
          style={styles.iconCircleOuter}
        >
          <View style={styles.iconCircleInner}>
            <Ionicons name={active.icon} size={64} color={HomeBazColors.primary} />
          </View>
        </LinearGradient>

        <Text style={styles.slideTitle}>{active.title}</Text>
        <Text style={styles.slideSubtitle}>{active.subtitle}</Text>
      </View>

      {/* Pagination Dots & Next Button */}
      <View style={styles.bottomSection}>
        <View style={styles.dotsRow}>
          {slides.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                currentSlide === idx && styles.dotActive,
              ]}
            />
          ))}
        </View>

        <GradientButton
          title={currentSlide === slides.length - 1 ? 'Start Selling  →' : 'Next  →'}
          onPress={handleNext}
          size="large"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8F8FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipText: {
    fontSize: 14,
    fontWeight: '700',
    color: HomeBazColors.textSecondary,
  },
  slideContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconCircleOuter: {
    width: 170,
    height: 170,
    borderRadius: 85,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 36,
  },
  iconCircleInner: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: HomeBazColors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  slideTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  slideSubtitle: {
    fontSize: 14,
    color: HomeBazColors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  bottomSection: {
    width: '100%',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E2DCF4',
  },
  dotActive: {
    width: 24,
    backgroundColor: HomeBazColors.primary,
  },
});
