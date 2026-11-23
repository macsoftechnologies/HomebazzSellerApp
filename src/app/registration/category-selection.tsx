import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';
import { GradientButton } from '@/components/common/GradientButton';

export default function CategorySelectionScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const [selectedCats, setSelectedCats] = useState<string[]>([
    'pickles',
    'spice-podis',
  ]);

  const categories = [
    {
      id: 'pickles',
      title: 'Andhra Pickles (Pachadi)',
      desc: 'Gongura, Avakaya, Lemon, Tomato, Ginger, Chicken/Mutton Pickles',
      icon: 'nutrition-outline' as const,
    },
    {
      id: 'spice-podis',
      title: 'Spice Powders & Podis',
      desc: 'Guntur Karam, Kandi Podi, Karivepaku (Curry Leaf), Idli Podi',
      icon: 'flame-outline' as const,
    },
    {
      id: 'sweets',
      title: 'Traditional Andhra Sweets',
      desc: 'Pootharekulu, Bobbatlu, Kakinada Kaja, Sunnundalu, Ariselu',
      icon: 'heart-outline' as const,
    },
    {
      id: 'snacks',
      title: 'Savory Home Snacks',
      desc: 'Murukku, Chekodilu, Ribbon Pakoda, Mixture, Boondi',
      icon: 'fast-food-outline' as const,
    },
    {
      id: 'oils-pantry',
      title: 'Wood-Pressed Oils & Pantry',
      desc: 'Gingelly (Sesame) Oil, Groundnut Oil, Pure Desi Cow Ghee',
      icon: 'water-outline' as const,
    },
    {
      id: 'crafts-pottery',
      title: 'Handmade Crafts & Clay Pottery',
      desc: 'Clay water bottles, handcrafted kitchenware, jute baskets',
      icon: 'color-palette-outline' as const,
    },
  ];

  const toggleCategory = (id: string) => {
    setSelectedCats((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Category Selection" showBack />

      {/* Modern Multi-Step Progress Tracker */}
      <View style={styles.stepTrackContainer}>
        <View style={styles.stepHeaderRow}>
          <Text style={styles.stepIndicatorText}>Step 3 of 4 • Product Categories</Text>
          <Text style={styles.stepPercentText}>75% Completed</Text>
        </View>
        <View style={styles.progressBarTrack}>
          <LinearGradient
            colors={['#8B5CF6', '#6C5CE7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: '75%' }]}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Highlighted Hero Heading Card */}
        <View style={styles.heroHeadingCard}>
          <LinearGradient
            colors={['#F5F2FD', '#EDE9FE', '#FFFFFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroHeadingGradient}
          >
            <View style={styles.heroAccentBar} />

            <View style={styles.heroContentRow}>
              <View style={styles.heroTextCol}>
                <View style={styles.categoryPill}>
                  <Ionicons name="grid-outline" size={11} color="#6C5CE7" />
                  <Text style={styles.categoryPillText}>CATALOG & CUISINE SELECTION</Text>
                </View>

                <Text style={styles.highlightedHeading}>Choose Your Categories</Text>
                <Text style={styles.heroSubheading}>
                  Select all homemade product categories you plan to list and sell on HomeBaz.
                </Text>
              </View>

              <View style={styles.heroIconSquircle}>
                <Ionicons name="grid" size={24} color="#6C5CE7" />
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.categoriesList}>
          {categories.map((cat) => {
            const isSelected = selectedCats.includes(cat.id);
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.catCard, isSelected && styles.catCardSelected]}
                onPress={() => toggleCategory(cat.id)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.catIconBox,
                    isSelected && { backgroundColor: HomeBazColors.primary },
                  ]}
                >
                  <Ionicons
                    name={cat.icon}
                    size={22}
                    color={isSelected ? '#FFFFFF' : HomeBazColors.primary}
                  />
                </View>

                <View style={styles.catTextCol}>
                  <Text style={[styles.catTitle, isSelected && styles.catTitleSelected]}>
                    {cat.title}
                  </Text>
                  <Text style={styles.catDesc}>{cat.desc}</Text>
                </View>

                <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
                  {isSelected && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Continue to Address Details  →"
          onPress={() => router.push('/registration/address-details')}
          size="large"
          disabled={selectedCats.length === 0}
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
    borderColor: '#E6E0F8',
    shadowColor: '#6C5CE7',
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
    backgroundColor: '#6C5CE7',
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
    backgroundColor: '#EDE9FE',
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  categoryPillText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#6C5CE7',
    letterSpacing: 0.5,
  },
  highlightedHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2E1065',
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
    backgroundColor: '#EDE9FE',
    borderWidth: 1,
    borderColor: '#DDD6FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesList: {
    gap: 12,
  },
  catCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#ECECF5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  catCardSelected: {
    borderColor: HomeBazColors.primary,
    backgroundColor: '#FAF8FF',
  },
  catIconBox: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: HomeBazColors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  catTextCol: {
    flex: 1,
  },
  catTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
    marginBottom: 3,
  },
  catTitleSelected: {
    color: HomeBazColors.primaryDark,
  },
  catDesc: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    lineHeight: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#C7C3DF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  checkboxChecked: {
    backgroundColor: HomeBazColors.primary,
    borderColor: HomeBazColors.primary,
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
