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

export default function ExpiryInfoScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const [shelfLifeMonths, setShelfLifeMonths] = useState('6 Months');
  const [storageNotes, setStorageNotes] = useState(
    'Store in cool, dry place. Use only dry spoon to prevent moisture spoilage. Refrigerate after opening for extended freshness.'
  );

  const durationOptions = ['1 Month', '3 Months', '6 Months', '9 Months', '12 Months'];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <Header title="Expiry & Shelf Life" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Shelf Life & Storage Guidelines</Text>
        <Text style={styles.subheading}>
          Food safety regulations mandate clear Best-Before dates and storage recommendations.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Shelf Life from Date of Preparation</Text>
          <View style={styles.pillRow}>
            {durationOptions.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.durationPill,
                  shelfLifeMonths === opt && styles.durationPillActive,
                ]}
                onPress={() => setShelfLifeMonths(opt)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.durationText,
                    shelfLifeMonths === opt && styles.durationTextActive,
                  ]}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <CustomInput
            label="Storage & Handling Instructions"
            required
            value={storageNotes}
            onChangeText={setStorageNotes}
            multiline
            numberOfLines={4}
            placeholder="e.g. Keep airtight, keep away from moisture..."
          />

          <View style={styles.safetyBox}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#10B981" />
            <Text style={styles.safetyText}>
              HomeBaz batches feature automated preparation-to-delivery date calculation on customer packaging slips.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Save Expiry Information"
          onPress={() => {
            Alert.alert('Saved', 'Shelf life and storage guidelines updated.');
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
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  durationPill: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#E8E5F2',
    backgroundColor: '#FFFFFF',
  },
  durationPillActive: {
    borderColor: HomeBazColors.primary,
    backgroundColor: HomeBazColors.primarySoft,
  },
  durationText: {
    fontSize: 12,
    fontWeight: '600',
    color: HomeBazColors.textSecondary,
  },
  durationTextActive: {
    color: HomeBazColors.primaryDark,
    fontWeight: '700',
  },
  safetyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#ECFDF5',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
  },
  safetyText: {
    fontSize: 11,
    color: '#065F46',
    flex: 1,
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
