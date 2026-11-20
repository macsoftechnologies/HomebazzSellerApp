import React from 'react';
import {
  Linking,
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
import { GradientButton } from '@/components/common/GradientButton';
import { MOCK_ORDERS } from '@/data/mockData';

export default function DeliveryPartnerAssignedScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const { orderId } = useLocalSearchParams();
  const order = MOCK_ORDERS.find((o) => o.id === orderId) || MOCK_ORDERS[0];
  const defaultPartner = {
    name: 'Ramesh Varma',
    phone: '9848011223',
    vehicleNumber: 'AP 31 BY 4921',
    rating: 4.9,
    etaMinutes: 12,
  };
  const partner = order?.deliveryPartner || defaultPartner;
  const bottomInset = Math.max(insets.bottom, Platform.OS === 'android' ? 22 : 16);

  const handleCallRider = () => {
    Linking.openURL(`tel:${partner.phone}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Delivery Partner Assigned" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Rider Arriving ETA Banner */}
        <View style={styles.etaCard}>
          <View style={styles.etaLeft}>
            <Text style={styles.etaLabel}>ESTIMATED ARRIVAL AT YOUR KITCHEN</Text>
            <Text style={styles.etaTime}>{partner.etaMinutes} Minutes</Text>
            <Text style={styles.etaDistance}>Distance: 2.1 km away • Siripuram Circle</Text>
          </View>
          <View style={styles.bikeIconBox}>
            <Ionicons name="bicycle" size={32} color={HomeBazColors.primary} />
          </View>
        </View>

        {/* Assigned Rider Profile Card */}
        <View style={styles.riderCard}>
          <View style={styles.riderTop}>
            <View style={styles.riderAvatar}>
              <Ionicons name="person" size={26} color={HomeBazColors.primary} />
            </View>

            <View style={styles.riderDetails}>
              <Text style={styles.riderName}>{partner.name}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={13} color="#F59E0B" />
                <Text style={styles.ratingText}>{partner.rating}</Text>
                <Text style={styles.deliveriesCount}>(HomeBaz Express Rider)</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.callRiderBtn}
              onPress={handleCallRider}
              activeOpacity={0.7}
            >
              <Ionicons name="call" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.vehicleRow}>
            <View style={styles.vehicleTag}>
              <Ionicons name="car-outline" size={14} color={HomeBazColors.textSecondary} />
              <Text style={styles.vehicleText}>{partner.vehicleNumber}</Text>
            </View>
            <View style={styles.vehicleTag}>
              <Ionicons name="shield-checkmark" size={14} color="#10B981" />
              <Text style={styles.vehicleText}>Vaccinated & Verified</Text>
            </View>
          </View>
        </View>

        {/* Handover Process Instructions */}
        <View style={styles.instructionsCard}>
          <Text style={styles.instHeading}>Handover Instructions</Text>

          <View style={styles.stepRow}>
            <View style={styles.stepNum}>
              <Text style={styles.stepNumText}>1</Text>
            </View>
            <Text style={styles.stepDesc}>
              Inspect rider’s HomeBaz uniform and confirm vehicle number ({partner.vehicleNumber}).
            </Text>
          </View>

          <View style={styles.stepRow}>
            <View style={styles.stepNum}>
              <Text style={styles.stepNumText}>2</Text>
            </View>
            <Text style={styles.stepDesc}>
              Hand over sealed parcel box with Order #{order.id.replace('#', '')} label.
            </Text>
          </View>

          <View style={styles.stepRow}>
            <View style={styles.stepNum}>
              <Text style={styles.stepNumText}>3</Text>
            </View>
            <Text style={styles.stepDesc}>
              Ask rider for the 4-digit Handover OTP before handing over the parcel.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Proceed to Handover & OTP Verification  →"
          onPress={() =>
            router.push({
              pathname: '/order-manage/handover-confirmation',
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
  etaCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#ECECF5',
    marginBottom: 14,
  },
  etaLeft: {
    flex: 1,
  },
  etaLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: HomeBazColors.primary,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  etaTime: {
    fontSize: 26,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  etaDistance: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
  },
  bikeIconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: HomeBazColors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  riderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECF5',
    marginBottom: 14,
  },
  riderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  riderAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: HomeBazColors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  riderDetails: {
    flex: 1,
  },
  riderName: {
    fontSize: 16,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#D97706',
  },
  deliveriesCount: {
    fontSize: 11,
    color: HomeBazColors.textSecondary,
  },
  callRiderBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: HomeBazColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleRow: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F2F1F8',
  },
  vehicleTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F8F7FD',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  vehicleText: {
    fontSize: 11,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  instructionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#ECECF5',
  },
  instHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    marginBottom: 14,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  stepNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: HomeBazColors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  stepNumText: {
    fontSize: 11,
    fontWeight: '800',
    color: HomeBazColors.primary,
  },
  stepDesc: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    lineHeight: 17,
    flex: 1,
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
