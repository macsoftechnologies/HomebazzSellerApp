import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { HomeBazColors } from '@/constants/theme';
import { AppImages } from '@/constants/images';

interface LogoProps {
  size?: number;
  showText?: boolean;
  textColor?: string;
  subtitleColor?: string;
  variant?: 'whiteOnPurple' | 'purpleOnWhite' | 'fullImage';
}

export const HomeBazLogo: React.FC<LogoProps> = ({
  size = 64,
  showText = false, // The official logo image already contains the "HomeBazz" brand & tagline!
  variant = 'purpleOnWhite',
}) => {
  const isWhiteBg = variant === 'whiteOnPurple';
  const aspectRatio = 1018 / 792;
  const logoHeight = size;
  const logoWidth = Math.round(logoHeight * aspectRatio);

  if (isWhiteBg) {
    // For purple backgrounds (e.g. Splash): render with luminous white container
    return (
      <View style={styles.splashLogoContainer}>
        <View style={styles.whiteBadge}>
          <Image
            source={AppImages.logoFull}
            style={{ width: logoWidth * 0.95, height: logoHeight * 0.95 }}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.sellerAppPill}>SELLER PARTNER</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={AppImages.logoFull}
        style={{ width: logoWidth, height: logoHeight }}
        resizeMode="contain"
      />
      {showText && (
        <View style={styles.sellerAppBadge}>
          <Text style={styles.sellerAppText}>Partner Dashboard</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashLogoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 10,
  },
  sellerAppPill: {
    marginTop: 14,
    color: '#EDE8FE',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  sellerAppBadge: {
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: HomeBazColors.primarySoft,
    borderRadius: 8,
  },
  sellerAppText: {
    fontSize: 12,
    fontWeight: '700',
    color: HomeBazColors.primary,
  },
});

export default HomeBazLogo;
