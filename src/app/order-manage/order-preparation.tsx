import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';
import { ProductThumbnail } from '@/components/common/ProductThumbnail';
import { GradientButton } from '@/components/common/GradientButton';
import { MOCK_ORDERS } from '@/data/mockData';

export default function OrderPreparationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { orderId } = useLocalSearchParams();
  const order = MOCK_ORDERS.find((o) => o.id === orderId) || MOCK_ORDERS[0];
  const bottomInset = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);

  const [checkedItems, setCheckedItems] = useState<string[]>(['1']);

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const allPacked = checkedItems.length === order.items.length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Kitchen Preparation" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomInset }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Live Kitchen Countdown Timer Card */}
        <View style={styles.timerCard}>
          <View style={styles.timerCircle}>
            <Text style={styles.timerDigits}>24:18</Text>
            <Text style={styles.timerLabel}>MINS REMAINING</Text>
          </View>
          <Text style={styles.timerSubText}>
            Order {order.id} • Target Pickup in 25 Mins
          </Text>
        </View>

        {/* Preparation Checklist */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Packing Checklist</Text>
          <Text style={styles.sectionSub}>
            Check off each jar as you seal and place it into the HomeBaz box.
          </Text>

          {order.items.map((item) => {
            const isDone = checkedItems.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.checkRow, isDone && styles.checkRowDone]}
                onPress={() => toggleCheck(item.id)}
                activeOpacity={0.75}
              >
                <View style={[styles.checkBox, isDone && styles.checkBoxDone]}>
                  {isDone && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                </View>

                <ProductThumbnail size={44} imageSource={item.image} />

                <View style={styles.checkMeta}>
                  <Text style={[styles.checkName, isDone && styles.checkNameDone]}>
                    {item.name}
                  </Text>
                  <Text style={styles.checkQty}>Qty: {item.quantity} unit • ₹{item.price}</Text>
                </View>

                <View style={[styles.statusTag, isDone ? styles.statusDone : styles.statusPending]}>
                  <Text style={[styles.statusTagText, isDone ? styles.textDone : styles.textPending]}>
                    {isDone ? 'Packed' : 'Pending'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Safety Tape Checklist Reminder */}
          <View style={styles.tapeNotice}>
            <Ionicons name="shield-checkmark" size={18} color="#10B981" />
            <Text style={styles.tapeText}>
              Ensure airtight outer safety seal sticker is fixed onto each jar lid before closing the box.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomInset }]}>
        <GradientButton
          title={allPacked ? 'Mark Ready for Pickup  →' : `Pack All Items (${checkedItems.length}/${order.items.length})`}
          onPress={() =>
            router.push({
              pathname: '/order-manage/ready-for-pickup',
              params: { orderId: order.id },
            })
          }
          size="large"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  timerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECECF5',
    marginBottom: 16,
  },
  timerCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 6,
    borderColor: HomeBazColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: HomeBazColors.primarySoft,
    marginBottom: 12,
  },
  timerDigits: {
    fontSize: 28,
    fontWeight: '800',
    color: HomeBazColors.primaryDark,
    letterSpacing: -0.5,
  },
  timerLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: HomeBazColors.primary,
    letterSpacing: 1,
    marginTop: 2,
  },
  timerSubText: {
    fontSize: 13,
    fontWeight: '600',
    color: HomeBazColors.textSecondary,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECF5',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
  },
  sectionSub: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    marginTop: 2,
    marginBottom: 14,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFEFF6',
    marginBottom: 10,
  },
  checkRowDone: {
    borderColor: '#A7F3D0',
    backgroundColor: '#F0FDF4',
  },
  checkBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#C7C3DF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkBoxDone: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  checkMeta: {
    flex: 1,
    marginLeft: 10,
  },
  checkName: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  checkNameDone: {
    textDecorationLine: 'line-through',
    color: '#065F46',
  },
  checkQty: {
    fontSize: 11,
    color: HomeBazColors.textSecondary,
    marginTop: 2,
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusDone: {
    backgroundColor: '#DCFCE7',
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
  },
  statusTagText: {
    fontSize: 10,
    fontWeight: '700',
  },
  textDone: {
    color: '#16A34A',
  },
  textPending: {
    color: '#D97706',
  },
  tapeNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ECFDF5',
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
  },
  tapeText: {
    flex: 1,
    fontSize: 11,
    color: '#065F46',
    lineHeight: 16,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 14,
    borderTopWidth: 1.5,
    borderTopColor: '#ECE9F6',
    shadowColor: '#1C1342',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
    zIndex: 100,
  },
});
