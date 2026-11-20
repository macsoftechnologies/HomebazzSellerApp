import React, { useEffect, useCallback, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HomeBazColors } from '@/constants/theme';

export interface ToastProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'error' | 'info';
  onDismiss?: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  type = 'success',
  onDismiss,
  duration = 2600,
}) => {
  const [translateY] = useState(() => new Animated.Value(-80));
  const [opacity] = useState(() => new Animated.Value(0));

  const handleDismiss = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -80,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onDismiss) onDismiss();
    });
  }, [opacity, translateY, onDismiss]);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          friction: 7,
          tension: 70,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      handleDismiss();
    }
  }, [visible, duration, handleDismiss, opacity, translateY]);

  if (!visible) return null;

  const getTheme = () => {
    switch (type) {
      case 'error':
        return {
          icon: 'alert-circle' as const,
          color: '#EF4444',
          bg: '#FEF2F2',
          border: '#FCA5A5',
        };
      case 'info':
        return {
          icon: 'information-circle' as const,
          color: HomeBazColors.primary,
          bg: '#F5F3FF',
          border: '#DDD6FE',
        };
      case 'success':
      default:
        return {
          icon: 'checkmark-circle' as const,
          color: '#10B981',
          bg: '#ECFDF5',
          border: '#A7F3D0',
        };
    }
  };

  const theme = getTheme();

  return (
    <Animated.View
      style={[
        styles.toastWrapper,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
      pointerEvents="box-none"
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleDismiss}
        style={[styles.toastCard, { backgroundColor: theme.bg, borderColor: theme.border }]}
      >
        <Ionicons name={theme.icon} size={22} color={theme.color} style={styles.toastIcon} />
        <Text style={[styles.toastText, { color: HomeBazColors.textPrimary }]}>{message}</Text>
        <Ionicons name="close" size={16} color="#9B97B0" style={styles.closeIcon} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastWrapper: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    zIndex: 9999,
    elevation: 9999,
    alignItems: 'center',
  },
  toastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
    width: '100%',
  },
  toastIcon: {
    marginRight: 10,
  },
  toastText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  closeIcon: {
    marginLeft: 8,
  },
});

export default Toast;
