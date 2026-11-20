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
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';
import { CustomInput } from '@/components/common/CustomInput';
import { GradientButton } from '@/components/common/GradientButton';
import { SELLER_PROFILE } from '@/data/mockData';

export default function ManufacturingDetailsScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const [kitchenAddress, setKitchenAddress] = useState(SELLER_PROFILE.address);
  const [batchCode, setBatchCode] = useState('HB-GON-26-BATCH04');
  const [netQuantity, setNetQuantity] = useState('250 Grams');
  const [packagingType, setPackagingType] = useState('Airtight Glass Jar');

  const packOptions = ['Airtight Glass Jar', 'Food-Grade PET Jar', 'Vacuum Sealed Pouch'];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <Header title="Manufacturing Details" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Kitchen & Packaging Details</Text>
        <Text style={styles.subheading}>
          Batch identifiers and container specifications for legal labeling compliance.
        </Text>

        <View style={styles.card}>
          <CustomInput
            label="Production Kitchen Address"
            required
            value={kitchenAddress}
            onChangeText={setKitchenAddress}
            multiline
            numberOfLines={2}
          />

          <CustomInput
            label="Batch Identification Code"
            required
            leftIcon="barcode-outline"
            value={batchCode}
            onChangeText={setBatchCode}
            placeholder="e.g. HB-GON-26-BATCH04"
          />

          <CustomInput
            label="Net Weight / Quantity per Unit"
            required
            leftIcon="scale-outline"
            value={netQuantity}
            onChangeText={setNetQuantity}
            placeholder="e.g. 250 Grams / 500 Grams"
          />

          <Text style={styles.label}>Packaging Container Material</Text>
          <View style={styles.packOptionsCol}>
            {packOptions.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[styles.packPill, packagingType === opt && styles.packPillActive]}
                onPress={() => setPackagingType(opt)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={packagingType === opt ? 'radio-button-on' : 'radio-button-off'}
                  size={16}
                  color={packagingType === opt ? HomeBazColors.primary : '#9B97B0'}
                />
                <Text style={[styles.packText, packagingType === opt && styles.packTextActive]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Save Manufacturing Details"
          onPress={() => {
            Alert.alert('Saved', 'Manufacturing details saved.');
            router.back();
          }}
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
    padding: 16,
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
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
    marginBottom: 8,
  },
  packOptionsCol: {
    gap: 8,
  },
  packPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E5F2',
    backgroundColor: '#FAF9FE',
  },
  packPillActive: {
    borderColor: HomeBazColors.primary,
    backgroundColor: HomeBazColors.primarySoft,
  },
  packText: {
    fontSize: 12,
    fontWeight: '600',
    color: HomeBazColors.textSecondary,
  },
  packTextActive: {
    color: HomeBazColors.primaryDark,
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
    paddingTop: 12,},
});
