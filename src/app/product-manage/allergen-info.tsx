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
import { GradientButton } from '@/components/common/GradientButton';

export default function AllergenInfoScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const [allergens, setAllergens] = useState<string[]>(['Mustard', 'Sesame']);

  const allergenList = [
    { id: 'Mustard', label: 'Mustard (Aavapodi / Mustard Oil)', desc: 'Common in Andhra pickles' },
    { id: 'Sesame', label: 'Sesame / Gingelly (Nuvvulu)', desc: 'Used in oil & podis' },
    { id: 'Groundnut', label: 'Peanuts / Groundnuts', desc: 'Used in chutneys & snacks' },
    { id: 'Garlic', label: 'Garlic (Vellulli)', desc: 'Added for tempering' },
    { id: 'Dairy', label: 'Dairy / Pure Milk Ghee', desc: 'Used in traditional sweets' },
    { id: 'Gluten', label: 'Gluten / Wheat Flour / Hing with maida', desc: 'Present in certain spice blends' },
    { id: 'Nuts', label: 'Tree Nuts (Cashews, Almonds)', desc: 'Used in sweets like Kaja & Sunnundalu' },
  ];

  const toggleAllergen = (id: string) => {
    setAllergens((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Allergen Information" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Allergen Declaration</Text>
        <Text style={styles.subheading}>
          Indicate all potential allergen ingredients so sensitive customers can order with confidence.
        </Text>

        <View style={styles.card}>
          {allergenList.map((item) => {
            const isChecked = allergens.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.allergenRow, isChecked && styles.allergenRowChecked]}
                onPress={() => toggleAllergen(item.id)}
                activeOpacity={0.75}
              >
                <View
                  style={[
                    styles.checkbox,
                    isChecked && styles.checkboxChecked,
                  ]}
                >
                  {isChecked && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                </View>

                <View style={styles.textCol}>
                  <Text style={[styles.allergenLabel, isChecked && styles.allergenLabelChecked]}>
                    {item.label}
                  </Text>
                  <Text style={styles.allergenDesc}>{item.desc}</Text>
                </View>
              </TouchableOpacity>
            );
          })}

          <View style={styles.warningBox}>
            <Ionicons name="alert-circle-outline" size={20} color="#D97706" />
            <Text style={styles.warningText}>
              Allergen declarations are printed on the HomeBaz digital invoice and delivery label for customer safety.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title={`Save Allergens (${allergens.length} Selected)`}
          onPress={() => {
            Alert.alert('Saved', 'Allergen information updated.');
            router.back();
          }}
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
  allergenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EFEFF6',
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  allergenRowChecked: {
    borderColor: '#DDD6FE',
    backgroundColor: '#FAF9FE',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#C7C3DF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: HomeBazColors.primary,
    borderColor: HomeBazColors.primary,
  },
  textCol: {
    flex: 1,
  },
  allergenLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
    marginBottom: 2,
  },
  allergenLabelChecked: {
    color: HomeBazColors.primaryDark,
  },
  allergenDesc: {
    fontSize: 11,
    color: HomeBazColors.textSecondary,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFBEB',
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },
  warningText: {
    flex: 1,
    fontSize: 11,
    color: '#92400E',
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
