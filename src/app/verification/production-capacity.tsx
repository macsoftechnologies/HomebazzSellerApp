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

export default function ProductionCapacityScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const [dailyCapacity, setDailyCapacity] = useState('25 Jars (Approx 12 Kg)');
  const [monthlyCapacity, setMonthlyCapacity] = useState('600 Jars');
  const [prepLeadTime, setPrepLeadTime] = useState('24 Hours');
  const [hamperReady, setHamperReady] = useState(true);

  const leadTimeOptions = ['Same Day (4-6 Hours)', '24 Hours', '48 Hours'];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <Header title="Production Capacity" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Kitchen Capacity & Output</Text>
        <Text style={styles.subheading}>
          Helps HomeBaz prevent order surges exceeding your domestic kitchen capacity.
        </Text>

        <View style={styles.card}>
          <CustomInput
            label="Daily Preparation Output"
            required
            leftIcon="speedometer-outline"
            value={dailyCapacity}
            onChangeText={setDailyCapacity}
            placeholder="e.g. 20-30 Jars per day"
          />

          <CustomInput
            label="Estimated Monthly Output Capacity"
            required
            leftIcon="calendar-outline"
            value={monthlyCapacity}
            onChangeText={setMonthlyCapacity}
            placeholder="e.g. 500 units"
          />

          {/* Preparation Lead Time Selector */}
          <Text style={styles.sectionLabel}>Preparation Lead Time for Orders</Text>
          <View style={styles.optionsRow}>
            {leadTimeOptions.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.optionPill,
                  prepLeadTime === opt && styles.optionPillActive,
                ]}
                onPress={() => setPrepLeadTime(opt)}
                activeOpacity={0.75}
              >
                <Text
                  style={[
                    styles.optionText,
                    prepLeadTime === opt && styles.optionTextActive,
                  ]}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Festival & Bulk Hamper Capability (PDF Model E) */}
          <TouchableOpacity
            style={styles.hamperCard}
            onPress={() => setHamperReady(!hamperReady)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkSquare, hamperReady && styles.checkSquareActive]}>
              {hamperReady && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.hamperTitle}>
                Participate in Festival Hampers (Diwali / Sankranti)
              </Text>
              <Text style={styles.hamperDesc}>
                Supply small sample jars to HomeBaz Corporate Gift Box orders across Visakhapatnam.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Review Application Summary  →"
          onPress={() => router.push('/verification/application-summary')}
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
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: HomeBazColors.textPrimary,
    marginBottom: 8,
  },
  optionsRow: {
    gap: 8,
    marginBottom: 16,
  },
  optionPill: {
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E8E5F2',
    backgroundColor: '#FFFFFF',
  },
  optionPillActive: {
    borderColor: HomeBazColors.primary,
    backgroundColor: HomeBazColors.primarySoft,
  },
  optionText: {
    fontSize: 13,
    fontWeight: '600',
    color: HomeBazColors.textSecondary,
  },
  optionTextActive: {
    color: HomeBazColors.primaryDark,
    fontWeight: '700',
  },
  hamperCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  checkSquare: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#D97706',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    backgroundColor: '#FFFFFF',
  },
  checkSquareActive: {
    backgroundColor: '#D97706',
    borderColor: '#D97706',
  },
  hamperTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#92400E',
    marginBottom: 4,
  },
  hamperDesc: {
    fontSize: 11,
    color: '#B45309',
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
