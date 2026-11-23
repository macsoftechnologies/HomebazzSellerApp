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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

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

  // Background Ambient Animations
  const auraAnim1 = useRef(new Animated.Value(0)).current;
  const auraAnim2 = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;

  // Center Card Floating Animation
  const floatAnim = useRef(new Animated.Value(0)).current;

  // FULL-PAGE CRACKERS & FIREWORKS FLOW ANIMATION SYSTEM
  const crackerWave1 = useRef(new Animated.Value(0)).current;
  const crackerWave2 = useRef(new Animated.Value(0)).current;
  const crackerWave3 = useRef(new Animated.Value(0)).current;
  const rocketStream = useRef(new Animated.Value(0)).current;
  const pageFlash = useRef(new Animated.Value(0)).current;
  const shockwavePulse = useRef(new Animated.Value(0)).current;
  const starTwinkle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Center card gentle float (2.6s)
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // 2. Full-Page Flash Light on Cracker Bursts (Celebratory Flash)
    const flashLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pageFlash, {
          toValue: 1,
          duration: 180,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(pageFlash, {
          toValue: 0.15,
          duration: 350,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pageFlash, {
          toValue: 0.75,
          duration: 160,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(pageFlash, {
          toValue: 0,
          duration: 900,
          easing: Easing.out(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.delay(1000),
      ])
    );

    // 3. Cracker Burst Wave 1: Sky & Upper Screen (2.2s loop)
    const burstLoop1 = Animated.loop(
      Animated.sequence([
        Animated.timing(crackerWave1, {
          toValue: 1,
          duration: 2100,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(crackerWave1, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    // 4. Cracker Burst Wave 2: Center & Sides Screen (2.2s loop staggered)
    const burstLoop2 = Animated.loop(
      Animated.sequence([
        Animated.delay(700),
        Animated.timing(crackerWave2, {
          toValue: 1,
          duration: 2100,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(crackerWave2, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    // 5. Cracker Burst Wave 3: Lower Screen & Ground Sparklers (2.2s loop staggered)
    const burstLoop3 = Animated.loop(
      Animated.sequence([
        Animated.delay(1400),
        Animated.timing(crackerWave3, {
          toValue: 1,
          duration: 2100,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(crackerWave3, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    // 6. Upward Flying Cracker Rockets Stream (1.9s loop)
    const rocketLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(rocketStream, {
          toValue: 1,
          duration: 1900,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(rocketStream, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    // 7. Firecracker Expanding Shockwave
    const shockwaveLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(shockwavePulse, {
          toValue: 1,
          duration: 2000,
          easing: Easing.out(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(shockwavePulse, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    // 8. Ambient gradient drift loops
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

    const starLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(starTwinkle, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(starTwinkle, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    floatLoop.start();
    flashLoop.start();
    burstLoop1.start();
    burstLoop2.start();
    burstLoop3.start();
    rocketLoop.start();
    shockwaveLoop.start();
    auraLoop1.start();
    auraLoop2.start();
    waveLoop.start();
    starLoop.start();

    return () => {
      floatLoop.stop();
      flashLoop.stop();
      burstLoop1.stop();
      burstLoop2.stop();
      burstLoop3.stop();
      rocketLoop.stop();
      shockwaveLoop.stop();
      auraLoop1.stop();
      auraLoop2.stop();
      waveLoop.stop();
      starLoop.stop();
    };
  }, [
    floatAnim,
    pageFlash,
    crackerWave1,
    crackerWave2,
    crackerWave3,
    rocketStream,
    shockwavePulse,
    auraAnim1,
    auraAnim2,
    waveAnim,
    starTwinkle,
  ]);

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

  // FULL-PAGE CRACKERS & CELEBRATION FLASH ENGINE
  const renderFullPageCrackers = () => {
    // Group 1: Upper Sky Bursts (Top-Left & Top-Right)
    const topSkySparks = [
      // Top-Left Cluster (around x: 22%, y: 12%)
      { cx: SCREEN_WIDTH * 0.22, cy: SCREEN_HEIGHT * 0.13, dx: 45, dy: -35, icon: 'sparkles' as const, color: '#FDE047', size: 20 },
      { cx: SCREEN_WIDTH * 0.22, cy: SCREEN_HEIGHT * 0.13, dx: -40, dy: -30, icon: 'flash' as const, color: '#F59E0B', size: 18 },
      { cx: SCREEN_WIDTH * 0.22, cy: SCREEN_HEIGHT * 0.13, dx: 50, dy: 35, icon: 'star' as const, color: '#F472B6', size: 16 },
      { cx: SCREEN_WIDTH * 0.22, cy: SCREEN_HEIGHT * 0.13, dx: -45, dy: 40, icon: 'sparkles' as const, color: '#38BDF8', size: 18 },
      { cx: SCREEN_WIDTH * 0.22, cy: SCREEN_HEIGHT * 0.13, dx: 0, dy: -55, icon: 'sparkles' as const, color: '#FDE047', size: 22 },

      // Top-Right Cluster (around x: 78%, y: 15%)
      { cx: SCREEN_WIDTH * 0.78, cy: SCREEN_HEIGHT * 0.15, dx: 50, dy: -40, icon: 'flash' as const, color: '#F59E0B', size: 22 },
      { cx: SCREEN_WIDTH * 0.78, cy: SCREEN_HEIGHT * 0.15, dx: -50, dy: -35, icon: 'sparkles' as const, color: '#FDE047', size: 20 },
      { cx: SCREEN_WIDTH * 0.78, cy: SCREEN_HEIGHT * 0.15, dx: 40, dy: 45, icon: 'sparkles' as const, color: '#34D399', size: 18 },
      { cx: SCREEN_WIDTH * 0.78, cy: SCREEN_HEIGHT * 0.15, dx: -45, dy: 40, icon: 'star' as const, color: '#F472B6', size: 16 },
      { cx: SCREEN_WIDTH * 0.78, cy: SCREEN_HEIGHT * 0.15, dx: 0, dy: 55, icon: 'sparkles' as const, color: '#FACC15', size: 20 },
    ];

    // Group 2: Mid-Screen & Card Flank Bursts (Center-Left & Center-Right)
    const midScreenSparks = [
      // Left of center card (around x: 14%, y: 42%)
      { cx: SCREEN_WIDTH * 0.14, cy: SCREEN_HEIGHT * 0.42, dx: 45, dy: -45, icon: 'sparkles' as const, color: '#38BDF8', size: 22 },
      { cx: SCREEN_WIDTH * 0.14, cy: SCREEN_HEIGHT * 0.42, dx: -35, dy: -35, icon: 'flash' as const, color: '#FDE047', size: 20 },
      { cx: SCREEN_WIDTH * 0.14, cy: SCREEN_HEIGHT * 0.42, dx: 40, dy: 45, icon: 'star' as const, color: '#F59E0B', size: 18 },
      { cx: SCREEN_WIDTH * 0.14, cy: SCREEN_HEIGHT * 0.42, dx: -40, dy: 35, icon: 'sparkles' as const, color: '#34D399', size: 18 },

      // Right of center card (around x: 86%, y: 44%)
      { cx: SCREEN_WIDTH * 0.86, cy: SCREEN_HEIGHT * 0.44, dx: 45, dy: -40, icon: 'flash' as const, color: '#F59E0B', size: 22 },
      { cx: SCREEN_WIDTH * 0.86, cy: SCREEN_HEIGHT * 0.44, dx: -45, dy: -35, icon: 'sparkles' as const, color: '#F472B6', size: 20 },
      { cx: SCREEN_WIDTH * 0.86, cy: SCREEN_HEIGHT * 0.44, dx: 40, dy: 45, icon: 'sparkles' as const, color: '#FDE047', size: 18 },
      { cx: SCREEN_WIDTH * 0.86, cy: SCREEN_HEIGHT * 0.44, dx: -35, dy: 40, icon: 'star' as const, color: '#38BDF8', size: 16 },

      // High Center Burst (behind top of card)
      { cx: SCREEN_WIDTH * 0.5, cy: SCREEN_HEIGHT * 0.31, dx: 60, dy: -55, icon: 'sparkles' as const, color: '#FDE047', size: 22 },
      { cx: SCREEN_WIDTH * 0.5, cy: SCREEN_HEIGHT * 0.31, dx: -60, dy: -55, icon: 'flash' as const, color: '#F59E0B', size: 22 },
      { cx: SCREEN_WIDTH * 0.5, cy: SCREEN_HEIGHT * 0.31, dx: 0, dy: -70, icon: 'sparkles' as const, color: '#FFFFFF', size: 24 },
    ];

    // Group 3: Lower Screen Bursts (Bottom-Left & Bottom-Right above footer)
    const lowerScreenSparks = [
      // Bottom-Left (around x: 20%, y: 72%)
      { cx: SCREEN_WIDTH * 0.20, cy: SCREEN_HEIGHT * 0.72, dx: 45, dy: -40, icon: 'sparkles' as const, color: '#FDE047', size: 20 },
      { cx: SCREEN_WIDTH * 0.20, cy: SCREEN_HEIGHT * 0.72, dx: -40, dy: -35, icon: 'star' as const, color: '#34D399', size: 18 },
      { cx: SCREEN_WIDTH * 0.20, cy: SCREEN_HEIGHT * 0.72, dx: 35, dy: 40, icon: 'flash' as const, color: '#F59E0B', size: 18 },
      { cx: SCREEN_WIDTH * 0.20, cy: SCREEN_HEIGHT * 0.72, dx: -35, dy: 35, icon: 'sparkles' as const, color: '#F472B6', size: 16 },

      // Bottom-Right (around x: 80%, y: 70%)
      { cx: SCREEN_WIDTH * 0.80, cy: SCREEN_HEIGHT * 0.70, dx: 45, dy: -40, icon: 'flash' as const, color: '#F59E0B', size: 20 },
      { cx: SCREEN_WIDTH * 0.80, cy: SCREEN_HEIGHT * 0.70, dx: -45, dy: -35, icon: 'sparkles' as const, color: '#FDE047', size: 22 },
      { cx: SCREEN_WIDTH * 0.80, cy: SCREEN_HEIGHT * 0.70, dx: 35, dy: 40, icon: 'sparkles' as const, color: '#38BDF8', size: 18 },
      { cx: SCREEN_WIDTH * 0.80, cy: SCREEN_HEIGHT * 0.70, dx: -35, dy: 35, icon: 'star' as const, color: '#FDE047', size: 16 },
    ];

    // Rockets shooting up across the full page
    const risingRockets = [
      { startX: SCREEN_WIDTH * 0.16, startY: SCREEN_HEIGHT * 0.85, travelY: -SCREEN_HEIGHT * 0.65, color: '#FDE047', size: 18 },
      { startX: SCREEN_WIDTH * 0.38, startY: SCREEN_HEIGHT * 0.88, travelY: -SCREEN_HEIGHT * 0.58, color: '#F59E0B', size: 20 },
      { startX: SCREEN_WIDTH * 0.62, startY: SCREEN_HEIGHT * 0.88, travelY: -SCREEN_HEIGHT * 0.60, color: '#F472B6', size: 18 },
      { startX: SCREEN_WIDTH * 0.84, startY: SCREEN_HEIGHT * 0.85, travelY: -SCREEN_HEIGHT * 0.62, color: '#38BDF8', size: 20 },
    ];

    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {/* Full-Page Festive Cracker Flash Layer */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: '#FFE566',
              opacity: pageFlash.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.22],
              }),
            },
          ]}
        />

        {/* Central Firecracker Shockwave Pulse */}
        <Animated.View
          style={[
            styles.fullPageShockwaveRing,
            {
              top: SCREEN_HEIGHT * 0.38 - 140,
              left: SCREEN_WIDTH * 0.5 - 140,
              transform: [
                {
                  scale: shockwavePulse.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.65, 1.6],
                  }),
                },
              ],
              opacity: shockwavePulse.interpolate({
                inputRange: [0, 0.35, 1],
                outputRange: [0.65, 0.35, 0],
              }),
            },
          ]}
        />

        {/* Wave 1: Sky Bursts */}
        {topSkySparks.map((spark, idx) => (
          <Animated.View
            key={`top-sky-${idx}`}
            style={[
              styles.absoluteSpark,
              {
                left: spark.cx,
                top: spark.cy,
                transform: [
                  {
                    translateX: crackerWave1.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, spark.dx],
                    }),
                  },
                  {
                    translateY: crackerWave1.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, spark.dy],
                    }),
                  },
                  {
                    scale: crackerWave1.interpolate({
                      inputRange: [0, 0.3, 0.7, 1],
                      outputRange: [0.2, 1.45, 1.1, 0.3],
                    }),
                  },
                  {
                    rotate: crackerWave1.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', `${(idx % 2 === 0 ? 1 : -1) * 120}deg`],
                    }),
                  },
                ],
                opacity: crackerWave1.interpolate({
                  inputRange: [0, 0.15, 0.75, 1],
                  outputRange: [0, 1, 0.85, 0],
                }),
              },
            ]}
          >
            <Ionicons name={spark.icon} size={spark.size} color={spark.color} />
          </Animated.View>
        ))}

        {/* Wave 2: Mid-Screen Flank Bursts */}
        {midScreenSparks.map((spark, idx) => (
          <Animated.View
            key={`mid-screen-${idx}`}
            style={[
              styles.absoluteSpark,
              {
                left: spark.cx,
                top: spark.cy,
                transform: [
                  {
                    translateX: crackerWave2.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, spark.dx],
                    }),
                  },
                  {
                    translateY: crackerWave2.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, spark.dy],
                    }),
                  },
                  {
                    scale: crackerWave2.interpolate({
                      inputRange: [0, 0.3, 0.7, 1],
                      outputRange: [0.2, 1.4, 1.05, 0.3],
                    }),
                  },
                  {
                    rotate: crackerWave2.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', `${(idx % 2 === 0 ? -1 : 1) * 90}deg`],
                    }),
                  },
                ],
                opacity: crackerWave2.interpolate({
                  inputRange: [0, 0.15, 0.7, 1],
                  outputRange: [0, 1, 0.85, 0],
                }),
              },
            ]}
          >
            <Ionicons name={spark.icon} size={spark.size} color={spark.color} />
          </Animated.View>
        ))}

        {/* Wave 3: Lower Screen Bursts */}
        {lowerScreenSparks.map((spark, idx) => (
          <Animated.View
            key={`lower-screen-${idx}`}
            style={[
              styles.absoluteSpark,
              {
                left: spark.cx,
                top: spark.cy,
                transform: [
                  {
                    translateX: crackerWave3.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, spark.dx],
                    }),
                  },
                  {
                    translateY: crackerWave3.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, spark.dy],
                    }),
                  },
                  {
                    scale: crackerWave3.interpolate({
                      inputRange: [0, 0.3, 0.7, 1],
                      outputRange: [0.2, 1.35, 1.0, 0.25],
                    }),
                  },
                ],
                opacity: crackerWave3.interpolate({
                  inputRange: [0, 0.15, 0.7, 1],
                  outputRange: [0, 1, 0.8, 0],
                }),
              },
            ]}
          >
            <Ionicons name={spark.icon} size={spark.size} color={spark.color} />
          </Animated.View>
        ))}

        {/* Upward Flying Rocket Sparks Across Entire Height */}
        {risingRockets.map((rocket, idx) => (
          <Animated.View
            key={`rocket-${idx}`}
            style={[
              styles.absoluteSpark,
              {
                left: rocket.startX,
                top: rocket.startY,
                transform: [
                  {
                    translateY: rocketStream.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, rocket.travelY],
                    }),
                  },
                  {
                    scale: rocketStream.interpolate({
                      inputRange: [0, 0.4, 0.8, 1],
                      outputRange: [0.4, 1.3, 0.9, 0.2],
                    }),
                  },
                ],
                opacity: rocketStream.interpolate({
                  inputRange: [0, 0.1, 0.7, 1],
                  outputRange: [0, 0.95, 0.7, 0],
                }),
              },
            ]}
          >
            <Ionicons name="sparkles" size={rocket.size} color={rocket.color} />
          </Animated.View>
        ))}
      </View>
    );
  };

  // Render the Compact Best View Center Card (Reduced Size & Centered)
  const renderIllustration = (type: SplashSlide['type']) => {
    return (
      <View style={styles.centerStageWrapper}>
        <Animated.View
          style={[
            styles.compactCardContainer,
            {
              transform: [
                {
                  translateY: floatAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-5, 5],
                  }),
                },
              ],
            },
          ]}
        >
          {/* Card 1: Grow Your Business (Compact Luxury Card) */}
          {type === 'store' && (
            <View style={styles.showcaseCardCompact}>
              {/* Compact Header Strip */}
              <LinearGradient
                colors={['#FEF3C7', '#EDE9FE', '#FFFFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.cardTopBannerCompact}
              >
                <View style={styles.cardHeaderBadgeCompact}>
                  <Ionicons name="sparkles" size={11} color="#D97706" />
                  <Text style={styles.cardHeaderBadgeTextCompact}>VERIFIED SELLER</Text>
                </View>
                <View style={styles.liveOrdersPillCompact}>
                  <View style={styles.livePulseDot} />
                  <Text style={styles.liveOrdersTextCompact}>Active Kitchen</Text>
                </View>
              </LinearGradient>

              {/* Compact Body */}
              <View style={styles.cardMainBodyCompact}>
                <View style={styles.storeProfileRowCompact}>
                  <View style={styles.storeAvatarSquircleCompact}>
                    <LinearGradient
                      colors={['#8B5CF6', '#6C5CE7']}
                      style={styles.storeAvatarGradCompact}
                    >
                      <Ionicons name="storefront" size={20} color="#FFFFFF" />
                    </LinearGradient>
                    <View style={styles.goldStarBadgeCompact}>
                      <Ionicons name="star" size={8} color="#FFFFFF" />
                    </View>
                  </View>

                  <View style={styles.storeTextColCompact}>
                    <Text style={styles.storeNameTextCompact} numberOfLines={1}>
                      Amrutha Homemade Foods
                    </Text>
                    <Text style={styles.storeSpecTextCompact} numberOfLines={1}>
                      Authentic Andhra Pickles & Podis
                    </Text>
                    <View style={styles.ratingRowCompact}>
                      <Ionicons name="star" size={11} color="#F59E0B" />
                      <Text style={styles.ratingScoreCompact}>4.9</Text>
                      <Text style={styles.reviewCountCompact}>(1.2k+)</Text>
                      <View style={styles.fssaiTagCompact}>
                        <Ionicons name="shield-checkmark" size={10} color="#059669" />
                        <Text style={styles.fssaiTagTextCompact}>FSSAI</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Compact Stats Strip */}
                <View style={styles.performanceStripCompact}>
                  <View style={styles.perfItemCompact}>
                    <Text style={styles.perfValueCompact}>₹54.2k</Text>
                    <Text style={styles.perfLabelCompact}>Weekly</Text>
                  </View>
                  <View style={styles.perfDividerCompact} />
                  <View style={styles.perfItemCompact}>
                    <Text style={styles.perfValueCompact}>100%</Text>
                    <Text style={styles.perfLabelCompact}>Homemade</Text>
                  </View>
                  <View style={styles.perfDividerCompact} />
                  <View style={styles.perfItemCompact}>
                    <Text style={[styles.perfValueCompact, { color: '#059669' }]}>₹0</Text>
                    <Text style={styles.perfLabelCompact}>Reg Fee</Text>
                  </View>
                </View>
              </View>

              {/* Compact Bottom Notification */}
              <View style={styles.floatingOrderAlertCompact}>
                <Ionicons name="flame" size={12} color="#D97706" />
                <Text style={styles.floatingOrderAlertTextCompact}>
                  18 fresh orders dispatched today
                </Text>
              </View>
            </View>
          )}

          {/* Card 2: 100% Homemade & Quality Assured */}
          {type === 'handmade' && (
            <View style={styles.showcaseCardCompact}>
              <LinearGradient
                colors={['#ECFDF5', '#EDE9FE', '#FFFFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.cardTopBannerCompact}
              >
                <View style={[styles.cardHeaderBadgeCompact, { backgroundColor: '#D1FAE5' }]}>
                  <Ionicons name="shield-checkmark" size={11} color="#059669" />
                  <Text style={[styles.cardHeaderBadgeTextCompact, { color: '#065F46' }]}>
                    HERITAGE QUALITY
                  </Text>
                </View>
                <View style={[styles.liveOrdersPillCompact, { backgroundColor: '#F0FDF4' }]}>
                  <Text style={[styles.liveOrdersTextCompact, { color: '#166534' }]}>Lab Verified</Text>
                </View>
              </LinearGradient>

              <View style={styles.cardMainBodyCompact}>
                <View style={styles.storeProfileRowCompact}>
                  <View style={styles.storeAvatarSquircleCompact}>
                    <LinearGradient
                      colors={['#10B981', '#059669']}
                      style={styles.storeAvatarGradCompact}
                    >
                      <Ionicons name="restaurant" size={20} color="#FFFFFF" />
                    </LinearGradient>
                    <View style={[styles.goldStarBadgeCompact, { backgroundColor: '#F59E0B' }]}>
                      <Ionicons name="ribbon" size={8} color="#FFFFFF" />
                    </View>
                  </View>

                  <View style={styles.storeTextColCompact}>
                    <Text style={styles.storeNameTextCompact} numberOfLines={1}>
                      Traditional Recipe
                    </Text>
                    <Text style={styles.storeSpecTextCompact} numberOfLines={1}>
                      Wood-Pressed Oils & Spices
                    </Text>
                    <View style={styles.badgeChipsRowCompact}>
                      <View style={styles.purityChipCompact}>
                        <Text style={styles.purityChipTextCompact}>Zero Preservatives</Text>
                      </View>
                      <View style={styles.purityChipCompact}>
                        <Text style={styles.purityChipTextCompact}>Clay Aged</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.performanceStripCompact}>
                  <View style={styles.perfItemCompact}>
                    <Ionicons name="heart" size={15} color="#EF4444" />
                    <Text style={styles.perfLabelCompact}>Handmade</Text>
                  </View>
                  <View style={styles.perfDividerCompact} />
                  <View style={styles.perfItemCompact}>
                    <Ionicons name="leaf" size={15} color="#10B981" />
                    <Text style={styles.perfLabelCompact}>100% Pure</Text>
                  </View>
                  <View style={styles.perfDividerCompact} />
                  <View style={styles.perfItemCompact}>
                    <Ionicons name="shield-checkmark" size={15} color="#6C5CE7" />
                    <Text style={styles.perfLabelCompact}>Certified</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.floatingOrderAlertCompact, { backgroundColor: '#F0FDF4', borderColor: '#DCFCE7' }]}>
                <Ionicons name="checkmark-circle" size={12} color="#059669" />
                <Text style={[styles.floatingOrderAlertTextCompact, { color: '#166534' }]}>
                  Quality checked for buyer trust
                </Text>
              </View>
            </View>
          )}

          {/* Card 3: Zero Delivery Hassles & Fast Weekly Payouts */}
          {type === 'delivery' && (
            <View style={styles.showcaseCardCompact}>
              <LinearGradient
                colors={['#EEF2FF', '#FEF3C7', '#FFFFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.cardTopBannerCompact}
              >
                <View style={[styles.cardHeaderBadgeCompact, { backgroundColor: '#E0E7FF' }]}>
                  <Ionicons name="bicycle" size={11} color="#4F46E5" />
                  <Text style={[styles.cardHeaderBadgeTextCompact, { color: '#3730A3' }]}>
                    DOORSTEP PICKUP
                  </Text>
                </View>
                <View style={[styles.liveOrdersPillCompact, { backgroundColor: '#FEF3C7' }]}>
                  <Text style={[styles.liveOrdersTextCompact, { color: '#B45309' }]}>Weekly Bank</Text>
                </View>
              </LinearGradient>

              <View style={styles.cardMainBodyCompact}>
                <View style={styles.storeProfileRowCompact}>
                  <View style={styles.storeAvatarSquircleCompact}>
                    <LinearGradient
                      colors={['#6366F1', '#4F46E5']}
                      style={styles.storeAvatarGradCompact}
                    >
                      <Ionicons name="bicycle" size={20} color="#FFFFFF" />
                    </LinearGradient>
                    <View style={[styles.goldStarBadgeCompact, { backgroundColor: '#10B981' }]}>
                      <Ionicons name="flash" size={8} color="#FFFFFF" />
                    </View>
                  </View>

                  <View style={styles.storeTextColCompact}>
                    <Text style={styles.storeNameTextCompact} numberOfLines={1}>
                      Rider Kitchen Pickup
                    </Text>
                    <Text style={styles.storeSpecTextCompact} numberOfLines={1}>
                      Automated Doorstep Logistics
                    </Text>
                    <View style={styles.badgeChipsRowCompact}>
                      <View style={[styles.purityChipCompact, { backgroundColor: '#FEF3C7' }]}>
                        <Text style={[styles.purityChipTextCompact, { color: '#92400E' }]}>
                          Monday Pay
                        </Text>
                      </View>
                      <View style={[styles.purityChipCompact, { backgroundColor: '#E0E7FF' }]}>
                        <Text style={[styles.purityChipTextCompact, { color: '#3730A3' }]}>
                          Direct NEFT
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.performanceStripCompact}>
                  <View style={styles.perfItemCompact}>
                    <Text style={styles.perfValueCompact}>0 min</Text>
                    <Text style={styles.perfLabelCompact}>Effort</Text>
                  </View>
                  <View style={styles.perfDividerCompact} />
                  <View style={styles.perfItemCompact}>
                    <Text style={styles.perfValueCompact}>100%</Text>
                    <Text style={styles.perfLabelCompact}>Insured</Text>
                  </View>
                  <View style={styles.perfDividerCompact} />
                  <View style={styles.perfItemCompact}>
                    <Text style={[styles.perfValueCompact, { color: '#059669' }]}>Monday</Text>
                    <Text style={styles.perfLabelCompact}>Payout</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.floatingOrderAlertCompact, { backgroundColor: '#EEF2FF', borderColor: '#E0E7FF' }]}>
                <Ionicons name="wallet-outline" size={12} color="#4F46E5" />
                <Text style={[styles.floatingOrderAlertTextCompact, { color: '#3730A3' }]}>
                  Weekly direct bank deposits guaranteed
                </Text>
              </View>
            </View>
          )}
        </Animated.View>
      </View>
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
          {/* Ambient Glow Beam 1 */}
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

          {/* Ambient Glow Beam 2 */}
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

          {/* Ambient Star Twinkles */}
          <Animated.View
            style={[
              styles.sparkle1,
              {
                opacity: starTwinkle.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.4, 0.95, 0.4],
                }),
              },
            ]}
          >
            <Ionicons name="sparkles" size={18} color="#FDE047" />
          </Animated.View>
        </View>

        {/* FULL PAGE FESTIVE CRACKERS & FIREWORKS BURSTS (COVERING COMPLETE PAGE) */}
        {renderFullPageCrackers()}

        {/* Top Header Bar with Logo and Skip Button */}
        <View style={[styles.topHeader, { paddingTop: topClearance + 6 }]}>
          <View style={styles.headerLeft}>
            <HomeBazLogo size={40} variant="whiteOnPurple" />
          </View>

          <TouchableOpacity
            onPress={goToLogin}
            activeOpacity={0.75}
            style={styles.skipHeaderBtn}
          >
            <Text style={styles.skipHeaderText}>Skip to Login</Text>
            <Ionicons name="chevron-forward" size={15} color="#FFFFFF" />
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
                <Ionicons name={slide.badgeIcon} size={14} color="#FDE047" />
                <Text style={styles.slideBadgeText}>{slide.badge}</Text>
              </View>

              {/* Reduced Compact Main Card (Centered) */}
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
        <View style={[styles.footerContainer, { paddingBottom: bottomClearance + 12 }]}>
          {/* Swipe Hint Indicator */}
          {activeIndex < SPLASH_SLIDES.length - 1 && (
            <View style={styles.swipeHintRow}>
              <Ionicons name="swap-horizontal" size={15} color="rgba(255, 255, 255, 0.75)" />
              <Text style={styles.swipeHintText}>Swipe or tap Next</Text>
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

  /* Full Page Crackers Flash & Shockwave */
  fullPageShockwaveRing: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 2.5,
    borderColor: 'rgba(253, 224, 71, 0.7)',
    backgroundColor: 'rgba(253, 224, 71, 0.08)',
  },
  absoluteSpark: {
    position: 'absolute',
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
  sparkle1: {
    position: 'absolute',
    top: 95,
    right: 28,
  },

  /* Header */
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  skipHeaderText: {
    color: '#FFFFFF',
    fontSize: 12.5,
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
    paddingHorizontal: 16,
  },
  slideBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 18,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
    gap: 5,
  },
  slideBadgeText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },

  /* Center Stage Container */
  centerStageWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 4,
  },

  /* REDUCED SIZE COMPACT SHOWCASE CARD */
  compactCardContainer: {
    width: Math.min(SCREEN_WIDTH - 76, 290),
    zIndex: 2,
  },
  showcaseCardCompact: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.24,
    shadowRadius: 16,
    elevation: 10,
  },
  cardTopBannerCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F0ECFA',
  },
  cardHeaderBadgeCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: '#FEF3C7',
  },
  cardHeaderBadgeTextCompact: {
    fontSize: 9,
    fontWeight: '800',
    color: '#B45309',
    letterSpacing: 0.4,
  },
  liveOrdersPillCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: '#F5F3FF',
  },
  livePulseDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#10B981',
  },
  liveOrdersTextCompact: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#6C5CE7',
  },
  cardMainBodyCompact: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  storeProfileRowCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  storeAvatarSquircleCompact: {
    position: 'relative',
    marginRight: 9,
  },
  storeAvatarGradCompact: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goldStarBadgeCompact: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#F59E0B',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeTextColCompact: {
    flex: 1,
  },
  storeNameTextCompact: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E1B4B',
    marginBottom: 1,
    letterSpacing: -0.2,
  },
  storeSpecTextCompact: {
    fontSize: 10.5,
    color: '#6B7280',
    marginBottom: 2,
  },
  ratingRowCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingScoreCompact: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1F2937',
  },
  reviewCountCompact: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  fssaiTagCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
    marginLeft: 4,
  },
  fssaiTagTextCompact: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#059669',
  },
  badgeChipsRowCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  purityChipCompact: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 4,
  },
  purityChipTextCompact: {
    fontSize: 8.5,
    fontWeight: '700',
    color: '#4B5563',
  },
  performanceStripCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F8F9FE',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#EDE9FE',
  },
  perfItemCompact: {
    alignItems: 'center',
    flex: 1,
  },
  perfDividerCompact: {
    width: 1,
    height: 18,
    backgroundColor: '#E5E7EB',
  },
  perfValueCompact: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#1E1B4B',
    marginBottom: 1,
  },
  perfLabelCompact: {
    fontSize: 8.5,
    fontWeight: '600',
    color: '#6B7280',
  },
  floatingOrderAlertCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFBEB',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#FEF3C7',
    justifyContent: 'center',
  },
  floatingOrderAlertTextCompact: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#92400E',
  },

  /* Text & Footer */
  textContainer: {
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 12,
  },
  slideTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
    letterSpacing: -0.4,
  },
  slideSubtitle: {
    fontSize: 12.5,
    color: '#E0D7FA',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 5,
    maxWidth: 310,
  },
  footerContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  swipeHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 3.5,
    borderRadius: 12,
  },
  swipeHintText: {
    fontSize: 10.5,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '600',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 12,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  dotActive: {
    width: 22,
    backgroundColor: '#FFFFFF',
  },
  actionButton: {
    width: '100%',
    height: 50,
    borderRadius: 15,
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
    fontSize: 15.5,
    fontWeight: '800',
  },
  actionButtonFinalText: {
    color: '#4C28AA',
  },
});
