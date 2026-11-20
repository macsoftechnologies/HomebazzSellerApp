import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
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
import { ProductThumbnail } from '@/components/common/ProductThumbnail';
import { GradientButton } from '@/components/common/GradientButton';
import { SELLER_PROFILE, MOCK_PRODUCTS } from '@/data/mockData';

export default function ProductPreviewScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();
  const product = MOCK_PRODUCTS[0];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Customer App Preview" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.previewNotice}>
          <Ionicons name="eye" size={16} color={HomeBazColors.primary} />
          <Text style={styles.previewNoticeText}>
            This is exactly how your listing appears to buyers on the HomeBaz app.
          </Text>
        </View>

        {/* Customer Product Card */}
        <View style={styles.productCard}>
          <View style={styles.imageBox}>
            <ProductThumbnail size={150} imageSource={product.image} />
            <View style={styles.verifiedBadge}>
              <Ionicons name="shield-checkmark" size={12} color="#FFFFFF" />
              <Text style={styles.verifiedText}>Verified Home Maker</Text>
            </View>
          </View>

          <View style={styles.detailsSection}>
            <View style={styles.titlePriceRow}>
              <View>
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.subTitle}>Net Qty: 250g • Small Batch</Text>
              </View>
              <Text style={styles.price}>₹{product.price}</Text>
            </View>

            <View style={styles.ratingRow}>
              <View style={styles.starBadge}>
                <Ionicons name="star" size={12} color="#F59E0B" />
                <Text style={styles.starText}>{product.rating}</Text>
              </View>
              <Text style={styles.ratingCount}>({product.ordersCount} verified orders)</Text>
            </View>

            {/* Maker Card (PDF Section 8 Discover the Maker) */}
            <View style={styles.makerCard}>
              <View style={styles.makerAvatar}>
                <Ionicons name="storefront" size={20} color={HomeBazColors.primary} />
              </View>
              <View style={styles.makerMeta}>
                <Text style={styles.makerStore}>{SELLER_PROFILE.storeName}</Text>
                <Text style={styles.makerLoc}>
                  {SELLER_PROFILE.district} • {SELLER_PROFILE.experienceYears} Years Heritage
                </Text>
              </View>
              <View style={styles.makerBadge}>
                <Text style={styles.makerBadgeText}>MASTER</Text>
              </View>
            </View>

            <Text style={styles.storyHeading}>The Maker’s Recipe Story</Text>
            <Text style={styles.storyText}>{product.description}</Text>

            <Text style={styles.storyHeading}>Ingredients</Text>
            <View style={styles.ingredientsPills}>
              {product.ingredients.map((ing, idx) => (
                <View key={idx} style={styles.ingPill}>
                  <Text style={styles.ingText}>{ing}</Text>
                </View>
              ))}
            </View>

            <View style={styles.fssaiRow}>
              <Text style={styles.fssaiLogo}>fssai</Text>
              <Text style={styles.fssaiText}>Lic. No. {product.fssaiNumber}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Return to Product Editor"
          variant="outline"
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
  previewNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: HomeBazColors.primarySoft,
    padding: 10,
    borderRadius: 10,
    marginBottom: 14,
  },
  previewNoticeText: {
    fontSize: 11,
    fontWeight: '600',
    color: HomeBazColors.primaryDark,
    flex: 1,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ECECF5',
    overflow: 'hidden',
  },
  imageBox: {
    backgroundColor: '#FAF9FE',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    position: 'relative',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  detailsSection: {
    padding: 18,
  },
  titlePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
  },
  subTitle: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    marginTop: 2,
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
    color: HomeBazColors.primary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  starBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  starText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#D97706',
  },
  ratingCount: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
  },
  makerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF9FE',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EFEBF8',
    marginBottom: 18,
  },
  makerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: HomeBazColors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  makerMeta: {
    flex: 1,
  },
  makerStore: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  makerLoc: {
    fontSize: 11,
    color: HomeBazColors.textSecondary,
    marginTop: 1,
  },
  makerBadge: {
    backgroundColor: HomeBazColors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  makerBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  storyHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    marginBottom: 6,
  },
  storyText: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    lineHeight: 18,
    marginBottom: 16,
  },
  ingredientsPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 18,
  },
  ingPill: {
    backgroundColor: '#F3F2FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ingText: {
    fontSize: 11,
    color: HomeBazColors.textPrimary,
    fontWeight: '600',
  },
  fssaiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0EFF6',
  },
  fssaiLogo: {
    fontWeight: '900',
    fontSize: 14,
    color: '#E11D48',
    fontStyle: 'italic',
  },
  fssaiText: {
    fontSize: 11,
    color: HomeBazColors.textSecondary,
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
