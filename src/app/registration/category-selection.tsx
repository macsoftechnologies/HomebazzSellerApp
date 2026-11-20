import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Platform} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
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

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: '80%' }]} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Choose Your Product Categories</Text>
        <Text style={styles.subheading}>
          Select all categories you plan to list and sell on HomeBaz.
        </Text>

        <View style={styles.categoriesList}>
          {categories.map((cat) => {
            const isChecked = selectedCats.includes(cat.id);
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.catCard, isChecked && styles.catCardSelected]}
                onPress={() => toggleCategory(cat.id)}
                activeOpacity={0.75}
              >
                <View
                  style={[
                    styles.catIconBox,
                    isChecked && { backgroundColor: HomeBazColors.primary },
                  ]}
                >
                  <Ionicons
                    name={cat.icon}
                    size={22}
                    color={isChecked ? '#FFFFFF' : HomeBazColors.primary}
                  />
                </View>

                <View style={styles.catTextCol}>
                  <Text style={[styles.catTitle, isChecked && styles.catTitleSelected]}>
                    {cat.title}
                  </Text>
                  <Text style={styles.catDesc}>{cat.desc}</Text>
                </View>

                <View
                  style={[
                    styles.checkbox,
                    isChecked && styles.checkboxChecked,
                  ]}
                >
                  {isChecked && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title={`Continue (${selectedCats.length} Categories Selected)  →`}
          disabled={selectedCats.length === 0}
          onPress={() => router.push('/registration/address-details')}
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
  },
  catCardSelected: {
    borderColor: HomeBazColors.primary,
    backgroundColor: '#FAF8FF',
  },
  catIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
    borderRadius: 6,
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
    paddingTop: 12,},
});
