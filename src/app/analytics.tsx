import { Header } from '@/components/common/Header';
import { ProductThumbnail } from '@/components/common/ProductThumbnail';
import { TabFilter } from '@/components/common/TabFilter';
import { HomeBazColors } from '@/constants/theme';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AnalyticsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('sales');

  const tabs = [
    { key: 'sales', label: 'Sales' },
    { key: 'orders', label: 'Orders' },
    { key: 'products', label: 'Products' },
  ];

  // SVG-style smoothed bezier path represented cleanly in native view
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Header title="Analytics" showBack />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Metric Segment Filters */}
        <TabFilter
          options={tabs}
          selectedKey={activeTab}
          onSelect={setActiveTab}
        />

        {/* Sales Trend Chart Card */}
        <View style={styles.chartCard}>
          <View style={styles.trendHeader}>
            <View>
              <Text style={styles.trendLabel}>Sales Trend</Text>
              <Text style={styles.trendAmount}>₹72,480</Text>
            </View>
            <View style={styles.trendGrowthBadge}>
              <Text style={styles.trendGrowthText}>▲ +12.5%</Text>
            </View>
          </View>

          {/* Graphical Curved Area Simulation */}
          <View style={styles.graphContainer}>
            {/* Horizontal Grid lines */}
            <View style={styles.gridLine} />
            <View style={styles.gridLine} />
            <View style={styles.gridLine} />

            {/* Gradient Area */}
            <LinearGradient
              colors={['rgba(124, 92, 231, 0.28)', 'rgba(124, 92, 231, 0.02)']}
              style={styles.gradientArea}
            >
              {/* Curve Line Accent */}
              <View style={styles.curveLineTop} />
            </LinearGradient>

            {/* Curve Keypoints */}
            <View style={[styles.dataPoint, { left: '12%', bottom: 45 }]} />
            <View style={[styles.dataPoint, { left: '26%', bottom: 35 }]} />
            <View style={[styles.dataPoint, { left: '42%', bottom: 65 }]} />
            <View style={[styles.dataPoint, { left: '56%', bottom: 50 }]} />
            <View style={[styles.dataPoint, { left: '72%', bottom: 85 }]} />
            <View style={[styles.dataPoint, styles.dataPointActive, { left: '88%', bottom: 78 }]} />
          </View>

          {/* Days Labels Row */}
          <View style={styles.daysRow}>
            {days.map((day, idx) => (
              <Text key={idx} style={styles.dayText}>
                {day}
              </Text>
            ))}
          </View>
        </View>

        {/* Top Selling Products Section */}
        <View style={styles.topSellingSection}>
          <Text style={styles.sectionTitle}>Top Selling Products</Text>

          {MOCK_PRODUCTS.slice(0, 3).map((prod) => (
            <TouchableOpacity
              key={prod.id}
              style={styles.prodItemRow}
              onPress={() =>
                router.push({
                  pathname: '/product-manage/edit-product',
                  params: { id: prod.id },
                })
              }
              activeOpacity={0.75}
            >
              <ProductThumbnail size={48} imageSource={prod.image} />

              <View style={styles.prodDetails}>
                <Text style={styles.prodName}>{prod.name}</Text>
                <Text style={styles.prodOrdersCount}>{prod.ordersCount} orders</Text>
              </View>

              <Ionicons name="chevron-forward" size={18} color="#9B97B0" />
            </TouchableOpacity>
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
  scrollContent: {
    paddingBottom: 30,
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ECECF5',
    marginBottom: 20,
  },
  trendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  trendLabel: {
    fontSize: 13,
    color: HomeBazColors.textSecondary,
    fontWeight: '600',
    marginBottom: 4,
  },
  trendAmount: {
    fontSize: 26,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    letterSpacing: -0.5,
  },
  trendGrowthBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  trendGrowthText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '700',
  },
  graphContainer: {
    height: 140,
    position: 'relative',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginTop: 8,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#F3F2F8',
    top: 30,
  },
  gradientArea: {
    height: 100,
    width: '100%',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  curveLineTop: {
    height: 3,
    backgroundColor: HomeBazColors.primary,
    width: '100%',
    borderRadius: 2,
  },
  dataPoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: HomeBazColors.primary,
  },
  dataPointActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 3,
    backgroundColor: HomeBazColors.primary,
    borderColor: '#FFFFFF',
    elevation: 4,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 6,
  },
  dayText: {
    fontSize: 11,
    color: HomeBazColors.textMuted,
    fontWeight: '600',
  },
  topSellingSection: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
    marginBottom: 12,
  },
  prodItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ECECF5',
    marginBottom: 10,
  },
  prodDetails: {
    flex: 1,
    marginLeft: 14,
  },
  prodName: {
    fontSize: 14,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
    marginBottom: 2,
  },
  prodOrdersCount: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
  },
});
