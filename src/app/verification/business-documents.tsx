import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';
import { CustomInput } from '@/components/common/CustomInput';
import { GradientButton } from '@/components/common/GradientButton';

export default function BusinessDocumentsScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const [hasGst, setHasGst] = useState(false);
  const [gstin, setGstin] = useState('');
  const [udyamNo, setUdyamNo] = useState('UDYAM-AP-03-009124');
  const [nonGstDeclared, setNonGstDeclared] = useState(true);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <Header title="Business Documents" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Tax & Business Registration</Text>
        <Text style={styles.subheading}>
          GST & MSME credentials. Home producers below ₹20L annual turnover are GST exempt.
        </Text>

        <View style={styles.card}>
          {/* GST Status Selection */}
          <Text style={styles.sectionTitle}>GST Status</Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[styles.toggleBtn, !hasGst && styles.toggleBtnActive]}
              onPress={() => setHasGst(false)}
              activeOpacity={0.75}
            >
              <Text style={[styles.toggleBtnText, !hasGst && styles.toggleBtnTextActive]}>
                Exempt / Non-GST (Under ₹20L)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleBtn, hasGst && styles.toggleBtnActive]}
              onPress={() => setHasGst(true)}
              activeOpacity={0.75}
            >
              <Text style={[styles.toggleBtnText, hasGst && styles.toggleBtnTextActive]}>
                Have GSTIN
              </Text>
            </TouchableOpacity>
          </View>

          {hasGst ? (
            <CustomInput
              label="GST Identification Number (GSTIN)"
              required
              value={gstin}
              onChangeText={setGstin}
              placeholder="e.g. 37AAAAA0000A1Z5"
              autoCapitalize="characters"
            />
          ) : (
            <View style={styles.exemptionNotice}>
              <Ionicons name="information-circle" size={18} color="#3B82F6" />
              <Text style={styles.exemptionText}>
                As a home-based artisan or cottage food maker with annual turnover below ₹20 Lakhs, GST registration is not mandatory under Central GST Section 22.
              </Text>
            </View>
          )}

          <CustomInput
            label="Udyam MSME Registration (Optional)"
            leftIcon="business-outline"
            value={udyamNo}
            onChangeText={setUdyamNo}
            placeholder="e.g. UDYAM-AP-03-009124"
          />

          {/* Self Declaration Check */}
          {!hasGst && (
            <TouchableOpacity
              style={styles.declRow}
              onPress={() => setNonGstDeclared(!nonGstDeclared)}
              activeOpacity={0.8}
            >
              <View style={[styles.declBox, nonGstDeclared && styles.declBoxChecked]}>
                {nonGstDeclared && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
              </View>
              <Text style={styles.declText}>
                I hereby declare that my aggregate turnover from all goods sold on e-commerce does not exceed threshold exemption limits.
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Save & Proceed to Sample Upload  →"
          onPress={() => router.push('/verification/product-sample-upload')}
          size="large"
        />
      </View>
    </KeyboardAvoidingView>
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
    marginBottom: 8,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E8E5F2',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  toggleBtnActive: {
    borderColor: HomeBazColors.primary,
    backgroundColor: HomeBazColors.primarySoft,
  },
  toggleBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: HomeBazColors.textSecondary,
    textAlign: 'center',
  },
  toggleBtnTextActive: {
    color: HomeBazColors.primaryDark,
    fontWeight: '700',
  },
  exemptionNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  exemptionText: {
    flex: 1,
    fontSize: 11,
    color: '#1E40AF',
    lineHeight: 16,
  },
  declRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 10,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0EFF6',
  },
  declBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#C7C3DF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  declBoxChecked: {
    backgroundColor: HomeBazColors.primary,
    borderColor: HomeBazColors.primary,
  },
  declText: {
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
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ECECF5',
  
    elevation: 20,
    zIndex: 100,
    paddingTop: 12,},
});
