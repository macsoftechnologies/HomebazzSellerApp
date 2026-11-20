import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeBazColors } from '@/constants/theme';
import { HomeBazLogo } from '@/components/common/HomeBazLogo';
import { GradientButton } from '@/components/common/GradientButton';

export default function WelcomePortalScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, 20),
          paddingBottom: Math.max(insets.bottom, Platform.OS === 'android' ? 24 : 16) + 16,
        },
      ]}
    >
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <View style={styles.logoSection}>
          <HomeBazLogo size={70} />
          <Text style={styles.portalTagline}>
            "Every Home Has a Talent. Every Talent Deserves a Market."
          </Text>
        </View>

        <View style={styles.featuresCard}>
          <View style={styles.featureRow}>
            <View style={styles.iconBox}>
              <Ionicons name="sparkles" size={18} color={HomeBazColors.primary} />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Zero Registration Fee</Text>
              <Text style={styles.featureDesc}>Join HomeBaz partner network at zero upfront cost.</Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.iconBox}>
              <Ionicons name="home" size={18} color={HomeBazColors.primary} />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Doorstep Pickup</Text>
              <Text style={styles.featureDesc}>Our delivery riders collect packed items directly from your kitchen.</Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.iconBox}>
              <Ionicons name="wallet" size={18} color={HomeBazColors.primary} />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Fast Weekly Settlements</Text>
              <Text style={styles.featureDesc}>Earnings deposited straight to your bank account every week.</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsSection}>
          <GradientButton
            title="Start New Seller Registration  →"
            onPress={() => router.push('/registration/seller-type')}
            size="large"
            style={{ marginBottom: 14 }}
          />

          <GradientButton
            title="Track Existing Application"
            variant="outline"
            onPress={() => router.push('/verification/verification-status')}
            size="large"
            style={{ marginBottom: 14 }}
          />

          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => router.push('/login')}
            activeOpacity={0.7}
          >
            <Text style={styles.signInText}>
              Already have an active store? <Text style={styles.signInHighlight}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  portalTagline: {
    fontSize: 13,
    color: HomeBazColors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 18,
    paddingHorizontal: 20,
  },
  featuresCard: {
    backgroundColor: '#FAF9FE',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#ECE7FA',
    gap: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: HomeBazColors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  featureDesc: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  actionsSection: {
    width: '100%',
  },
  signInButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  signInText: {
    fontSize: 13,
    color: HomeBazColors.textSecondary,
  },
  signInHighlight: {
    color: HomeBazColors.primary,
    fontWeight: '700',
  },
});
