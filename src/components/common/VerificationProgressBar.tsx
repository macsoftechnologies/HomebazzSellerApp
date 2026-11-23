import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface VerificationProgressBarProps {
  currentStage: number; // 1 to 7
  stageName: string; // e.g. "Identity Verification"
  stageTitle: string; // e.g. "Verify Your Identity"
  stageSubtitle: string; // e.g. "Government issued ID card for KYC..."
  categoryTag?: string; // e.g. "STAGE 1 • GOVERNMENT KYC"
  iconName?: keyof typeof Ionicons.glyphMap;
  accentColor?: string;
  tintBg?: string;
  tintBorder?: string;
}

export const VerificationProgressBar: React.FC<VerificationProgressBarProps> = ({
  currentStage,
  stageName,
  stageTitle,
  stageSubtitle,
  categoryTag,
  iconName = 'shield-checkmark-outline',
  accentColor = '#6C5CE7',
  tintBg = '#F3EFFF',
  tintBorder = '#DDD6FE',
}) => {
  const totalStages = 7;
  const progressPercent = Math.round((currentStage / totalStages) * 100);

  return (
    <View style={styles.container}>
      {/* ======================================================== */}
      {/* 1. TOP MOVING 7-STAGE PROGRESS BAR (1 TO 7)             */}
      {/* ======================================================== */}
      <View style={styles.ribbonCard}>
        {/* Stage Status Text Row */}
        <View style={styles.ribbonHeaderRow}>
          <View style={styles.ribbonLeftGroup}>
            <View style={[styles.activeDotPill, { backgroundColor: accentColor }]} />
            <Text style={[styles.ribbonStageText, { color: accentColor }]}>
              STAGE {currentStage} OF 7 • {stageName.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.ribbonPercentText}>{progressPercent}% Complete</Text>
        </View>

        {/* 7-Segment Step Indicator Track (1 to 7) */}
        <View style={styles.segmentsRow}>
          {Array.from({ length: totalStages }, (_, i) => i + 1).map((stepNum) => {
            const isCompleted = stepNum < currentStage;
            const isCurrent = stepNum === currentStage;

            return (
              <View
                key={stepNum}
                style={[
                  styles.segmentItem,
                  isCompleted && styles.segmentCompleted,
                  isCurrent && [styles.segmentCurrent, { borderColor: accentColor, backgroundColor: accentColor }],
                ]}
              >
                {isCompleted ? (
                  <Ionicons name="checkmark" size={11} color="#FFFFFF" />
                ) : (
                  <Text
                    style={[
                      styles.segmentNumberText,
                      isCurrent && styles.segmentNumberTextCurrent,
                    ]}
                  >
                    {stepNum}
                  </Text>
                )}
              </View>
            );
          })}
        </View>

        {/* Continuous Fill Track */}
        <View style={styles.trackBackground}>
          <View
            style={[
              styles.trackFill,
              {
                width: `${progressPercent}%`,
                backgroundColor: accentColor,
              },
            ]}
          />
        </View>
      </View>

      {/* ======================================================== */}
      {/* 2. HIGHLIGHTED HERO HEADING CARD WITH ACCENT BACKGROUND */}
      {/* ======================================================== */}
      <View
        style={[
          styles.heroHeadingCard,
          {
            backgroundColor: tintBg,
            borderColor: tintBorder,
            borderLeftColor: accentColor,
          },
        ]}
      >
        <View style={styles.heroHeadingRow}>
          {/* Left Squircle Icon Badge */}
          <View style={[styles.heroIconSquircle, { backgroundColor: '#FFFFFF', borderColor: tintBorder }]}>
            <Ionicons name={iconName} size={20} color={accentColor} />
          </View>

          {/* Heading & Subtitle Column */}
          <View style={styles.heroTextCol}>
            <View style={[styles.categoryTagPill, { backgroundColor: '#FFFFFF' }]}>
              <View style={[styles.tagBullet, { backgroundColor: accentColor }]} />
              <Text style={[styles.categoryTagText, { color: accentColor }]}>
                {categoryTag || `STAGE ${currentStage} • VERIFICATION`}
              </Text>
            </View>

            <Text style={styles.heroTitle}>{stageTitle}</Text>
            <Text style={styles.heroSubtitle}>{stageSubtitle}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 4,
  },

  // 7-Stage Ribbon Card
  ribbonCard: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ECE7F8',
    marginBottom: 12,
  },
  ribbonHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ribbonLeftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activeDotPill: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  ribbonStageText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  ribbonPercentText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#716C8A',
  },

  // 7-Segment Step Row (1 to 7)
  segmentsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  segmentItem: {
    flex: 1,
    height: 22,
    borderRadius: 7,
    backgroundColor: '#F1EFF8',
    borderWidth: 1,
    borderColor: '#E5E2F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentCompleted: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  segmentCurrent: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentNumberText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#8A85A3',
  },
  segmentNumberTextCurrent: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  // Continuous Track
  trackBackground: {
    height: 3.5,
    borderRadius: 2,
    backgroundColor: '#EAE6F5',
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    borderRadius: 2,
  },

  // Highlighted Hero Heading Card
  heroHeadingCard: {
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderLeftWidth: 4.5,
    marginBottom: 14,
    shadowColor: '#1A103C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  heroHeadingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  heroIconSquircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  heroTextCol: {
    flex: 1,
  },
  categoryTagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 4,
  },
  tagBullet: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  categoryTagText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E1B39',
    marginBottom: 3,
  },
  heroSubtitle: {
    fontSize: 12,
    color: '#55516E',
    lineHeight: 17,
  },
});
