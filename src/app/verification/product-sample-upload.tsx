import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Platform} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';
import { ProductThumbnail } from '@/components/common/ProductThumbnail';
import { GradientButton } from '@/components/common/GradientButton';
import { VerificationProgressBar } from '@/components/common/VerificationProgressBar';
import { AppImages } from '@/constants/images';

export default function ProductSampleUploadScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const [kitchenPhotoUploaded, setKitchenPhotoUploaded] = useState(true);
  const [packagePhotoUploaded, setPackagePhotoUploaded] = useState(true);
  const [samplePickupRequested, setSamplePickupRequested] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Product Samples & Kitchen" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Stage 6 Progress & Highlighted Hero Heading */}
        <VerificationProgressBar
          currentStage={6}
          stageName="Product Samples & Kitchen"
          stageTitle="Audit Photos & Domestic Kitchen"
          stageSubtitle="HomeBaz evaluates kitchen hygiene, jar seal packaging, and taste samples before listing."
          categoryTag="STAGE 6 • KITCHEN HYGIENE AUDIT"
          iconName="camera-outline"
          accentColor="#DB2777"
          tintBg="#FDF2F8"
          tintBorder="#FBCFE8"
        />

        {/* Product Photos Row */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Sample Product Photos (Min 3)</Text>
          <View style={styles.samplesRow}>
            <View style={styles.sampleBox}>
              <ProductThumbnail size={54} imageSource={AppImages.pickleGongura} />
              <Text style={styles.sampleLabel}>Gongura</Text>
            </View>

            <View style={styles.sampleBox}>
              <ProductThumbnail size={54} imageSource={AppImages.pickleAvakaya} />
              <Text style={styles.sampleLabel}>Avakaya</Text>
            </View>

            <View style={styles.sampleBox}>
              <ProductThumbnail size={54} imageSource={AppImages.food3} />
              <Text style={styles.sampleLabel}>Lemon</Text>
            </View>

            <TouchableOpacity style={styles.addSampleBox} activeOpacity={0.7}>
              <Ionicons name="camera-outline" size={20} color={HomeBazColors.primary} />
              <Text style={styles.addSampleText}>Add Photo</Text>
            </TouchableOpacity>
          </View>

          {/* Kitchen Setup Photo */}
          <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Domestic Kitchen Setup</Text>
          <TouchableOpacity
            style={[styles.uploadRow, kitchenPhotoUploaded && styles.uploadRowSuccess]}
            onPress={() => setKitchenPhotoUploaded(!kitchenPhotoUploaded)}
            activeOpacity={0.75}
          >
            <Ionicons
              name={kitchenPhotoUploaded ? 'checkmark-circle' : 'cloud-upload-outline'}
              size={24}
              color={kitchenPhotoUploaded ? '#10B981' : HomeBazColors.primary}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.uploadRowTitle}>
                {kitchenPhotoUploaded ? 'kitchen_hygiene_photo.jpg (Uploaded)' : 'Upload Kitchen Photo'}
              </Text>
              <Text style={styles.uploadRowSub}>Clean cooking area, stainless steel storage</Text>
            </View>
          </TouchableOpacity>

          {/* Packaging & Seal Photo */}
          <Text style={[styles.sectionTitle, { marginTop: 14 }]}>Airtight Packaging Sample</Text>
          <TouchableOpacity
            style={[styles.uploadRow, packagePhotoUploaded && styles.uploadRowSuccess]}
            onPress={() => setPackagePhotoUploaded(!packagePhotoUploaded)}
            activeOpacity={0.75}
          >
            <Ionicons
              name={packagePhotoUploaded ? 'checkmark-circle' : 'cloud-upload-outline'}
              size={24}
              color={packagePhotoUploaded ? '#10B981' : HomeBazColors.primary}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.uploadRowTitle}>
                {packagePhotoUploaded ? 'airtight_jar_seal.jpg (Uploaded)' : 'Upload Packaging Photo'}
              </Text>
              <Text style={styles.uploadRowSub}>Leak-proof glass/food-grade pet jar sealing</Text>
            </View>
          </TouchableOpacity>

          {/* HomeBaz Physical Sample Evaluation Request */}
          <TouchableOpacity
            style={styles.sampleAuditCard}
            onPress={() => setSamplePickupRequested(!samplePickupRequested)}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.checkboxBox,
                samplePickupRequested && styles.checkboxBoxActive,
              ]}
            >
              {samplePickupRequested && (
                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.auditTitle}>HomeBaz Quality Sample Pickup</Text>
              <Text style={styles.auditDesc}>
                A HomeBaz Quality Partner in Visakhapatnam will pick up a 100g complimentary sample jar for taste scoring and "Made by Home" badge assignment.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Save & Proceed to Production Capacity  →"
          onPress={() => router.push('/verification/production-capacity')}
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
    padding: 20,
    paddingBottom: 100,
  },
  heading: {
    fontSize: 20,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    marginBottom: 6,
  },
  subheading: {
    fontSize: 13,
    color: HomeBazColors.textSecondary,
    marginBottom: 18,
    lineHeight: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECF5',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
    marginBottom: 10,
  },
  samplesRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 4,
  },
  sampleBox: {
    alignItems: 'center',
    padding: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E5F2',
    backgroundColor: '#FAF9FE',
  },
  sampleLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: HomeBazColors.textPrimary,
    marginTop: 4,
  },
  addSampleBox: {
    width: 66,
    height: 78,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    borderStyle: 'dashed',
    backgroundColor: HomeBazColors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addSampleText: {
    fontSize: 9,
    fontWeight: '700',
    color: HomeBazColors.primaryDark,
    marginTop: 4,
  },
  uploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#FAF9FE',
    marginBottom: 10,
  },
  uploadRowSuccess: {
    borderColor: '#A7F3D0',
    backgroundColor: '#ECFDF5',
    borderStyle: 'solid',
  },
  uploadRowTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  uploadRowSub: {
    fontSize: 11,
    color: HomeBazColors.textSecondary,
    marginTop: 2,
  },
  sampleAuditCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: HomeBazColors.primarySoft,
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E2DCF7',
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#C7C3DF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    backgroundColor: '#FFFFFF',
  },
  checkboxBoxActive: {
    backgroundColor: HomeBazColors.primary,
    borderColor: HomeBazColors.primary,
  },
  auditTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: HomeBazColors.primaryDark,
    marginBottom: 4,
  },
  auditDesc: {
    fontSize: 11,
    color: HomeBazColors.textSecondary,
    lineHeight: 16,
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
    paddingTop: 12,},
});
