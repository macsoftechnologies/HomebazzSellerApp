import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeBazLogo } from '@/components/common/HomeBazLogo';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SplashSlide {
  id: number;
  badge: string;
  badgeIcon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  type: 'store' | 'handmade' | 'delivery';
}

const SPLASH_SLIDES: SplashSlide[] = [
  {
    id: 0,
    badge: 'Authentic Kitchens & Crafts',
    badgeIcon: 'storefront',
    title: 'Grow Your Business\nwith HomeBazz',
    subtitle:
      'Turn your homemade delicacies, pickles, sweets & handcrafted goods into a thriving business.',
    type: 'store',
  },
  {
    id: 1,
    badge: 'FSSAI & Quality Verified',
    badgeIcon: 'shield-checkmark',
    title: '100% Homemade\n& Quality Assured',
    subtitle:
      'Showcase your secret family recipes, gain verified partner badges & build lifelong customer trust.',
    type: 'handmade',
  },
  {
    id: 2,
    badge: 'Doorstep Pickup & Weekly Payouts',
    badgeIcon: 'wallet',
    title: 'Zero Delivery Hassles\n& Fast Payouts',
    subtitle:
      'Riders pick up packed orders right at your door. Enjoy automated logistics & weekly direct bank payouts.',
    type: 'delivery',
  },
];

export default function SplashScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Background Aurora & Wave Animations
  const auraAnim1 = useRef(new Animated.Value(0)).current;
  const auraAnim2 = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;

  // Floating illustration bobbing animation
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Floating particles twinkle
  const twinkleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Gentle floating bob for illustration (2.8s)
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // 2. Flowing aura gradient loop 1 (4.5s)
    const auraLoop1 = Animated.loop(
      Animated.sequence([
        Animated.timing(auraAnim1, {
          toValue: 1,
          duration: 4500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(auraAnim1, {
          toValue: 0,
          duration: 4500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // 3. Flowing aura gradient loop 2 (5.5s)
    const auraLoop2 = Animated.loop(
      Animated.sequence([
        Animated.timing(auraAnim2, {
          toValue: 1,
          duration: 5500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(auraAnim2, {
          toValue: 0,
          duration: 5500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    // 4. Horizontal ambient wave sweep (6s)
    const waveLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 6000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 6000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // 5. Soft twinkle for particles (2.2s)
    const twinkleLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(twinkleAnim, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(twinkleAnim, {
          toValue: 0,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    floatLoop.start();
    auraLoop1.start();
    auraLoop2.start();
    waveLoop.start();
    twinkleLoop.start();

    return () => {
      floatLoop.stop();
      auraLoop1.stop();
      auraLoop2.stop();
      waveLoop.stop();
      twinkleLoop.stop();
    };
  }, [floatAnim, auraAnim1, auraAnim2, waveAnim, twinkleAnim]);

  const handleNext = () => {
    if (activeIndex < SPLASH_SLIDES.length - 1) {
      const nextIndex = activeIndex + 1;
      scrollRef.current?.scrollTo({
        x: nextIndex * SCREEN_WIDTH,
        animated: true,
      });
      setActiveIndex(nextIndex);
    } else {
      goToLogin();
    }
  };

  const goToLogin = () => {
    router.replace('/login');
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    if (index >= 0 && index < SPLASH_SLIDES.length && index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const renderIllustration = (type: SplashSlide['type']) => {
    return (
      <Animated.View
        style={[
          styles.illustrationSection,
          {
            transform: [
              {
                translateY: floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-6, 6],
                }),
              },
            ],
          },
        ]}
      >
        {/* Soft Pulsing Halo Behind Illustration */}
        <Animated.View
          style={[
            styles.backGlow,
            {
              transform: [
                {
                  scale: floatAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.94, 1.1],
                  }),
                },
              ],
              opacity: floatAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.16, 0.32],
              }),
            },
          ]}
        />

        {type === 'store' && (
          <>
            <View style={styles.storefront}>
              <View style={styles.awning}>
                <View style={[styles.awningStripe, { backgroundColor: '#EDE9FE' }]} />
                <View style={[styles.awningStripe, { backgroundColor: '#A78BFA' }]} />
                <View style={[styles.awningStripe, { backgroundColor: '#EDE9FE' }]} />
                <View style={[styles.awningStripe, { backgroundColor: '#A78BFA' }]} />
                <View style={[styles.awningStripe, { backgroundColor: '#EDE9FE' }]} />
              </View>
              <View style={styles.shopWindow}>
                <View style={styles.windowGlass}>
                  <View style={styles.windowReflection} />
                </View>
                <View style={styles.windowGlass}>
                  <View style={styles.windowReflection} />
                </View>
              </View>
            </View>

            {/* Packaging boxes */}
            <View style={styles.deliveryBoxLeft}>
              <View style={styles.boxTape} />
            </View>
            <View style={styles.deliveryBoxRight}>
              <View style={styles.boxTape} />
            </View>
          </>
        )}

        {type === 'handmade' && (
          <View style={styles.artisanCard}>
            <View style={styles.potCircle}>
              <Ionicons name="restaurant" size={44} color="#6C5CE7" />
            </View>
            <View style={styles.sparkleBadgeTop}>
              <Ionicons name="sparkles" size={20} color="#F59E0B" />
            </View>
            <View style={styles.verifiedFloatingTag}>
              <Ionicons name="shield-checkmark" size={16} color="#059669" />
              <Text style={styles.verifiedTagLabel}>FSSAI Assisted</Text>
            </View>
            <View style={styles.pickleJarGraphic}>
              <View style={styles.jarLid} />
              <View style={styles.jarBody}>
                <Ionicons name="flame" size={18} color="#D97706" />
                <Text style={styles.jarText}>Home-Made</Text>
              </View>
            </View>
          </View>
        )}

        {type === 'delivery' && (
          <View style={styles.deliveryCard}>
            <View style={styles.scooterCircle}>
              <Ionicons name="bicycle" size={48} color="#6C5CE7" />
            </View>
            <View style={styles.payoutBadge}>
              <Ionicons name="trending-up" size={18} color="#059669" />
              <Text style={styles.payoutBadgeText}>Weekly ₹ Direct Bank</Text>
            </View>
            <View style={styles.speedPill}>
              <Ionicons name="flash" size={14} color="#F59E0B" />
              <Text style={styles.speedPillText}>Doorstep Pickup</Text>
            </View>
          </View>
        )}
      </Animated.View>
    );
  };

  const bottomClearance = Math.max(insets.bottom, Platform.OS === 'android' ? 24 : 16);
  const topClearance = Math.max(insets.top, 16);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Base Brand Purple Gradient */}
      <LinearGradient
        colors={['#401E9E', '#5B32DB', '#724CE8', '#8664F2']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={styles.gradient}
      >
        {/* Dynamic Animated Ambient Background Aura Layers */}
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          {/* Ambient Glow Beam 1 (Top Left to Center) */}
          <Animated.View
            style={[
              styles.bgAura1,
              {
                transform: [
                  {
                    translateX: auraAnim1.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-60, 50],
                    }),
                  },
                  {
                    translateY: auraAnim1.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-40, 30],
                    }),
                  },
                  {
                    scale: auraAnim1.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.95, 1.25],
                    }),
                  },
                ],
                opacity: auraAnim1.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.55, 0.85, 0.55],
                }),
              },
            ]}
          >
            <LinearGradient
              colors={['rgba(168, 85, 247, 0.50)', 'rgba(124, 58, 237, 0.35)', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.auraGradientCircle}
            />
          </Animated.View>

          {/* Ambient Glow Beam 2 (Bottom Right to Center) */}
          <Animated.View
            style={[
              styles.bgAura2,
              {
                transform: [
                  {
                    translateX: auraAnim2.interpolate({
                      inputRange: [0, 1],
                      outputRange: [40, -50],
                    }),
                  },
                  {
                    translateY: auraAnim2.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, -40],
                    }),
                  },
                  {
                    scale: auraAnim2.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1.18, 0.92],
                    }),
                  },
                ],
                opacity: auraAnim2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.45, 0.78, 0.45],
                }),
              },
            ]}
          >
            <LinearGradient
              colors={['rgba(99, 102, 241, 0.45)', 'rgba(139, 92, 246, 0.30)', 'transparent']}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={styles.auraGradientCircle}
            />
          </Animated.View>

          {/* Ambient Horizontal Wave Ribbon */}
          <Animated.View
            style={[
              styles.bgWaveSweep,
              {
                transform: [
                  {
                    translateX: waveAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-SCREEN_WIDTH * 0.35, SCREEN_WIDTH * 0.35],
                    }),
                  },
                  {
                    translateY: waveAnim.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [-15, 15, -15],
                    }),
                  },
                ],
                opacity: waveAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.22, 0.42, 0.22],
                }),
              },
            ]}
          >
            <LinearGradient
              colors={['transparent', 'rgba(255, 255, 255, 0.16)', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.waveGradient}
            />
          </Animated.View>

          {/* Floating Twinkle Sparkles */}
          <Animated.View
            style={[
              styles.sparkle1,
              {
                transform: [
                  {
                    translateY: twinkleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -12],
                    }),
                  },
                  {
                    rotate: twinkleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '25deg'],
                    }),
                  },
                ],
                opacity: twinkleAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.4, 0.95, 0.4],
                }),
              },
            ]}
          >
            <Ionicons name="sparkles" size={20} color="#FDE047" />
          </Animated.View>

          <Animated.View
            style={[
              styles.sparkle2,
              {
                transform: [
                  {
                    translateY: twinkleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 14],
                    }),
                  },
                  {
                    scale: twinkleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.85, 1.25],
                    }),
                  },
                ],
                opacity: twinkleAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.35, 0.85, 0.35],
                }),
              },
            ]}
          >
            <Ionicons name="star" size={14} color="#DDD6FE" />
          </Animated.View>

          <Animated.View
            style={[
              styles.sparkle3,
              {
                transform: [
                  {
                    translateY: twinkleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-10, 10],
                    }),
                  },
                ],
                opacity: twinkleAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.3, 0.82, 0.3],
                }),
              },
            ]}
          >
            <Ionicons name="sparkles" size={16} color="#A7F3D0" />
          </Animated.View>

          <Animated.View
            style={[
              styles.sparkle4,
              {
                transform: [
                  {
                    scale: twinkleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1.3],
                    }),
                  },
                ],
                opacity: twinkleAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.35, 0.9, 0.35],
                }),
              },
            ]}
          >
            <Ionicons name="sparkles" size={16} color="#FDE68A" />
          </Animated.View>
        </View>

        {/* Top Header Bar with Logo and Skip Button */}
        <View style={[styles.topHeader, { paddingTop: topClearance + 8 }]}>
          <View style={styles.headerLeft}>
            <HomeBazLogo size={42} variant="whiteOnPurple" />
          </View>

          <TouchableOpacity
            onPress={goToLogin}
            activeOpacity={0.75}
            style={styles.skipHeaderBtn}
          >
            <Text style={styles.skipHeaderText}>Skip to Login</Text>
            <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Hand-Moving Horizontal Scrollable Onboarding Carousel */}
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.carouselScrollView}
          contentContainerStyle={styles.carouselContent}
        >
          {SPLASH_SLIDES.map((slide) => (
            <View key={slide.id} style={styles.slidePage}>
              {/* Category Pill */}
              <View style={styles.slideBadgeRow}>
                <Ionicons name={slide.badgeIcon} size={15} color="#FDE047" />
                <Text style={styles.slideBadgeText}>{slide.badge}</Text>
              </View>

              {/* Dynamic Visual Illustration for each slide */}
              {renderIllustration(slide.type)}

              {/* Slide Headline & Description */}
              <View style={styles.textContainer}>
                <Text style={styles.slideTitle}>{slide.title}</Text>
                <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Bottom Interactive Navigation Area */}
        <View style={[styles.footerContainer, { paddingBottom: bottomClearance + 16 }]}>
          {/* Swipe Hint Indicator */}
          {activeIndex < SPLASH_SLIDES.length - 1 && (
            <View style={styles.swipeHintRow}>
              <Ionicons name="swap-horizontal" size={16} color="rgba(255, 255, 255, 0.75)" />
              <Text style={styles.swipeHintText}>Swipe with finger or tap Next</Text>
            </View>
          )}

          {/* Dynamic Pagination Dots */}
          <View style={styles.dotsRow}>
            {SPLASH_SLIDES.map((slide) => {
              const isActive = activeIndex === slide.id;
              return (
                <TouchableOpacity
                  key={slide.id}
                  onPress={() => {
                    scrollRef.current?.scrollTo({
                      x: slide.id * SCREEN_WIDTH,
                      animated: true,
                    });
                    setActiveIndex(slide.id);
                  }}
                  activeOpacity={0.8}
                  style={[styles.dot, isActive && styles.dotActive]}
                />
              );
            })}
          </View>

          {/* Action Button: Next or Get Started */}
          <TouchableOpacity
            style={[
              styles.actionButton,
              activeIndex === SPLASH_SLIDES.length - 1 && styles.actionButtonFinal,
            ]}
            onPress={handleNext}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.actionButtonText,
                activeIndex === SPLASH_SLIDES.length - 1 && styles.actionButtonFinalText,
              ]}
            >
              {activeIndex === SPLASH_SLIDES.length - 1
                ? 'Get Started  →'
                : 'Next  →'}
            </Text>
            {activeIndex === SPLASH_SLIDES.length - 1 && (
              <Ionicons name="arrow-forward" size={18} color="#4C28AA" style={{ marginLeft: 6 }} />
            )}
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#401E9E',
  },
  gradient: {
    flex: 1,
  },

  /* Ambient Aura Background Elements */
  bgAura1: {
    position: 'absolute',
    top: -80,
    left: -60,
    width: 320,
    height: 320,
  },
  bgAura2: {
    position: 'absolute',
    bottom: -60,
    right: -60,
    width: 340,
    height: 340,
  },
  auraGradientCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 170,
  },
  bgWaveSweep: {
    position: 'absolute',
    top: '32%',
    left: -SCREEN_WIDTH * 0.2,
    width: SCREEN_WIDTH * 1.4,
    height: 180,
  },
  waveGradient: {
    width: '100%',
    height: '100%',
  },

  /* Floating Twinkle Sparkles */
  sparkle1: {
    position: 'absolute',
    top: 95,
    right: 28,
  },
  sparkle2: {
    position: 'absolute',
    top: 220,
    left: 24,
  },
  sparkle3: {
    position: 'absolute',
    bottom: 260,
    right: 36,
  },
  sparkle4: {
    position: 'absolute',
    bottom: 180,
    left: 32,
  },

  /* Header */
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skipHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  skipHeaderText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginRight: 2,
  },
  carouselScrollView: {
    flex: 1,
  },
  carouselContent: {
    alignItems: 'center',
  },
  slidePage: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  slideBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
    gap: 6,
  },
  slideBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  illustrationSection: {
    width: SCREEN_WIDTH - 60,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 10,
  },
  backGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },
  storefront: {
    width: 176,
    height: 124,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  awning: {
    height: 38,
    flexDirection: 'row',
  },
  awningStripe: {
    flex: 1,
    height: '100%',
  },
  shopWindow: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    backgroundColor: '#F8F7FF',
  },
  windowGlass: {
    flex: 1,
    backgroundColor: '#DCD6F7',
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  windowReflection: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 4,
    bottom: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 2,
  },
  deliveryBoxLeft: {
    position: 'absolute',
    bottom: 20,
    left: 36,
    width: 48,
    height: 44,
    backgroundColor: '#F59E0B',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryBoxRight: {
    position: 'absolute',
    bottom: 20,
    right: 36,
    width: 52,
    height: 48,
    backgroundColor: '#D97706',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxTape: {
    width: 12,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  artisanCard: {
    width: 190,
    height: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
    position: 'relative',
  },
  potCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#EDE9FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sparkleBadgeTop: {
    position: 'absolute',
    top: 10,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedFloatingTag: {
    position: 'absolute',
    bottom: -10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    gap: 4,
    elevation: 4,
  },
  verifiedTagLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#065F46',
  },
  pickleJarGraphic: {
    position: 'absolute',
    bottom: 12,
    left: -20,
    width: 68,
    height: 56,
    backgroundColor: '#FFFBEB',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jarLid: {
    width: 44,
    height: 8,
    backgroundColor: '#B45309',
    borderRadius: 4,
    marginBottom: 2,
  },
  jarBody: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  jarText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#92400E',
  },
  deliveryCard: {
    width: 190,
    height: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
    position: 'relative',
  },
  scooterCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  payoutBadge: {
    position: 'absolute',
    bottom: -10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    gap: 4,
    elevation: 4,
  },
  payoutBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#065F46',
  },
  speedPill: {
    position: 'absolute',
    top: 8,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 3,
  },
  speedPillText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#B45309',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 14,
    paddingHorizontal: 12,
  },
  slideTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 30,
    letterSpacing: -0.4,
  },
  slideSubtitle: {
    fontSize: 13,
    color: '#E0D7FA',
    textAlign: 'center',
    lineHeight: 19,
    marginTop: 8,
    maxWidth: 310,
  },
  footerContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  swipeHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 14,
  },
  swipeHintText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '600',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  dotActive: {
    width: 24,
    backgroundColor: '#FFFFFF',
  },
  actionButton: {
    width: '100%',
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  actionButtonFinal: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  actionButtonFinalText: {
    color: '#4C28AA',
  },
});
