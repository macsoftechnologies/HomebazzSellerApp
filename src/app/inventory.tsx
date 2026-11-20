import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  Modal,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HomeBazColors } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@/components/common/Header';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ProductThumbnail } from '@/components/common/ProductThumbnail';
import { GradientButton } from '@/components/common/GradientButton';
import { MOCK_PRODUCTS, Product } from '@/data/mockData';

export default function InventoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newStockVal, setNewStockVal] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const filteredProducts = products.filter((p) => {
    if (searchQuery.trim()) {
      return (
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  const handleOpenStockModal = (product: Product) => {
    setSelectedProduct(product);
    setNewStockVal(product.stock.toString());
    setModalVisible(true);
  };

  const handleUpdateStock = () => {
    if (!selectedProduct) return;
    const num = parseInt(newStockVal, 10);
    if (isNaN(num) || num < 0) {
      Alert.alert('Invalid Quantity', 'Please enter a valid non-negative number.');
      return;
    }

    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === selectedProduct.id) {
          const newStatus =
            num === 0 ? 'Out of Stock' : num < 10 ? 'Low Stock' : 'In Stock';
          return {
            ...item,
            stock: num,
            status: newStatus as any,
          };
        }
        return item;
      })
    );
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.inventoryCard}>
      <ProductThumbnail size={50} imageSource={item.image} />

      <View style={styles.infoCol}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.stockCount}>Stock: {item.stock}</Text>
      </View>

      <StatusBadge status={item.status} size="small" />

      <TouchableOpacity
        style={styles.moreButton}
        onPress={() => handleOpenStockModal(item)}
        activeOpacity={0.7}
      >
        <Ionicons name="ellipsis-vertical" size={18} color="#8E8AA0" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header with Safe Area Clearance */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 14) }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={HomeBazColors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Inventory</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => setShowSearch(!showSearch)}
            activeOpacity={0.7}
          >
            <Ionicons name="search" size={20} color={HomeBazColors.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => Alert.alert('Filter', 'Filter by In Stock, Low Stock, or Out of Stock')}
            activeOpacity={0.7}
          >
            <Ionicons name="funnel-outline" size={18} color={HomeBazColors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Input Bar */}
      {showSearch && (
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={18} color="#9B97B0" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search inventory..."
            placeholderTextColor="#A8A5B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            autoFocus
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#9B97B0" />
            </TouchableOpacity>
          ) : null}
        </View>
      )}

      {/* Product Inventory List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Quick Stock Update Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Update Stock Level</Text>
            <Text style={styles.modalProduct}>{selectedProduct?.name}</Text>

            <View style={styles.stockInputRow}>
              <TouchableOpacity
                style={styles.qtyStepBtn}
                onPress={() => {
                  const val = Math.max(0, parseInt(newStockVal || '0', 10) - 1);
                  setNewStockVal(val.toString());
                }}
              >
                <Ionicons name="remove" size={18} color="#1E1B39" />
              </TouchableOpacity>

              <TextInput
                style={styles.stockModalInput}
                value={newStockVal}
                onChangeText={setNewStockVal}
                keyboardType="numeric"
                textAlign="center"
              />

              <TouchableOpacity
                style={styles.qtyStepBtn}
                onPress={() => {
                  const val = parseInt(newStockVal || '0', 10) + 1;
                  setNewStockVal(val.toString());
                }}
              >
                <Ionicons name="add" size={18} color="#1E1B39" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBtnRow}>
              <GradientButton
                title="Cancel"
                variant="outline"
                onPress={() => setModalVisible(false)}
                style={{ flex: 1, marginRight: 8 }}
              />
              <GradientButton
                title="Save Stock"
                onPress={handleUpdateStock}
                style={{ flex: 1, marginLeft: 8 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  statusBarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    backgroundColor: '#FFFFFF',
  },
  clockText: {
    fontWeight: '700',
    color: '#1E1B39',
    fontSize: 14,
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0EFF6',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8F8FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8F8FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E5F2',
    marginHorizontal: 16,
    marginTop: 10,
    paddingHorizontal: 12,
    height: 42,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: HomeBazColors.textPrimary,
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  inventoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ECECF5',
    marginBottom: 12,
  },
  infoCol: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
    marginBottom: 4,
  },
  stockCount: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    fontWeight: '500',
  },
  moreButton: {
    padding: 6,
    marginLeft: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalBox: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    marginBottom: 4,
  },
  modalProduct: {
    fontSize: 14,
    color: HomeBazColors.primary,
    fontWeight: '700',
    marginBottom: 20,
  },
  stockInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
  },
  qtyStepBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F2FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stockModalInput: {
    width: 90,
    height: 46,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: HomeBazColors.primaryBorder,
    fontSize: 20,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
  },
  modalBtnRow: {
    flexDirection: 'row',
    width: '100%',
  },
});
