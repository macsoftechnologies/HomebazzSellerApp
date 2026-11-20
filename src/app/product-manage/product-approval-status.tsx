import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';
import { ProductThumbnail } from '@/components/common/ProductThumbnail';
import { StatusBadge } from '@/components/common/StatusBadge';
import { MOCK_PRODUCTS } from '@/data/mockData';

export default function ProductApprovalStatusScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Product Approval Status" showBack />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Catalog Quality Gate</Text>
        <Text style={styles.subheading}>
          Every food & artisan item is evaluated by HomeBaz taste and compliance auditors before appearing on the customer app.
        </Text>

        <View style={styles.list}>
          {MOCK_PRODUCTS.map((prod) => (
            <View key={prod.id} style={styles.itemCard}>
              <View style={styles.cardTop}>
                <ProductThumbnail size={50} />

                <View style={styles.textCol}>
                  <Text style={styles.prodName}>{prod.name}</Text>
                  <Text style={styles.prodCat}>{prod.category} • ₹{prod.price}</Text>
                </View>

                <StatusBadge
                  status={prod.isActive ? 'Approved' : 'Pending'}
                  size="small"
                />
              </View>

              <View style={styles.auditInfoRow}>
                <View style={styles.auditBadge}>
                  <Ionicons name="checkmark-circle" size={14} color="#10B981" />
                  <Text style={styles.auditText}>FSSAI 10123028 Validated</Text>
                </View>

                <View style={styles.auditBadge}>
                  <Ionicons name="star" size={14} color="#F59E0B" />
                  <Text style={styles.auditText}>Score: {prod.rating} / 5.0</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
    paddingBottom: 40,
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
  list: {
    gap: 12,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ECECF5',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  textCol: {
    flex: 1,
    marginLeft: 12,
  },
  prodName: {
    fontSize: 15,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  prodCat: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    marginTop: 2,
  },
  auditInfoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F2F1F8',
  },
  auditBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F8F7FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  auditText: {
    fontSize: 11,
    color: HomeBazColors.textSecondary,
    fontWeight: '600',
  },
});
