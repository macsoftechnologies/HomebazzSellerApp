import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HomeBazColors } from '@/constants/theme';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: 'small' | 'medium' | 'large';
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  icon,
  style,
  textStyle,
  size = 'medium',
}) => {
  const isOutline = variant === 'outline' || variant === 'secondary';
  const isDanger = variant === 'danger';
  const isGhost = variant === 'ghost';

  const getHeight = () => {
    switch (size) {
      case 'small':
        return 40;
      case 'large':
        return 54;
      default:
        return 48;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return 13;
      case 'large':
        return 16;
      default:
        return 15;
    }
  };

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.88}
        style={[styles.touchable, disabled && styles.disabled, style]}
      >
        <LinearGradient
          colors={
            disabled
              ? ['#C7C3DF', '#AFAACD']
              : ['#7C5CE7', '#5636C8']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.4 }}
          style={[styles.gradient, { height: getHeight() }]}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <View style={styles.contentRow}>
              <Text style={[styles.primaryText, { fontSize: getFontSize() }, textStyle]}>
                {title}
              </Text>
              {icon && <View style={styles.iconWrapper}>{icon}</View>}
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.82}
      style={[
        styles.touchable,
        styles.buttonBase,
        { height: getHeight() },
        isOutline && styles.outlineButton,
        isDanger && styles.dangerButton,
        isGhost && styles.ghostButton,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isDanger ? HomeBazColors.danger : HomeBazColors.primary}
        />
      ) : (
        <View style={styles.contentRow}>
          <Text
            style={[
              styles.buttonText,
              { fontSize: getFontSize() },
              isOutline && styles.outlineText,
              isDanger && styles.dangerText,
              isGhost && styles.ghostText,
              textStyle,
            ]}
          >
            {title}
          </Text>
          {icon && <View style={styles.iconWrapper}>{icon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 14,
    shadowColor: '#5636C8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonBase: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 14,
  },
  outlineButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#7C5CE7',
  },
  dangerButton: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1.2,
    borderColor: '#FCA5A5',
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    marginLeft: 8,
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  buttonText: {
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  outlineText: {
    color: '#7C5CE7',
    fontWeight: '700',
  },
  dangerText: {
    color: HomeBazColors.danger,
    fontWeight: '700',
  },
  ghostText: {
    color: HomeBazColors.textSecondary,
  },
  disabled: {
    opacity: 0.55,
  },
});

export default GradientButton;
