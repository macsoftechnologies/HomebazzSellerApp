import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import { StyleSheet, Text, View, StatusBar ,
  Platform} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HomeBazColors } from '@/constants/theme';
import { GradientButton } from '@/components/common/GradientButton';

export default function ApplicationSubmittedScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark-done" size={54} color="#10B981" />
        </View>

        <Text style={styles.title}>Application Submitted!</Text>
        <Text style={styles.subtitle}>
          Congratulations! Your HomeBaz Seller Partner application has been received and logged.
        </Text>

        <View style={styles.refCard}>
          <Text style={styles.refLabel}>APPLICATION NUMBER</Text>
          <Text style={styles.refCode}>HB-APP-2026-9812</Text>
          <Text style={styles.refSub}>Submitted on Nov 18, 2026 • Visakhapatnam Hub</Text>
        </View>

        <View style={styles.timelineCard}>
          <Text style={styles.timelineTitle}>What happens next?</Text>

          <View style={styles.timelineStep}>
            <View style={styles.stepDotActive} />
            <View style={styles.stepTextCol}>
              <Text style={styles.stepHeading}>Document & FSSAI Check</Text>
              <Text style={styles.stepDesc}>Our compliance team reviews credentials within 24 hours.</Text>
            </View>
          </View>

          <View style={styles.timelineStep}>
            <View style={styles.stepDot} />
            <View style={styles.stepTextCol}>
              <Text style={styles.stepHeading}>Sample Taste & Quality Audit</Text>
              <Text style={styles.stepDesc}>Local representative in Vizag collects 100g sample for taste rating.</Text>
            </View>
          </View>

          <View style={[styles.timelineStep, { marginBottom: 0 }]}>
            <View style={styles.stepDot} />
            <View style={styles.stepTextCol}>
              <Text style={styles.stepHeading}>Storefront Live & Orders</Text>
              <Text style={styles.stepDesc}>Your products appear on HomeBaz customer app!</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Track 7-Stage Verification Status  →"
          onPress={() => router.push('/verification/verification-status')}
          size="large"
          style={{ marginBottom: 12 }}
        />

        <GradientButton
          title="Explore Seller Dashboard"
          variant="outline"
          onPress={() => router.replace('/(tabs)' as any)}
          size="large"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 36,
    justifyContent: 'space-between',
  },
  content: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#A7F3D0',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: HomeBazColors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 12,
    marginBottom: 22,
  },
  refCard: {
    backgroundColor: HomeBazColors.primarySoft,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#E2DCF7',
    marginBottom: 20,
  },
  refLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: HomeBazColors.primaryDark,
    letterSpacing: 1,
    marginBottom: 4,
  },
  refCode: {
    fontSize: 20,
    fontWeight: '800',
    color: HomeBazColors.primary,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  refSub: {
    fontSize: 11,
    color: HomeBazColors.textSecondary,
  },
  timelineCard: {
    backgroundColor: '#FAF9FE',
    borderRadius: 16,
    padding: 18,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ECE7FA',
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    marginBottom: 16,
  },
  timelineStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  stepDotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    marginTop: 3,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#C7C3DF',
    marginTop: 3,
  },
  stepTextCol: {
    flex: 1,
  },
  stepHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: 11,
    color: HomeBazColors.textSecondary,
    lineHeight: 16,
  },
  bottomBar: {
    width: '100%',
  
    elevation: 20,
    zIndex: 100,
    paddingTop: 12,},
});
