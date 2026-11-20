import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';
import { GradientButton } from '@/components/common/GradientButton';

export default function FoodIngredientsScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const [ingredients, setIngredients] = useState<string[]>([
    'Fresh Gongura (Sorrel Leaves)',
    'Cold Pressed Sesame Oil (Gingelly)',
    'Guntur Red Chilli Powder',
    'Stone Ground Mustard Seeds',
    'Crushed Garlic Cloves',
    'Natural Crystal Sea Salt',
    'Fenugreek (Methi) Powder',
  ]);
  const [newIngredient, setNewIngredient] = useState('');
  const [oilType, setOilType] = useState('Cold-Pressed Sesame (Gingelly)');

  const oilOptions = [
    'Cold-Pressed Sesame (Gingelly)',
    'Traditional Groundnut Oil',
    'Pure Desi Cow Ghee',
    'Mustard Oil',
  ];

  const addIngredient = () => {
    if (!newIngredient.trim()) return;
    setIngredients([...ingredients, newIngredient.trim()]);
    setNewIngredient('');
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <Header title="Food Ingredients & Oil" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Ingredients & Purity Details</Text>
        <Text style={styles.subheading}>
          Displayed on customer product card for transparent food safety compliance (FSSAI).
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Primary Cooking / Preserving Medium</Text>
          <View style={styles.oilOptionsCol}>
            {oilOptions.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[styles.oilPill, oilType === opt && styles.oilPillActive]}
                onPress={() => setOilType(opt)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={oilType === opt ? 'radio-button-on' : 'radio-button-off'}
                  size={16}
                  color={oilType === opt ? HomeBazColors.primary : '#9B97B0'}
                />
                <Text style={[styles.oilText, oilType === opt && styles.oilTextActive]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.label, { marginTop: 16 }]}>Itemized Ingredients List</Text>
          <View style={styles.addInputRow}>
            <TextInput
              placeholder="Add ingredient (e.g. Tamarind pulp)"
              placeholderTextColor="#A8A5B8"
              value={newIngredient}
              onChangeText={setNewIngredient}
              style={styles.addInput}
            />
            <TouchableOpacity style={styles.addBtn} onPress={addIngredient}>
              <Ionicons name="add" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.chipWrap}>
            {ingredients.map((item, index) => (
              <View key={index} style={styles.ingredientChip}>
                <Text style={styles.ingredientText}>{item}</Text>
                <TouchableOpacity
                  onPress={() => removeIngredient(index)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons name="close-circle" size={16} color="#8E8AA0" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Quality Guarantee Badges */}
          <View style={styles.badgeRow}>
            <View style={styles.purityBadge}>
              <Ionicons name="checkmark-circle" size={14} color="#10B981" />
              <Text style={styles.purityText}>100% Preservative Free</Text>
            </View>
            <View style={styles.purityBadge}>
              <Ionicons name="checkmark-circle" size={14} color="#10B981" />
              <Text style={styles.purityText}>No Artificial Colors</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Save Ingredients List"
          onPress={() => {
            Alert.alert('Saved', 'Ingredients list saved.');
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
  oilOptionsCol: {
    gap: 8,
  },
  oilPill: {
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
  oilPillActive: {
    borderColor: HomeBazColors.primary,
    backgroundColor: HomeBazColors.primarySoft,
  },
  oilText: {
    fontSize: 12,
    fontWeight: '600',
    color: HomeBazColors.textSecondary,
  },
  oilTextActive: {
    color: HomeBazColors.primaryDark,
    fontWeight: '700',
  },
  addInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  addInput: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E8E5F2',
    paddingHorizontal: 12,
    fontSize: 13,
    color: HomeBazColors.textPrimary,
    backgroundColor: '#FFFFFF',
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: HomeBazColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  ingredientChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F3F2FA',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  ingredientText: {
    fontSize: 12,
    fontWeight: '600',
    color: HomeBazColors.textPrimary,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0EFF6',
  },
  purityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  purityText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#065F46',
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
