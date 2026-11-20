import React, { useState } from 'react';
import {
  Modal,
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

export default function AcceptOrderScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const { orderId } = useLocalSearchParams();
  const order = MOCK_ORDERS.find((o) => o.id === orderId) || MOCK_ORDERS[0];
  const [prepMinutes, setPrepMinutes] = useState(30);
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  const timeOptions = [15, 30, 45, 60];

  const handleStartTimer = () => {
    setShowAcceptModal(false);
    router.replace({
      pathname: '/order-manage/order-preparation',
      params: { orderId: order.id, minutes: prepMinutes },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Accept Order" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.orderSummaryCard}>
          <View style={styles.topRow}>
            <Text style={styles.orderId}>{order.id}</Text>
            <Text style={styles.orderAmount}>₹{order.totalAmount}</Text>
          </View>
          <Text style={styles.customerName}>
            Customer: {order.customerName} ({order.customerAddress})
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Select Kitchen Preparation Time</Text>
          <Text style={styles.sectionSubtitle}>
            How much time do you need to pack and seal this order?
          </Text>

          <View style={styles.timeGrid}>
            {timeOptions.map((mins) => (
              <TouchableOpacity
                key={mins}
                style={[
                  styles.timeBox,
                  prepMinutes === mins && styles.timeBoxActive,
                ]}
                onPress={() => setPrepMinutes(mins)}
                activeOpacity={0.75}
              >
                <Ionicons
                  name="time-outline"
                  size={20}
                  color={prepMinutes === mins ? HomeBazColors.primary : '#8E8AA0'}
                />
                <Text style={[styles.timeText, prepMinutes === mins && styles.timeTextActive]}>
                  {mins} Mins
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {order.specialInstructions ? (
            <View style={styles.instructionBox}>
              <Ionicons name="chatbubble-ellipses-outline" size={18} color="#D97706" />
              <View style={{ flex: 1 }}>
                <Text style={styles.instTitle}>Customer Note</Text>
                <Text style={styles.instBody}>{order.specialInstructions}</Text>
              </View>
            </View>
          ) : null}

          {/* Checklist Items to Pack */}
          <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Items to Pack</Text>
          {order.items.map((item, idx) => (
            <View key={item.id || idx} style={styles.itemRow}>
              <ProductThumbnail size={42} imageSource={item.image} />
              <View style={styles.itemMeta}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQty}>Quantity: {item.quantity} jar</Text>
              </View>
              <Text style={styles.itemTotal}>₹{item.total}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title={`Confirm Acceptance (${prepMinutes} Mins)  →`}
          onPress={() => setShowAcceptModal(true)}
          size="large"
        />
      </View>

      {/* Custom Order Acceptance Modal */}
      <Modal
        visible={showAcceptModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAcceptModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconBox}>
              <Ionicons name="timer-outline" size={34} color="#6C5CE7" />
            </View>

            <Text style={styles.modalHeading}>Accept Order {order.id}?</Text>
            <Text style={styles.modalSubheading}>
              You are committing to pack and seal this order within your selected preparation window.
            </Text>

            <View style={styles.prepHighlightBox}>
              <View style={styles.prepTimeRow}>
                <Ionicons name="time" size={18} color="#6C5CE7" />
                <Text style={styles.prepTimeText}>{prepMinutes} Minutes Kitchen Prep</Text>
              </View>
              <Text style={styles.orderMetaText}>
                {order.items.length} Jars • Total Payable: ₹{order.totalAmount}
              </Text>
            </View>

            <View style={styles.modalActionButtons}>
              <GradientButton
                title="Start Kitchen Timer  →"
                onPress={handleStartTimer}
                size="large"
                style={{ width: '100%', marginBottom: 10 }}
              />
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setShowAcceptModal(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.modalCancelText}>Change Preparation Time</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  orderSummaryCard: {
    backgroundColor: HomeBazColors.primarySoft,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2DCF7',
    marginBottom: 14,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  orderId: {
    fontSize: 18,
    fontWeight: '800',
    color: HomeBazColors.primaryDark,
  },
  orderAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: HomeBazColors.primary,
  },
  customerName: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    lineHeight: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECF5',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    marginTop: 2,
    marginBottom: 12,
  },
  timeGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  timeBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E8E5F2',
    backgroundColor: '#FFFFFF',
    gap: 4,
  },
  timeBoxActive: {
    borderColor: HomeBazColors.primary,
    backgroundColor: HomeBazColors.primarySoft,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '700',
    color: HomeBazColors.textSecondary,
  },
  timeTextActive: {
    color: HomeBazColors.primaryDark,
  },
  instructionBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#FFFBEB',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: 14,
  },
  instTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 2,
  },
  instBody: {
    fontSize: 11,
    color: '#B45309',
    lineHeight: 15,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F3F8',
  },
  itemMeta: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  itemQty: {
    fontSize: 11,
    color: HomeBazColors.textSecondary,
    marginTop: 2,
  },
  itemTotal: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 10, 35, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#1C1342',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 14,
  },
  modalIconBox: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#F0EDFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1C1342',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubheading: {
    fontSize: 13,
    color: '#6B6780',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 18,
  },
  prepHighlightBox: {
    width: '100%',
    backgroundColor: '#FAF8FF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.2,
    borderColor: '#E6E0F8',
    alignItems: 'center',
    marginBottom: 20,
  },
  prepTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  prepTimeText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#6C5CE7',
  },
  orderMetaText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B6780',
  },
  modalActionButtons: {
    width: '100%',
    alignItems: 'center',
  },
  modalCancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8E8AA0',
  },
});
