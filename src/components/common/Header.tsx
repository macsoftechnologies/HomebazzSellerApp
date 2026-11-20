import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeBazColors } from '@/constants/theme';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    badgeCount?: number;
  };
  secondaryRightAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
  subtitle?: string;
  titleAlign?: 'left' | 'center';
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBackPress,
  rightAction,
  secondaryRightAction,
  subtitle,
  titleAlign = 'center',
}) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const topInset = Math.max(insets.top, 10);

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: topInset, height: 56 + topInset }]}>
      <View style={styles.leftContainer}>
        {showBack ? (
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color={HomeBazColors.textPrimary} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24 }} />
        )}
      </View>

      <View style={[styles.titleContainer, titleAlign === 'left' && styles.titleAlignLeft]}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={styles.rightContainer}>
        {secondaryRightAction && (
          <TouchableOpacity
            onPress={secondaryRightAction.onPress}
            style={styles.iconButton}
            activeOpacity={0.7}
          >
            <Ionicons
              name={secondaryRightAction.icon}
              size={22}
              color={HomeBazColors.textPrimary}
            />
          </TouchableOpacity>
        )}
        {rightAction ? (
          <TouchableOpacity
            onPress={rightAction.onPress}
            style={styles.iconButton}
            activeOpacity={0.7}
          >
            <Ionicons name={rightAction.icon} size={22} color={HomeBazColors.textPrimary} />
            {rightAction.badgeCount !== undefined && rightAction.badgeCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {rightAction.badgeCount > 99 ? '99+' : rightAction.badgeCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24 }} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0EFF6',
    zIndex: 10,
  },
  leftContainer: {
    width: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8FC',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  titleLoader: {
    transform: [{ scale: 0.85 }],
  },
  headerLoaderBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  titleAlignLeft: {
    alignItems: 'flex-start',
    paddingLeft: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    marginTop: 1,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 50,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8FC',
    marginLeft: 6,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: HomeBazColors.danger,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
});

export default Header;
