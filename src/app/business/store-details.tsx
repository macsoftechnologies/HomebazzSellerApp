import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
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

export default function StoreDetailsScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const [storeName, setStoreName] = useState(SELLER_PROFILE.storeName);
  const [phone, setPhone] = useState(SELLER_PROFILE.phone);
  const [email, setEmail] = useState(SELLER_PROFILE.email);
  const [address, setAddress] = useState(SELLER_PROFILE.address);
  const [vacationMode, setVacationMode] = useState(false);
  const [operatingHours, setOperatingHours] = useState('09:00 AM – 08:00 PM');

  const handleSave = () => {
    Alert.alert('Saved', 'Store settings and operating profile updated.');
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <Header title="Store Details" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        {/* Vacation Mode Banner */}
        <View style={styles.vacationCard}>
          <View style={styles.vacationLeft}>
            <Text style={styles.vacationTitle}>Vacation Mode</Text>
            <Text style={styles.vacationSub}>
              Pause new orders when you are away from your home kitchen.
            </Text>
          </View>
          <Switch
            value={vacationMode}
            onValueChange={setVacationMode}
            trackColor={{ false: '#D8D5E5', true: HomeBazColors.primary }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.card}>
          <CustomInput
            label="Storefront Name"
            required
            leftIcon="storefront-outline"
            value={storeName}
            onChangeText={setStoreName}
            autoCapitalize="words"
          />

          <CustomInput
            label="HomeBaz Partner Seller ID"
            value={SELLER_PROFILE.sellerId}
            editable={false}
          />

          <CustomInput
            label="Primary Contact Number"
            required
            leftIcon="call-outline"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <CustomInput
            label="Support Email"
            required
            leftIcon="mail-outline"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomInput
            label="Kitchen Location"
            required
            leftIcon="location-outline"
            value={address}
            onChangeText={setAddress}
            multiline
            numberOfLines={2}
          />

          <CustomInput
            label="Daily Operating Hours"
            leftIcon="time-outline"
            value={operatingHours}
            onChangeText={setOperatingHours}
            placeholder="09:00 AM – 08:00 PM"
          />
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Save Store Details"
          onPress={handleSave}
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
  vacationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECF5',
    marginBottom: 16,
  },
  vacationLeft: {
    flex: 1,
    paddingRight: 12,
  },
  vacationTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    marginBottom: 2,
  },
  vacationSub: {
    fontSize: 11,
    color: HomeBazColors.textSecondary,
    lineHeight: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECF5',
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
