import React, { useState, useMemo } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@/components/common/Header';
import { MOCK_NOTIFICATIONS, NotificationItem } from '@/data/mockData';

type FilterType = 'all' | 'order' | 'stock' | 'payout' | 'verification';

interface NotificationTheme {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bgLight: string;
  borderColor: string;
  tag: string;
  tagBg: string;
  tagColor: string;
  actionText: string;
}

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const getNotificationTheme = (type: string): NotificationTheme => {
    switch (type) {
      case 'order':
        return {
          icon: 'receipt',
          color: '#059669',
          bgLight: '#F0FDF4',
          borderColor: '#A7F3D0',
          tag: 'New Order',
          tagBg: '#DCFCE7',
          tagColor: '#065F46',
          actionText: 'View Order  →',
        };
      case 'shipping':
        return {
          icon: 'bicycle',
          color: '#2563EB',
          bgLight: '#EFF6FF',
          borderColor: '#BFDBFE',
          tag: 'Delivery Partner',
          tagBg: '#DBEAFE',
          tagColor: '#1E40AF',
          actionText: 'Track Order  →',
        };
      case 'stock':
        return {
          icon: 'warning',
          color: '#D97706',
          bgLight: '#FFFBEB',
          borderColor: '#FDE68A',
          tag: 'Stock Alert',
          tagBg: '#FEF3C7',
          tagColor: '#92400E',
          actionText: 'Update Stock  →',
        };
      case 'payout':
        return {
          icon: 'wallet',
          color: '#0D9488',
          bgLight: '#F0FDFA',
          borderColor: '#99F6E4',
          tag: 'Payout Settled',
          tagBg: '#CCFBF1',
          tagColor: '#115E59',
          actionText: 'Payout History  →',
        };
      case 'verification':
        return {
          icon: 'shield-checkmark',
          color: '#7C3AED',
          bgLight: '#F5F3FF',
          borderColor: '#DDD6FE',
          tag: 'Quality Verified',
          tagBg: '#EDE9FE',
          tagColor: '#5B21B6',
          actionText: 'View Status  →',
        };
      case 'review':
        return {
          icon: 'star',
          color: '#DB2777',
          bgLight: '#FDF2F8',
          borderColor: '#FBCFE8',
          tag: 'Customer Feedback',
          tagBg: '#FCE7F3',
          tagColor: '#9D174D',
          actionText: 'Read Review  →',
        };
      default:
        return {
          icon: 'notifications',
          color: '#6C5CE7',
          bgLight: '#F8F6FF',
          borderColor: '#E2D5F8',
          tag: 'Update',
          tagBg: '#F3EFFF',
          tagColor: '#6C5CE7',
          actionText: 'View Details  →',
        };
    }
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const filteredNotifications = useMemo(() => {
    if (activeFilter === 'all') return notifications;
    if (activeFilter === 'order') {
      return notifications.filter((n) => n.type === 'order' || n.type === 'shipping');
    }
    return notifications.filter((n) => n.type === activeFilter);
  }, [notifications, activeFilter]);

  const handleNotificationPress = (item: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );

    if (item.type === 'order' || item.type === 'shipping') {
      router.push('/order-details');
    } else if (item.type === 'stock') {
      router.push('/inventory');
    } else if (item.type === 'payout') {
      router.push('/business/payout-history');
    } else if (item.type === 'verification') {
      router.push('/verification/verification-status');
    } else if (item.type === 'review') {
      router.push('/business/customer-reviews');
    }
  };

  const bottomClearance = Math.max(insets.bottom, Platform.OS === 'android' ? 24 : 16) + 30;

  const renderItem = ({ item }: { item: NotificationItem }) => {
    const theme = getNotificationTheme(item.type);

    return (
      <TouchableOpacity
        style={[
          styles.notificationCard,
          !item.read
            ? { backgroundColor: theme.bgLight, borderColor: theme.borderColor }
            : styles.readCard,
        ]}
        onPress={() => handleNotificationPress(item)}
        activeOpacity={0.8}
      >
        {/* Category Accent Left Color Strip */}
        <View style={[styles.leftAccentStrip, { backgroundColor: theme.color }]} />

        {/* Distinct Colored Icon Circle */}
        <View style={[styles.iconCircle, { backgroundColor: theme.tagBg }]}>
          <Ionicons name={theme.icon} size={22} color={theme.color} />
        </View>

        {/* Content Column */}
        <View style={styles.textCol}>
          <View style={styles.topMetaRow}>
            {/* Category Tag with distinct colors */}
            <View style={[styles.categoryTag, { backgroundColor: theme.tagBg }]}>
              <Text style={[styles.categoryTagText, { color: theme.tagColor }]}>
                {theme.tag}
              </Text>
            </View>

            <View style={styles.timeRow}>
              <Text style={styles.itemTime}>{item.time}</Text>
              {!item.read && (
                <View style={[styles.unreadDot, { backgroundColor: theme.color }]} />
              )}
            </View>
          </View>

          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemMessage}>{item.message}</Text>

          {/* Quick Action Navigation Link */}
          <View style={styles.actionRow}>
            <Text style={[styles.actionLinkText, { color: theme.color }]}>
              {theme.actionText}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Header
        title="Notifications"
        showBack
        rightAction={{
          icon: 'checkmark-done-outline',
          onPress: markAllRead,
        }}
      />

      {/* Filter Tabs Bar with Distinct Color Accents */}
      <View style={styles.filterBar}>
        <TouchableOpacity
          style={[styles.filterChip, activeFilter === 'all' && styles.filterChipActiveAll]}
          onPress={() => setActiveFilter('all')}
          activeOpacity={0.75}
        >
          <Text
            style={[
              styles.filterChipText,
              activeFilter === 'all' && styles.filterChipTextActiveAll,
            ]}
          >
            All {unreadCount > 0 ? `(${unreadCount})` : ''}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, activeFilter === 'order' && styles.filterChipActiveOrder]}
          onPress={() => setActiveFilter('order')}
          activeOpacity={0.75}
        >
          <Ionicons
            name="receipt-outline"
            size={13}
            color={activeFilter === 'order' ? '#059669' : '#6B6780'}
            style={{ marginRight: 4 }}
          />
          <Text
            style={[
              styles.filterChipText,
              activeFilter === 'order' && styles.filterChipTextActiveOrder,
            ]}
          >
            Orders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, activeFilter === 'stock' && styles.filterChipActiveStock]}
          onPress={() => setActiveFilter('stock')}
          activeOpacity={0.75}
        >
          <Ionicons
            name="warning-outline"
            size={13}
            color={activeFilter === 'stock' ? '#D97706' : '#6B6780'}
            style={{ marginRight: 4 }}
          />
          <Text
            style={[
              styles.filterChipText,
              activeFilter === 'stock' && styles.filterChipTextActiveStock,
            ]}
          >
            Stock
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, activeFilter === 'payout' && styles.filterChipActivePayout]}
          onPress={() => setActiveFilter('payout')}
          activeOpacity={0.75}
        >
          <Ionicons
            name="wallet-outline"
            size={13}
            color={activeFilter === 'payout' ? '#0D9488' : '#6B6780'}
            style={{ marginRight: 4 }}
          />
          <Text
            style={[
              styles.filterChipText,
              activeFilter === 'payout' && styles.filterChipTextActivePayout,
            ]}
          >
            Payouts
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[styles.listContent, { paddingBottom: bottomClearance }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="notifications-off-outline" size={36} color="#A78BFA" />
            </View>
            <Text style={styles.emptyTitle}>No notifications here</Text>
            <Text style={styles.emptySubtitle}>You are completely up to date with your seller activity.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  filterBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ECE9F6',
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F4F2F9',
    borderWidth: 1,
    borderColor: '#ECE7F6',
  },
  filterChipActiveAll: {
    backgroundColor: '#6C5CE7',
    borderColor: '#6C5CE7',
  },
  filterChipActiveOrder: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  filterChipActiveStock: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  filterChipActivePayout: {
    backgroundColor: '#F0FDFA',
    borderColor: '#99F6E4',
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B6780',
  },
  filterChipTextActiveAll: {
    color: '#FFFFFF',
  },
  filterChipTextActiveOrder: {
    color: '#059669',
  },
  filterChipTextActiveStock: {
    color: '#D97706',
  },
  filterChipTextActivePayout: {
    color: '#0D9488',
  },
  listContent: {
    padding: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.2,
    marginBottom: 12,
    shadowColor: '#1E1B39',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  readCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EDE9F6',
  },
  leftAccentStrip: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4.5,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
    marginRight: 12,
  },
  textCol: {
    flex: 1,
  },
  topMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  categoryTagText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  itemTime: {
    fontSize: 11,
    color: '#8E8AA0',
    fontWeight: '600',
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1C1342',
    marginBottom: 4,
  },
  itemMessage: {
    fontSize: 13,
    color: '#555169',
    lineHeight: 18,
    marginBottom: 8,
  },
  actionRow: {
    alignSelf: 'flex-start',
  },
  actionLinkText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1C1342',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#6B6780',
    textAlign: 'center',
    lineHeight: 18,
  },
});
