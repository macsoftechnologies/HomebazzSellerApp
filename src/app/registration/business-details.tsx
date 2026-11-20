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
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';
import { CustomInput } from '@/components/common/CustomInput';
import { GradientButton } from '@/components/common/GradientButton';

export default function BusinessDetailsScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const [storeName, setStoreName] = useState('Amrutha Foods');
  const [tagline, setTagline] = useState('Authentic Andhra Homemade Pickles & Podis');
  const [experience, setExperience] = useState('8');
  const [productionType, setProductionType] = useState('Small Batch Handcrafted');
  const [story, setStory] = useState(
    'Started by our family in Visakhapatnam using sun-ripened farm ingredients, cold pressed gingelly oil, and grandma’s secret spice blend.'
  );

  const productionOptions = [
    'Small Batch Handcrafted',
    'Fresh Made-to-Order',
    'Weekly Scheduled Batches',
  ];

  const handleNext = () => {
    if (!storeName.trim()) {
      Alert.alert('Required', 'Please enter your Store / Brand Name.');
      return;
    }
    router.push('/registration/category-selection');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <Header title="Business Details" showBack />

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: '60%' }]} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Your Store Profile</Text>
        <Text style={styles.subheading}>
          Customers on HomeBaz love to know who makes their food and crafts!
        </Text>

        <View style={styles.formCard}>
          <CustomInput
            label="Store / Brand Name"
            required
            leftIcon="storefront-outline"
            value={storeName}
            onChangeText={setStoreName}
            placeholder="e.g. Rajesh Store / Lakshmi’s Kitchen"
          />

          <CustomInput
            label="Store Tagline"
            leftIcon="sparkles-outline"
            value={tagline}
            onChangeText={setTagline}
            placeholder="A short punchy line about your specialty"
          />

          <CustomInput
            label="Years of Culinary / Craft Experience"
            required
            leftIcon="time-outline"
            value={experience}
            onChangeText={setExperience}
            keyboardType="numeric"
            placeholder="e.g. 5, 8, 15"
          />

          {/* Production Method */}
          <View style={styles.radioGroup}>
            <Text style={styles.radioGroupLabel}>Production Method</Text>
            {productionOptions.map((opt) => {
              const isSelected = productionType === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.radioOption,
                    isSelected && styles.radioOptionSelected,
                  ]}
                  onPress={() => setProductionType(opt)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.circle,
                      isSelected && styles.circleSelected,
                    ]}
                  >
                    {isSelected && <View style={styles.innerDot} />}
                  </View>
                  <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <CustomInput
            label="The Maker’s Story (Brief)"
            value={story}
            onChangeText={setStory}
            multiline
            numberOfLines={4}
            placeholder="Share how you learned this craft, family traditions, and your love for pure ingredients..."
          />
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Continue to Category Selection  →"
          onPress={handleNext}
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
  progressBar: {
    height: 4,
    backgroundColor: '#EFEFF5',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: HomeBazColors.primary,
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
    marginBottom: 20,
    lineHeight: 18,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECF5',
  },
  radioGroup: {
    marginBottom: 16,
  },
  radioGroupLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: HomeBazColors.textPrimary,
    marginBottom: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E5F2',
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  radioOptionSelected: {
    borderColor: HomeBazColors.primary,
    backgroundColor: HomeBazColors.primarySoft,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#C7C3DF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  circleSelected: {
    borderColor: HomeBazColors.primary,
  },
  innerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: HomeBazColors.primary,
  },
  optionText: {
    fontSize: 13,
    fontWeight: '600',
    color: HomeBazColors.textPrimary,
  },
  optionTextSelected: {
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
