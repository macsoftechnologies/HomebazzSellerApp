import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AppImages } from '@/constants/images';

export interface CircleLoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  style?: ViewStyle;
}

export const CircleLoader: React.FC<CircleLoaderProps> = ({
  size = 'small',
  color = '#6C5CE7',
  style,
}) => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinLoop = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 850,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spinLoop.start();
    return () => spinLoop.stop();
  }, [spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const isSmall = size === 'small';
  const isLarge = size === 'large';
  const diameter = isSmall ? 28 : isLarge ? 48 : 38;
  const borderWidth = isSmall ? 2.5 : 3.5;

  return (
    <View style={[styles.inlineLoaderContainer, { width: diameter, height: diameter }, style]}>
      {/* Subtle track ring */}
      <View
        style={[
          styles.inlineTrackRing,
          {
            width: diameter,
            height: diameter,
            borderRadius: diameter / 2,
            borderWidth,
          },
        ]}
      />

      {/* Rotating clean single-brand arc */}
      <Animated.View
        style={[
          styles.inlineSpinRing,
          {
            width: diameter,
            height: diameter,
            borderRadius: diameter / 2,
            borderWidth,
            borderTopColor: color,
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: color,
            transform: [{ rotate: spin }],
          },
        ]}
      />
    </View>
  );
};

export interface ScreenCenterLoaderProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

export const ScreenCenterLoader: React.FC<ScreenCenterLoaderProps> = ({
  message = 'Loading Partner Dashboard...',
  backgroundColor = '#F8F9FE',
  style,
}) => {
  // Continuous sweep animation for linear progress bar
  const sweepAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const sweepLoop = Animated.loop(
      Animated.timing(sweepAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    );

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 700,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    sweepLoop.start();
    pulseLoop.start();

    return () => {
      sweepLoop.stop();
      pulseLoop.stop();
    };
  }, [sweepAnim, pulseAnim]);

  const sweepTranslate = sweepAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-40, 105],
  });

  return (
    <View style={[styles.screenCenter, { backgroundColor }, style]}>
      <View style={styles.loaderCard}>
        {/* Top Brand Accent Ribbon */}
        <LinearGradient
          colors={['#8A65F2', '#6C5CE7', '#47229E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.cardTopAccent}
        />

        {/* Brand Logo Display */}
        <View style={styles.logoWrapper}>
          <Image
            source={AppImages.logoClean}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Sleek Linear Shimmer Beam Track (NO BALLS/CIRCLES) */}
        <View style={styles.progressBarTrack}>
          <Animated.View
            style={[
              styles.progressBarBeam,
              {
                transform: [{ translateX: sweepTranslate }],
              },
            ]}
          >
            <LinearGradient
              colors={['transparent', '#8A65F2', '#6C5CE7', '#A29BFE', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.fillAbsolute}
            />
          </Animated.View>
        </View>

        {/* Loading Message & Subtle Golden Twinkle Sparkle */}
        <View style={styles.statusRow}>
          <Animated.View style={{ opacity: pulseAnim }}>
            <Ionicons name="sparkles" size={10} color="#F59E0B" />
          </Animated.View>
          <Text style={styles.messageText} numberOfLines={1}>
            {message}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  /* Full-Screen Branded Page Loader Styles */
  screenCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loaderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECE7F8',
    shadowColor: '#280F65',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
    width: '100%',
    maxWidth: 185,
    overflow: 'hidden',
    position: 'relative',
  },
  cardTopAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2.5,
  },
  logoWrapper: {
    height: 22,
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 8,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  progressBarTrack: {
    width: 95,
    height: 2.5,
    backgroundColor: '#EFEBF8',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarBeam: {
    width: 40,
    height: '100%',
  },
  fillAbsolute: {
    width: '100%',
    height: '100%',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  messageText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#78738F',
    letterSpacing: 0.1,
  },

  /* Compact Inline Circle Loader Styles */
  inlineLoaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  inlineTrackRing: {
    position: 'absolute',
    borderColor: '#EAE7F6',
  },
  inlineSpinRing: {
    position: 'absolute',
  },
});
