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

export default function ProductCategoryScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const [mainCat, setMainCat] = useState('food');
  const [subCat, setSubCat] = useState('andhra-pickles');
  const [region, setRegion] = useState('Visakhapatnam');

  const foodSubCategories = [
    { id: 'andhra-pickles', name: 'Traditional Andhra Pickles (Pachadi)' },
    { id: 'spice-podis', name: 'Gunpowder & Spice Podis' },
    { id: 'traditional-sweets', name: 'Andhra Traditional Sweets' },
    { id: 'home-snacks', name: 'Crispy Homemade Snacks' },
    { id: 'wood-oils', name: 'Cold Pressed Wood Oils' },
  ];

  const regions = [
    'Visakhapatnam',
    'East & West Godavari',
    'Guntur',
    'Krishna & Vijayawada',
    'Rayalaseema',
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Product Category" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Classification & Region</Text>
        <Text style={styles.subheading}>
          Ensures your products appear in regional specialty collections on HomeBaz.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Primary Department</Text>
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tabBtn, mainCat === 'food' && styles.tabBtnActive]}
              onPress={() => setMainCat('food')}
            >
              <Text style={[styles.tabText, mainCat === 'food' && styles.tabTextActive]}>
                Traditional Food & Pantry
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabBtn, mainCat === 'craft' && styles.tabBtnActive]}
              onPress={() => setMainCat('craft')}
            >
              <Text style={[styles.tabText, mainCat === 'craft' && styles.tabTextActive]}>
                Handmade & Artisan Crafts
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.label, { marginTop: 14 }]}>Subcategory</Text>
          {foodSubCategories.map((sc) => (
            <TouchableOpacity
              key={sc.id}
              style={[styles.catOption, subCat === sc.id && styles.catOptionActive]}
              onPress={() => setSubCat(sc.id)}
            >
              <Ionicons
                name={subCat === sc.id ? 'radio-button-on' : 'radio-button-off'}
                size={18}
                color={subCat === sc.id ? HomeBazColors.primary : '#9B97B0'}
              />
              <Text style={[styles.catOptionText, subCat === sc.id && styles.catOptionTextActive]}>
                {sc.name}
              </Text>
            </TouchableOpacity>
          ))}

          <Text style={[styles.label, { marginTop: 16 }]}>Regional Heritage Origin</Text>
          <View style={styles.regionGrid}>
            {regions.map((r) => (
              <TouchableOpacity
                key={r}
                style={[styles.regionChip, region === r && styles.regionChipActive]}
                onPress={() => setRegion(r)}
              >
                <Text style={[styles.regionText, region === r && styles.regionTextActive]}>
                  {r}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Save Category Classification"
          onPress={() => router.back()}
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
  tabRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E8E5F2',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  tabBtnActive: {
    borderColor: HomeBazColors.primary,
    backgroundColor: HomeBazColors.primarySoft,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: HomeBazColors.textSecondary,
  },
  tabTextActive: {
    color: HomeBazColors.primaryDark,
    fontWeight: '700',
  },
  catOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EBE8F3',
    marginBottom: 8,
  },
  catOptionActive: {
    borderColor: HomeBazColors.primary,
    backgroundColor: '#FAF9FE',
  },
  catOptionText: {
    fontSize: 13,
    fontWeight: '600',
    color: HomeBazColors.textSecondary,
  },
  catOptionTextActive: {
    color: HomeBazColors.textPrimary,
    fontWeight: '700',
  },
  regionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  regionChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ECECF5',
    backgroundColor: '#FAF9FE',
  },
  regionChipActive: {
    borderColor: HomeBazColors.primary,
    backgroundColor: HomeBazColors.primarySoft,
  },
  regionText: {
    fontSize: 12,
    fontWeight: '600',
    color: HomeBazColors.textSecondary,
  },
  regionTextActive: {
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
