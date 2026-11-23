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

export default function SellerTypeScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('food');

  const types = [
    {
      id: 'food',
      title: 'Home Food Maker',
      desc: 'Pickles, Spice Podis, Traditional Andhra Snacks, Sweets & Bakery',
      icon: 'restaurant-outline' as const,
      badge: 'Popular',
    },
    {
      id: 'artisan',
      title: 'Home Artisan / Crafter',
      desc: 'Clay Pottery, Handcrafted Décor, Jute Crafts & Wooden Toys',
      icon: 'color-palette-outline' as const,
    },
    {
      id: 'boutique',
      title: 'Homemaker Boutique',
      desc: 'Handmade Jewellery, Traditional Handloom Apparels & Embroidery',
      icon: 'sparkles-outline' as const,
    },
    {
      id: 'organic',
      title: 'Organic Farm Producer',
      desc: 'Cold Pressed Wood Oils, Pure Forest Honey & Organic Pulses',
      icon: 'leaf-outline' as const,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Seller Type" showBack />

      {/* Modern Multi-Step Progress Tracker */}
      <View style={styles.stepTrackContainer}>
        <View style={styles.stepHeaderRow}>
          <Text style={styles.stepIndicatorText}>Seller Onboarding • Classification</Text>
          <Text style={styles.stepPercentText}>Initiated</Text>
        </View>
        <View style={styles.progressBarTrack}>
          <LinearGradient
            colors={['#8B5CF6', '#6C5CE7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: '15%' }]}
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
                  <Ionicons name="sparkles" size={11} color="#6C5CE7" />
                  <Text style={styles.categoryPillText}>SELLER CLASSIFICATION</Text>
                </View>

                <Text style={styles.highlightedHeading}>What describes your craft?</Text>
                <Text style={styles.heroSubheading}>
                  Select the seller category that best matches your homemade products and creations.
                </Text>
              </View>

              <View style={styles.heroIconSquircle}>
                <Ionicons name="restaurant" size={24} color="#6C5CE7" />
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.list}>
          {types.map((item) => {
            const isSelected = selectedType === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.typeCard, isSelected && styles.typeCardSelected]}
                onPress={() => setSelectedType(item.id)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.iconBox,
                    isSelected && { backgroundColor: HomeBazColors.primary },
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={22}
                    color={isSelected ? '#FFFFFF' : HomeBazColors.primary}
                  />
                </View>

                <View style={styles.typeTextCol}>
                  <View style={styles.titleRow}>
                    <Text style={[styles.typeTitle, isSelected && styles.typeTitleSelected]}>
                      {item.title}
                    </Text>
                    {item.badge && (
                      <View style={styles.badgePill}>
                        <Text style={styles.badgeText}>{item.badge}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.typeDesc}>{item.desc}</Text>
                </View>

                <View
                  style={[
                    styles.radioCircle,
                    isSelected && styles.radioCircleSelected,
                  ]}
                >
                  {isSelected && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Continue to Personal Details  →"
          onPress={() => router.push('/registration/personal-details')}
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
  list: {
    gap: 12,
  },
  typeCard: {
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
  typeCardSelected: {
    borderColor: HomeBazColors.primary,
    backgroundColor: '#FAF8FF',
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: HomeBazColors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  typeTextCol: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  typeTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  typeTitleSelected: {
    color: HomeBazColors.primary,
  },
  badgePill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    color: '#D97706',
    fontSize: 10,
    fontWeight: '700',
  },
  typeDesc: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    lineHeight: 16,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#C7C3DF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  radioCircleSelected: {
    borderColor: HomeBazColors.primary,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: HomeBazColors.primary,
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
