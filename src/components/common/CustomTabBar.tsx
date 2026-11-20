import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeBazColors } from '@/constants/theme';

export type TabKey = 'dashboard' | 'orders' | 'products' | 'earnings' | 'more';

interface TabItem {
  key: TabKey;
  label: string;
  iconOutline: keyof typeof Ionicons.glyphMap;
  iconFilled: keyof typeof Ionicons.glyphMap;
  route: string;
}

const TABS: TabItem[] = [
  {
    key: 'dashboard',
    label: 'Home',
    iconOutline: 'home-outline',
    iconFilled: 'home',
    route: '/(tabs)',
  },
  {
    key: 'orders',
    label: 'Orders',
    iconOutline: 'receipt-outline',
    iconFilled: 'receipt',
    route: '/(tabs)/orders',
  },
  {
    key: 'products',
    label: 'Products',
    iconOutline: 'cube-outline',
    iconFilled: 'cube',
    route: '/(tabs)/products',
  },
  {
    key: 'earnings',
    label: 'Earnings',
    iconOutline: 'wallet-outline',
    iconFilled: 'wallet',
    route: '/(tabs)/earnings',
  },
  {
    key: 'more',
    label: 'More',
    iconOutline: 'grid-outline',
    iconFilled: 'grid',
    route: '/(tabs)/more',
  },
];

interface CustomTabBarProps {
  currentTab?: TabKey;
}

export const CustomTabBar: React.FC<CustomTabBarProps> = ({ currentTab }) => {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, Platform.OS === 'android' ? 20 : 28);

  const getActiveTab = (): TabKey => {
    if (currentTab) return currentTab;
    if (pathname.includes('/orders')) return 'orders';
    if (pathname.includes('/products')) return 'products';
    if (pathname.includes('/earnings')) return 'earnings';
    if (pathname.includes('/more') || pathname.includes('/profile')) return 'more';
    return 'dashboard';
  };

  const active = getActiveTab();

  return (
    <View style={[styles.container, { height: 62 + bottomInset, paddingBottom: bottomInset }]}>
      {TABS.map((tab) => {
        const isSelected = active === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => router.push(tab.route as any)}
            style={styles.tabButton}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name={isSelected ? tab.iconFilled : tab.iconOutline}
                size={22}
                color={isSelected ? HomeBazColors.primary : '#8E8AA0'}
              />
            </View>
            <Text
              style={[
                styles.tabLabel,
                { color: isSelected ? HomeBazColors.primary : '#8E8AA0' },
                isSelected && styles.tabLabelSelected,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EFEFF5',
    paddingBottom: 6,
    paddingTop: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500',
  },
  tabLabelSelected: {
    fontWeight: '700',
  },
});

