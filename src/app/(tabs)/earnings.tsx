import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeBazColors } from '@/constants/theme';
import { ScreenCenterLoader } from '@/components/common/CircleLoader';
import { MOCK_PAYOUTS, SELLER_PROFILE } from '@/data/mockData';

interface ChartPoint {
  label: string;
  value: number;
  display: string;
  orders: number;
}

const WEEKLY_DATA: ChartPoint[] = [
  { label: 'Mon', value: 6200, display: '₹6.2k', orders: 11 },
  { label: 'Tue', value: 8400, display: '₹8.4k', orders: 14 },
  { label: 'Wed', value: 5900, display: '₹5.9k', orders: 9 },
  { label: 'Thu', value: 11200, display: '₹11.2k', orders: 18 },
  { label: 'Fri', value: 9100, display: '₹9.1k', orders: 15 },
  { label: 'Sat', value: 16400, display: '₹16.4k', orders: 26 },
  { label: 'Sun', value: 15200, display: '₹15.2k', orders: 24 },
];

const MONTHLY_DATA: ChartPoint[] = [
  { label: 'Jun', value: 38500, display: '₹38.5k', orders: 62 },
  { label: 'Jul', value: 44200, display: '₹44.2k', orders: 71 },
  { label: 'Aug', value: 51000, display: '₹51.0k', orders: 84 },
  { label: 'Sep', value: 59800, display: '₹59.8k', orders: 96 },
  { label: 'Oct', value: 68400, display: '₹68.4k', orders: 108 },
  { label: 'Nov', value: 72480, display: '₹72.5k', orders: 117 },
];

export default function EarningsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [timeframe, setTimeframe] = useState<'Weekly' | 'Monthly'>('Weekly');
  const [selectedBarIndex, setSelectedBarIndex] = useState<number>(5); // Default to peak day (Sat)
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 850);
  }, []);
  const [statementModalVisible, setStatementModalVisible] = useState(false);

  // Moving ambient gradient animation using logo colors (light mode)
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [shimmerAnim]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  // When timeframe switches, reset selected bar to peak
  const handleTimeframeChange = (newTimeframe: 'Weekly' | 'Monthly') => {
    setTimeframe(newTimeframe);
    setSelectedBarIndex(newTimeframe === 'Weekly' ? 5 : 5);
  };

  const activeData = timeframe === 'Weekly' ? WEEKLY_DATA : MONTHLY_DATA;
  const maxValue = Math.max(...activeData.map((d) => d.value));
  const selectedItem = activeData[selectedBarIndex] || activeData[activeData.length - 1];

  const handleDownloadStatement = (type: string) => {
    setStatementModalVisible(false);
    setTimeout(() => {
      Alert.alert(
        'Statement Generated',
        `Your ${type} has been securely prepared and downloaded. You can view or share the official PDF.`
      );
    }, 300);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Moving Ambient Gradient Background (Logo Colors, Light Mode, No Balls) */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.movingAuraContainer,
          {
            transform: [
              {
                translateX: shimmerAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-40, 40],
                }),
              },
            ],
            opacity: shimmerAnim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.7, 0.95, 0.7],
            }),
          },
        ]}
      >
        <LinearGradient
          colors={[
            'rgba(108, 92, 231, 0.12)',
            'rgba(162, 155, 254, 0.16)',
            'rgba(237, 234, 251, 0.22)',
            'transparent',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.movingAuraGradient}
        />
      </Animated.View>

      {/* Header with Safe Area Clearance */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 14) }]}>
        <View>
          <Text style={styles.headerTitle}>Earnings</Text>
          <View style={styles.storeSubRow}>
            <View style={styles.greenPulseDot} />
            <Text style={styles.storeSubText}>{SELLER_PROFILE.storeName} • HDFC •••• 8912</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.downloadIconBtn}
          onPress={() => setStatementModalVisible(true)}
          activeOpacity={0.75}
        >
          <Ionicons name="document-text-outline" size={19} color="#6C5CE7" />
          <Text style={styles.downloadBtnLabel}>Statement</Text>
        </TouchableOpacity>
      </View>

      {/* Screen Center Loader / Content */}
      {isLoading ? (
        <ScreenCenterLoader size="small" />
      ) : (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#6C5CE7"
              colors={['#6C5CE7', '#8A65F2']}
            />
          }
        >
          {/* Hero Financial Gradient Card */}
          <LinearGradient
            colors={['#6C5CE7', '#5343D2', '#3D2EB8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroEarningsCard}
          >
            {/* Soft decorative background circles */}
            <View style={styles.heroDecoCircle1} />
            <View style={styles.heroDecoCircle2} />

            {/* Top Row: Label + Next Payout Pill */}
            <View style={styles.heroTopRow}>
              <View style={styles.heroLabelPill}>
                <Ionicons name="wallet" size={13} color="#FFFFFF" />
                <Text style={styles.heroLabelText}>NET SELLER EARNINGS</Text>
              </View>

              <View style={styles.payoutCountdownPill}>
                <Ionicons name="time-outline" size={12} color="#E0D7FA" />
                <Text style={styles.payoutCountdownText}>Payout: Wed, Nov 26</Text>
              </View>
            </View>

            {/* Middle Row: Big Amount + Growth Pill */}
            <View style={styles.heroAmountRow}>
              <View>
                <Text style={styles.heroAmountValue}>₹72,480</Text>
                <View style={styles.growthRow}>
                  <View style={styles.growthBadge}>
                    <Ionicons name="trending-up" size={13} color="#059669" />
                    <Text style={styles.growthBadgeText}>+14.8% vs last week</Text>
                  </View>
                  <Text style={styles.ordersCoveredText}>117 Delivered Orders</Text>
                </View>
              </View>

              <View style={styles.heroWalletIconBox}>
                <Ionicons name="cash-outline" size={28} color="#FFFFFF" />
              </View>
            </View>

            {/* Bottom Glass Row: Current Cycle & Verified Bank */}
            <View style={styles.heroBottomGlassStrip}>
              <View style={styles.heroGlassCol}>
                <Text style={styles.heroGlassLabel}>Upcoming Settlement</Text>
                <Text style={styles.heroGlassValue}>₹14,250</Text>
              </View>

              <View style={styles.heroGlassDivider} />

              <View style={styles.heroGlassCol}>
                <Text style={styles.heroGlassLabel}>Direct Bank Credit</Text>
                <View style={styles.bankVerifyInline}>
                  <Ionicons name="checkmark-circle" size={13} color="#10B981" />
                  <Text style={styles.heroGlassValueBank}>HDFC •••• 8912</Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Quick Financial Health 4-Grid Cards */}
          <View style={styles.statsGrid}>
            <View style={styles.statMiniCard}>
              <View style={[styles.statIconBox, { backgroundColor: '#F3EFFF' }]}>
                <Ionicons name="cart-outline" size={16} color="#6C5CE7" />
              </View>
              <Text style={styles.statMiniLabel}>Gross Revenue</Text>
              <Text style={styles.statMiniValue}>₹82,400</Text>
              <Text style={styles.statMiniSub}>117 Total Orders</Text>
            </View>

            <View style={styles.statMiniCard}>
              <View style={[styles.statIconBox, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="business-outline" size={16} color="#D97706" />
              </View>
              <Text style={styles.statMiniLabel}>Platform Fee (10%)</Text>
              <Text style={styles.statMiniValue}>- ₹8,240</Text>
              <Text style={styles.statMiniSub}>HomeBaz Support</Text>
            </View>

            <View style={styles.statMiniCard}>
              <View style={[styles.statIconBox, { backgroundColor: '#EFF6FF' }]}>
                <Ionicons name="receipt-outline" size={16} color="#2563EB" />
              </View>
              <Text style={styles.statMiniLabel}>Taxes (GST 18%)</Text>
              <Text style={styles.statMiniValue}>- ₹1,680</Text>
              <Text style={styles.statMiniSub}>Auto-Compliant</Text>
            </View>

            <View style={styles.statMiniCard}>
              <View style={[styles.statIconBox, { backgroundColor: '#ECFDF5' }]}>
                <Ionicons name="shield-checkmark-outline" size={16} color="#059669" />
              </View>
              <Text style={styles.statMiniLabel}>Net Bank Credit</Text>
              <Text style={[styles.statMiniValue, { color: '#059669' }]}>₹72,480</Text>
              <Text style={styles.statMiniSub}>88% Seller Margin</Text>
            </View>
          </View>

          {/* Revenue Analytics & Interactive Chart Section */}
          <View style={styles.chartCard}>
            {/* Chart Header Row with Segmented Buttons */}
            <View style={styles.chartHeader}>
              <View>
                <Text style={styles.chartTitle}>Revenue Overview</Text>
                <Text style={styles.chartSubtitle}>
                  Tap any bar to inspect daily orders & volume
                </Text>
              </View>

              <View style={styles.segmentedToggle}>
                <TouchableOpacity
                  style={[
                    styles.segmentBtn,
                    timeframe === 'Weekly' && styles.segmentBtnActive,
                  ]}
                  onPress={() => handleTimeframeChange('Weekly')}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.segmentBtnText,
                      timeframe === 'Weekly' && styles.segmentBtnTextActive,
                    ]}
                  >
                    7 Days
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.segmentBtn,
                    timeframe === 'Monthly' && styles.segmentBtnActive,
                  ]}
                  onPress={() => handleTimeframeChange('Monthly')}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.segmentBtnText,
                      timeframe === 'Monthly' && styles.segmentBtnTextActive,
                    ]}
                  >
                    6 Months
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Active Selected Day/Month Callout Pill */}
            <View style={styles.activeCalloutBanner}>
              <View style={styles.calloutLeft}>
                <View style={styles.calloutDayBadge}>
                  <Text style={styles.calloutDayText}>{selectedItem.label}</Text>
                </View>
                <View>
                  <Text style={styles.calloutAmountText}>{selectedItem.display}</Text>
                  <Text style={styles.calloutOrdersText}>
                    {selectedItem.orders} Completed Deliveries
                  </Text>
                </View>
              </View>

              <View style={styles.calloutPeakBadge}>
                <Ionicons name="sparkles" size={12} color="#D97706" />
                <Text style={styles.calloutPeakText}>
                  {timeframe === 'Weekly' ? 'Peak Day: Sat' : 'Highest: Nov'}
                </Text>
              </View>
            </View>

            {/* Chart Grid Lines and Bars */}
            <View style={styles.chartAreaWrapper}>
              {/* Background Reference Grid Lines */}
              <View style={styles.gridLinesContainer} pointerEvents="none">
                <View style={styles.gridLineRow}>
                  <Text style={styles.gridValueLabel}>
                    {timeframe === 'Weekly' ? '₹16k' : '₹75k'}
                  </Text>
                  <View style={styles.gridDashLine} />
                </View>
                <View style={styles.gridLineRow}>
                  <Text style={styles.gridValueLabel}>
                    {timeframe === 'Weekly' ? '₹8k' : '₹40k'}
                  </Text>
                  <View style={styles.gridDashLine} />
                </View>
                <View style={styles.gridLineRow}>
                  <Text style={styles.gridValueLabel}>₹0</Text>
                  <View style={styles.gridSolidBase} />
                </View>
              </View>

              {/* Interactive Bars */}
              <View style={styles.barsRow}>
                {activeData.map((item, index) => {
                  const isSelected = selectedBarIndex === index;
                  const barHeight = Math.max(16, (item.value / maxValue) * 115);

                  return (
                    <TouchableOpacity
                      key={`${item.label}-${index}`}
                      style={styles.barColTouchable}
                      onPress={() => setSelectedBarIndex(index)}
                      activeOpacity={0.85}
                    >
                      {/* Floating Tooltip Indicator for Selected Bar */}
                      {isSelected ? (
                        <View style={styles.barTooltip}>
                          <Text style={styles.barTooltipText}>{item.display}</Text>
                          <View style={styles.tooltipArrow} />
                        </View>
                      ) : (
                        <View style={styles.barTooltipPlaceholder} />
                      )}

                      {/* Bar Track & Fill */}
                      <View style={styles.barTrack}>
                        <LinearGradient
                          colors={
                            isSelected
                              ? ['#6C5CE7', '#A29BFE']
                              : ['#DDD8F8', '#ECE7FB']
                          }
                          start={{ x: 0, y: 0 }}
                          end={{ x: 0, y: 1 }}
                          style={[
                            styles.barFill,
                            { height: barHeight },
                            isSelected && styles.barFillSelected,
                          ]}
                        />
                      </View>

                      {/* Day / Month Label */}
                      <Text
                        style={[
                          styles.barBottomLabel,
                          isSelected && styles.barBottomLabelSelected,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>

          {/* Recent Payout Settlements Section */}
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionHeaderTitle}>Settled Payouts</Text>
              <Text style={styles.sectionHeaderSub}>Direct NEFT credits to HDFC Bank</Text>
            </View>

            <TouchableOpacity
              onPress={() => router.push('/business/payout-history')}
              activeOpacity={0.7}
              style={styles.viewAllBtn}
            >
              <Text style={styles.viewAllText}>View All ({MOCK_PAYOUTS.length})</Text>
              <Ionicons name="chevron-forward" size={13} color="#6C5CE7" />
            </TouchableOpacity>
          </View>

          {/* Recent Payout Cards (Top 2 items) */}
          {MOCK_PAYOUTS.slice(0, 2).map((payout) => (
            <View key={payout.id} style={styles.payoutCard}>
              {/* Left Logo Stripe */}
              <LinearGradient
                colors={['#10B981', '#34D399']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.payoutStripe}
              />

              <View style={styles.payoutCardInner}>
                <View style={styles.payoutCardTop}>
                  <View>
                    <View style={styles.payoutAmountRow}>
                      <Text style={styles.payoutAmountText}>
                        ₹{payout.amount.toLocaleString('en-IN')}
                      </Text>
                      <View style={styles.payoutStatusPill}>
                        <Ionicons name="checkmark-circle" size={12} color="#059669" />
                        <Text style={styles.payoutStatusText}>{payout.status}</Text>
                      </View>
                    </View>
                    <Text style={styles.payoutPeriodText}>{payout.period}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.invoiceSmallBtn}
                    onPress={() =>
                      Alert.alert(
                        'Tax Invoice PDF',
                        `Downloading official settlement invoice for ${payout.period} (UTR: ${payout.utrNumber})`
                      )
                    }
                    activeOpacity={0.7}
                  >
                    <Ionicons name="download-outline" size={14} color="#6C5CE7" />
                    <Text style={styles.invoiceSmallBtnText}>Invoice</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.payoutCardBottom}>
                  <View style={styles.payoutMetaItem}>
                    <Ionicons name="receipt-outline" size={13} color="#8F8AA6" />
                    <Text style={styles.payoutMetaText}>
                      {payout.ordersCovered} Orders Settled
                    </Text>
                  </View>

                  <View style={styles.payoutMetaItem}>
                    <Ionicons name="card-outline" size={13} color="#8F8AA6" />
                    <Text style={styles.payoutMetaText}>{payout.utrNumber}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}

          {/* Settlement Transparency & Navigation Links */}
          <View style={styles.navSection}>
            <TouchableOpacity
              style={styles.navActionCard}
              onPress={() => router.push('/business/settlement-details')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#FFFFFF', '#FAF8FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.navActionGradient}
              >
                <View style={[styles.navActionIconBox, { backgroundColor: '#F3EFFF' }]}>
                  <Ionicons name="pie-chart-outline" size={20} color="#6C5CE7" />
                </View>
                <View style={styles.navActionTextCol}>
                  <Text style={styles.navActionTitle}>Settlement Breakdown & Fee Policy</Text>
                  <Text style={styles.navActionDesc}>
                    Itemized view of commission, GST, and net profit per order
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#9B97B0" />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navActionCard}
              onPress={() => router.push('/business/payout-history')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#FFFFFF', '#FAF8FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.navActionGradient}
              >
                <View style={[styles.navActionIconBox, { backgroundColor: '#ECFDF5' }]}>
                  <Ionicons name="time-outline" size={20} color="#059669" />
                </View>
                <View style={styles.navActionTextCol}>
                  <Text style={styles.navActionTitle}>Full Historical Payout Archives</Text>
                  <Text style={styles.navActionDesc}>
                    Complete log of all bank transfers and UTR references
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#9B97B0" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Settlement Cycle Notice Banner */}
          <View style={styles.cycleNoticeBox}>
            <View style={styles.cycleNoticeIconWrap}>
              <Ionicons name="calendar-outline" size={20} color="#6C5CE7" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cycleNoticeTitle}>Weekly Auto-Settlement Cycle</Text>
              <Text style={styles.cycleNoticeDesc}>
                Orders delivered Monday 00:00 to Sunday 23:59 are verified and deposited directly to your HDFC bank account every Wednesday by 11:00 AM.
              </Text>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Download Statement Sheet Modal */}
      <Modal
        visible={statementModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setStatementModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setStatementModalVisible(false)}
        >
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Download Financial Statements</Text>
            <Text style={styles.modalSubtitle}>
              Export official signed statements for taxation and accounting.
            </Text>

            <TouchableOpacity
              style={styles.statementOptionCard}
              onPress={() => handleDownloadStatement('Last 30 Days Statement (PDF)')}
              activeOpacity={0.75}
            >
              <View style={styles.statementIconBox}>
                <Ionicons name="document-text" size={20} color="#6C5CE7" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.statementOptionTitle}>Last 30 Days Activity</Text>
                <Text style={styles.statementOptionDesc}>Summary of delivered orders & net credits</Text>
              </View>
              <Ionicons name="download-outline" size={18} color="#6C5CE7" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.statementOptionCard}
              onPress={() => handleDownloadStatement('Quarterly Statement Q3 2026 (Excel/CSV)')}
              activeOpacity={0.75}
            >
              <View style={[styles.statementIconBox, { backgroundColor: '#ECFDF5' }]}>
                <Ionicons name="grid-outline" size={20} color="#059669" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.statementOptionTitle}>Quarterly Statement Q3 (CSV/Excel)</Text>
                <Text style={styles.statementOptionDesc}>Itemized spreadsheet with all deductions</Text>
              </View>
              <Ionicons name="download-outline" size={18} color="#059669" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.statementOptionCard}
              onPress={() => handleDownloadStatement('Annual GST & Tax Summary FY 2026-27')}
              activeOpacity={0.75}
            >
              <View style={[styles.statementIconBox, { backgroundColor: '#EFF6FF' }]}>
                <Ionicons name="shield-checkmark" size={20} color="#2563EB" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.statementOptionTitle}>Annual GST Certificate (FY 26-27)</Text>
                <Text style={styles.statementOptionDesc}>Official tax invoice ready for CA filing</Text>
              </View>
              <Ionicons name="download-outline" size={18} color="#2563EB" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCancelBtn}
              onPress={() => setStatementModalVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 12,
    paddingBottom: 36,
  },
  movingAuraContainer: {
    position: 'absolute',
    top: 0,
    left: -50,
    right: -50,
    height: 280,
  },
  movingAuraGradient: {
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0EFF6',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    letterSpacing: -0.4,
  },
  storeSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 6,
  },
  greenPulseDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  storeSubText: {
    fontSize: 12,
    color: '#716C8A',
    fontWeight: '600',
  },
  downloadIconBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: '#F3EFFF',
    borderWidth: 1,
    borderColor: '#E6E0F8',
  },
  downloadBtnLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C5CE7',
  },

  /* Hero Card */
  heroEarningsCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#4A35A8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 7,
  },
  heroDecoCircle1: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  heroDecoCircle2: {
    position: 'absolute',
    bottom: -30,
    left: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  heroLabelPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  heroLabelText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  payoutCountdownPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  payoutCountdownText: {
    color: '#EDE8FF',
    fontSize: 11,
    fontWeight: '600',
  },
  heroAmountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  heroAmountValue: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -0.8,
    marginBottom: 6,
  },
  growthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  growthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  growthBadgeText: {
    color: '#059669',
    fontSize: 11,
    fontWeight: '700',
  },
  ordersCoveredText: {
    color: '#DDD7F6',
    fontSize: 12,
    fontWeight: '600',
  },
  heroWalletIconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroBottomGlassStrip: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  heroGlassCol: {
    flex: 1,
  },
  heroGlassDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    marginHorizontal: 12,
  },
  heroGlassLabel: {
    color: '#D8D0F5',
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 3,
  },
  heroGlassValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  bankVerifyInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heroGlassValueBank: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  /* 4-Grid Financial Stats */
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  statMiniCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ECEAF4',
    shadowColor: '#1F1A3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  statIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statMiniLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#716C8A',
    marginBottom: 4,
  },
  statMiniValue: {
    fontSize: 16,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  statMiniSub: {
    fontSize: 10,
    color: '#9E9AB0',
    fontWeight: '500',
  },

  /* Chart Card */
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.2,
    borderColor: '#ECEAF4',
    marginBottom: 18,
    shadowColor: '#1F1A3A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
  },
  chartSubtitle: {
    fontSize: 11,
    color: '#8C88A2',
    marginTop: 2,
  },
  segmentedToggle: {
    flexDirection: 'row',
    backgroundColor: '#F1EFF8',
    borderRadius: 10,
    padding: 3,
  },
  segmentBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  segmentBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#716C8A',
  },
  segmentBtnTextActive: {
    color: '#6C5CE7',
    fontWeight: '800',
  },

  /* Active Callout Banner */
  activeCalloutBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F6FE',
    borderWidth: 1,
    borderColor: '#ECE5FD',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginBottom: 16,
  },
  calloutLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  calloutDayBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#6C5CE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calloutDayText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
  calloutAmountText: {
    fontSize: 16,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
  },
  calloutOrdersText: {
    fontSize: 11,
    color: '#716C8A',
    fontWeight: '500',
  },
  calloutPeakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  calloutPeakText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#B45309',
  },

  /* Chart Layout & Bars */
  chartAreaWrapper: {
    height: 170,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  gridLinesContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 25,
    bottom: 22,
    justifyContent: 'space-between',
  },
  gridLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridValueLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#B4B0C7',
    width: 32,
  },
  gridDashLine: {
    flex: 1,
    height: 1,
    borderWidth: 0.5,
    borderColor: '#EFEBF6',
    borderStyle: 'dashed',
  },
  gridSolidBase: {
    flex: 1,
    height: 1,
    backgroundColor: '#E8E5F2',
  },
  barsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
    paddingLeft: 34,
    paddingRight: 6,
  },
  barColTouchable: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  barTooltip: {
    backgroundColor: '#1E1B39',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    marginBottom: 4,
    alignItems: 'center',
  },
  barTooltipText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  tooltipArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#1E1B39',
  },
  barTooltipPlaceholder: {
    height: 19,
  },
  barTrack: {
    height: 115,
    width: 22,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  barFill: {
    width: 16,
    borderRadius: 8,
  },
  barFillSelected: {
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 3,
  },
  barBottomLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9E9AB0',
    marginTop: 6,
  },
  barBottomLabelSelected: {
    color: '#6C5CE7',
    fontWeight: '800',
  },

  /* Section Header */
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
  },
  sectionHeaderSub: {
    fontSize: 12,
    color: '#8C88A2',
    marginTop: 1,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C5CE7',
  },

  /* Payout Cards */
  payoutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1.2,
    borderColor: '#ECEAF4',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#1F1A3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  payoutStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3.5,
  },
  payoutCardInner: {
    padding: 14,
    paddingLeft: 16,
  },
  payoutCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F2FA',
  },
  payoutAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 3,
  },
  payoutAmountText: {
    fontSize: 18,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    letterSpacing: -0.3,
  },
  payoutStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  payoutStatusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  payoutPeriodText: {
    fontSize: 12,
    color: '#716C8A',
    fontWeight: '500',
  },
  invoiceSmallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F3EFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E6E0F8',
  },
  invoiceSmallBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6C5CE7',
  },
  payoutCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  payoutMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  payoutMetaText: {
    fontSize: 11,
    color: '#716C8A',
    fontWeight: '600',
  },

  /* Navigation Action Cards */
  navSection: {
    marginTop: 6,
    marginBottom: 16,
    gap: 10,
  },
  navActionCard: {
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ECEAF4',
    shadowColor: '#1F1A3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  navActionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  navActionIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  navActionTextCol: {
    flex: 1,
    marginRight: 8,
  },
  navActionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
    marginBottom: 2,
  },
  navActionDesc: {
    fontSize: 11,
    color: '#8C88A2',
    lineHeight: 15,
  },

  /* Weekly Settlement Cycle Notice */
  cycleNoticeBox: {
    flexDirection: 'row',
    backgroundColor: '#F6F4FD',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E9E3FA',
    alignItems: 'flex-start',
    gap: 12,
  },
  cycleNoticeIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cycleNoticeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4B3AA8',
    marginBottom: 3,
  },
  cycleNoticeDesc: {
    fontSize: 11,
    color: '#6F669B',
    lineHeight: 16,
  },

  /* Statement Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 12, 35, 0.55)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 34,
  },
  modalHandle: {
    width: 44,
    height: 4,
    backgroundColor: '#DFDCED',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#716C8A',
    marginBottom: 18,
  },
  statementOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#F9F8FD',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EBE7F7',
    marginBottom: 10,
    gap: 12,
  },
  statementIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F3EFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statementOptionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
    marginBottom: 2,
  },
  statementOptionDesc: {
    fontSize: 11,
    color: '#8C88A2',
  },
  modalCancelBtn: {
    marginTop: 6,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#F3F2F8',
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4B4660',
  },
});
