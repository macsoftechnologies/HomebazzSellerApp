import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type StatusType =
  | 'New'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'
  | 'In Stock'
  | 'Low Stock'
  | 'Out of Stock'
  | 'Active'
  | 'Inactive'
  | 'Approved'
  | 'Pending';

interface StatusBadgeProps {
  status: StatusType | string;
  size?: 'small' | 'medium';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'small' }) => {
  let bgColor = '#EFF6FF';
  let textColor = '#3B82F6';

  switch (status) {
    case 'New':
      bgColor = '#EAF7EE';
      textColor = '#16A34A';
      break;
    case 'Processing':
      bgColor = '#EFF6FF';
      textColor = '#2563EB';
      break;
    case 'Packed':
      bgColor = '#F3E8FF';
      textColor = '#7C3AED';
      break;
    case 'Shipped':
      bgColor = '#ECFDF5';
      textColor = '#059669';
      break;
    case 'Delivered':
    case 'Approved':
    case 'Active':
      bgColor = '#EAF7EE';
      textColor = '#16A34A';
      break;
    case 'In Stock':
      bgColor = '#EAF7EE';
      textColor = '#16A34A';
      break;
    case 'Low Stock':
    case 'Pending':
      bgColor = '#FEF3C7';
      textColor = '#D97706';
      break;
    case 'Out of Stock':
    case 'Cancelled':
    case 'Inactive':
      bgColor = '#FEE2E2';
      textColor = '#DC2626';
      break;
    default:
      bgColor = '#F3F4F6';
      textColor = '#4B5563';
  }

  const isSmall = size === 'small';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: bgColor,
          paddingHorizontal: isSmall ? 8 : 12,
          paddingVertical: isSmall ? 3 : 5,
          borderRadius: isSmall ? 10 : 14,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: textColor,
            fontSize: isSmall ? 11 : 13,
          },
        ]}
      >
        {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});

