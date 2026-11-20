import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';
import { CustomInput } from '@/components/common/CustomInput';
import { GradientButton } from '@/components/common/GradientButton';
import { ProductThumbnail } from '@/components/common/ProductThumbnail';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EditProductScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const { id } = useLocalSearchParams();
  const product = MOCK_PRODUCTS.find((p) => p.id === id) || MOCK_PRODUCTS[0];

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());
  const [stock, setStock] = useState(product.stock.toString());
  const [category, setCategory] = useState(product.category);
  const [isActive, setIsActive] = useState(product.isActive);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      Alert.alert('Saved', 'Product listing updated successfully!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }, 700);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to remove "${name}" from your store catalog?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Deleted', 'Product removed from store.');
            router.back();
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <Header
        title="Edit Product"
        showBack
        rightAction={{
          icon: 'eye-outline',
          onPress: () => router.push('/product-manage/product-preview'),
        }}
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Main Product Card */}
        <View style={styles.topCard}>
          <View style={styles.thumbnailCol}>
            <ProductThumbnail size={90} imageSource={product.image} />
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={() => router.push('/product-manage/product-image-gallery')}
              activeOpacity={0.7}
            >
              <Ionicons name="images-outline" size={14} color={HomeBazColors.primary} />
              <Text style={styles.galleryButtonText}>Manage Images</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.activeToggleRow}>
            <View>
              <Text style={styles.toggleTitle}>Listing Status</Text>
              <Text style={styles.toggleSub}>
                {isActive ? 'Live for customer orders' : 'Hidden from store'}
              </Text>
            </View>
            <Switch
              value={isActive}
              onValueChange={setIsActive}
              trackColor={{ false: '#D8D5E5', true: HomeBazColors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Core Attributes */}
        <View style={styles.formCard}>
          <CustomInput
            label="Product Name"
            required
            value={name}
            onChangeText={setName}
          />

          <View style={styles.rowInputs}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <CustomInput
                label="Price (₹)"
                required
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <CustomInput
                label="Stock Quantity"
                required
                value={stock}
                onChangeText={setStock}
                keyboardType="numeric"
              />
            </View>
          </View>

          <CustomInput
            label="Category"
            value={category}
            onChangeText={setCategory}
          />

          {/* Quick Sub-module Links */}
          <Text style={styles.submodulesTitle}>Product Specifications</Text>

          <TouchableOpacity
            style={styles.specLink}
            onPress={() => router.push('/product-manage/product-description')}
          >
            <View style={styles.specLinkLeft}>
              <Ionicons name="document-text-outline" size={18} color={HomeBazColors.primary} />
              <Text style={styles.specLinkText}>Story & Description</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9B97B0" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.specLink}
            onPress={() => router.push('/product-manage/food-ingredients')}
          >
            <View style={styles.specLinkLeft}>
              <Ionicons name="leaf-outline" size={18} color={HomeBazColors.primary} />
              <Text style={styles.specLinkText}>Food Ingredients & Spices</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9B97B0" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.specLink}
            onPress={() => router.push('/product-manage/allergen-info')}
          >
            <View style={styles.specLinkLeft}>
              <Ionicons name="alert-circle-outline" size={18} color={HomeBazColors.primary} />
              <Text style={styles.specLinkText}>Allergen Information</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9B97B0" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.specLink}
            onPress={() => router.push('/product-manage/expiry-info')}
          >
            <View style={styles.specLinkLeft}>
              <Ionicons name="calendar-outline" size={18} color={HomeBazColors.primary} />
              <Text style={styles.specLinkText}>Expiry & Shelf Life</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9B97B0" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.specLink}
            onPress={() => router.push('/product-manage/product-pricing')}
          >
            <View style={styles.specLinkLeft}>
              <Ionicons name="calculator-outline" size={18} color={HomeBazColors.primary} />
              <Text style={styles.specLinkText}>Pricing, Payout & Margins</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9B97B0" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.specLink}
            onPress={() => router.push('/product-manage/product-approval-status')}
          >
            <View style={styles.specLinkLeft}>
              <Ionicons name="shield-checkmark-outline" size={18} color={HomeBazColors.primary} />
              <Text style={styles.specLinkText}>Quality Approval Status</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9B97B0" />
          </TouchableOpacity>
        </View>

        {/* Delete Product Action */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          activeOpacity={0.75}
        >
          <Ionicons name="trash-outline" size={18} color={HomeBazColors.danger} />
          <Text style={styles.deleteButtonText}>Delete Product Listing</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Save Changes"
          onPress={handleSave}
          loading={isSaving}
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
  topCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECECF5',
    marginBottom: 14,
  },
  thumbnailCol: {
    alignItems: 'center',
    marginBottom: 16,
  },
  galleryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: HomeBazColors.primarySoft,
  },
  galleryButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: HomeBazColors.primaryDark,
  },
  activeToggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0EFF6',
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  toggleSub: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    marginTop: 2,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECF5',
    marginBottom: 14,
  },
  rowInputs: {
    flexDirection: 'row',
  },
  submodulesTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: HomeBazColors.textSecondary,
    textTransform: 'uppercase',
    marginTop: 10,
    marginBottom: 8,
  },
  specLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F3F8',
  },
  specLinkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  specLinkText: {
    fontSize: 13,
    fontWeight: '600',
    color: HomeBazColors.textPrimary,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  deleteButtonText: {
    color: HomeBazColors.danger,
    fontSize: 13,
    fontWeight: '700',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ECECF5',
    elevation: 20,
    zIndex: 100,
  },
});
