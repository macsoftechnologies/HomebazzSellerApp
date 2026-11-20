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
import { LinearGradient } from 'expo-linear-gradient';
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';
import { VERIFICATION_STAGES } from '@/data/mockData';

export default function VerificationStatusScreen() {
  const router = useRouter();

  const badges = [
    { title: 'Verified Maker', icon: 'shield-checkmark', color: '#10B981', bg: '#ECFDF5' },
    { title: 'HomeBaz Quality', icon: 'star', color: '#F59E0B', bg: '#FEF3C7' },
    { title: 'Traditional Recipe', icon: 'sparkles', color: '#8B5CF6', bg: '#F3E8FF' },
    { title: 'FSSAI Compliant', icon: 'checkmark-circle', color: '#3B82F6', bg: '#EFF6FF' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Verification Status" showBack />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Quality Score Hero Card */}
        <LinearGradient
          colors={['#7C5CE7', '#5328BE']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.scoreRow}>
            <View>
              <Text style={styles.scoreLabel}>HomeBaz Quality Score</Text>
              <View style={styles.scoreValueRow}>
                <Text style={styles.scoreNumber}>4.8</Text>
                <Text style={styles.scoreMax}> / 5.0</Text>
              </View>
              <Text style={styles.statusLiveBadge}>● Storefront Active & Approved</Text>
            </View>

            <View style={styles.medalCircle}>
              <Ionicons name="ribbon" size={36} color="#FDE047" />
            </View>
          </View>
        </LinearGradient>

        {/* 4 Trust Badges Row (from PDF Section 9) */}
        <View style={styles.badgesSection}>
          <Text style={styles.sectionHeading}>Earned HomeBaz Trust Badges</Text>
          <View style={styles.badgesGrid}>
            {badges.map((badge, idx) => (
              <View key={idx} style={[styles.badgeItem, { backgroundColor: badge.bg }]}>
                <Ionicons name={badge.icon as any} size={18} color={badge.color} />
                <Text style={[styles.badgeText, { color: badge.color }]}>{badge.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 7-Stage Verification Roadmap (from PDF Section 11) */}
        <View style={styles.stagesCard}>
          <Text style={styles.sectionHeading}>7-Stage Verification Roadmap</Text>

          {VERIFICATION_STAGES.map((stage, index) => {
            const isLast = index === VERIFICATION_STAGES.length - 1;

            return (
              <View key={stage.id} style={styles.stageRow}>
                <View style={styles.timelineCol}>
                  <View style={styles.stageCheckCircle}>
                    <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                  </View>
                  {!isLast && <View style={styles.timelineConnector} />}
                </View>

                <View style={styles.stageContent}>
                  <View style={styles.stageTitleRow}>
                    <Text style={styles.stageTitle}>{stage.title}</Text>
                    <Text style={styles.stageDate}>{stage.date}</Text>
                  </View>
                  <Text style={styles.stageDesc}>{stage.description}</Text>
                </View>
              </View>
            );
          })}
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
  heroCard: {
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    shadowColor: HomeBazColors.primaryDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 13,
    color: '#E0D7FA',
    fontWeight: '600',
    marginBottom: 4,
  },
  scoreValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  scoreNumber: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  scoreMax: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D4C8FA',
  },
  statusLiveBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: '#A7F3D0',
  },
  medalCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgesSection: {
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    marginBottom: 12,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  stagesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#ECECF5',
  },
  stageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineCol: {
    alignItems: 'center',
    width: 28,
  },
  stageCheckCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineConnector: {
    width: 2,
    height: 38,
    backgroundColor: '#A7F3D0',
    marginVertical: 3,
  },
  stageContent: {
    flex: 1,
    marginLeft: 10,
    marginBottom: 16,
  },
  stageTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  stageTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  stageDate: {
    fontSize: 10,
    color: HomeBazColors.textSecondary,
    fontWeight: '500',
  },
  stageDesc: {
    fontSize: 11,
    color: HomeBazColors.textSecondary,
    lineHeight: 16,
  },
});
