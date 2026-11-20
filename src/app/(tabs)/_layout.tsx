import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeBazColors } from '@/constants/theme';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  // Ensure adequate clearance on Android for system navigation bar (3-button / gesture)
  const bottomInset = Math.max(insets.bottom, Platform.OS === 'android' ? 22 : 28);
  const tabHeight = 64 + bottomInset;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: HomeBazColors.primary,
        tabBarInactiveTintColor: '#6B6782',
        tabBarStyle: {
          height: tabHeight,
          paddingBottom: bottomInset,
          paddingTop: 10,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#ECE9F6',
          shadowColor: '#1E1B39',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.activeIconWrapper]}>
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={focused ? 23 : 21}
                color={color as any}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.activeIconWrapper]}>
              <Ionicons
                name={focused ? 'receipt' : 'receipt-outline'}
                size={focused ? 23 : 21}
                color={color as any}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Products',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.activeIconWrapper]}>
              <Ionicons
                name={focused ? 'cube' : 'cube-outline'}
                size={focused ? 23 : 21}
                color={color as any}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="earnings"
        options={{
          title: 'Earnings',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.activeIconWrapper]}>
              <Ionicons
                name={focused ? 'wallet' : 'wallet-outline'}
                size={focused ? 23 : 21}
                color={color as any}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.activeIconWrapper]}>
              <Ionicons
                name={focused ? 'grid' : 'grid-outline'}
                size={focused ? 23 : 21}
                color={color as any}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 30,
    borderRadius: 15,
  },
  activeIconWrapper: {
    backgroundColor: '#F3EFFF',
  },
});
