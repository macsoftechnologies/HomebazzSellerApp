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

export default function ProductDescriptionScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const [story, setStory] = useState(
    'Handcrafted following a 30-year family recipe from Visakhapatnam. Fresh country sorrel leaves (Gongura) are handpicked, sun-dried on cotton mats, and gently ground with stone-pounded Guntur red chilies and cold-pressed gingelly oil.'
  );
  const [spiceLevel, setSpiceLevel] = useState<'Mild' | 'Medium' | 'Extra Spicy'>('Medium');
  const [servingSuggestion, setServingSuggestion] = useState(
    'Best enjoyed mixed with piping hot steamed sona masoori rice, a generous dollop of pure desi cow ghee, and raw chopped onions.'
  );

  const handleSave = () => {
    Alert.alert('Saved', 'Product story and description saved successfully.');
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <Header title="Product Story & Description" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>The Story Behind Your Recipe</Text>
        <Text style={styles.subheading}>
          HomeBaz customers love traditional culinary heritage and authentic small-batch preparation stories.
        </Text>

        <View style={styles.card}>
          <CustomInput
            label="Product Story & Preparation Method"
            required
            value={story}
            onChangeText={setStory}
            multiline
            numberOfLines={6}
            placeholder="Tell customers how this batch is prepared..."
          />

          {/* Spice Level Selector */}
          <Text style={styles.label}>Spice Level</Text>
          <View style={styles.spiceRow}>
            {(['Mild', 'Medium', 'Extra Spicy'] as const).map((lvl) => (
              <TouchableOpacity
                key={lvl}
                style={[
                  styles.spicePill,
                  spiceLevel === lvl && styles.spicePillActive,
                ]}
                onPress={() => setSpiceLevel(lvl)}
                activeOpacity={0.75}
              >
                <Text
                  style={[
                    styles.spiceText,
                    spiceLevel === lvl && styles.spiceTextActive,
                  ]}
                >
                  {lvl}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <CustomInput
            label="Recommended Serving Suggestions"
            value={servingSuggestion}
            onChangeText={setServingSuggestion}
            multiline
            numberOfLines={3}
            placeholder="e.g. Best with hot rice, idli, or dosa..."
          />
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Save Description"
          onPress={handleSave}
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
    fontWeight: '600',
    color: HomeBazColors.textPrimary,
    marginBottom: 8,
  },
  spiceRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  spicePill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E8E5F2',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  spicePillActive: {
    borderColor: HomeBazColors.primary,
    backgroundColor: HomeBazColors.primarySoft,
  },
  spiceText: {
    fontSize: 12,
    fontWeight: '600',
    color: HomeBazColors.textSecondary,
  },
  spiceTextActive: {
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
