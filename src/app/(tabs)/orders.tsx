import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Animated,
  Easing,
  FlatList,
  RefreshControl,
  StyleSheet,
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
import { StatusBadge } from '@/components/common/StatusBadge';
import { ProductThumbnail } from '@/components/common/ProductThumbnail';
import { TabFilter } from '@/components/common/TabFilter';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_ORDERS, Order } from '@/data/mockData';
import { ScreenCenterLoader } from '@/components/common/CircleLoader';

export default function OrdersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList<Order>>(null);
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

  const newCount = MOCK_ORDERS.filter((o) => o.status === 'New').length;
  const procCount = MOCK_ORDERS.filter((o) => o.status === 'Processing').length;
  const packedCount = MOCK_ORDERS.filter((o) => o.status === 'Packed').length;
  const shippedCount = MOCK_ORDERS.filter((o) => o.status === 'Shipped').length;
  const deliveredCount = MOCK_ORDERS.filter((o) => o.status === 'Delivered').length;
  const cancelledCount = MOCK_ORDERS.filter((o) => o.status === 'Cancelled').length;

  const tabs = [
    { key: 'all', label: 'All', count: MOCK_ORDERS.length },
    { key: 'new', label: 'New', count: newCount },
    { key: 'processing', label: 'Processing', count: procCount },
    { key: 'packed', label: 'Packed', count: packedCount },
    { key: 'shipped', label: 'Shipped', count: shippedCount },
    { key: 'delivered', label: 'Delivered', count: deliveredCount },
    { key: 'cancelled', label: 'Cancelled', count: cancelledCount },
  ];

  const handleSelectTab = (key: string) => {
    setSelectedTab(key);
    // Instantly scroll list to top to keep layout perfectly stable
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
  };

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    // Tab filter (handles all statuses: New, Processing, Packed, Shipped, Delivered, Cancelled)
    if (selectedTab !== 'all') {
      if (order.status.toLowerCase() !== selectedTab) {
        return false;
      }
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        order.id.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        order.items.some((i) => i.name.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const renderOrderItem = ({ item }: { item: Order }) => {
    const isDelivered = item.status === 'Delivered';
    const isCancelled = item.status === 'Cancelled';

    return (
      <TouchableOpacity
        onPress={() => router.push({ pathname: '/order-details', params: { orderId: item.id } })}
        activeOpacity={0.88}
        style={styles.cardTouchWrapper}
      >
        <LinearGradient
          colors={['#FFFFFF', '#F5F2FD', '#E6DFF9']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.orderCard}
        >
          {/* Subtle Left Accent Line in Logo Colors */}
          <LinearGradient
            colors={['#6C5CE7', '#A29BFE']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.cardAccentStripe}
          />

          {/* Order-Related Right-Side Background Animation (Logistics Cube / Delivery Motion / Speed Streaks - NO BALLS) */}
          <View pointerEvents="none" style={styles.orderCardRightBgContainer}>
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

            {/* Logistics Watermark: Dynamic Icon depending on Order Status */}
            <Animated.View
              style={[
                styles.orderWatermarkGroup,
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
              {item.status === 'Shipped' ? (
                <Ionicons name="bicycle" size={38} color="#6C5CE7" />
              ) : item.status === 'Delivered' ? (
                <Ionicons name="cube" size={38} color="#10B981" />
              ) : (
                <Ionicons name="cube-outline" size={38} color="#6C5CE7" />
              )}
            </Animated.View>

            {/* Logistics Speed Lines (Linear Streaks trailing to the left) */}
            <Animated.View
              style={[
                styles.orderSpeedLinesGroup,
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
              <View style={[styles.speedLine, { width: 22 }]} />
              <View style={[styles.speedLine, { width: 34, marginTop: 3 }]} />
              <View style={[styles.speedLine, { width: 16, marginTop: 3 }]} />
            </Animated.View>

            {/* Twinkling Star Sparkle Accent */}
            <Animated.View
              style={[
                styles.orderCardSparkle,
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
            {/* Card Header Row: Order ID, Status */}
            <View style={styles.cardHeaderRow}>
              <View style={styles.orderIdGroup}>
                <View style={styles.receiptIconBadge}>
                  <Ionicons name="receipt-outline" size={12} color="#6C5CE7" />
                </View>
                <Text style={styles.orderIdText}>{item.id}</Text>
              </View>
              <StatusBadge status={item.status} size="small" />
            </View>

            {/* Card Body: Thumbnail + Title + Customer + Price */}
            <View style={styles.cardBodyRow}>
              <View style={styles.thumbnailWrapper}>
                <ProductThumbnail size={52} imageSource={item.items[0]?.image} />
                <View style={styles.itemsCountBadge}>
                  <Text style={styles.itemsCountBadgeText}>{item.itemCount} items</Text>
                </View>
              </View>

              <View style={styles.cardMainInfo}>
                <Text style={styles.cardProductName} numberOfLines={1}>
                  {item.items[0]?.name || 'Artisan Food Package'}
                </Text>

                <View style={styles.customerMetaRow}>
                  <Ionicons name="person-circle-outline" size={13} color="#8A85A3" />
                  <Text style={styles.customerNameText} numberOfLines={1}>
                    {item.customerName}
                  </Text>
                </View>

                <View style={styles.priceRow}>
                  <Text style={styles.orderAmountText}>₹{item.totalAmount}</Text>
                  <LinearGradient
                    colors={['#F3EFFF', '#ECE7FE']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.paymentPill}
                  >
                    <Text style={styles.paymentPillText}>
                      {item.paymentMode.includes('COD') ? 'COD' : 'Paid Online'}
                    </Text>
                  </LinearGradient>
                </View>
              </View>
            </View>

            {/* Card Footer: Rider / Timeline / Action */}
            <View style={styles.cardFooter}>
              <View style={styles.footerLeft}>
                {item.deliveryPartner ? (
                  <View style={styles.riderChip}>
                    <Ionicons name="bicycle" size={12} color="#059669" />
                    <Text style={styles.riderText} numberOfLines={1}>
                      {item.deliveryPartner.name} • {item.deliveryPartner.etaMinutes}m ETA
                    </Text>
                  </View>
                ) : isCancelled ? (
                  <View style={styles.riderChipCancelled}>
                    <Ionicons name="close-circle" size={12} color="#DC2626" />
                    <Text style={styles.riderTextCancelled}>Refund Processed</Text>
                  </View>
                ) : isDelivered ? (
                  <View style={styles.riderChipDelivered}>
                    <Ionicons name="checkmark-done" size={12} color="#059669" />
                    <Text style={styles.riderTextDelivered}>Delivered Successfully</Text>
                  </View>
                ) : (
                  <Text style={styles.timePlacedText}>Placed {item.placedAt}</Text>
                )}
              </View>

              <View style={styles.viewOrderLink}>
                <Text style={styles.viewOrderText}>Manage</Text>
                <Ionicons name="chevron-forward" size={11} color="#6C5CE7" />
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Orders</Text>
        <TouchableOpacity
          style={styles.searchIconButton}
          onPress={() => setShowSearch(!showSearch)}
          activeOpacity={0.7}
        >
          <Ionicons name="search" size={20} color={HomeBazColors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Search Input Bar if open */}
      {showSearch && (
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={18} color="#9B97B0" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search by Order ID, customer, item..."
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
        scrollable
      />

      {/* Screen Center Loader / Orders List */}
      {isLoading ? (
        <ScreenCenterLoader size="small" />
      ) : (
        <FlatList
          ref={flatListRef}
          style={styles.list}
          data={filteredOrders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrderItem}
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
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="receipt-outline" size={48} color="#C4BFD8" />
              <Text style={styles.emptyTitle}>No Orders Found</Text>
              <Text style={styles.emptyDesc}>
                No orders currently match the selected filter criteria.
              </Text>
            </View>
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
  searchIconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8F8FC',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 9,
  },
  orderCard: {
    borderRadius: 14,
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
  orderCardRightBgContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 100,
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
  orderWatermarkGroup: {
    position: 'absolute',
    right: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderSpeedLinesGroup: {
    position: 'absolute',
    right: 50,
    alignItems: 'flex-end',
  },
  speedLine: {
    height: 1.8,
    backgroundColor: '#6C5CE7',
    borderRadius: 1,
  },
  orderCardSparkle: {
    position: 'absolute',
    top: 10,
    right: 28,
  },
  cardInnerPadding: {
    paddingVertical: 10,
    paddingLeft: 14,
    paddingRight: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#F0ECF8',
  },
  orderIdGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  receiptIconBadge: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: '#F0ECFD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderIdText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E1B39',
    letterSpacing: -0.2,
  },
  cardBodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  thumbnailWrapper: {
    position: 'relative',
  },
  itemsCountBadge: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    backgroundColor: '#1E1B39',
    borderRadius: 7,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  itemsCountBadgeText: {
    fontSize: 8.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cardMainInfo: {
    flex: 1,
    marginLeft: 12,
  },
  cardProductName: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#1E1B39',
    marginBottom: 2,
  },
  customerMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  customerNameText: {
    fontSize: 11.5,
    color: '#716D88',
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  orderAmountText: {
    fontSize: 14,
    fontWeight: '800',
    color: HomeBazColors.primary,
  },
  paymentPill: {
    backgroundColor: '#ECE7FA',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 5,
  },
  paymentPillText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: HomeBazColors.primary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 7,
    borderTopWidth: 1,
    borderTopColor: '#F0ECF8',
  },
  footerLeft: {
    flex: 1,
    marginRight: 8,
  },
  riderChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  riderText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#059669',
  },
  riderChipCancelled: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  riderTextCancelled: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#DC2626',
  },
  riderChipDelivered: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  riderTextDelivered: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#16A34A',
  },
  timePlacedText: {
    fontSize: 10.5,
    color: '#9E9AB0',
    fontWeight: '500',
  },
  viewOrderLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#ECE7FA',
    paddingHorizontal: 9,
    paddingVertical: 3.5,
    borderRadius: 10,
  },
  viewOrderText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#6C5CE7',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
    marginTop: 12,
  },
  emptyDesc: {
    fontSize: 13,
    color: HomeBazColors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 32,
  },
});
