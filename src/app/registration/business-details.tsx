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
import { LinearGradient } from 'expo-linear-gradient';
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
    {
      title: 'Small Batch Handcrafted',
      desc: 'Cooked/made in limited pots preserving authentic taste',
      icon: 'sparkles' as const,
    },
    {
      title: 'Fresh Made-to-Order',
      desc: 'Prepared immediately once customer places order',
      icon: 'flame-outline' as const,
    },
    {
      title: 'Weekly Scheduled Batches',
      desc: 'Prepared on dedicated days with fixed dispatch cycle',
      icon: 'calendar-outline' as const,
    },
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

      {/* Modern Multi-Step Progress Tracker */}
      <View style={styles.stepTrackContainer}>
        <View style={styles.stepHeaderRow}>
          <Text style={styles.stepIndicatorText}>Step 2 of 4 • Store Identity & Craft</Text>
          <Text style={styles.stepPercentText}>50% Completed</Text>
        </View>
        <View style={styles.progressBarTrack}>
          <LinearGradient
            colors={['#8B5CF6', '#6C5CE7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: '50%' }]}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Highlighted Hero Heading Card for "Your Store Profile" */}
        <View style={styles.heroHeadingCard}>
          <LinearGradient
            colors={['#FEF3C7', '#FFFBEB', '#FFFFFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroHeadingGradient}
          >
            <View style={styles.heroAccentBar} />

            <View style={styles.heroContentRow}>
              <View style={styles.heroTextCol}>
                <View style={styles.categoryPill}>
                  <Ionicons name="storefront" size={11} color="#D97706" />
                  <Text style={styles.categoryPillText}>STORE IDENTITY & BRANDING</Text>
                </View>

                {/* Highlighted Heading Color */}
                <Text style={styles.highlightedHeading}>Your Store Profile</Text>
                <Text style={styles.heroSubheading}>
                  Showcase your kitchen craft, homemade specialties, and authentic artisan story to buyers.
                </Text>
              </View>

              <View style={styles.heroIconSquircle}>
                <Ionicons name="storefront" size={24} color="#D97706" />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>
          <CustomInput
            label="Store / Brand Name"
            required
            leftIcon="storefront-outline"
            value={storeName}
            onChangeText={setStoreName}
            placeholder="e.g. Amrutha Foods / Lakshmi’s Kitchen"
          />

          <CustomInput
            label="Store Tagline / Bio"
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

          {/* Production Method Cards */}
          <View style={styles.radioGroup}>
            <Text style={styles.radioGroupLabel}>Production Method</Text>
            <Text style={styles.radioGroupSublabel}>
              Helps buyers understand the authenticity and freshness of your products.
            </Text>

            <View style={styles.productionList}>
              {productionOptions.map((opt) => {
                const isSelected = productionType === opt.title;
                return (
                  <TouchableOpacity
                    key={opt.title}
                    style={[
                      styles.productionCard,
                      isSelected && styles.productionCardSelected,
                    ]}
                    onPress={() => setProductionType(opt.title)}
                    activeOpacity={0.75}
                  >
                    <View
                      style={[
                        styles.productionIconBox,
                        isSelected && styles.productionIconBoxSelected,
                      ]}
                    >
                      <Ionicons
                        name={opt.icon}
                        size={18}
                        color={isSelected ? '#6C5CE7' : '#6B7280'}
                      />
                    </View>

                    <View style={styles.productionInfo}>
                      <Text
                        style={[
                          styles.productionTitle,
                          isSelected && styles.productionTitleSelected,
                        ]}
                      >
                        {opt.title}
                      </Text>
                      <Text style={styles.productionDesc}>{opt.desc}</Text>
                    </View>

                    <View
                      style={[
                        styles.radioIndicator,
                        isSelected && styles.radioIndicatorSelected,
                      ]}
                    >
                      {isSelected && <View style={styles.radioDot} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <CustomInput
            label="The Maker’s Story (Brief)"
            value={story}
            onChangeText={setStory}
            multiline
            numberOfLines={4}
            placeholder="Share how you learned this craft, family traditions, and your love for pure ingredients..."
          />

          {/* Maker Guarantee Banner */}
          <View style={styles.guaranteeBanner}>
            <Ionicons name="sparkles" size={14} color="#D97706" />
            <Text style={styles.guaranteeBannerText}>
              HomeBaz celebrates authentic homemade food. No artificial preservatives or mass chemicals allowed.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Bar */}
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
  stepTrackContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDE9FE',
  },
  stepHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepIndicatorText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C5CE7',
    letterSpacing: 0.3,
  },
  stepPercentText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#4B5563',
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  heroHeadingCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  heroHeadingGradient: {
    position: 'relative',
    padding: 16,
  },
  heroAccentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
    backgroundColor: '#D97706',
  },
  heroContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 6,
  },
  heroTextCol: {
    flex: 1,
    paddingRight: 10,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: '#FEF3C7',
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  categoryPillText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#B45309',
    letterSpacing: 0.5,
  },
  highlightedHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: '#78350F',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  heroSubheading: {
    fontSize: 12.5,
    color: '#4B5563',
    lineHeight: 17,
  },
  heroIconSquircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#ECECF5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  radioGroup: {
    marginTop: 4,
    marginBottom: 16,
  },
  radioGroupLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
    marginBottom: 2,
  },
  radioGroupSublabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 10,
  },
  productionList: {
    gap: 10,
  },
  productionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FAFAFC',
  },
  productionCardSelected: {
    borderColor: '#6C5CE7',
    backgroundColor: '#F5F2FD',
  },
  productionIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  productionIconBoxSelected: {
    backgroundColor: '#EDE9FE',
  },
  productionInfo: {
    flex: 1,
    paddingRight: 8,
  },
  productionTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 2,
  },
  productionTitleSelected: {
    color: '#6C5CE7',
  },
  productionDesc: {
    fontSize: 11.5,
    color: '#6B7280',
    lineHeight: 15,
  },
  radioIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioIndicatorSelected: {
    borderColor: '#6C5CE7',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6C5CE7',
  },
  guaranteeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFBEB',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginTop: 10,
  },
  guaranteeBannerText: {
    fontSize: 11.5,
    color: '#92400E',
    lineHeight: 16,
    flex: 1,
    fontWeight: '500',
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
    paddingTop: 12,
  },
});
