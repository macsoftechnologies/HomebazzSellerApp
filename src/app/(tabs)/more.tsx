import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  Animated,
  Easing,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeBazColors } from '@/constants/theme';
import { Toast } from '@/components/common/Toast';
import { ScreenCenterLoader } from '@/components/common/CircleLoader';
import { SELLER_PROFILE } from '@/data/mockData';

export default function MoreScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Moving ambient gradient animation using logo colors
  const ambientAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(ambientAnim, {
          toValue: 1,
          duration: 3800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(ambientAnim, {
          toValue: 0,
          duration: 3800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [ambientAnim]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 850);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  const confirmLogout = () => {
    setShowLogoutModal(false);
    setToastMessage('Logged out successfully');
    setToastVisible(true);

    setTimeout(() => {
      router.replace('/login');
    }, 700);
  };

  const menuItems = [
    {
      id: 'store',
      label: 'Store Details',
      icon: 'storefront-outline',
      route: '/business/store-details',
    },
    {
      id: 'bank',
      label: 'Bank & Payout',
      icon: 'business-outline',
      route: '/verification/bank-details',
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'notifications-outline',
      route: '/notifications',
    },
    {
      id: 'maker-story',
      label: 'Maker Story',
      icon: 'heart-outline',
      route: '/business/maker-story',
    },
    {
      id: 'reviews',
      label: 'Customer Reviews',
      icon: 'star-outline',
      route: '/business/customer-reviews',
    },
    {
      id: 'settings',
      label: 'Settings & Language',
      icon: 'settings-outline',
      route: '/business/settings',
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: 'help-circle-outline',
      route: '/business/help-support',
    },
    {
      id: 'terms',
      label: 'Terms & Policies',
      icon: 'document-text-outline',
      route: '/business/terms-conditions',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Moving Ambient Gradient Background (Logo Colors, Light Mode, No Balls) */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.movingAuraContainer,
          {
            transform: [
              {
                translateX: ambientAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-40, 40],
                }),
              },
            ],
            opacity: ambientAnim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.35, 0.7, 0.35],
            }),
          },
        ]}
      >
        <LinearGradient
          colors={['rgba(235, 227, 254, 0.75)', 'rgba(245, 242, 253, 0.5)', 'transparent']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.movingAuraGradient}
        />
      </Animated.View>

      {/* Header with Safe Area Clearance */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 14) }]}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      {/* Screen Center Loader / Content */}
      {isLoading ? (
        <ScreenCenterLoader size="small" />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 60 }]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#6C5CE7"
              colors={['#6C5CE7', '#8A65F2']}
            />
          }
        >
          {/* Animated Store Profile Hero Card (Matches Dashboard Theme - NO BALLS) */}
          <LinearGradient
            colors={['#8A65F2', '#693FE2', '#47229E', '#280F65']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.profileHeroCard}
          >
            {/* Slanted Linear Aurora Light Beam */}
            <Animated.View
              pointerEvents="none"
              style={[
                styles.profileBeam,
                {
                  transform: [
                    {
                      translateX: ambientAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-80, 260],
                      }),
                    },
                    { rotate: '22deg' },
                  ],
                  opacity: ambientAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.18, 0.45, 0.18],
                  }),
                },
              ]}
            >
              <LinearGradient
                colors={['transparent', 'rgba(254, 240, 138, 0.35)', 'rgba(255, 255, 255, 0.48)', 'rgba(216, 180, 254, 0.25)', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.fullSize}
              />
            </Animated.View>

            {/* Product / Artisan Watermark Motif (NO BALLS) */}
            <Animated.View
              pointerEvents="none"
              style={[
                styles.profileWatermark,
                {
                  transform: [
                    {
                      translateX: ambientAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -6],
                      }),
                    },
                    {
                      rotate: ambientAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['-5deg', '4deg'],
                      }),
                    },
                  ],
                  opacity: ambientAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.12, 0.22, 0.12],
                  }),
                },
              ]}
            >
              <Ionicons name="basket-outline" size={68} color="#FFFFFF" />
            </Animated.View>

            {/* Twinkling Star Sparkles */}
            <Animated.View
              pointerEvents="none"
              style={[
                styles.starSparkle1,
                {
                  transform: [
                    {
                      scale: ambientAnim.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0.8, 1.3, 0.8],
                      }),
                    },
                    {
                      rotate: ambientAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '90deg'],
                      }),
                    },
                  ],
                  opacity: ambientAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.4, 0.95, 0.4],
                  }),
                },
              ]}
            >
              <Ionicons name="sparkles" size={14} color="#FFD700" />
            </Animated.View>

            <Animated.View
              pointerEvents="none"
              style={[
                styles.starSparkle2,
                {
                  transform: [
                    {
                      scale: ambientAnim.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [1.15, 0.75, 1.15],
                      }),
                    },
                  ],
                  opacity: ambientAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.3, 0.8, 0.3],
                  }),
                },
              ]}
            >
              <Ionicons name="sparkles" size={11} color="#67E8F9" />
            </Animated.View>

            {/* Profile Card Header Row */}
            <View style={styles.profileTopRow}>
              <View style={styles.avatarWrapper}>
                <View style={styles.avatarSquircle}>
                  <Ionicons name="storefront" size={28} color="#FFFFFF" />
                </View>
                <TouchableOpacity
                  style={styles.editBadge}
                  onPress={() => router.push('/business/store-details')}
                  activeOpacity={0.8}
                >
                  <Ionicons name="create-outline" size={12} color="#6C5CE7" />
                </TouchableOpacity>
              </View>

              <View style={styles.profileInfoCol}>
                <Text style={styles.storeNameText}>{SELLER_PROFILE.storeName}</Text>
                <Text style={styles.sellerOwnerText}>Owner: {SELLER_PROFILE.name}</Text>

                <View style={styles.verifiedPartnerBadge}>
                  <Ionicons name="checkmark-circle" size={12} color="#10B981" />
                  <Text style={styles.verifiedPartnerText}>Verified Artisan Partner</Text>
                </View>
              </View>
            </View>

            {/* Quick Metrics Strip */}
            <View style={styles.quickMetricsStrip}>
              <View style={styles.quickMetricItem}>
                <Text style={styles.quickMetricVal}>48</Text>
                <Text style={styles.quickMetricLbl}>Products</Text>
              </View>
              <View style={styles.quickMetricDivider} />
              <View style={styles.quickMetricItem}>
                <Text style={styles.quickMetricVal}>156</Text>
                <Text style={styles.quickMetricLbl}>Orders</Text>
              </View>
              <View style={styles.quickMetricDivider} />
              <View style={styles.quickMetricItem}>
                <Text style={styles.quickMetricVal}>4.8 ★</Text>
                <Text style={styles.quickMetricLbl}>Rating</Text>
              </View>
              <View style={styles.quickMetricDivider} />
              <View style={styles.quickMetricItem}>
                <Text style={styles.quickMetricVal}>99.2%</Text>
                <Text style={styles.quickMetricLbl}>On-Time</Text>
              </View>
            </View>
          </LinearGradient>

        {/* Menu Items List */}
        <View style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuRow,
                index === menuItems.length - 1 && { borderBottomWidth: 0 },
              ]}
              onPress={() => router.push(item.route as any)}
              activeOpacity={0.7}
            >
              <View style={styles.menuRowLeft}>
                <View style={styles.menuIconCircle}>
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={HomeBazColors.textPrimary}
                  />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#A39FB4" />
            </TouchableOpacity>
          ))}

          {/* Logout Action */}
          <TouchableOpacity
            style={styles.logoutRow}
            onPress={() => setShowLogoutModal(true)}
            activeOpacity={0.7}
          >
            <View style={styles.menuRowLeft}>
              <View style={[styles.menuIconCircle, styles.logoutIconCircle]}>
                <Ionicons name="log-out-outline" size={20} color={HomeBazColors.danger} />
              </View>
              <Text style={styles.logoutLabel}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      )}

      {/* Custom Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconCircle}>
              <Ionicons name="log-out" size={28} color={HomeBazColors.danger} />
            </View>

            <Text style={styles.modalTitle}>Log Out of HomeBazz?</Text>
            <Text style={styles.modalSubtitle}>
              Are you sure you want to log out of {SELLER_PROFILE.storeName}? You will need to sign in again to access your dashboard.
            </Text>

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.cancelModalBtn}
                onPress={() => setShowLogoutModal(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelModalText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmModalBtn}
                onPress={confirmLogout}
                activeOpacity={0.85}
              >
                <Text style={styles.confirmModalText}>Yes, Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Floating Toast Notification */}
      <Toast
        visible={toastVisible}
        message={toastMessage}
        type="success"
        onDismiss={() => setToastVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  statusBarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    backgroundColor: '#FFFFFF',
  },
  clockText: {
    fontWeight: '700',
    color: '#1E1B39',
    fontSize: 14,
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0EFF6',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    letterSpacing: -0.4,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 36,
  },
  movingAuraContainer: {
    position: 'absolute',
    top: 0,
    left: -50,
    right: -50,
    height: 260,
  },
  movingAuraGradient: {
    width: '100%',
    height: '100%',
  },
  profileHeroCard: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#35167E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.32,
    shadowRadius: 12,
    elevation: 6,
  },
  profileBeam: {
    position: 'absolute',
    top: -50,
    bottom: -50,
    width: 85,
  },
  fullSize: {
    width: '100%',
    height: '100%',
  },
  profileWatermark: {
    position: 'absolute',
    right: -6,
    bottom: 20,
  },
  starSparkle1: {
    position: 'absolute',
    top: 16,
    right: 30,
  },
  starSparkle2: {
    position: 'absolute',
    top: 52,
    right: 65,
  },
  profileTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 14,
  },
  avatarSquircle: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#6C5CE7',
  },
  profileInfoCol: {
    flex: 1,
  },
  storeNameText: {
    fontSize: 19,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.4,
    marginBottom: 2,
  },
  sellerOwnerText: {
    fontSize: 12,
    color: '#DDD4F8',
    fontWeight: '600',
    marginBottom: 6,
  },
  verifiedPartnerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.22)',
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
    alignSelf: 'flex-start',
  },
  verifiedPartnerText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#D1FAE5',
  },
  quickMetricsStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
  },
  quickMetricItem: {
    flex: 1,
    alignItems: 'center',
  },
  quickMetricVal: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  quickMetricLbl: {
    fontSize: 9.5,
    fontWeight: '600',
    color: '#DDD4F8',
    marginTop: 1,
  },
  quickMetricDivider: {
    width: 1,
    height: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ECECF5',
    marginBottom: 20,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F1F8',
  },
  menuRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F5F4FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: HomeBazColors.textPrimary,
  },
  logoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#FEE2E2',
    backgroundColor: '#FFFBFB',
  },
  logoutIconCircle: {
    backgroundColor: '#FEE2E2',
  },
  logoutLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: HomeBazColors.danger,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 10, 35, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 12,
  },
  modalIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1C1342',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6B6780',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  modalButtonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  cancelModalBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2DEEE',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelModalText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6B6780',
  },
  confirmModalBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmModalText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
