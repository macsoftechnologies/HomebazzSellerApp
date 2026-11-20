import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { AppImages } from '@/constants/images';

interface ProductThumbnailProps {
  size?: number;
  imageSource?: any;
  productType?: 'gongura' | 'mango' | 'lemon' | 'tomato' | 'avakaya' | 'podi';
}

export const ProductThumbnail: React.FC<ProductThumbnailProps> = ({
  size = 46,
  imageSource,
  productType = 'gongura',
}) => {
  const getDefaultImage = () => {
    switch (productType) {
      case 'avakaya':
        return AppImages.pickleAvakaya || AppImages.food1;
      case 'mango':
        return AppImages.food2 || AppImages.pickleAvakaya;
      case 'lemon':
        return AppImages.food3;
      case 'tomato':
        return AppImages.food4;
      case 'podi':
        return AppImages.spicesPodi;
      case 'gongura':
      default:
        return AppImages.pickleGongura || AppImages.food1;
    }
  };

  const resolvedSource = imageSource || getDefaultImage();

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size * 0.22,
        },
      ]}
    >
      <Image
        source={resolvedSource}
        style={[
          styles.image,
          {
            width: size,
            height: size,
            borderRadius: size * 0.22,
          },
        ]}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F4FA',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EAE7F4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
