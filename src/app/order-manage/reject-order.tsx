import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
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
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';
import { CustomInput } from '@/components/common/CustomInput';
import { GradientButton } from '@/components/common/GradientButton';
import { MOCK_ORDERS } from '@/data/mockData';

export default function RejectOrderScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const order = MOCK_ORDERS.find((o) => o.id === orderId) || MOCK_ORDERS[0];
  const [selectedReason, setSelectedReason] = useState('Out of Stock / Ingredients Unavailable');
  const [customNote, setCustomNote] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [cancellationStep, setCancellationStep] = useState<'confirm' | 'success'>('confirm');
  const [isProcessing, setIsProcessing] = useState(false);

  const reasons = [
    'Out of Stock / Ingredients Unavailable',
    'Kitchen Capacity Full for Today',
    'Cannot Meet Customer Custom Instruction',
    'Store Temporarily Closed for Vacation',
    'Other Reason',
  ];

  const handleOpenConfirmModal = () => {
    setCancellationStep('confirm');
    setShowConfirmModal(true);
  };

  const handleFinalizeCancel = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCancellationStep('success');
    }, 600);
  };

  const handleFinishAndReturn = () => {
    setShowConfirmModal(false);
    router.replace('/(tabs)/orders');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <Header title="Reject Order" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topNotice}>
          <Ionicons name="warning-outline" size={24} color="#DC2626" />
          <View style={{ flex: 1 }}>
            <Text style={styles.noticeTitle}>Rejecting Order {order.id}</Text>
            <Text style={styles.noticeBody}>
              High cancellation rates affect your HomeBaz Quality Score. Reject only if genuinely unable to fulfill.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Select Reason for Rejection</Text>

          {reasons.map((r) => {
            const isSelected = selectedReason === r;
            return (
              <TouchableOpacity
                key={r}
                style={[styles.reasonRow, isSelected && styles.reasonRowSelected]}
                onPress={() => setSelectedReason(r)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                  size={18}
                  color={isSelected ? HomeBazColors.danger : '#9B97B0'}
                />
                <Text style={[styles.reasonText, isSelected && styles.reasonTextSelected]}>
                  {r}
                </Text>
              </TouchableOpacity>
            );
          })}

          <CustomInput
            label="Additional Note to Customer (Optional)"
            value={customNote}
            onChangeText={setCustomNote}
            multiline
            numberOfLines={3}
            placeholder="e.g. Fresh batch being prepared tomorrow morning..."
          />
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Confirm Order Cancellation"
          variant="danger"
          onPress={handleOpenConfirmModal}
          size="large"
        />
      </View>

      {/* Custom Confirmation & Resolution Modal */}
      <Modal
        visible={showConfirmModal}
        transparent
        animationType="fade"
        onRequestClose={() => {
          if (cancellationStep === 'confirm') {
            setShowConfirmModal(false);
          } else {
            handleFinishAndReturn();
          }
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {cancellationStep === 'confirm' ? (
              <>
                {/* Danger Header Icon */}
                <View style={styles.dangerIconCircle}>
                  <Ionicons name="alert-circle" size={32} color="#DC2626" />
                </View>

                <Text style={styles.modalTitle}>Cancel Order {order.id}?</Text>
                <Text style={styles.modalSubtitle}>
                  Are you sure you want to decline this order? Once cancelled, the customer will be immediately notified and refunded.
                </Text>

                {/* Cancellation Details Summary Card */}
                <View style={styles.summaryBox}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Selected Reason:</Text>
                    <Text style={styles.summaryValue} numberOfLines={2}>
                      {selectedReason}
                    </Text>
                  </View>
                  <View style={styles.summaryDivider} />
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Refund Amount:</Text>
                    <Text style={styles.summaryAmount}>₹{order.totalAmount}</Text>
                  </View>
                  <View style={styles.summaryDivider} />
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Customer:</Text>
                    <Text style={styles.summaryValue}>{order.customerName}</Text>
                  </View>
                </View>

                {/* Quality Score Warning */}
                <View style={styles.scoreWarningCard}>
                  <Ionicons name="information-circle" size={18} color="#B45309" />
                  <Text style={styles.scoreWarningText}>
                    Cancellation reduces your HomeBaz kitchen rating and search ranking score.
                  </Text>
                </View>

                {/* Modal Actions */}
                <View style={styles.modalActionGroup}>
                  <GradientButton
                    title="Yes, Cancel This Order"
                    variant="danger"
                    loading={isProcessing}
                    onPress={handleFinalizeCancel}
                    size="large"
                    style={styles.confirmCancelBtn}
                  />

                  <TouchableOpacity
                    style={styles.cancelDismissBtn}
                    onPress={() => setShowConfirmModal(false)}
                    disabled={isProcessing}
                    activeOpacity={0.75}
                  >
                    <Text style={styles.cancelDismissText}>No, Keep Order</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                {/* Success Header Icon */}
                <View style={styles.successIconCircle}>
                  <Ionicons name="checkmark-circle" size={36} color="#059669" />
                </View>

                <Text style={styles.modalTitle}>Order Cancelled</Text>
                <Text style={styles.modalSubtitle}>
                  Order {order.id} has been cancelled successfully and removed from active queue.
                </Text>

                {/* Resolution Summary Card */}
                <View style={styles.successSummaryBox}>
                  <View style={styles.resolutionRow}>
                    <Ionicons name="notifications" size={18} color="#059669" />
                    <Text style={styles.resolutionText}>Customer notified via SMS & Push</Text>
                  </View>
                  <View style={styles.resolutionRow}>
                    <Ionicons name="card" size={18} color="#059669" />
                    <Text style={styles.resolutionText}>₹{order.totalAmount} Full refund initiated</Text>
                  </View>
                  <View style={styles.resolutionRow}>
                    <Ionicons name="document-text" size={18} color="#059669" />
                    <Text style={styles.resolutionText}>Reason logged: {selectedReason}</Text>
                  </View>
                </View>

                {/* Finish Button */}
                <View style={styles.modalActionGroup}>
                  <GradientButton
                    title="Return to Orders Dashboard  →"
                    onPress={handleFinishAndReturn}
                    size="large"
                    style={styles.confirmCancelBtn}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
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
  topNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#FEE2E2',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FECACA',
    marginBottom: 16,
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#991B1B',
    marginBottom: 2,
  },
  noticeBody: {
    fontSize: 12,
    color: '#B91C1C',
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
    marginBottom: 12,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EFEFF6',
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  reasonRowSelected: {
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
  },
  reasonText: {
    fontSize: 13,
    fontWeight: '600',
    color: HomeBazColors.textSecondary,
    flex: 1,
  },
  reasonTextSelected: {
    color: HomeBazColors.danger,
    fontWeight: '700',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ECECF5',
    elevation: 20,
    zIndex: 100,
    paddingTop: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 12, 35, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 24,
  },
  dangerIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#FEF2F2',
  },
  successIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#ECFDF5',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E1B39',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#716D88',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 18,
  },
  summaryBox: {
    width: '100%',
    backgroundColor: '#FBFBFE',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EFEFF8',
    padding: 14,
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8A85A3',
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E1B39',
    flex: 1,
    textAlign: 'right',
    marginLeft: 12,
  },
  summaryAmount: {
    fontSize: 15,
    fontWeight: '800',
    color: '#DC2626',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#F0EFF8',
    marginVertical: 4,
  },
  scoreWarningCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
    padding: 10,
    marginBottom: 18,
    width: '100%',
  },
  scoreWarningText: {
    fontSize: 11,
    color: '#92400E',
    lineHeight: 15,
    flex: 1,
    fontWeight: '500',
  },
  modalActionGroup: {
    width: '100%',
    gap: 10,
  },
  confirmCancelBtn: {
    width: '100%',
  },
  cancelDismissBtn: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F2F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelDismissText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#656080',
  },
  successSummaryBox: {
    width: '100%',
    backgroundColor: '#F0FDF4',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    padding: 16,
    marginBottom: 20,
    gap: 10,
  },
  resolutionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  resolutionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#166534',
  },
});
