import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { HomeBazColors } from '@/constants/theme';

export interface TabOption {
  key: string;
  label: string;
  count?: number;
}

interface TabFilterProps {
  options: TabOption[];
  selectedKey: string;
  onSelect: (key: string) => void;
  scrollable?: boolean;
}

export const TabFilter: React.FC<TabFilterProps> = ({
  options,
  selectedKey,
  onSelect,
  scrollable = false,
}) => {
  const content = options.map((option) => {
    const isSelected = selectedKey === option.key;

    return (
      <TouchableOpacity
        key={option.key}
        onPress={() => onSelect(option.key)}
        activeOpacity={0.75}
        style={[
          styles.tabBase,
          scrollable ? styles.scrollTab : styles.flatTab,
          isSelected && (scrollable ? styles.scrollTabSelected : styles.flatTabSelected),
        ]}
      >
        <Text
          style={[
            styles.tabText,
            isSelected && styles.tabTextSelected,
          ]}
        >
          {option.label}
        </Text>
        {option.count !== undefined ? (
          <View
            style={[
              styles.countBadge,
              isSelected ? styles.countBadgeSelected : styles.countBadgeDefault,
            ]}
          >
            <Text
              style={[
                styles.countText,
                isSelected ? styles.countTextSelected : styles.countTextDefault,
              ]}
            >
              {option.count}
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  });

  if (scrollable) {
    return (
      <View style={styles.scrollWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          style={styles.scrollView}
        >
          {content}
        </ScrollView>
      </View>
    );
  }

  return <View style={styles.container}>{content}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F1F0F7',
    borderRadius: 14,
    padding: 4,
    marginHorizontal: 16,
    marginVertical: 10,
    flexGrow: 0,
    flexShrink: 0,
  },
  scrollWrapper: {
    height: 56,
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: 'center',
  },
  scrollView: {
    flexGrow: 0,
    flexShrink: 0,
    height: 56,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    gap: 10,
    alignItems: 'center',
  },
  tabBase: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  flatTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  flatTabSelected: {
    backgroundColor: HomeBazColors.primary,
    shadowColor: HomeBazColors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollTab: {
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: 21,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#E6E2F5',
    shadowColor: '#1E1B39',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  scrollTabSelected: {
    backgroundColor: '#6C5CE7',
    borderColor: '#6C5CE7',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4B4660',
    includeFontPadding: false,
  },
  tabTextSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBadgeDefault: {
    backgroundColor: '#F0EDFD',
    borderWidth: 1,
    borderColor: '#E4DFFC',
  },
  countBadgeSelected: {
    backgroundColor: '#FFFFFF',
  },
  countText: {
    fontSize: 12,
    fontWeight: '800',
    includeFontPadding: false,
  },
  countTextDefault: {
    color: '#5E4AE3',
  },
  countTextSelected: {
    color: '#6C5CE7',
  },
});
