import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';

export default function TermsConditionsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Terms & Policies" showBack />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.agreementHeader}>
          <Ionicons name="document-text" size={32} color={HomeBazColors.primary} />
          <Text style={styles.title}>HomeBaz Partner Agreement</Text>
          <Text style={styles.subTitle}>Last updated: November 2026 • Visakhapatnam Hub</Text>
        </View>

        <View style={styles.clauseCard}>
          <Text style={styles.clauseTitle}>1. Commission & Fee Policy</Text>
          <Text style={styles.clauseBody}>
            HomeBaz charges a fixed 10% platform commission on completed customer deliveries. There are zero listing fees, zero setup charges, and zero hidden platform maintenance costs.
          </Text>

          <Text style={styles.clauseTitle}>2. Food Safety & FSSAI Standards</Text>
          <Text style={styles.clauseBody}>
            Home cooks must comply with basic FSSAI domestic kitchen hygiene regulations. Food items must be prepared with clean potable water, natural ingredients, and packaged in food-grade airtight containers.
          </Text>

          <Text style={styles.clauseTitle}>3. Weekly Settlement Cycle</Text>
          <Text style={styles.clauseBody}>
            All delivered orders from Monday through Sunday are compiled and deposited straight to the seller's verified bank account every Wednesday morning.
          </Text>

          <Text style={styles.clauseTitle}>4. Courier & Breakage Protection</Text>
          <Text style={styles.clauseBody}>
            Damaged parcels in transit are 100% insured by HomeBaz Express. Sellers receive their full product sale price without any deduction for transit accidents.
          </Text>

          <Text style={styles.clauseTitle}>5. Authenticity & Homemade Commitment</Text>
          <Text style={styles.clauseBody}>
            Products listed must be genuine homemade, small-batch, or artisan produced. Commercial mass-manufactured goods or chemically preserved items are strictly prohibited.
          </Text>
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
  agreementHeader: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    marginTop: 8,
  },
  subTitle: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    marginTop: 4,
  },
  clauseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ECECF5',
  },
  clauseTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    marginTop: 14,
    marginBottom: 6,
  },
  clauseBody: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    lineHeight: 18,
  },
});
