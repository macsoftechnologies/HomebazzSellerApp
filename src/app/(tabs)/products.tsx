import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Animated,
  Easing,
  FlatList,
  RefreshControl,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HomeBazColors } from '@/constants/theme';
import { ProductThumbnail } from '@/components/common/ProductThumbnail';
import { TabFilter } from '@/components/common/TabFilter';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_PRODUCTS, Product } from '@/data/mockData';
import { ScreenCenterLoader } from '@/components/common/CircleLoader';

export default function ProductsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList<Product>>(null);
  const [productsList, setProductsList] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedTab, setSelectedTab] = useState('all');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 850);
  }, []);

  // Moving ambient gradient animation using logo colors (light mode)
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [shimmerAnim]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const activeCount = productsList.filter((p) => p.isActive).length;
  const inactiveCount = productsList.filter((p) => !p.isActive).length;

  const tabs = [
    { key: 'all', label: 'All', count: productsList.length },
    { key: 'active', label: 'Active', count: activeCount },
    { key: 'inactive', label: 'Inactive', count: inactiveCount },
  ];

  const toggleProductActive = (id: string) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const handleSelectTab = (key: string) => {
    setSelectedTab(key);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
  };

  const filteredProducts = productsList.filter((product) => {
    if (selectedTab === 'active' && !product.isActive) return false;
    if (selectedTab === 'inactive' && product.isActive) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const renderProductItem = ({ item }: { item: Product }) => {
    const isOutOfStock = item.stock === 0;
    const isLowStock = item.stock > 0 && item.stock <= 8;

    return (
      <View style={styles.cardTouchWrapper}>
        <LinearGradient
          colors={['#FFFFFF', '#F5F2FD', '#E6DFF9']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.productCard}
        >
          {/* Subtle Left Accent Line in Logo Colors */}
          <LinearGradient
            colors={['#6C5CE7', '#A29BFE']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.cardAccentStripe}
          />

          {/* Product-Related Right-Side Background Animation (Mirrored from Order Card Style - NO BALLS) */}
          <View pointerEvents="none" style={styles.productCardRightBgContainer}>
            {/* Animated Slanted Shimmer Sheen */}
            <Animated.View
              style={[
                styles.cardRightShimmerBeam,
                {
                  transform: [
                    {
                      translateX: shimmerAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-30, 80],
                      }),
                    },
                    { rotate: '25deg' },
                  ],
                  opacity: shimmerAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.15, 0.45, 0.15],
                  }),
                },
              ]}
            >
              <LinearGradient
                colors={['transparent', 'rgba(255, 255, 255, 0.5)', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.fullSize}
              />
            </Animated.View>

            {/* Product Merchandise Watermark: Storefront / Basket / Gift Motif */}
            <Animated.View
              style={[
                styles.productWatermarkGroup,
                {
                  transform: [
                    {
                      translateX: shimmerAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -6],
                      }),
                    },
                    {
                      translateY: shimmerAnim.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0, -3, 0],
                      }),
                    },
                    {
                      rotate: shimmerAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['-5deg', '4deg'],
                      }),
                    },
                  ],
                  opacity: shimmerAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.18, 0.32, 0.18],
                  }),
                },
              ]}
            >
              {item.isHandmade ? (
                <Ionicons name="gift-outline" size={36} color="#6C5CE7" />
              ) : item.category.toLowerCase().includes('pickle') ||
                item.category.toLowerCase().includes('food') ? (
                <Ionicons name="basket-outline" size={36} color="#6C5CE7" />
              ) : (
                <Ionicons name="storefront-outline" size={36} color="#6C5CE7" />
              )}
            </Animated.View>

            {/* Product Showcase Trail Lines (Linear Streaks trailing to the left) */}
            <Animated.View
              style={[
                styles.productMotionLinesGroup,
                {
                  transform: [
                    {
                      translateX: shimmerAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [5, -4],
                      }),
                    },
                  ],
                  opacity: shimmerAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.14, 0.3, 0.14],
                  }),
                },
              ]}
            >
              <View style={[styles.motionLine, { width: 22 }]} />
              <View style={[styles.motionLine, { width: 34, marginTop: 3 }]} />
              <View style={[styles.motionLine, { width: 16, marginTop: 3 }]} />
            </Animated.View>

            {/* Twinkling Star Sparkle Accent */}
            <Animated.View
              style={[
                styles.productCardSparkle,
                {
                  transform: [
                    {
                      scale: shimmerAnim.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0.75, 1.25, 0.75],
                      }),
                    },
                    {
                      rotate: shimmerAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '90deg'],
                      }),
                    },
                  ],
                  opacity: shimmerAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.35, 0.85, 0.35],
                  }),
                },
              ]}
            >
              <Ionicons name="sparkles" size={12} color="#F59E0B" />
            </Animated.View>
          </View>

          <View style={styles.cardInnerPadding}>
            {/* Top Product Meta: Category Pill + Active Switch */}
            <View style={styles.productCardHeader}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>{item.category}</Text>
              </View>

              <View style={styles.statusToggleGroup}>
                <Text
                  style={[styles.statusToggleLabel, item.isActive && styles.statusToggleLabelActive]}
                >
                  {item.isActive ? 'Active' : 'Hidden'}
                </Text>
                <Switch
                  value={item.isActive}
                  onValueChange={() => toggleProductActive(item.id)}
                  trackColor={{ false: '#D8D5E5', true: HomeBazColors.primary }}
                  thumbColor="#FFFFFF"
                  style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                />
              </View>
            </View>

            {/* Product Card Body: Thumbnail + Info */}
            <TouchableOpacity
              style={styles.productCardBody}
              onPress={() =>
                router.push({ pathname: '/product-manage/edit-product', params: { id: item.id } })
              }
              activeOpacity={0.78}
            >
              <View style={styles.productThumbContainer}>
                <ProductThumbnail size={44} imageSource={item.image} />
                {item.isHandmade && (
                  <View style={styles.handmadeBadge}>
                    <Ionicons name="sparkles" size={8} color="#FFFFFF" />
                  </View>
                )}
              </View>

              <View style={styles.productDetailsCol}>
                <Text style={styles.productNameText} numberOfLines={1}>
                  {item.name}
                </Text>

                <View style={styles.productMetaStats}>
                  <View style={styles.ratingGroup}>
                    <Ionicons name="star" size={11} color="#F59E0B" />
                    <Text style={styles.ratingNumber}>{item.rating}</Text>
                  </View>
                  <Text style={styles.metaDot}>•</Text>
                  <Text style={styles.salesCountText}>{item.ordersCount} sold</Text>
                </View>

                <View style={styles.priceAndStockRow}>
                  <Text style={styles.productPriceText}>₹{item.price}</Text>

                  {isOutOfStock ? (
                    <View style={styles.stockBadgeOut}>
                      <Text style={styles.stockBadgeTextOut}>Out of Stock</Text>
                    </View>
                  ) : isLowStock ? (
                    <View style={styles.stockBadgeLow}>
                      <Text style={styles.stockBadgeTextLow}>Only {item.stock} left</Text>
                    </View>
                  ) : (
                    <View style={styles.stockBadgeIn}>
                      <Text style={styles.stockBadgeTextIn}>{item.stock} in stock</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>

            {/* Card Footer: Edit Button & Image Gallery Link */}
            <View style={styles.productCardFooter}>
              <TouchableOpacity
                style={styles.footerActionBtn}
                onPress={() =>
                  router.push({
                    pathname: '/product-manage/product-image-gallery',
                    params: { productId: item.id },
                  })
                }
                activeOpacity={0.7}
              >
                <Ionicons name="images-outline" size={12} color="#6C5CE7" />
                <Text style={styles.footerActionBtnText}>Photos</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.editProductBtn}
                onPress={() =>
                  router.push({
                    pathname: '/product-manage/edit-product',
                    params: { id: item.id },
                  })
                }
                activeOpacity={0.75}
              >
                <Text style={styles.editProductBtnText}>Edit</Text>
                <Ionicons name="create-outline" size={12} color="#1E1B39" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

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
                translateX: shimmerAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-40, 40],
                }),
              },
            ],
            opacity: shimmerAnim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.7, 0.95, 0.7],
            }),
          },
        ]}
      >
        <LinearGradient
          colors={[
            'rgba(108, 92, 231, 0.12)',
            'rgba(162, 155, 254, 0.16)',
            'rgba(237, 234, 251, 0.22)',
            'transparent',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.movingAuraGradient}
        />
      </Animated.View>

      {/* Header with Safe Area Clearance */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 14) }]}>
        <Text style={styles.headerTitle}>Products</Text>
        <View style={styles.headerRightActions}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => setShowSearch(!showSearch)}
            activeOpacity={0.7}
          >
            <Ionicons name="search" size={20} color={HomeBazColors.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconBtn, styles.addBtn]}
            onPress={() => router.push('/add-product')}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Input Bar */}
      {showSearch && (
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={18} color="#9B97B0" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search products by name or category..."
            placeholderTextColor="#A8A5B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            autoFocus
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#9B97B0" />
            </TouchableOpacity>
          ) : null}
        </View>
      )}

      {/* Filter Tabs */}
      <TabFilter
        options={tabs}
        selectedKey={selectedTab}
        onSelect={handleSelectTab}
      />

      {/* Screen Center Loader / Products List */}
      {isLoading ? (
        <ScreenCenterLoader size="small" />
      ) : (
        <FlatList
          ref={flatListRef}
          style={styles.list}
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderProductItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#6C5CE7"
              colors={['#6C5CE7', '#8A65F2']}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  list: {
    flex: 1,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8F8FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtn: {
    backgroundColor: HomeBazColors.primary,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E5F2',
    marginHorizontal: 16,
    marginTop: 10,
    paddingHorizontal: 12,
    height: 42,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: HomeBazColors.textPrimary,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 28,
    flexGrow: 1,
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
  cardTouchWrapper: {
    marginBottom: 7,
  },
  productCard: {
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: '#DFD8F5',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#1F1A3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  cardAccentStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3.5,
  },
  productCardRightBgContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 95,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRightShimmerBeam: {
    position: 'absolute',
    top: -20,
    bottom: -20,
    width: 35,
  },
  fullSize: {
    width: '100%',
    height: '100%',
  },
  productWatermarkGroup: {
    position: 'absolute',
    right: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productMotionLinesGroup: {
    position: 'absolute',
    right: 48,
    alignItems: 'flex-end',
  },
  motionLine: {
    height: 1.8,
    backgroundColor: '#6C5CE7',
    borderRadius: 1,
  },
  productCardSparkle: {
    position: 'absolute',
    top: 8,
    right: 26,
  },
  cardInnerPadding: {
    paddingVertical: 7,
    paddingLeft: 12,
    paddingRight: 10,
  },
  productCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 4.5,
    borderBottomWidth: 1,
    borderBottomColor: '#F0ECF8',
  },
  categoryBadge: {
    backgroundColor: '#F0ECFD',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 4,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6C5CE7',
  },
  statusToggleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  statusToggleLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9E9AB0',
  },
  statusToggleLabelActive: {
    color: '#059669',
    fontWeight: '700',
  },
  productCardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  productThumbContainer: {
    position: 'relative',
  },
  handmadeBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#F59E0B',
    borderRadius: 7,
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: '#FFFFFF',
  },
  productDetailsCol: {
    marginLeft: 10,
    flex: 1,
  },
  productNameText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E1B39',
    marginBottom: 1,
  },
  productMetaStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2.5,
  },
  ratingGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingNumber: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E1B39',
  },
  metaDot: {
    color: '#D1CEE0',
    fontSize: 9,
  },
  salesCountText: {
    fontSize: 10,
    color: '#8A85A3',
    fontWeight: '500',
  },
  priceAndStockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  productPriceText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: HomeBazColors.primary,
  },
  stockBadgeIn: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  stockBadgeTextIn: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#059669',
  },
  stockBadgeLow: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  stockBadgeTextLow: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#D97706',
  },
  stockBadgeOut: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  stockBadgeTextOut: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#DC2626',
  },
  productCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#F0ECF8',
  },
  footerActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#ECE7FA',
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 6,
  },
  footerActionBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6C5CE7',
  },
  editProductBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#F0ECF8',
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 6,
  },
  editProductBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1E1B39',
  },
});
