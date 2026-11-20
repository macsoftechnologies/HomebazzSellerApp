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

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: '20%' }]} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>What describes your craft?</Text>
        <Text style={styles.subheading}>
          Select the category that best matches your homemade products.
        </Text>

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
                    size={24}
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
  },
  typeCardSelected: {
    borderColor: HomeBazColors.primary,
    backgroundColor: '#FAF8FF',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
    paddingTop: 12,},
});
