import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Alert,
  Platform} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';
import { CustomInput } from '@/components/common/CustomInput';
import { GradientButton } from '@/components/common/GradientButton';

export default function IdentityVerificationScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const [docType, setDocType] = useState<'Aadhaar' | 'PAN'>('Aadhaar');
  const [docNumber, setDocNumber] = useState('5489 1204 8921');
  const [frontUploaded, setFrontUploaded] = useState(true);
  const [backUploaded, setBackUploaded] = useState(true);

  const handleNext = () => {
    if (!docNumber.trim()) {
      Alert.alert('Required', 'Please enter your document ID number.');
      return;
    }
    router.push('/verification/address-verification');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Identity Verification" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Verify Your Identity</Text>
        <Text style={styles.subheading}>
          Government issued ID card for KYC verification and seller compliance.
        </Text>

        {/* Doc Type Selector */}
        <View style={styles.docTypeRow}>
          {(['Aadhaar', 'PAN'] as const).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.docTypePill,
                docType === type && styles.docTypePillSelected,
              ]}
              onPress={() => setDocType(type)}
              activeOpacity={0.75}
            >
              <Ionicons
                name="card-outline"
                size={16}
                color={docType === type ? HomeBazColors.primary : '#8E8AA0'}
              />
              <Text
                style={[
                  styles.docTypeText,
                  docType === type && styles.docTypeTextSelected,
                ]}
              >
                {type} Card
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <CustomInput
            label={`${docType} Number`}
            required
            value={docNumber}
            onChangeText={setDocNumber}
            placeholder={docType === 'Aadhaar' ? '12-digit Aadhaar' : '10-character PAN'}
          />

          <Text style={styles.uploadSectionTitle}>Upload Documents</Text>

          {/* Front Photo Box */}
          <TouchableOpacity
            style={[styles.uploadBox, frontUploaded && styles.uploadBoxSuccess]}
            onPress={() => setFrontUploaded(!frontUploaded)}
            activeOpacity={0.75}
          >
            <View style={styles.uploadIconCircle}>
              <Ionicons
                name={frontUploaded ? 'checkmark-circle' : 'cloud-upload-outline'}
                size={24}
                color={frontUploaded ? '#10B981' : HomeBazColors.primary}
              />
            </View>
            <View style={styles.uploadTextCol}>
              <Text style={styles.uploadTitle}>
                {docType} Front Photo {frontUploaded ? '(Uploaded)' : ''}
              </Text>
              <Text style={styles.uploadDesc}>Clear photo showing your name, photo & DOB</Text>
            </View>
          </TouchableOpacity>

          {/* Back Photo Box (if Aadhaar) */}
          {docType === 'Aadhaar' && (
            <TouchableOpacity
              style={[styles.uploadBox, backUploaded && styles.uploadBoxSuccess]}
              onPress={() => setBackUploaded(!backUploaded)}
              activeOpacity={0.75}
            >
              <View style={styles.uploadIconCircle}>
                <Ionicons
                  name={backUploaded ? 'checkmark-circle' : 'cloud-upload-outline'}
                  size={24}
                  color={backUploaded ? '#10B981' : HomeBazColors.primary}
                />
              </View>
              <View style={styles.uploadTextCol}>
                <Text style={styles.uploadTitle}>
                  Aadhaar Back Photo {backUploaded ? '(Uploaded)' : ''}
                </Text>
                <Text style={styles.uploadDesc}>Showing registered home address</Text>
              </View>
            </TouchableOpacity>
          )}

          <View style={styles.securityNote}>
            <Ionicons name="lock-closed" size={14} color="#10B981" />
            <Text style={styles.securityText}>
              256-bit encrypted. Documents stored safely per Indian IT Act.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Save & Proceed to Address Verification  →"
          onPress={handleNext}
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
  docTypeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  docTypePill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#ECECF5',
    backgroundColor: '#FFFFFF',
  },
  docTypePillSelected: {
    borderColor: HomeBazColors.primary,
    backgroundColor: HomeBazColors.primarySoft,
  },
  docTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: HomeBazColors.textSecondary,
  },
  docTypeTextSelected: {
    color: HomeBazColors.primaryDark,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECF5',
  },
  uploadSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
    marginBottom: 10,
    marginTop: 6,
  },
  uploadBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#FAF9FE',
    marginBottom: 12,
  },
  uploadBoxSuccess: {
    borderColor: '#A7F3D0',
    backgroundColor: '#ECFDF5',
    borderStyle: 'solid',
  },
  uploadIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  uploadTextCol: {
    flex: 1,
  },
  uploadTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  uploadDesc: {
    fontSize: 11,
    color: HomeBazColors.textSecondary,
    marginTop: 2,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F2F1F8',
  },
  securityText: {
    fontSize: 11,
    color: '#065F46',
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
