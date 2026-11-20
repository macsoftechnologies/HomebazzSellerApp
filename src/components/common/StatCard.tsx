import { HomeBazColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type GradientTuple = readonly [string, string, ...string[]];

interface CardTheme {
  gradientColors: GradientTuple;
  borderColor: string;
  stripeColors: GradientTuple;
  iconColor: string;
  badgeBg: string;
  defaultTrend: string;
  trendBg: string;
  trendColor: string;
  shadowColor: string;
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  badgeBg?: string;
  subtitle?: string;
  onPress?: () => void;
  index?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  iconColor,
  badgeBg,
  subtitle,
  onPress,
  index = 0,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Keyframe light sheen sweeping complete left-to-right and right-to-left
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 2400 + (index % 2) * 200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 2400 + (index % 2) * 200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    shimmerLoop.start();
    return () => shimmerLoop.stop();
  }, [shimmerAnim, index]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 50,
      useNativeDriver: true,
    }).start();
  };

  // Distinct horizontal gradient: left is light, right is darker accent tint
  const getTheme = (): CardTheme => {
    switch (label.toLowerCase()) {
      case 'orders':
        return {
          gradientColors: ['#FFFFFF', '#F5F1FE', '#E4D9FB'],
          borderColor: '#DFD5F8',
          stripeColors: ['#6C5CE7', '#8E7EF3'],
          iconColor: '#6C5CE7',
          badgeBg: '#EDE9FE',
          defaultTrend: '▲ +12% today',
          trendBg: '#F0EDFC',
          trendColor: '#6C5CE7',
          shadowColor: '#6C5CE7',
        };
      case 'products':
        return {
          gradientColors: ['#FFFFFF', '#F1F6FE', '#DBE8FC'],
          borderColor: '#CBE0FA',
          stripeColors: ['#3B82F6', '#60A5FA'],
          iconColor: '#2563EB',
          badgeBg: '#EFF6FF',
          defaultTrend: '16 items',
          trendBg: '#DBEAFE',
          trendColor: '#1D4ED8',
          shadowColor: '#3B82F6',
        };
      case 'revenue':
        return {
          gradientColors: ['#FFFFFF', '#F0FDF6', '#D2F8E0'],
          borderColor: '#B9F1CD',
          stripeColors: ['#10B981', '#34D399'],
          iconColor: '#059669',
          badgeBg: '#ECFDF5',
          defaultTrend: '▲ +18% MoM',
          trendBg: '#D1FAE5',
          trendColor: '#047857',
          shadowColor: '#059669',
        };
      case 'pending':
        return {
          gradientColors: ['#FFFFFF', '#FFFDF0', '#FDEBBF'],
          borderColor: '#FCE09D',
          stripeColors: ['#F59E0B', '#FBBF24'],
          iconColor: '#D97706',
          badgeBg: '#FEF3C7',
          defaultTrend: '⚡ Action req',
          trendBg: '#FEF3C7',
          trendColor: '#B45309',
          shadowColor: '#D97706',
        };
      default:
        return {
          gradientColors: ['#FFFFFF', '#F8F6FD', '#ECE7FB'],
          borderColor: '#E7E2F6',
          stripeColors: ['#6C5CE7', '#8E7EF3'],
          iconColor: iconColor || HomeBazColors.primary,
          badgeBg: badgeBg || HomeBazColors.primarySoft,
          defaultTrend: '',
          trendBg: '#F3EFFF',
          trendColor: '#6C5CE7',
          shadowColor: '#1C1342',
        };
    }
  };

  const theme = getTheme();
  const trendText = subtitle || theme.defaultTrend;

  // Complete Keyframe Shimmer Light Sheen: sweeps left to right (-80px to 180px) and back
  const shimmerTranslateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-80, 180],
  });

  return (
    <Animated.View
      style={[
        styles.cardOuter,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.touchableCard,
          {
            borderColor: theme.borderColor,
            shadowColor: theme.shadowColor,
          },
        ]}
      >
        <LinearGradient
          colors={theme.gradientColors}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.cardGradient}
        >
          {/* Subtle Left Accent Line */}
          <LinearGradient
            colors={theme.stripeColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.cardStripe}
          />

          {/* Keyframe Shimmer Light Sheen (Left-to-Right and Right-to-Left) */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.shimmerStreak,
              {
                transform: [
                  { translateX: shimmerTranslateX },
                  { rotate: '25deg' },
                ],
                opacity: shimmerAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.15, 0.65, 0.15],
                }),
              },
            ]}
          >
            <LinearGradient
              colors={['transparent', 'rgba(255, 255, 255, 0.55)', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.shimmerGradient}
            />
          </Animated.View>

          <View style={styles.cardContent}>
            <View style={styles.topRow}>
              <View style={[styles.iconCircle, { backgroundColor: theme.badgeBg }]}>
                <Ionicons name={icon} size={20} color={theme.iconColor} />
              </View>
              {trendText ? (
                <View style={[styles.trendBadge, { backgroundColor: theme.trendBg }]}>
                  <Text style={[styles.trendText, { color: theme.trendColor }]}>
                    {trendText}
                  </Text>
                </View>
              ) : null}
            </View>

            <Text style={styles.label}>{label}</Text>
            <View style={styles.valueRow}>
              <Text style={styles.value}>{value}</Text>
              <Ionicons
                name="chevron-forward"
                size={14}
                color={theme.iconColor}
                style={styles.arrowIcon}
              />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardOuter: {
    width: '48.5%',
  },
  touchableCard: {
    borderRadius: 16,
    borderWidth: 1.2,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardGradient: {
    position: 'relative',
    overflow: 'hidden',
  },
  cardStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3.5,
    zIndex: 2,
  },
  shimmerStreak: {
    position: 'absolute',
    top: -30,
    bottom: -30,
    width: 55,
  },
  shimmerGradient: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    padding: 14,
    paddingLeft: 16,
    zIndex: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 7,
  },
  trendText: {
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  label: {
    fontSize: 12,
    color: '#6B6780',
    fontWeight: '700',
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  value: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1C1342',
    letterSpacing: -0.4,
  },
  arrowIcon: {
    opacity: 0.7,
  },
});

export default StatCard;
