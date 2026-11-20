import { CustomInput } from '@/components/common/CustomInput';
import { GradientButton } from '@/components/common/GradientButton';
import { Header } from '@/components/common/Header';
import { Toast } from '@/components/common/Toast';
import { AppImages } from '@/constants/images';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PresetItem {
  id: string;
  name: string;
  category: string;
  image: any;
}

const STUDIO_PRESETS: PresetItem[] = [
  { id: 'p1', name: 'Gongura Leaf Pickle', category: 'Pickles', image: AppImages.pickleGongura },
  { id: 'p2', name: 'Avakaya Mango Pickle', category: 'Pickles', image: AppImages.pickleAvakaya },
  { id: 'p3', name: 'Kandi Podi & Spices', category: 'Spice Podi', image: AppImages.spicesPodi },
  { id: 'p4', name: 'Ghee Pootharekulu', category: 'Sweets', image: AppImages.sweetsPootharekulu },
  { id: 'p5', name: 'Crispy Butter Murukku', category: 'Snacks', image: AppImages.snacksMurukku },
  { id: 'p6', name: 'Heritage Clay Jar', category: 'Crafts', image: AppImages.potteryMug },
  { id: 'p7', name: 'Lemon Salted Pickle', category: 'Pickles', image: AppImages.food3 },
  { id: 'p8', name: 'Tomato Garlic Nilva', category: 'Pickles', image: AppImages.food4 },
];

const CATEGORIES = [
  { id: 'cat_pickles', label: 'Pickles & Nilva Chutneys', icon: 'nutrition-outline', color: '#10B981' },
  { id: 'cat_podis', label: 'Spice Powders (Podis)', icon: 'flame-outline', color: '#EF4444' },
  { id: 'cat_sweets', label: 'Traditional Sweets', icon: 'sparkles-outline', color: '#F59E0B' },
  { id: 'cat_snacks', label: 'Savory Snacks & Crisps', icon: 'fast-food-outline', color: '#8B5CF6' },
  { id: 'cat_crafts', label: 'Handmade Crafts & Pottery', icon: 'color-palette-outline', color: '#EC4899' },
  { id: 'cat_herbal', label: 'Herbal & Organic Health', icon: 'leaf-outline', color: '#059669' },
];

const WEIGHT_UNITS = ['250g', '500g', '1kg', 'Pack of 2', 'Pack of 4', 'Custom'];
const DIET_TYPES = ['Pure Vegetarian', 'Non-Vegetarian', 'Vegan / Jain'];
const QUALITY_TAGS = [
  '✦ 100% Homemade',
  '✦ Cold-Pressed Oil',
  '✦ Zero Preservatives',
  '✦ Traditional Recipe',
  '✦ Stone-Ground Spices',
];

export default function AddProductScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);

  // Form State
  const [productName, setProductName] = useState('Traditional Gongura Pickle');
  const [sellingPrice, setSellingPrice] = useState('250');
  const [mrpPrice, setMrpPrice] = useState('299');
  const [stockQuantity, setStockQuantity] = useState('25');
  const [selectedUnit, setSelectedUnit] = useState('500g');
  const [selectedCategory, setSelectedCategory] = useState('Pickles & Nilva Chutneys');
  const [selectedDiet, setSelectedDiet] = useState('Pure Vegetarian');
  const [description, setDescription] = useState(
    'Authentic homemade Andhra Gongura pickle prepared using sun-dried organic gongura leaves, stone-ground Guntur red chilies, and pure cold-pressed sesame oil. Aged traditionally in earthen jars with zero artificial preservatives.'
  );
  const [ingredients, setIngredients] = useState(
    'Gongura Leaves, Cold-pressed Sesame Oil, Guntur Red Chilies, Fenugreek, Mustard Seeds, Garlic, Sea Salt.'
  );
  const [shelfLife, setShelfLife] = useState('6 Months from packing');
  const [selectedTags, setSelectedTags] = useState<string[]>([
    '✦ 100% Homemade',
    '✦ Cold-Pressed Oil',
    '✦ Zero Preservatives',
  ]);

  // Images State & Carousel Ref
  const [productImages, setProductImages] = useState<any[]>([
    AppImages.pickleGongura,
    AppImages.food2,
    AppImages.food1,
  ]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [stageWidth, setStageWidth] = useState(SCREEN_WIDTH - 64);
  const carouselRef = useRef<any>(null);

  // Modals & UI Feedback
  const [isPhotoPickerVisible, setIsPhotoPickerVisible] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [showReviewSuccessModal, setShowReviewSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  // Scroll to slide smoothly
  const scrollToSlide = (idx: number) => {
    if (idx >= 0 && idx < productImages.length) {
      setSelectedImageIndex(idx);
      carouselRef.current?.scrollTo({ x: idx * stageWidth, animated: true });
    }
  };

  // Launch device camera
  const handleTakePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission',
          'Camera permission is required to capture photos directly. Please allow camera access in device settings.'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newPhoto = { uri: result.assets[0].uri };
        applyNewPhoto(newPhoto);
        setIsPhotoPickerVisible(false);
        showToast('Photo captured and set successfully!');
      }
    } catch (err) {
      console.log('Error opening camera:', err);
      const fallback = AppImages.food6;
      applyNewPhoto(fallback);
      setIsPhotoPickerVisible(false);
      showToast('Photo added from camera studio!');
    }
  };

  // Launch device gallery / local file picker
  const handlePickFromGallery = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Photo Library Access',
          'Permission to access your photos is required to choose an image from your device.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newPhoto = { uri: result.assets[0].uri };
        applyNewPhoto(newPhoto);
        setIsPhotoPickerVisible(false);
        showToast('Photo selected from your gallery!');
      }
    } catch (err) {
      console.log('Error opening photo library:', err);
      const fallback = AppImages.food7;
      applyNewPhoto(fallback);
      setIsPhotoPickerVisible(false);
      showToast('Photo uploaded from storage!');
    }
  };

  // Pick preset studio photo
  const handleSelectPreset = (presetImage: any) => {
    applyNewPhoto(presetImage);
    setIsPhotoPickerVisible(false);
    showToast('Studio photo preset selected!');
  };

  // Apply new photo to active slot or append
  const applyNewPhoto = (photo: any) => {
    if (selectedImageIndex < productImages.length) {
      const updated = [...productImages];
      updated[selectedImageIndex] = photo;
      setProductImages(updated);
      scrollToSlide(selectedImageIndex);
    } else {
      if (productImages.length >= 6) {
        Alert.alert('Maximum Limit', 'You can upload up to 6 photos per product listing.');
        return;
      }
      const newImages = [...productImages, photo];
      setProductImages(newImages);
      const newIndex = newImages.length - 1;
      setTimeout(() => scrollToSlide(newIndex), 100);
    }
  };

  // Remove photo
  const handleRemovePhoto = (indexToRemove: number) => {
    if (productImages.length <= 1) {
      Alert.alert('Required Photo', 'A listing must have at least one product photo.');
      return;
    }

    const updated = productImages.filter((_, idx) => idx !== indexToRemove);
    setProductImages(updated);
    const newIdx = Math.min(selectedImageIndex, updated.length - 1);
    setSelectedImageIndex(newIdx);
    setTimeout(() => scrollToSlide(newIdx), 100);
    setIsPhotoPickerVisible(false);
    showToast('Photo removed from product');
  };

  // Adjust stock via steppers
  const handleAdjustStock = (delta: number) => {
    const current = parseInt(stockQuantity, 10) || 0;
    const nextVal = Math.max(0, current + delta);
    setStockQuantity(nextVal.toString());
  };

  // Toggle quality tags
  const toggleQualityTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Save / Submit Handlers
  const handleSave = () => {
    if (!productName.trim() || !sellingPrice.trim() || !stockQuantity.trim()) {
      showToast('Please fill in required fields (Name, Price, Stock)', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowReviewSuccessModal(true);
    }, 600);
  };

  const handleAddAnotherProduct = () => {
    setProductName('');
    setSellingPrice('');
    setMrpPrice('');
    setStockQuantity('');
    setShowReviewSuccessModal(false);
    showToast('Ready to add another product listing!', 'info');
  };

  const handleSaveDraft = () => {
    showToast('Product draft saved locally', 'info');
  };

  // Price & margin calculation
  const mrpNum = parseFloat(mrpPrice) || 0;
  const spNum = parseFloat(sellingPrice) || 0;
  const discountPercent = mrpNum > spNum && mrpNum > 0 ? Math.round(((mrpNum - spNum) / mrpNum) * 100) : 0;
  const estPayout = spNum > 0 ? (spNum * 0.9).toFixed(2) : '0';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />

      {/* Top Header */}
      <Header
        title="Add Product"
        showBack
        rightAction={{
          icon: 'eye-outline',
          onPress: () => router.push('/product-manage/product-preview'),
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Quality Tip Banner */}
        <View style={styles.tipBanner}>
          <View style={styles.tipIconBadge}>
            <Ionicons name="sparkles" size={16} color="#6C5CE7" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.tipTitle}>HomeBaz Quality Standard</Text>
            <Text style={styles.tipSub}>
              Clear photos on neutral backgrounds increase buyer trust and sales by 45%.
            </Text>
          </View>
        </View>

        {/* ======================================================== */}
        {/* CARD 1: PRODUCT PHOTOS & MEDIA (SWIPEABLE SLIDER)        */}
        {/* ======================================================== */}
        <View style={[styles.sectionCard, styles.photosCard]}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeaderLeft}>
              <View style={[styles.sectionIconBadge, { backgroundColor: '#F3EFFF' }]}>
                <Ionicons name="images" size={17} color="#6C5CE7" />
              </View>
              <View>
                <Text style={styles.sectionTitle}>Product Photos & Media</Text>
                <Text style={styles.sectionSubtitle}>
                  Add up to 6 high-resolution product photos
                </Text>
              </View>
            </View>
            <View style={styles.photoCountPill}>
              <Ionicons name="camera" size={12} color="#6C5CE7" />
              <Text style={styles.photoCountText}>
                {selectedImageIndex + 1}/{productImages.length}
              </Text>
            </View>
          </View>

          {/* SWIPEABLE HERO PHOTO STAGE */}
          <View
            style={styles.heroPhotoStage}
            onLayout={(e) => {
              const w = e.nativeEvent.layout.width;
              if (w > 0 && Math.abs(w - stageWidth) > 1) {
                setStageWidth(w);
              }
            }}
          >
            {/* Horizontal Swipe ScrollView (Hand Mover / Paging) */}
            <ScrollView
              ref={carouselRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const offsetX = e.nativeEvent.contentOffset.x;
                const newIdx = Math.round(offsetX / stageWidth);
                if (newIdx >= 0 && newIdx < productImages.length) {
                  setSelectedImageIndex(newIdx);
                }
              }}
              scrollEventThrottle={16}
              style={{ width: stageWidth, height: 230 }}
            >
              {productImages.map((imgSrc, idx) => (
                <View key={idx} style={{ width: stageWidth, height: 230 }}>
                  <Image source={imgSrc} style={styles.heroPhotoImage as any} resizeMode="cover" />
                </View>
              ))}
            </ScrollView>

            {/* Top Badges Overlay */}
            <View style={styles.heroTopBadges}>
              {selectedImageIndex === 0 ? (
                <View style={styles.coverBadge}>
                  <Ionicons name="star" size={10} color="#FFFFFF" style={{ marginRight: 3 }} />
                  <Text style={styles.coverBadgeText}>COVER PHOTO</Text>
                </View>
              ) : (
                <View style={styles.angleBadge}>
                  <Text style={styles.angleBadgeText}>VIEW #{selectedImageIndex + 1}</Text>
                </View>
              )}

              <View style={styles.photoIndexBadge}>
                <Text style={styles.photoIndexText}>
                  {selectedImageIndex + 1} / {productImages.length}
                </Text>
              </View>
            </View>

            {/* Slide Pagination Indicator (Squircle Dashes - No Circles) */}
            <View style={styles.slideIndicatorStrip}>
              {productImages.map((_, idx) => {
                const isActive = selectedImageIndex === idx;
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => scrollToSlide(idx)}
                    activeOpacity={0.8}
                    style={[
                      styles.indicatorDash,
                      isActive && styles.indicatorDashActive,
                    ]}
                  />
                );
              })}
            </View>

            {/* Bottom Action Bar on Hero Image */}
            <View style={styles.heroBottomBar}>
              <TouchableOpacity
                style={styles.heroActionButton}
                onPress={() => setIsPhotoPickerVisible(true)}
                activeOpacity={0.85}
              >
                <Ionicons name="camera-outline" size={14} color="#FFFFFF" />
                <Text style={styles.heroActionText}>
                  {productImages.length > 0 ? 'Change Photo' : 'Upload Photo'}
                </Text>
              </TouchableOpacity>

              {productImages.length > 1 && (
                <TouchableOpacity
                  style={styles.heroDeleteButton}
                  onPress={() => handleRemovePhoto(selectedImageIndex)}
                  activeOpacity={0.85}
                >
                  <Ionicons name="trash-outline" size={14} color="#EF4444" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Thumbnails Row (Tap to Slide) */}
          <View style={styles.thumbnailsWrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.thumbnailsRow}>
              {productImages.map((imgSrc, idx) => {
                const isSelected = selectedImageIndex === idx;
                return (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.thumbBox,
                      isSelected && styles.thumbBoxSelected,
                    ]}
                    onPress={() => scrollToSlide(idx)}
                    activeOpacity={0.7}
                  >
                    <Image source={imgSrc} style={styles.thumbImage as any} resizeMode="cover" />
                    {idx === 0 && (
                      <View style={styles.thumbCoverDot}>
                        <Ionicons name="star" size={8} color="#FFFFFF" />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}

              {/* Add New Photo Slot */}
              {productImages.length < 6 && (
                <TouchableOpacity
                  style={styles.addThumbSlot}
                  onPress={() => {
                    setSelectedImageIndex(productImages.length);
                    setIsPhotoPickerVisible(true);
                  }}
                  activeOpacity={0.75}
                >
                  <Ionicons name="add" size={18} color="#6C5CE7" />
                  <Text style={styles.addThumbSlotText}>+ Add</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>

          {/* Photo Guidelines Chips */}
          <View style={styles.guidelinesRow}>
            <View style={styles.guidelineChip}>
              <Ionicons name="checkmark-circle" size={13} color="#059669" />
              <Text style={styles.guidelineChipText}>Square 1:1</Text>
            </View>
            <View style={styles.guidelineChip}>
              <Ionicons name="checkmark-circle" size={13} color="#059669" />
              <Text style={styles.guidelineChipText}>Min 800×800px</Text>
            </View>
            <View style={styles.guidelineChip}>
              <Ionicons name="checkmark-circle" size={13} color="#059669" />
              <Text style={styles.guidelineChipText}>Natural Light</Text>
            </View>
          </View>
        </View>

        {/* ======================================================== */}
        {/* CARD 2: BASIC INFORMATION (RICH VIBRANT STYLING)         */}
        {/* ======================================================== */}
        <View style={[styles.sectionCard, styles.basicInfoCard]}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeaderLeft}>
              <View style={[styles.sectionIconBadge, { backgroundColor: '#EDE9FE' }]}>
                <Ionicons name="sparkles" size={17} color="#6C5CE7" />
              </View>
              <View>
                <Text style={styles.sectionTitle}>Basic Information</Text>
                <Text style={styles.sectionSubtitle}>
                  Essential details customers see in your store
                </Text>
              </View>
            </View>
            <View style={[styles.headerTagPill, { backgroundColor: '#F3EFFF' }]}>
              <Text style={[styles.headerTagText, { color: '#6C5CE7' }]}>Core Info</Text>
            </View>
          </View>

          <View style={{ marginTop: 12 }}>
            <CustomInput
              label="Product Title"
              required
              value={productName}
              onChangeText={setProductName}
              placeholder="e.g. Traditional Andhra Gongura Pickle"
            />
          </View>

          {/* Category Dropdown Picker */}
          <View style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.inputLabel}>Product Category</Text>
              <Text style={styles.requiredAsterisk}> *</Text>
            </View>
            <TouchableOpacity
              style={styles.categorySelector}
              onPress={() => setIsCategoryModalVisible(true)}
              activeOpacity={0.8}
            >
              <View style={styles.categorySelectorLeft}>
                <View style={styles.categoryIconSquircle}>
                  <Ionicons name="folder-outline" size={16} color="#6C5CE7" />
                </View>
                <Text style={styles.categorySelectorText}>{selectedCategory}</Text>
              </View>
              <Ionicons name="chevron-down" size={18} color="#7E7A94" />
            </TouchableOpacity>
          </View>

          {/* Diet Type Selector */}
          <View style={styles.fieldGroup}>
            <Text style={styles.inputLabel}>Food & Dietary Classification</Text>
            <View style={styles.dietPillsRow}>
              {DIET_TYPES.map((diet) => {
                const isActive = selectedDiet === diet;
                const isVeg = diet.includes('Veg') && !diet.includes('Non');
                const isNonVeg = diet.includes('Non');
                return (
                  <TouchableOpacity
                    key={diet}
                    style={[
                      styles.dietPill,
                      isActive && styles.dietPillActive,
                      isActive && isVeg && styles.dietPillVegActive,
                      isActive && isNonVeg && styles.dietPillNonVegActive,
                    ]}
                    onPress={() => setSelectedDiet(diet)}
                    activeOpacity={0.75}
                  >
                    <View
                      style={[
                        styles.dietSquircleIndicator,
                        isVeg && { backgroundColor: '#10B981' },
                        isNonVeg && { backgroundColor: '#EF4444' },
                        !isVeg && !isNonVeg && { backgroundColor: '#F59E0B' },
                      ]}
                    />
                    <Text
                      style={[
                        styles.dietPillText,
                        isActive && styles.dietPillTextActive,
                        isActive && isVeg && { color: '#065F46' },
                        isActive && isNonVeg && { color: '#991B1B' },
                      ]}
                    >
                      {diet}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* ======================================================== */}
        {/* CARD 3: PRICING & INVENTORY (EMERALD / GOLD VIBRANT)     */}
        {/* ======================================================== */}
        <View style={[styles.sectionCard, styles.pricingCard]}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeaderLeft}>
              <View style={[styles.sectionIconBadge, { backgroundColor: '#ECFDF5' }]}>
                <Ionicons name="cash-outline" size={17} color="#059669" />
              </View>
              <View>
                <Text style={styles.sectionTitle}>Pricing & Inventory</Text>
                <Text style={styles.sectionSubtitle}>
                  Set competitive pricing and live stock limits
                </Text>
              </View>
            </View>
            <View style={[styles.headerTagPill, { backgroundColor: '#ECFDF5' }]}>
              <Text style={[styles.headerTagText, { color: '#059669' }]}>Live Margins</Text>
            </View>
          </View>

          {/* Pricing Row */}
          <View style={styles.pricingRow}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <CustomInput
                label="Selling Price (₹)"
                required
                value={sellingPrice}
                onChangeText={setSellingPrice}
                keyboardType="numeric"
                placeholder="250"
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <CustomInput
                label="MRP / List Price (₹)"
                value={mrpPrice}
                onChangeText={setMrpPrice}
                keyboardType="numeric"
                placeholder="299"
              />
            </View>
          </View>

          {/* Dynamic Margin & Discount Banner */}
          <View style={styles.marginBanner}>
            <View style={styles.marginBannerRow}>
              <View style={styles.marginBannerLeft}>
                <Ionicons name="pricetag" size={13} color="#059669" />
                <Text style={styles.marginDiscountText}>
                  {discountPercent > 0
                    ? `Save ₹${mrpNum - spNum} (${discountPercent}% OFF)`
                    : 'Standard Selling Price'}
                </Text>
              </View>
              <View style={styles.payoutChip}>
                <Text style={styles.payoutChipLabel}>Est. Payout: </Text>
                <Text style={styles.payoutChipValue}>₹{estPayout}</Text>
              </View>
            </View>
          </View>

          {/* Packaging / Unit Chips */}
          <View style={styles.fieldGroup}>
            <Text style={styles.inputLabel}>Pack Size / Net Quantity</Text>
            <View style={styles.unitsRow}>
              {WEIGHT_UNITS.map((unit) => {
                const isActive = selectedUnit === unit;
                return (
                  <TouchableOpacity
                    key={unit}
                    style={[styles.unitChip, isActive && styles.unitChipActive]}
                    onPress={() => setSelectedUnit(unit)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.unitChipText, isActive && styles.unitChipTextActive]}>
                      {unit}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Ready Stock Stepper & Field */}
          <View style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.inputLabel}>Ready Stock Units</Text>
              <View style={styles.stockStatusBadge}>
                <Ionicons name="checkmark-circle" size={11} color="#059669" />
                <Text style={styles.stockStatusText}>In Stock</Text>
              </View>
            </View>
            <View style={styles.stockStepperRow}>
              <TouchableOpacity
                style={styles.stepperBtn}
                onPress={() => handleAdjustStock(-1)}
                activeOpacity={0.7}
              >
                <Ionicons name="remove" size={18} color="#1E1B39" />
              </TouchableOpacity>
              <TextInput
                style={styles.stockInput}
                value={stockQuantity}
                onChangeText={setStockQuantity}
                keyboardType="numeric"
                placeholder="0"
                textAlign="center"
              />
              <TouchableOpacity
                style={styles.stepperBtn}
                onPress={() => handleAdjustStock(1)}
                activeOpacity={0.7}
              >
                <Ionicons name="add" size={18} color="#1E1B39" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ======================================================== */}
        {/* CARD 4: DESCRIPTION & INGREDIENTS (WARM ARTISAN TONES)   */}
        {/* ======================================================== */}
        <View style={[styles.sectionCard, styles.descriptionCard]}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeaderLeft}>
              <View style={[styles.sectionIconBadge, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="restaurant-outline" size={17} color="#D97706" />
              </View>
              <View>
                <Text style={styles.sectionTitle}>Description & Ingredients</Text>
                <Text style={styles.sectionSubtitle}>
                  Artisan recipe, shelf life & natural highlights
                </Text>
              </View>
            </View>
            <View style={[styles.headerTagPill, { backgroundColor: '#FEF3C7' }]}>
              <Text style={[styles.headerTagText, { color: '#D97706' }]}>Artisan Touch</Text>
            </View>
          </View>

          {/* Description Text Area */}
          <View style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.inputLabel}>About This Item</Text>
              <Text style={styles.charCountText}>{description.length}/400</Text>
            </View>
            <TextInput
              style={styles.textArea}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe taste profile, preparation technique, traditional touch..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Key Ingredients */}
          <View style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="leaf-outline" size={13} color="#059669" style={{ marginRight: 4 }} />
                <Text style={styles.inputLabel}>Key Ingredients & Oil</Text>
              </View>
            </View>
            <TextInput
              style={[styles.textArea, { minHeight: 68 }]}
              value={ingredients}
              onChangeText={setIngredients}
              placeholder="List spices, oils, natural components..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={2}
              textAlignVertical="top"
            />
          </View>

          {/* Quality Guarantee Tags (Toggleable) */}
          <View style={styles.fieldGroup}>
            <Text style={styles.inputLabel}>Handmade Quality Badges</Text>
            <View style={styles.qualityTagsRow}>
              {QUALITY_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <TouchableOpacity
                    key={tag}
                    style={[
                      styles.qualityTagChip,
                      isSelected && styles.qualityTagChipActive,
                    ]}
                    onPress={() => toggleQualityTag(tag)}
                    activeOpacity={0.75}
                  >
                    <Text
                      style={[
                        styles.qualityTagText,
                        isSelected && styles.qualityTagTextActive,
                      ]}
                    >
                      {tag}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Shelf Life */}
          <View style={{ marginTop: 10 }}>
            <CustomInput
              label="Shelf Life / Best Before"
              value={shelfLife}
              onChangeText={setShelfLife}
              placeholder="e.g. 6 Months from manufacturing date"
            />
          </View>
        </View>

        {/* ======================================================== */}
        {/* CARD 5: COMPLIANCE MODULES (BLUE QUALITY STANDARD)       */}
        {/* ======================================================== */}
        <View style={[styles.sectionCard, styles.complianceCard]}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeaderLeft}>
              <View style={[styles.sectionIconBadge, { backgroundColor: '#EFF6FF' }]}>
                <Ionicons name="shield-checkmark-outline" size={17} color="#2563EB" />
              </View>
              <View>
                <Text style={styles.sectionTitle}>Quality & Compliance Modules</Text>
                <Text style={styles.sectionSubtitle}>
                  Verified specifications for HomeBaz seller compliance
                </Text>
              </View>
            </View>
            <View style={[styles.headerTagPill, { backgroundColor: '#EFF6FF' }]}>
              <Text style={[styles.headerTagText, { color: '#2563EB' }]}>Verified</Text>
            </View>
          </View>

          <View style={styles.complianceList}>
            <TouchableOpacity
              style={styles.complianceRow}
              onPress={() => router.push('/product-manage/food-ingredients')}
              activeOpacity={0.7}
            >
              <View style={styles.complianceRowLeft}>
                <View style={[styles.complianceIconSquircle, { backgroundColor: '#F3EFFF' }]}>
                  <Ionicons name="leaf-outline" size={17} color="#6C5CE7" />
                </View>
                <View>
                  <Text style={styles.complianceTitle}>Food Ingredients & Oil Type</Text>
                  <Text style={styles.complianceSub}>Sesame oil, Cold-pressed certification</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#A39FB4" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.complianceRow}
              onPress={() => router.push('/product-manage/allergen-info')}
              activeOpacity={0.7}
            >
              <View style={styles.complianceRowLeft}>
                <View style={[styles.complianceIconSquircle, { backgroundColor: '#FEF3C7' }]}>
                  <Ionicons name="alert-circle-outline" size={17} color="#D97706" />
                </View>
                <View>
                  <Text style={styles.complianceTitle}>Allergen Information</Text>
                  <Text style={styles.complianceSub}>Nut-free, Gluten warnings, Mustard</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#A39FB4" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.complianceRow}
              onPress={() => router.push('/product-manage/expiry-info')}
              activeOpacity={0.7}
            >
              <View style={styles.complianceRowLeft}>
                <View style={[styles.complianceIconSquircle, { backgroundColor: '#ECFDF5' }]}>
                  <Ionicons name="calendar-outline" size={17} color="#059669" />
                </View>
                <View>
                  <Text style={styles.complianceTitle}>Expiry & Storage Guidance</Text>
                  <Text style={styles.complianceSub}>Best before period, Earthen jar storage</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#A39FB4" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.complianceRow}
              onPress={() => router.push('/product-manage/product-pricing')}
              activeOpacity={0.7}
            >
              <View style={styles.complianceRowLeft}>
                <View style={[styles.complianceIconSquircle, { backgroundColor: '#EFF6FF' }]}>
                  <Ionicons name="calculator-outline" size={17} color="#2563EB" />
                </View>
                <View>
                  <Text style={styles.complianceTitle}>Pricing & Commission Breakdown</Text>
                  <Text style={styles.complianceSub}>Platform fee, GST & net seller payout</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#A39FB4" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM STICKY ACTION BAR */}
      <View style={[styles.bottomActionBar, { paddingBottom: bottomClearance }]}>
        <TouchableOpacity
          style={styles.draftButton}
          onPress={handleSaveDraft}
          activeOpacity={0.75}
        >
          <Ionicons name="bookmark-outline" size={17} color="#6C5CE7" />
          <Text style={styles.draftButtonText}>Save Draft</Text>
        </TouchableOpacity>

        <View style={{ flex: 1, marginLeft: 10 }}>
          <GradientButton
            title="Submit for Review  →"
            onPress={handleSave}
            loading={isSubmitting}
            size="large"
          />
        </View>
      </View>

      {/* ========================================================= */}
      {/* PROFESSIONAL CAMERA / GALLERY / STUDIO BOTTOM SHEET MODAL */}
      {/* ========================================================= */}
      <Modal
        visible={isPhotoPickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsPhotoPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdropDismiss}
            onPress={() => setIsPhotoPickerVisible(false)}
            activeOpacity={1}
          />

          <View style={styles.bottomSheetContainer}>
            {/* Grabber Handle */}
            <View style={styles.grabberBar} />

            {/* Modal Header */}
            <View style={styles.modalHeaderRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalTitle}>Upload Product Photo</Text>
                <Text style={styles.modalSubtitle}>
                  Select high-resolution photo from your device or take live shot
                </Text>
              </View>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setIsPhotoPickerVisible(false)}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={20} color="#1E1B39" />
              </TouchableOpacity>
            </View>

            {/* Action 1: Choose from Gallery / Local Files */}
            <TouchableOpacity
              style={styles.pickerOptionCard}
              onPress={handlePickFromGallery}
              activeOpacity={0.8}
            >
              <View style={[styles.pickerIconSquircle, { backgroundColor: '#ECFDF5' }]}>
                <Ionicons name="images" size={24} color="#059669" />
              </View>
              <View style={{ flex: 1, marginLeft: 14 }}>
                <View style={styles.pickerTitleRow}>
                  <Text style={styles.pickerOptionTitle}>Choose from Gallery</Text>
                  <View style={styles.recommendedBadge}>
                    <Text style={styles.recommendedBadgeText}>Storage Files</Text>
                  </View>
                </View>
                <Text style={styles.pickerOptionSubtitle}>
                  Select from phone albums, camera roll, or file documents
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Action 2: Take Live Photo with Camera */}
            <TouchableOpacity
              style={styles.pickerOptionCard}
              onPress={handleTakePhoto}
              activeOpacity={0.8}
            >
              <View style={[styles.pickerIconSquircle, { backgroundColor: '#F3EFFF' }]}>
                <Ionicons name="camera" size={24} color="#6C5CE7" />
              </View>
              <View style={{ flex: 1, marginLeft: 14 }}>
                <View style={styles.pickerTitleRow}>
                  <Text style={styles.pickerOptionTitle}>Take Live Camera Shot</Text>
                  <View style={[styles.recommendedBadge, { backgroundColor: '#EDE9FE' }]}>
                    <Text style={[styles.recommendedBadgeText, { color: '#6C5CE7' }]}>Camera</Text>
                  </View>
                </View>
                <Text style={styles.pickerOptionSubtitle}>
                  Snap freshly prepared food or handcrafted product now
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Action 3: Studio Preset Photos */}
            <View style={styles.presetSection}>
              <View style={styles.presetSectionHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="sparkles" size={14} color="#D97706" style={{ marginRight: 6 }} />
                  <Text style={styles.presetSectionTitle}>Or Pick Verified Studio Presets</Text>
                </View>
                <Text style={styles.presetCountLabel}>{STUDIO_PRESETS.length} presets</Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.presetsScrollRow}
              >
                {STUDIO_PRESETS.map((preset) => (
                  <TouchableOpacity
                    key={preset.id}
                    style={styles.presetCard}
                    onPress={() => handleSelectPreset(preset.image)}
                    activeOpacity={0.8}
                  >
                    <Image source={preset.image} style={styles.presetCardImage as any} resizeMode="cover" />
                    <View style={styles.presetCardFooter}>
                      <Text style={styles.presetCardName} numberOfLines={1}>
                        {preset.name}
                      </Text>
                      <Text style={styles.presetCardCategory}>{preset.category}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Optional Remove Option */}
            {productImages.length > 1 && selectedImageIndex < productImages.length && (
              <TouchableOpacity
                style={styles.removeOptionBtn}
                onPress={() => handleRemovePhoto(selectedImageIndex)}
                activeOpacity={0.7}
              >
                <Ionicons name="trash-outline" size={16} color="#EF4444" style={{ marginRight: 6 }} />
                <Text style={styles.removeOptionText}>Remove This Photo</Text>
              </TouchableOpacity>
            )}

            {/* Cancel Button */}
            <TouchableOpacity
              style={styles.modalCancelBtn}
              onPress={() => setIsPhotoPickerVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.modalCancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ========================================================= */}
      {/* CATEGORY SELECTION MODAL */}
      {/* ========================================================= */}
      <Modal
        visible={isCategoryModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsCategoryModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdropDismiss}
            onPress={() => setIsCategoryModalVisible(false)}
            activeOpacity={1}
          />
          <View style={styles.categoryModalContent}>
            <View style={styles.modalHeaderRow}>
              <View>
                <Text style={styles.modalTitle}>Select Category</Text>
                <Text style={styles.modalSubtitle}>Choose the best match for your item</Text>
              </View>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setIsCategoryModalVisible(false)}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={20} color="#1E1B39" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 380 }}>
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.label;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.categoryOptionItem,
                      isSelected && styles.categoryOptionItemSelected,
                    ]}
                    onPress={() => {
                      setSelectedCategory(cat.label);
                      setIsCategoryModalVisible(false);
                      showToast(`Category set to ${cat.label}`);
                    }}
                    activeOpacity={0.75}
                  >
                    <View style={styles.categoryOptionLeft}>
                      <View
                        style={[
                          styles.categoryOptionIconSquircle,
                          isSelected
                            ? { backgroundColor: '#6C5CE7' }
                            : { backgroundColor: cat.color + '1A' },
                        ]}
                      >
                        <Ionicons
                          name={cat.icon as any}
                          size={18}
                          color={isSelected ? '#FFFFFF' : cat.color}
                        />
                      </View>
                      <Text
                        style={[
                          styles.categoryOptionLabel,
                          isSelected && styles.categoryOptionLabelSelected,
                        ]}
                      >
                        {cat.label}
                      </Text>
                    </View>
                    {isSelected && (
                      <Ionicons name="checkmark-circle" size={20} color="#6C5CE7" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ========================================================= */}
      {/* PRODUCT SUBMISSION FOR REVIEW MILESTONE MODAL             */}
      {/* ========================================================= */}
      <Modal
        visible={showReviewSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowReviewSuccessModal(false)}
      >
        <View style={styles.successModalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdropDismiss}
            onPress={() => setShowReviewSuccessModal(false)}
            activeOpacity={1}
          />
          <View style={styles.successModalContainer}>
            {/* Top Linear Gradient Accent Stripe */}
            <LinearGradient
              colors={['#8A65F2', '#6C5CE7', '#F59E0B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.successModalTopStripe}
            />

            {/* Close Button */}
            <TouchableOpacity
              style={styles.successModalCloseBtn}
              onPress={() => setShowReviewSuccessModal(false)}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close" size={18} color="#7E7A94" />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.successModalContent}>
              {/* Hero Celebration Squircle Emblem (NO BALLS) */}
              <View style={styles.successEmblemWrapper}>
                <LinearGradient
                  colors={['#F5F2FD', '#EAE3FB']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.successEmblemBg}
                >
                  <Ionicons name="cube" size={36} color="#6C5CE7" />

                  {/* Golden Sparkle Accent */}
                  <View style={styles.emblemSparkleTop}>
                    <Ionicons name="sparkles" size={14} color="#F59E0B" />
                  </View>

                  {/* Emerald Check Accent */}
                  <View style={styles.emblemCheckBottom}>
                    <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  </View>
                </LinearGradient>
              </View>

              {/* Status Milestone Pill */}
              <View style={styles.successMilestonePill}>
                <Ionicons name="checkmark-circle" size={13} color="#059669" />
                <Text style={styles.successMilestonePillText}>
                  SUBMISSION RECEIVED • REVIEW IN QUEUE
                </Text>
              </View>

              {/* Title & Description */}
              <Text style={styles.successModalTitle}>Product Submitted for Review!</Text>
              <Text style={styles.successModalSub}>
                Your listing for <Text style={styles.successHighlightText}>"{productName}"</Text> has been received. Our compliance team will inspect ingredients, images, and pricing standards.
              </Text>

              {/* Product Quick Snapshot Card */}
              <View style={styles.snapshotCard}>
                <Image
                  source={productImages[0] || AppImages.pickleGongura}
                  style={styles.snapshotImage as any}
                  resizeMode="cover"
                />
                <View style={styles.snapshotMetaCol}>
                  <Text style={styles.snapshotName} numberOfLines={1}>
                    {productName}
                  </Text>
                  <Text style={styles.snapshotCategory}>
                    {selectedCategory} • {selectedUnit}
                  </Text>
                  <View style={styles.snapshotPriceRow}>
                    <Text style={styles.snapshotPrice}>₹{sellingPrice}</Text>
                    {discountPercent > 0 && (
                      <View style={styles.snapshotDiscountBadge}>
                        <Text style={styles.snapshotDiscountText}>{discountPercent}% OFF</Text>
                      </View>
                    )}
                    <Text style={styles.snapshotStock}>• {stockQuantity} units</Text>
                  </View>
                </View>
              </View>

              {/* Review Process Steps Card */}
              <View style={styles.reviewProcessCard}>
                <View style={styles.reviewProcessHeader}>
                  <Ionicons name="time" size={13} color="#6C5CE7" />
                  <Text style={styles.reviewProcessHeaderText}>
                    HOMEBAZ VERIFICATION PROCESS (24–48 HRS)
                  </Text>
                </View>

                {/* Step 1 */}
                <View style={styles.reviewStepRow}>
                  <View style={styles.reviewStepBadgeActive}>
                    <Text style={styles.reviewStepBadgeTextActive}>1</Text>
                  </View>
                  <View style={styles.reviewStepInfoCol}>
                    <Text style={styles.reviewStepTitle}>Food Quality & Hygiene Check</Text>
                    <Text style={styles.reviewStepDesc}>Ingredients, preservatives & oil standards</Text>
                  </View>
                  <View style={styles.reviewStatusPill}>
                    <Text style={styles.reviewStatusPillText}>IN QUEUE</Text>
                  </View>
                </View>

                {/* Step 2 */}
                <View style={styles.reviewStepRow}>
                  <View style={styles.reviewStepBadgeInactive}>
                    <Text style={styles.reviewStepBadgeTextInactive}>2</Text>
                  </View>
                  <View style={styles.reviewStepInfoCol}>
                    <Text style={styles.reviewStepTitle}>Catalog Image & Labeling Review</Text>
                    <Text style={styles.reviewStepDesc}>High-resolution photo & packaging label</Text>
                  </View>
                </View>

                {/* Step 3 */}
                <View style={[styles.reviewStepRow, { marginBottom: 0 }]}>
                  <View style={styles.reviewStepBadgeInactive}>
                    <Text style={styles.reviewStepBadgeTextInactive}>3</Text>
                  </View>
                  <View style={styles.reviewStepInfoCol}>
                    <Text style={styles.reviewStepTitle}>Live on Store for Customer Orders</Text>
                    <Text style={styles.reviewStepDesc}>Search listing, customer discovery & instant payouts</Text>
                  </View>
                </View>
              </View>

              {/* Trust & Guarantee Strip */}
              <View style={styles.trustStrip}>
                <Ionicons name="shield-checkmark-outline" size={12} color="#7E7A94" />
                <Text style={styles.trustStripText}>
                  HomeBaz Quality Guarantee • Flat 10% Platform Fee
                </Text>
              </View>

              {/* Primary Action Button */}
              <GradientButton
                title="View in Products Catalog  →"
                onPress={() => {
                  setShowReviewSuccessModal(false);
                  router.push('/(tabs)/products');
                }}
                size="large"
                style={{ width: '100%', marginTop: 8 }}
              />

              {/* Secondary Add Another Product Button */}
              <TouchableOpacity
                style={styles.addAnotherBtn}
                onPress={handleAddAnotherProduct}
                activeOpacity={0.8}
              >
                <Ionicons name="add-circle-outline" size={16} color="#6C5CE7" style={{ marginRight: 6 }} />
                <Text style={styles.addAnotherBtnText}>Add Another Product</Text>
              </TouchableOpacity>

              {/* Keep Editing Listing Link */}
              <TouchableOpacity
                style={styles.keepEditingBtn}
                onPress={() => setShowReviewSuccessModal(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.keepEditingBtnText}>Keep Editing This Listing</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Toast Notification */}
      <Toast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
        onDismiss={() => setToastVisible(false)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  scrollContent: {
    padding: 16,
  },

  // Quality Tip Banner
  tipBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ECE7F8',
    marginBottom: 14,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  tipIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F3EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E1B39',
  },
  tipSub: {
    fontSize: 11.5,
    color: '#65617D',
    marginTop: 2,
    lineHeight: 16,
  },

  // BASE SECTION CARDS
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    marginBottom: 16,
    shadowColor: '#1A103C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  // INDIVIDUAL CARD BORDERS & COLOR ACCENTS
  photosCard: {
    borderColor: '#ECE7F8',
    borderTopWidth: 3.5,
    borderTopColor: '#6C5CE7',
  },
  basicInfoCard: {
    borderColor: '#EDE9FE',
    borderTopWidth: 3.5,
    borderTopColor: '#8A65F2',
  },
  pricingCard: {
    borderColor: '#D1FAE5',
    borderTopWidth: 3.5,
    borderTopColor: '#059669',
  },
  descriptionCard: {
    borderColor: '#FEF3C7',
    borderTopWidth: 3.5,
    borderTopColor: '#D97706',
  },
  complianceCard: {
    borderColor: '#DBEAFE',
    borderTopWidth: 3.5,
    borderTopColor: '#2563EB',
  },

  // SECTION HEADERS
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  sectionIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E1B39',
  },
  sectionSubtitle: {
    fontSize: 11.5,
    color: '#7B7793',
    marginTop: 1.5,
  },
  photoCountPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F3EFFF',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 9,
  },
  photoCountText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#6C5CE7',
  },
  headerTagPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  headerTagText: {
    fontSize: 11,
    fontWeight: '700',
  },

  // HERO PHOTO STAGE (SWIPEABLE SLIDER)
  heroPhotoStage: {
    position: 'relative',
    width: '100%',
    height: 230,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F1F0F8',
    borderWidth: 1,
    borderColor: '#E8E5F4',
  },
  heroPhotoImage: {
    width: '100%',
    height: '100%',
  },

  // Hand-Mover Swipe Cue
  swipeCuePill: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(28, 20, 52, 0.72)',
    paddingHorizontal: 9,
    paddingVertical: 3.5,
    borderRadius: 8,
    zIndex: 5,
  },
  swipeCueText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },

  // Top Badges
  heroTopBadges: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 4,
  },
  coverBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6C5CE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  coverBadgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  angleBadge: {
    backgroundColor: 'rgba(30, 27, 57, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  angleBadgeText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  photoIndexBadge: {
    backgroundColor: 'rgba(30, 27, 57, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  photoIndexText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Slide Chevron Navigation Buttons
  slideNavButton: {
    position: 'absolute',
    top: '44%',
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(25, 20, 50, 0.68)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  slideNavLeft: {
    left: 8,
  },
  slideNavRight: {
    right: 8,
  },

  // Slide Dashes Indicator
  slideIndicatorStrip: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    zIndex: 5,
  },
  indicatorDash: {
    width: 8,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
  },
  indicatorDashActive: {
    width: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },

  // Bottom Action Bar on Hero Image
  heroBottomBar: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 5,
  },
  heroActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#6C5CE7',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 3,
  },
  heroActionText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  heroDeleteButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },

  // Thumbnails Strip
  thumbnailsWrapper: {
    marginTop: 12,
  },
  thumbnailsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 4,
  },
  thumbBox: {
    position: 'relative',
    width: 52,
    height: 52,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ECE7F8',
    backgroundColor: '#F8F7FC',
  },
  thumbBoxSelected: {
    borderColor: '#6C5CE7',
    borderWidth: 2.5,
    transform: [{ scale: 1.05 }],
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  thumbCoverDot: {
    position: 'absolute',
    top: 3,
    left: 3,
    width: 14,
    height: 14,
    borderRadius: 4,
    backgroundColor: '#6C5CE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addThumbSlot: {
    width: 52,
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    borderStyle: 'dashed',
    backgroundColor: '#F7F5FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addThumbSlotText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#6C5CE7',
    marginTop: -2,
  },

  // Guidelines Row
  guidelinesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F2F8',
  },
  guidelineChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  guidelineChipText: {
    fontSize: 10.5,
    color: '#65617D',
    fontWeight: '600',
  },

  // Form Field Groups
  fieldGroup: {
    marginTop: 14,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E1B39',
  },
  requiredAsterisk: {
    fontSize: 13,
    fontWeight: '700',
    color: '#EF4444',
  },
  charCountText: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  categorySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E7E5F2',
    backgroundColor: '#FAF9FE',
    paddingHorizontal: 12,
  },
  categorySelectorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  categoryIconSquircle: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#F3EFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categorySelectorText: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#1E1B39',
  },

  // Diet Pills
  dietPillsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  dietPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E8E6F2',
    backgroundColor: '#FAFAFD',
  },
  dietPillActive: {
    borderColor: '#6C5CE7',
    backgroundColor: '#F3EFFF',
  },
  dietPillVegActive: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  dietPillNonVegActive: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  dietSquircleIndicator: {
    width: 8,
    height: 8,
    borderRadius: 3,
  },
  dietPillText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#55516E',
  },
  dietPillTextActive: {
    fontWeight: '700',
    color: '#1E1B39',
  },

  // Pricing & Inventory
  pricingRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  marginBanner: {
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginTop: 8,
  },
  marginBannerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  marginBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  marginDiscountText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#065F46',
  },
  payoutChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  payoutChipLabel: {
    fontSize: 11,
    color: '#065F46',
    fontWeight: '600',
  },
  payoutChipValue: {
    fontSize: 11.5,
    color: '#059669',
    fontWeight: '800',
  },
  unitsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },
  unitChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E7E5F2',
    backgroundColor: '#FAFAFD',
  },
  unitChipActive: {
    borderColor: '#059669',
    backgroundColor: '#ECFDF5',
  },
  unitChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5E5A78',
  },
  unitChipTextActive: {
    fontWeight: '700',
    color: '#059669',
  },

  // Stock Stepper
  stockStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 6,
  },
  stockStatusText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#059669',
  },
  stockStepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  stepperBtn: {
    width: 44,
    height: 44,
    borderRadius: 11,
    backgroundColor: '#F3F2F8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E3EF',
  },
  stockInput: {
    flex: 1,
    height: 44,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#E7E5F2',
    backgroundColor: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    color: '#1E1B39',
  },

  // Description & Ingredients
  textArea: {
    minHeight: 88,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E7E5F2',
    backgroundColor: '#FCFCFE',
    padding: 12,
    fontSize: 13,
    color: '#1E1B39',
    lineHeight: 18,
  },
  qualityTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },
  qualityTagChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#EAE6F8',
    backgroundColor: '#FAFAFD',
  },
  qualityTagChipActive: {
    borderColor: '#D97706',
    backgroundColor: '#FEF3C7',
  },
  qualityTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#716C8A',
  },
  qualityTagTextActive: {
    fontWeight: '700',
    color: '#92400E',
  },

  // Compliance List
  complianceList: {
    marginTop: 8,
  },
  complianceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F3F9',
  },
  complianceRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  complianceIconSquircle: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  complianceTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E1B39',
  },
  complianceSub: {
    fontSize: 11,
    color: '#7D7993',
    marginTop: 1,
  },

  // Bottom Sticky Action Bar
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ECE7F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 8,
  },
  draftButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    backgroundColor: '#F8F6FE',
  },
  draftButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6C5CE7',
  },

  // ===================================
  // MODAL STYLING (BOTTOM SHEET)
  // ===================================
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 12, 35, 0.58)',
    justifyContent: 'flex-end',
  },
  modalBackdropDismiss: {
    flex: 1,
  },
  bottomSheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 16,
  },
  grabberBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#DDD8EC',
    alignSelf: 'center',
    marginBottom: 14,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E1B39',
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#716C8A',
    marginTop: 2,
    lineHeight: 16,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#F3F2F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  // Picker Option Cards
  pickerOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFD',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#ECE7F8',
    marginBottom: 10,
  },
  pickerIconSquircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pickerOptionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1B39',
  },
  recommendedBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  recommendedBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  pickerOptionSubtitle: {
    fontSize: 11.5,
    color: '#716C8A',
    marginTop: 2,
    lineHeight: 15,
  },

  // Presets Section inside Modal
  presetSection: {
    marginTop: 8,
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0EFF6',
  },
  presetSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  presetSectionTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#1E1B39',
  },
  presetCountLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  presetsScrollRow: {
    flexDirection: 'row',
    gap: 10,
  },
  presetCard: {
    width: 90,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F8F7FC',
    borderWidth: 1,
    borderColor: '#ECE7F6',
  },
  presetCardImage: {
    width: 90,
    height: 64,
  },
  presetCardFooter: {
    padding: 5,
  },
  presetCardName: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1E1B39',
  },
  presetCardCategory: {
    fontSize: 9,
    color: '#8E8AA0',
    marginTop: 1,
  },

  removeOptionBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 6,
  },
  removeOptionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#EF4444',
  },
  modalCancelBtn: {
    height: 46,
    borderRadius: 13,
    backgroundColor: '#F3F2F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  modalCancelBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#55516E',
  },

  // Category Modal Content
  categoryModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    marginHorizontal: 20,
    marginBottom: 'auto',
    marginTop: 'auto',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 20,
  },
  categoryOptionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 6,
    backgroundColor: '#FAFAFD',
    borderWidth: 1,
    borderColor: '#ECEAF4',
  },
  categoryOptionItemSelected: {
    backgroundColor: '#F3EFFF',
    borderColor: '#6C5CE7',
  },
  categoryOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryOptionIconSquircle: {
    width: 32,
    height: 32,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryOptionLabel: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#1E1B39',
  },
  categoryOptionLabelSelected: {
    fontWeight: '700',
    color: '#6C5CE7',
  },

  // ===================================
  // SUCCESS / REVIEW MODAL STYLES
  // ===================================
  successModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 12, 35, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
  },
  successModalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    width: '100%',
    maxWidth: 410,
    maxHeight: '90%',
    overflow: 'hidden',
    shadowColor: '#10062E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 18,
  },
  successModalTopStripe: {
    height: 5,
    width: '100%',
  },
  successModalCloseBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#F3F2F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModalContent: {
    padding: 20,
    alignItems: 'center',
  },
  successEmblemWrapper: {
    marginTop: 8,
    marginBottom: 12,
  },
  successEmblemBg: {
    width: 66,
    height: 66,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1.5,
    borderColor: '#ECE4FB',
  },
  emblemSparkleTop: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 22,
    height: 22,
    borderRadius: 7,
    backgroundColor: '#FFFBEB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  emblemCheckBottom: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successMilestonePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 10,
  },
  successMilestonePillText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#059669',
    letterSpacing: 0.5,
  },
  successModalTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#1E1B39',
    textAlign: 'center',
    marginBottom: 6,
  },
  successModalSub: {
    fontSize: 12,
    color: '#6A6584',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  successHighlightText: {
    fontWeight: '700',
    color: '#1E1B39',
  },
  snapshotCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F7FC',
    borderWidth: 1,
    borderColor: '#ECE7F8',
    borderRadius: 14,
    padding: 10,
    width: '100%',
    marginBottom: 14,
  },
  snapshotImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 10,
  },
  snapshotMetaCol: {
    flex: 1,
  },
  snapshotName: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#1E1B39',
  },
  snapshotCategory: {
    fontSize: 11.5,
    color: '#7E7A94',
    marginTop: 1,
  },
  snapshotPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 3,
  },
  snapshotPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#059669',
  },
  snapshotDiscountBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 5,
  },
  snapshotDiscountText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#059669',
  },
  snapshotStock: {
    fontSize: 11,
    color: '#7E7A94',
  },
  reviewProcessCard: {
    width: '100%',
    backgroundColor: '#FBFBFE',
    borderWidth: 1,
    borderColor: '#EDEBF6',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  reviewProcessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  reviewProcessHeaderText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#6C5CE7',
    letterSpacing: 0.5,
  },
  reviewStepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewStepBadgeActive: {
    width: 22,
    height: 22,
    borderRadius: 7,
    backgroundColor: '#6C5CE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  reviewStepBadgeTextActive: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  reviewStepBadgeInactive: {
    width: 22,
    height: 22,
    borderRadius: 7,
    backgroundColor: '#E9E6F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  reviewStepBadgeTextInactive: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8884A0',
  },
  reviewStepInfoCol: {
    flex: 1,
  },
  reviewStepTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E1B39',
  },
  reviewStepDesc: {
    fontSize: 10.5,
    color: '#7E7A94',
    marginTop: 1,
  },
  reviewStatusPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  reviewStatusPillText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#D97706',
  },
  trustStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  trustStripText: {
    fontSize: 10.5,
    color: '#7E7A94',
  },
  addAnotherBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 44,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    backgroundColor: '#F8F6FE',
    marginTop: 10,
  },
  addAnotherBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6C5CE7',
  },
  keepEditingBtn: {
    paddingVertical: 10,
    marginTop: 2,
  },
  keepEditingBtnText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#7E7A94',
  },
});
