import React from 'react';
import { ViewStyle } from 'react-native';
import { CircleLoader, ScreenCenterLoader } from './CircleLoader';

export { CircleLoader, ScreenCenterLoader };

export interface MultiColorLoaderProps {
  size?: 'small' | 'medium';
  variant?: 'circle' | 'dots' | 'bar';
  style?: ViewStyle;
}

export const MultiColorLoader: React.FC<MultiColorLoaderProps> = ({
  size = 'small',
  variant = 'circle',
  style,
}) => {
  return <CircleLoader size={size} style={style} />;
};
