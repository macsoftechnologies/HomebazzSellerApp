import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
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

export default function HandmadeDetailsScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const [material, setMaterial] = useState('Terracotta Natural Clay & Natural Mineral Glaze');
  const [technique, setTechnique] = useState('Traditional Potter Wheel Hand-Thrown & Wood Fired');
  const [dimensions, setDimensions] = useState('Height: 14 cm, Diameter: 9 cm');
  const [careNotes, setCareNotes] = useState('Rinse with warm water. Avoid chemical detergents. Dry naturally.');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <Header title="Handmade Product Details" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Artisan Craft Specifications</Text>
        <Text style={styles.subheading}>
          Dedicated details for handicrafts, pottery, decor, and handloom items.
        </Text>

        <View style={styles.card}>
          <CustomInput
            label="Raw Materials Used"
            required
            leftIcon="leaf-outline"
            value={material}
            onChangeText={setMaterial}
            placeholder="e.g. Pure Clay, Teak wood, Jute yarn"
          />

          <CustomInput
            label="Handcrafting Technique"
            required
            leftIcon="color-palette-outline"
            value={technique}
            onChangeText={setTechnique}
            placeholder="e.g. Hand-painted, wheel pottery, handloom"
          />

          <CustomInput
            label="Product Dimensions & Size"
            leftIcon="resize-outline"
            value={dimensions}
            onChangeText={setDimensions}
            placeholder="e.g. 15cm x 10cm x 8cm"
          />

          <CustomInput
            label="Artisan Care Instructions"
            value={careNotes}
            onChangeText={setCareNotes}
            multiline
            numberOfLines={3}
            placeholder="How customer should preserve and care for this item"
          />

          <View style={styles.badgeCard}>
            <Ionicons name="sparkles" size={18} color={HomeBazColors.primary} />
            <Text style={styles.badgeCardText}>
              Qualifies for the HomeBaz "Handmade by Artisan" verified storefront ribbon.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Save Craft Details"
          onPress={() => {
            Alert.alert('Saved', 'Artisan specifications updated.');
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
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: HomeBazColors.primarySoft,
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
  },
  badgeCardText: {
    fontSize: 12,
    fontWeight: '700',
    color: HomeBazColors.primaryDark,
    flex: 1,
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
