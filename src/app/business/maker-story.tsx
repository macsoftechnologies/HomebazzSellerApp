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
import { SELLER_PROFILE } from '@/data/mockData';

export default function MakerStoryScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const [makerName, setMakerName] = useState(SELLER_PROFILE.name);
  const [experience, setExperience] = useState(SELLER_PROFILE.experienceYears.toString());
  const [story, setStory] = useState(SELLER_PROFILE.story);
  const [quote, setQuote] = useState(
    'Every single jar is prepared just the way we make it for our own children at home.'
  );

  const handleSave = () => {
    Alert.alert('Saved', 'Your Maker Story has been updated on your public storefront.');
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <Header title="The Maker’s Story" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Your Heritage & Culinary Journey</Text>
        <Text style={styles.subheading}>
          "Discover the Maker" (PDF Section 8 & 21) connects customers directly to the homemakers behind every authentic recipe.
        </Text>

        {/* Maker Profile Picture */}
        <View style={styles.avatarCard}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={38} color={HomeBazColors.primary} />
            <TouchableOpacity style={styles.cameraBadge}>
              <Ionicons name="camera" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.avatarTitle}>Maker Profile Photo</Text>
          <Text style={styles.avatarSub}>Friendly portrait of the home chef / artisan</Text>
        </View>

        <View style={styles.card}>
          <CustomInput
            label="Maker's Name"
            required
            leftIcon="person-outline"
            value={makerName}
            onChangeText={setMakerName}
          />

          <CustomInput
            label="Years of Experience in this Craft"
            required
            leftIcon="time-outline"
            value={experience}
            onChangeText={setExperience}
            keyboardType="numeric"
          />

          <CustomInput
            label="Signature Maker Quote"
            leftIcon="chatbox-ellipses-outline"
            value={quote}
            onChangeText={setQuote}
            multiline
            numberOfLines={2}
            placeholder="A short motto or quote from your heart..."
          />

          <CustomInput
            label="Full Maker Biography & Family Heritage"
            required
            value={story}
            onChangeText={setStory}
            multiline
            numberOfLines={5}
            placeholder="Tell customers about where your recipes originated and your commitment to pure ingredients..."
          />
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Save Maker Story"
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
  avatarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECECF5',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: HomeBazColors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: HomeBazColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  avatarSub: {
    fontSize: 11,
    color: HomeBazColors.textSecondary,
    marginTop: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECF5',
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
