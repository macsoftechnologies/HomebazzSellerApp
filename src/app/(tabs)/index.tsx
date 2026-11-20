import { ScreenCenterLoader } from '@/components/common/CircleLoader';
import { ProductThumbnail } from '@/components/common/ProductThumbnail';
import { StatCard } from '@/components/common/StatCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { AppImages } from '@/constants/images';
import { HomeBazColors } from '@/constants/theme';
import { MOCK_ORDERS, MOCK_PRODUCTS, SELLER_PROFILE } from '@/data/mockData';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Animated,
  Easing,
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SellerDashboardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const recentOrder = MOCK_ORDERS[0];
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 850);
  }, []);

  // Staggered entrance animation for metric cards
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  // Continuous ambient background floating pulse
  const ambientPulse = useRef(new Animated.Value(0)).current;
  const productPulse = useRef(new Animated.Value(1)).current;

  // Hero Card moving background light animation (starts from light side)
  const heroLightAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 550,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 6,
        tension: 45,
        useNativeDriver: true,
      }),
    ]).start();

    // Ambient floating background loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(ambientPulse, {
          toValue: 1,
          duration: 4500,
          useNativeDriver: true,
        }),
        Animated.timing(ambientPulse, {
          toValue: 0,
          duration: 4500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Hero Card moving background light animation (starts from light side)
    Animated.loop(
      Animated.sequence([
        Animated.timing(heroLightAnim, {
          toValue: 1,
          duration: 3500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(heroLightAnim, {
          toValue: 0,
          duration: 3500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Gentle product highlight flame pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(productPulse, {
          toValue: 1.15,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(productPulse, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [fadeAnim, slideAnim, ambientPulse, productPulse, heroLightAnim]);

  if (isLoading) {
    return (
      <View style={[styles.container, { paddingTop: Math.max(insets.top, 14) }]}>
        <StatusBar barStyle="dark-content" />
        <ScreenCenterLoader size="small" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Subtle Animated Top Aura */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.topAura,
          {
            opacity: ambientPulse.interpolate({
              inputRange: [0, 1],
              outputRange: [0.4, 0.75],
            }),
          },
        ]}
      >
        <LinearGradient
          colors={['rgba(108, 92, 231, 0.12)', 'rgba(236, 72, 153, 0.05)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.auraGradient}
        />
      </Animated.View>

      {/* Top Header with Official Logo, Profile & Safe Area Clearance */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 14) }]}>
        <View style={styles.brandRow}>
          {/* Official HomeBazz Logo prominently placed on Main Page */}
          <View style={styles.logoContainer}>
            <Image
              source={AppImages.logoFull}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.headerRightActions}>
            <TouchableOpacity
              style={styles.bellButton}
              onPress={() => router.push('/notifications')}
              activeOpacity={0.75}
            >
              <Ionicons name="notifications-outline" size={22} color="#1C1342" />
              <View style={styles.unreadDot} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profileAvatarButton}
              onPress={() => router.push('/(tabs)/more')}
              activeOpacity={0.8}
            >
              <Ionicons name="storefront" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#6C5CE7"
            colors={['#6C5CE7', '#8A65F2']}
          />
        }
      >
        {/* Hero Greeting & Total Sales Card: Light Color Starts on Left with Moving Light Animation */}
        <LinearGradient
          colors={['#8A65F2', '#693FE2', '#47229E', '#280F65']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.heroSalesCard}
        >
          {/* Linear Light Beam Sweep 1: Angled Aurora Beam starting from light side with subtle warm gold & crystalline sheen */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.heroLightBeam1,
              {
                transform: [
                  {
                    translateX: heroLightAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-90, 280],
                    }),
                  },
                  { rotate: '22deg' },
                ],
                opacity: heroLightAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.18, 0.48, 0.18],
                }),
              },
            ]}
          >
            <LinearGradient
              colors={['transparent', 'rgba(254, 240, 138, 0.35)', 'rgba(255, 255, 255, 0.48)', 'rgba(216, 180, 254, 0.28)', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.heroBeamGradient}
            />
          </Animated.View>

          {/* Linear Light Beam Sweep 2: Counter angled ribbon */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.heroLightBeam2,
              {
                transform: [
                  {
                    translateX: heroLightAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [220, -50],
                    }),
                  },
                  { rotate: '-18deg' },
                ],
                opacity: heroLightAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.1, 0.3, 0.1],
                }),
              },
            ]}
          >
            <LinearGradient
              colors={['transparent', 'rgba(255, 255, 255, 0.28)', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.heroBeamGradient}
            />
          </Animated.View>

          {/* Animated Moving Stars & Sparkles (Premium Palette: Imperial Gold, Warm Amber, Diamond Cyan & Champagne) */}
          {/* Star 1: Radiant Imperial Gold Sparkles drifting across top-left */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.heroMovingStar,
              {
                top: 16,
                left: 36,
                transform: [
                  {
                    translateX: heroLightAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 52],
                    }),
                  },
                  {
                    translateY: heroLightAnim.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0, -8, 0],
                    }),
                  },
                  {
                    rotate: heroLightAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '90deg'],
                    }),
                  },
                  {
                    scale: heroLightAnim.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0.85, 1.3, 0.85],
                    }),
                  },
                ],
                opacity: heroLightAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.45, 1, 0.45],
                }),
              },
            ]}
          >
            <Ionicons name="sparkles" size={17} color="#FFD700" />
          </Animated.View>

          {/* Star 2: Warm Amber-Sun Gold Star drifting smoothly */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.heroMovingStar,
              {
                top: 42,
                left: 135,
                transform: [
                  {
                    translateX: heroLightAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -35],
                    }),
                  },
                  {
                    scale: heroLightAnim.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [1.2, 0.8, 1.2],
                    }),
                  },
                ],
                opacity: heroLightAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.65, 0.25, 0.65],
                }),
              },
            ]}
          >
            <Ionicons name="star" size={14} color="#F59E0B" />
          </Animated.View>

          {/* Star 3: Diamond Cyan Sparkle gliding along bottom right */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.heroMovingStar,
              {
                bottom: 24,
                right: 68,
                transform: [
                  {
                    translateX: heroLightAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 38],
                    }),
                  },
                  {
                    rotate: heroLightAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '-75deg'],
                    }),
                  },
                  {
                    scale: heroLightAnim.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0.8, 1.3, 0.8],
                    }),
                  },
                ],
                opacity: heroLightAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.4, 0.95, 0.4],
                }),
              },
            ]}
          >
            <Ionicons name="sparkles" size={18} color="#67E8F9" />
          </Animated.View>

          {/* Star 4: Crisp Champagne-Gold micro-star */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.heroMovingStar,
              {
                top: 20,
                right: 76,
                transform: [
                  {
                    translateY: heroLightAnim.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0, 10, 0],
                    }),
                  },
                  {
                    scale: heroLightAnim.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0.85, 1.25, 0.85],
                    }),
                  },
                ],
                opacity: heroLightAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.35, 0.9, 0.35],
                }),
              },
            ]}
          >
            <Ionicons name="star" size={12} color="#FEF08A" />
          </Animated.View>

          {/* Star 5: Warm Rose Gold Sparkle floating near center */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.heroMovingStar,
              {
                bottom: 40,
                left: 175,
                transform: [
                  {
                    translateX: heroLightAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-15, 20],
                    }),
                  },
                  {
                    scale: heroLightAnim.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0.9, 1.2, 0.9],
                    }),
                  },
                ],
                opacity: heroLightAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.3, 0.85, 0.3],
                }),
              },
            ]}
          >
            <Ionicons name="sparkles" size={13} color="#FDBA74" />
          </Animated.View>

          {/* Top Greeting Row */}
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.heroGreetingText}>Hi, {SELLER_PROFILE.name} 👋</Text>
              <View style={styles.heroStoreRow}>
                <Text style={styles.heroStoreName}>{SELLER_PROFILE.storeName}</Text>
                <View style={styles.heroVerifiedTag}>
                  <Ionicons name="checkmark-circle" size={12} color="#10B981" />
                  <Text style={styles.heroVerifiedText}>Verified Partner</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.heroWalletBtn}
              onPress={() => router.push('/(tabs)/earnings')}
              activeOpacity={0.78}
            >
              <Ionicons name="wallet-outline" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.heroDivider} />

          {/* Bottom Total Sales Row */}
          <View style={styles.salesRow}>
            <View style={styles.salesLeftCol}>
              <View style={styles.salesLabelPill}>
                <Ionicons name="sparkles" size={11} color="#FDE047" />
                <Text style={styles.salesLabelText}>TOTAL SALES</Text>
              </View>
              <Text style={styles.salesAmountValue}>₹72,480</Text>
              <View style={styles.salesGrowthBadge}>
                <Ionicons name="trending-up" size={12} color="#059669" />
                <Text style={styles.salesGrowthText}>+12.5% from last 7 days</Text>
              </View>
            </View>

            {/* Right Mini Bar Chart with Glowing Bars */}
            <View style={styles.salesRightChart}>
              <View style={styles.miniBarGroup}>
                <View style={styles.miniBarCol}>
                  <View style={[styles.miniBar, { height: 16, backgroundColor: 'rgba(255, 255, 255, 0.40)' }]} />
                  <Text style={styles.miniBarDay}>M</Text>
                </View>
                <View style={styles.miniBarCol}>
                  <View style={[styles.miniBar, { height: 24, backgroundColor: 'rgba(255, 255, 255, 0.55)' }]} />
                  <Text style={styles.miniBarDay}>T</Text>
                </View>
                <View style={styles.miniBarCol}>
                  <View style={[styles.miniBar, { height: 18, backgroundColor: 'rgba(255, 255, 255, 0.45)' }]} />
                  <Text style={styles.miniBarDay}>W</Text>
                </View>
                <View style={styles.miniBarCol}>
                  <View style={[styles.miniBar, { height: 32, backgroundColor: 'rgba(255, 255, 255, 0.75)' }]} />
                  <Text style={styles.miniBarDay}>T</Text>
                </View>
                <View style={styles.miniBarCol}>
                  <View style={[styles.miniBar, { height: 26, backgroundColor: 'rgba(255, 255, 255, 0.60)' }]} />
                  <Text style={styles.miniBarDay}>F</Text>
                </View>
                <View style={styles.miniBarCol}>
                  <View style={[styles.miniBar, { height: 42, backgroundColor: '#FFFFFF' }]} />
                  <Text style={[styles.miniBarDay, { color: '#FFFFFF', fontWeight: '800' }]}>S</Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Animated Metric Cards with Complete Right-to-Left Slider Key Animation */}
        <Animated.View
          style={[
            styles.statsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Row 1: Orders & Revenue (Sales & Financial Metrics) */}
          <View style={styles.statsRow}>
            <StatCard
              index={0}
              label="Orders"
              value="156"
              icon="cart-outline"
              onPress={() => router.push('/(tabs)/orders')}
            />
            <StatCard
              index={1}
              label="Revenue"
              value="₹72,480"
              icon="cash-outline"
              onPress={() => router.push('/(tabs)/earnings')}
            />
          </View>

          {/* Row 2: Products & Pending (Catalog & Operational Actions) */}
          <View style={styles.statsRow}>
            <StatCard
              index={2}
              label="Products"
              value={String(MOCK_PRODUCTS.length)}
              icon="cube-outline"
              onPress={() => router.push('/(tabs)/products')}
            />
            <StatCard
              index={3}
              label="Pending"
              value="12"
              icon="time-outline"
              onPress={() => router.push('/(tabs)/orders')}
            />
          </View>
        </Animated.View>

        {/* Quick Shortcut Buttons Banner */}
        <View style={styles.quickActionsRow}>
          <TouchableOpacity
            style={styles.actionPill}
            onPress={() => router.push('/add-product')}
            activeOpacity={0.75}
          >
            <Ionicons name="add-circle" size={18} color="#6C5CE7" />
            <Text style={styles.actionPillText}>+ Add Product</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionPill}
            onPress={() => router.push('/inventory')}
            activeOpacity={0.75}
          >
            <Ionicons name="layers-outline" size={18} color="#6C5CE7" />
            <Text style={styles.actionPillText}>Inventory</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionPill}
            onPress={() => router.push('/analytics')}
            activeOpacity={0.75}
          >
            <Ionicons name="bar-chart-outline" size={18} color="#6C5CE7" />
            <Text style={styles.actionPillText}>Analytics</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Orders Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/orders')}
            activeOpacity={0.7}
          >
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Order Item Card */}
        <TouchableOpacity
          style={styles.orderCard}
          onPress={() => router.push('/order-details')}
          activeOpacity={0.8}
        >
          <ProductThumbnail size={54} imageSource={recentOrder.items[0]?.image} />

          <View style={styles.orderMiddle}>
            <View style={styles.orderIdRow}>
              <Text style={styles.orderIdText}>{recentOrder.id}</Text>
              <StatusBadge status={recentOrder.status} size="small" />
            </View>
            <Text style={styles.orderSubText}>
              ₹{recentOrder.totalAmount} • {recentOrder.itemCount} items
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={18} color="#A39FB4" />
        </TouchableOpacity>

        {/* Animated Top Products Showcase Section */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionTitleRow}>
            <Animated.View style={{ transform: [{ scale: productPulse }] }}>
              <Ionicons name="flame" size={20} color="#EA580C" style={{ marginRight: 6 }} />
            </Animated.View>
            <Text style={styles.sectionTitle}>Top Products</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/products')}
            activeOpacity={0.7}
          >
            <Text style={styles.viewAllText}>View All ({MOCK_PRODUCTS.length}) →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsScrollRow}
        >
          {MOCK_PRODUCTS.slice(0, 8).map((prod) => (
            <TouchableOpacity
              key={prod.id}
              style={styles.featuredProductCard}
              onPress={() =>
                router.push({
                  pathname: '/product-manage/product-preview',
                  params: { productId: prod.id },
                })
              }
              activeOpacity={0.85}
            >
              <View style={styles.prodImageContainer}>
                <Image source={prod.image} style={styles.prodCardImage} resizeMode="cover" />
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={10} color="#F59E0B" />
                  <Text style={styles.ratingBadgeText}>{prod.rating}</Text>
                </View>
                {prod.isHandmade && (
                  <View style={styles.handmadeBadge}>
                    <Text style={styles.handmadeBadgeText}>Handmade</Text>
                  </View>
                )}
              </View>

              <View style={styles.prodInfoBlock}>
                <Text style={styles.prodCardTitle} numberOfLines={1}>
                  {prod.name}
                </Text>
                <Text style={styles.prodCardCategory}>{prod.category}</Text>

                <View style={styles.prodPriceRow}>
                  <Text style={styles.prodCardPrice}>₹{prod.price}</Text>
                  <View style={styles.prodOrdersCountBadge}>
                    <Ionicons name="cart" size={10} color="#6C5CE7" style={{ marginRight: 2 }} />
                    <Text style={styles.prodOrdersCountText}>{prod.ordersCount}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Verification Status Banner Reminder */}
        <TouchableOpacity
          style={styles.verificationBanner}
          onPress={() => router.push('/verification/verification-status')}
          activeOpacity={0.8}
        >
          <View style={styles.bannerIconBox}>
            <Ionicons name="shield-checkmark" size={24} color="#10B981" />
          </View>
          <View style={styles.bannerTextCol}>
            <Text style={styles.bannerTitle}>HomeBaz Partner Verified</Text>
            <Text style={styles.bannerDesc}>
              FSSAI & Kitchen Audit completed. 7-stage quality score: 4.8 / 5
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#10B981" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EDFC',
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
  },
  logoImage: {
    width: 120,
    height: 38,
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F4FA',
    borderWidth: 1,
    borderColor: '#EAE7F4',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: HomeBazColors.danger,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  profileAvatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: HomeBazColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: HomeBazColors.primaryDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 5,
    elevation: 3,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 14,
    paddingBottom: 28,
  },
  /* Hero Sales & Greeting Card: Light color starts on left with animated light flow */
  heroSalesCard: {
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
  heroLightBeam1: {
    position: 'absolute',
    top: -50,
    bottom: -50,
    width: 85,
  },
  heroLightBeam2: {
    position: 'absolute',
    top: -50,
    bottom: -50,
    width: 60,
  },
  heroBeamGradient: {
    width: '100%',
    height: '100%',
  },
  heroMovingStar: {
    position: 'absolute',
    zIndex: 1,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  heroGreetingText: {
    fontSize: 21,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.4,
  },
  heroStoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    gap: 8,
  },
  heroStoreName: {
    fontSize: 12,
    color: '#DDD4F8',
    fontWeight: '600',
  },
  heroVerifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.22)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  heroVerifiedText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#D1FAE5',
  },
  heroWalletBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.28)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    marginBottom: 14,
  },
  salesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  salesLeftCol: {
    flex: 1,
  },
  salesLabelPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  salesLabelText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  salesAmountValue: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.7,
    marginBottom: 8,
  },
  salesGrowthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  salesGrowthText: {
    color: '#059669',
    fontSize: 10.5,
    fontWeight: '700',
  },
  salesRightChart: {
    marginLeft: 12,
  },
  miniBarGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5,
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
  },
  miniBarCol: {
    alignItems: 'center',
  },
  miniBar: {
    width: 6.5,
    borderRadius: 4,
  },
  miniBarDay: {
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.65)',
    fontWeight: '600',
    marginTop: 4,
  },
  statsContainer: {
    marginBottom: 6,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  actionPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F3FF',
    borderWidth: 1.2,
    borderColor: '#DDD6FE',
    paddingVertical: 12,
    borderRadius: 14,
    gap: 6,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  actionPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#5636C8',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1C1342',
    letterSpacing: -0.3,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.primary,
  },
  topAura: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 240,
  },
  auraGradient: {
    width: '100%',
    height: '100%',
  },
  productsScrollRow: {
    gap: 14,
    paddingBottom: 16,
    paddingRight: 10,
  },
  featuredProductCard: {
    width: 156,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: '#ECECF6',
    overflow: 'hidden',
    shadowColor: '#1E1B39',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  prodImageContainer: {
    width: '100%',
    height: 110,
    backgroundColor: '#F7F6FC',
    position: 'relative',
  },
  prodCardImage: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  ratingBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#92400E',
  },
  handmadeBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: 'rgba(108, 92, 231, 0.9)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  handmadeBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  prodInfoBlock: {
    padding: 10,
  },
  prodCardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1C1342',
    marginBottom: 2,
  },
  prodCardCategory: {
    fontSize: 11,
    color: '#8E8AA0',
    fontWeight: '600',
    marginBottom: 8,
  },
  prodPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prodCardPrice: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1C1342',
  },
  prodOrdersCountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3EFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  prodOrdersCountText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6C5CE7',
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.2,
    borderColor: '#ECECF5',
    shadowColor: '#1E1B39',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 16,
  },
  orderMiddle: {
    flex: 1,
    marginLeft: 14,
  },
  orderIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  orderIdText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1C1342',
  },
  orderSubText: {
    fontSize: 13,
    color: '#6B6780',
    fontWeight: '600',
  },
  verificationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.2,
    borderColor: '#A7F3D0',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 14,
  },
  bannerIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bannerTextCol: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#065F46',
    marginBottom: 3,
  },
  bannerDesc: {
    fontSize: 12,
    color: '#047857',
    lineHeight: 16,
  },
});
