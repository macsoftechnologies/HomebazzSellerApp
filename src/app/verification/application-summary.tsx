import React, { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@/components/common/Header';
import { GradientButton } from '@/components/common/GradientButton';
import { SELLER_PROFILE } from '@/data/mockData';

interface SectionItem {
  label: string;
  value: string;
  isHighlight?: boolean;
  isVerified?: boolean;
}

interface SummarySection {
  id: string;
  title: string;
  categoryTag: string;
  route: string;
  icon: keyof typeof Ionicons.glyphMap;
  accentColor: string;
  cardBg: string;
  borderColor: string;
  items: SectionItem[];
}

export default function ApplicationSummaryScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [declared, setDeclared] = useState(true);

  const handleSubmit = () => {
    if (!declared) {
      Alert.alert('Declaration Required', 'Please confirm the seller declaration checkbox before submitting.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      router.replace('/verification/application-submitted');
    }, 850);
  };

  const sections: SummarySection[] = [
    {
      id: 'personal',
      title: 'Store & Personal Details',
      categoryTag: 'IDENTITY & PROFILE',
      route: '/registration/personal-details',
      icon: 'person-outline' as const,
      accentColor: '#6C5CE7',
      cardBg: '#FAF9FE',
      borderColor: '#EAE6F8',
      items: [
        { label: 'Store Brand Name', value: SELLER_PROFILE.storeName, isHighlight: true },
        { label: 'Registered Maker', value: SELLER_PROFILE.bankDetails.accountHolder },
        { label: 'Primary Contact', value: `+91 ${SELLER_PROFILE.phone}` },
        { label: 'Email Address', value: SELLER_PROFILE.email },
        { label: 'ID Verification', value: 'Aadhaar (5489 1204 8921) • Verified', isVerified: true },
      ],
    },
    {
      id: 'address',
      title: 'Kitchen & Pickup Location',
      categoryTag: 'PICKUP HUB',
      route: '/registration/address-details',
      icon: 'location-outline' as const,
      accentColor: '#059669',
      cardBg: '#FAFEFC',
      borderColor: '#D1FAE5',
      items: [
        { label: 'Kitchen Pickup Point', value: SELLER_PROFILE.address },
        { label: 'Hub City', value: 'Visakhapatnam, Andhra Pradesh - 530016' },
        { label: 'Address Document', value: 'APEPDCL Electricity Bill • Verified', isVerified: true },
        { label: 'Logistics Access', value: 'Doorstep Courier Pickup Enabled' },
      ],
    },
    {
      id: 'banking',
      title: 'Banking & Daily Settlements',
      categoryTag: 'PAYOUTS',
      route: '/verification/bank-details',
      icon: 'wallet-outline' as const,
      accentColor: '#2563EB',
      cardBg: '#F8FAFF',
      borderColor: '#DBEAFE',
      items: [
        { label: 'Account Holder', value: SELLER_PROFILE.bankDetails.accountHolder },
        { label: 'Bank Name', value: SELLER_PROFILE.bankDetails.bankName },
        { label: 'Account Number', value: '•••• •••• 3019 (Verified)', isVerified: true },
        { label: 'IFSC Code', value: SELLER_PROFILE.bankDetails.ifsc },
        { label: 'Payout Schedule', value: 'Direct Bank Settlement (Weekly / On-demand)' },
      ],
    },
    {
      id: 'compliance',
      title: 'Food Safety & Compliance',
      categoryTag: 'LEGAL & FSSAI',
      route: '/verification/fssai-registration',
      icon: 'shield-checkmark-outline' as const,
      accentColor: '#D97706',
      cardBg: '#FFFDF8',
      borderColor: '#FEF3C7',
      items: [
        { label: 'FSSAI License No', value: SELLER_PROFILE.fssaiNumber, isHighlight: true },
        { label: 'License Validity', value: 'Active (Expires 14/11/2028)', isVerified: true },
        { label: 'GST Tax Status', value: 'Exempt (< ₹20L Turnover Threshold)' },
        { label: 'Safety Standards', value: 'Clean Domestic Kitchen Standard' },
      ],
    },
    {
      id: 'samples',
      title: 'Audit Samples & Production',
      categoryTag: 'CAPACITY & SAMPLES',
      route: '/verification/product-sample-upload',
      icon: 'speedometer-outline' as const,
      accentColor: '#DB2777',
      cardBg: '#FEF9FB',
      borderColor: '#FCE7F3',
      items: [
        { label: 'Sample Products', value: 'Gongura, Avakaya & Lemon Pickles' },
        { label: 'Daily Output Capacity', value: '25 Jars (Approx 12 Kg)' },
        { label: 'Lead Preparation Time', value: '24 Hours Fresh Order Prep' },
        { label: 'Packaging Seal', value: 'Airtight Leak-Proof Jar Sealed' },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Application Summary" showBack />

      {/* 7-Stage Milestone Completed Ribbon */}
      <View style={styles.milestoneRibbon}>
        <View style={styles.milestoneHeaderRow}>
          <View style={styles.milestoneLeftGroup}>
            <View style={styles.milestoneBullet} />
            <Text style={styles.milestoneTitle}>
              ALL 7 VERIFICATION STAGES COMPLETE
            </Text>
          </View>
          <View style={styles.milestoneDoneTag}>
            <Ionicons name="checkmark-circle" size={12} color="#059669" />
            <Text style={styles.milestoneDoneText}>100% Ready</Text>
          </View>
        </View>

        {/* 7 Green Checked Segments */}
        <View style={styles.segmentsRow}>
          {Array.from({ length: 7 }, (_, i) => i + 1).map((num) => (
            <View key={num} style={styles.segmentDone}>
              <Ionicons name="checkmark" size={10} color="#FFFFFF" />
            </View>
          ))}
        </View>

        {/* Solid 100% Progress Bar Track */}
        <View style={styles.trackBackground}>
          <View style={[styles.trackFill, { width: '100%' }]} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 + bottomClearance }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Highlighted Hero Card: Review Your Details */}
        <View style={styles.heroSummaryCard}>
          <View style={styles.heroRow}>
            <View style={styles.heroIconSquircle}>
              <Ionicons name="document-text" size={22} color="#6C5CE7" />
            </View>

            <View style={styles.heroTextCol}>
              <View style={styles.heroTagPill}>
                <Ionicons name="sparkles" size={10} color="#6C5CE7" />
                <Text style={styles.heroTagText}>FINAL APPLICATION REVIEW</Text>
              </View>
              <Text style={styles.heroTitle}>Review Your Details</Text>
              <Text style={styles.heroSubtitle}>
                Verify that all information is accurate before submitting for official HomeBaz quality inspection.
              </Text>
            </View>
          </View>
        </View>

        {/* Seller Store Snapshot Card */}
        <View style={styles.storeHeroCard}>
          <View style={styles.storeAvatarSquircle}>
            <Ionicons name="storefront" size={24} color="#6C5CE7" />
          </View>
          <View style={styles.storeDetailsCol}>
            <View style={styles.storeTitleRow}>
              <Text style={styles.storeNameText}>{SELLER_PROFILE.storeName}</Text>
              <View style={styles.verifiedStorePill}>
                <Ionicons name="shield-checkmark" size={11} color="#059669" />
                <Text style={styles.verifiedStorePillText}>Verified Maker</Text>
              </View>
            </View>
            <Text style={styles.storeSubText}>
              {SELLER_PROFILE.bankDetails.accountHolder} • Home Food Maker (Pickles & Podis)
            </Text>
            <Text style={styles.storeLocationText}>
              📍 Visakhapatnam Hub • Andhra Pradesh
            </Text>
          </View>
        </View>

        {/* Themed Review Section Cards */}
        {sections.map((sec) => (
          <View
            key={sec.id}
            style={[
              styles.sectionCard,
              {
                backgroundColor: sec.cardBg,
                borderColor: sec.borderColor,
                borderTopColor: sec.accentColor,
              },
            ]}
          >
            {/* Card Header */}
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionHeaderLeft}>
                <View
                  style={[
                    styles.sectionIconSquircle,
                    { backgroundColor: sec.accentColor + '18' },
                  ]}
                >
                  <Ionicons name={sec.icon} size={16} color={sec.accentColor} />
                </View>
                <View>
                  <Text style={styles.sectionTitle}>{sec.title}</Text>
                  <Text style={[styles.sectionTag, { color: sec.accentColor }]}>
                    {sec.categoryTag}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.editActionPill}
                onPress={() => router.push(sec.route as any)}
                activeOpacity={0.7}
              >
                <Ionicons name="create-outline" size={13} color="#6C5CE7" />
                <Text style={styles.editActionText}>Edit</Text>
              </TouchableOpacity>
            </View>

            {/* Items Grid */}
            <View style={styles.itemsCol}>
              {sec.items.map((item, idx) => (
                <View key={idx} style={styles.itemRow}>
                  <Text style={styles.itemLabel}>{item.label}</Text>
                  <View style={styles.itemValueCol}>
                    <Text
                      style={[
                        styles.itemValue,
                        item.isHighlight && [styles.itemValueHighlight, { color: sec.accentColor }],
                        item.isVerified && styles.itemValueVerified,
                      ]}
                      numberOfLines={2}
                    >
                      {item.value}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Quality Standards & Fee Guarantee Card */}
        <View style={styles.guaranteeCard}>
          <View style={styles.guaranteeHeader}>
            <View style={styles.guaranteeIconSquircle}>
              <Ionicons name="shield-checkmark" size={16} color="#059669" />
            </View>
            <Text style={styles.guaranteeTitle}>
              HomeBaz Seller Partnership Guarantee
            </Text>
          </View>

          <View style={styles.guaranteePoints}>
            <View style={styles.pointRow}>
              <Ionicons name="checkmark-circle" size={14} color="#059669" />
              <Text style={styles.pointText}>
                Transparent 10% platform commission on fulfilled sales only.
              </Text>
            </View>
            <View style={styles.pointRow}>
              <Ionicons name="checkmark-circle" size={14} color="#059669" />
              <Text style={styles.pointText}>
                Zero registration, listing, or monthly maintenance fees.
              </Text>
            </View>
            <View style={styles.pointRow}>
              <Ionicons name="checkmark-circle" size={14} color="#059669" />
              <Text style={styles.pointText}>
                Doorstep pickup and packaging verification by delivery riders.
              </Text>
            </View>
          </View>
        </View>

        {/* Declaration Agreement Toggle */}
        <TouchableOpacity
          style={styles.declarationRow}
          onPress={() => setDeclared(!declared)}
          activeOpacity={0.8}
        >
          <View style={[styles.declCheckbox, declared && styles.declCheckboxActive]}>
            {declared && <Ionicons name="checkmark" size={13} color="#FFFFFF" />}
          </View>
          <Text style={styles.declarationText}>
            I confirm that all submitted documents, domestic kitchen address, and recipes are authentic and comply with HomeBaz Seller Quality Guidelines.
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Sticky Action Bar */}
      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Submit Application for Review  →"
          onPress={handleSubmit}
          loading={submitting}
          size="large"
        />
        <Text style={styles.bottomHintText}>
          Application review typically completes within 24–48 hours
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },

  // 7-Stage Ribbon
  milestoneRibbon: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ECE7F8',
  },
  milestoneHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  milestoneLeftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  milestoneBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#059669',
  },
  milestoneTitle: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#059669',
    letterSpacing: 0.5,
  },
  milestoneDoneTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 6,
  },
  milestoneDoneText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#059669',
  },
  segmentsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  segmentDone: {
    flex: 1,
    height: 22,
    borderRadius: 7,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackBackground: {
    height: 3.5,
    borderRadius: 2,
    backgroundColor: '#EAE6F5',
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: '#10B981',
  },

  scrollContent: {
    padding: 16,
  },

  // Highlighted Hero Card
  heroSummaryCard: {
    backgroundColor: '#F5F2FD',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    borderLeftWidth: 4.5,
    borderLeftColor: '#6C5CE7',
    marginBottom: 14,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  heroIconSquircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD6FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  heroTextCol: {
    flex: 1,
  },
  heroTagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 4,
  },
  heroTagText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#6C5CE7',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E1B39',
    marginBottom: 3,
  },
  heroSubtitle: {
    fontSize: 12,
    color: '#55516E',
    lineHeight: 17,
  },

  // Store Hero Card
  storeHeroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#ECE7F8',
    marginBottom: 14,
    shadowColor: '#1A103C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  storeAvatarSquircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F3EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  storeDetailsCol: {
    flex: 1,
  },
  storeTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  storeNameText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E1B39',
  },
  verifiedStorePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2.5,
    borderRadius: 6,
  },
  verifiedStorePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  storeSubText: {
    fontSize: 11.5,
    color: '#5E5A78',
    marginBottom: 2,
  },
  storeLocationText: {
    fontSize: 11,
    color: '#7D7998',
  },

  // Section Review Cards
  sectionCard: {
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderTopWidth: 3.5,
    marginBottom: 14,
    shadowColor: '#1A103C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EFF8',
    marginBottom: 10,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  sectionIconSquircle: {
    width: 32,
    height: 32,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1B39',
  },
  sectionTag: {
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginTop: 1,
  },
  editActionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
  },
  editActionText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#6C5CE7',
  },

  // Items
  itemsCol: {
    gap: 7,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 2,
  },
  itemLabel: {
    fontSize: 12,
    color: '#6F6A88',
    flex: 1,
  },
  itemValueCol: {
    flex: 1.5,
    alignItems: 'flex-end',
  },
  itemValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E1B39',
    textAlign: 'right',
  },
  itemValueHighlight: {
    fontWeight: '800',
  },
  itemValueVerified: {
    color: '#059669',
  },

  // Guarantee Card
  guaranteeCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    marginBottom: 12,
  },
  guaranteeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  guaranteeIconSquircle: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guaranteeTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#065F46',
  },
  guaranteePoints: {
    gap: 5,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pointText: {
    fontSize: 11,
    color: '#047857',
    flex: 1,
    lineHeight: 15,
  },

  // Declaration
  declarationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#EAE7F6',
  },
  declCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#C4B5FD',
    backgroundColor: '#FAFAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  declCheckboxActive: {
    backgroundColor: '#6C5CE7',
    borderColor: '#6C5CE7',
  },
  declarationText: {
    fontSize: 11,
    color: '#55516E',
    lineHeight: 16,
    flex: 1,
  },

  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ECE7F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 8,
    alignItems: 'center',
  },
  bottomHintText: {
    fontSize: 11,
    color: '#7E7A94',
    marginTop: 6,
  },
});
