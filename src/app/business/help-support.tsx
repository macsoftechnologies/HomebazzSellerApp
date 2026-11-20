import React, { useState } from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';

export default function HelpSupportScreen() {
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'When do I receive payment for delivered orders?',
      a: 'HomeBaz calculates settlements weekly from Monday to Sunday. Funds are deposited automatically into your linked bank account every Wednesday morning.',
    },
    {
      q: 'How does doorstep courier pickup work?',
      a: 'Once you mark an order as "Ready for Pickup", our system assigns a local HomeBaz Express rider. They arrive at your door within 15-25 minutes with insulated bags.',
    },
    {
      q: 'What if a glass pickle jar breaks in transit?',
      a: 'HomeBaz takes 100% financial liability for courier transit accidents. You will receive your full seller payout without any deduction.',
    },
    {
      q: 'How can I participate in corporate festival hampers?',
      a: 'Turn on "Festival Hampers" in your Production Capacity settings. Our corporate gifting managers in Visakhapatnam will reach out before Diwali and Sankranti for bulk sample kits.',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Help & Support" showBack />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Partner Support Center</Text>
        <Text style={styles.subheading}>
          Dedicated assistance for HomeBaz home makers and artisans.
        </Text>

        {/* Quick Contact Buttons */}
        <View style={styles.contactRow}>
          <TouchableOpacity
            style={styles.contactBtn}
            onPress={() => Linking.openURL('tel:+918912789000')}
            activeOpacity={0.75}
          >
            <View style={styles.contactIconCircle}>
              <Ionicons name="call" size={20} color={HomeBazColors.primary} />
            </View>
            <Text style={styles.contactTitle}>Partner Hotline</Text>
            <Text style={styles.contactSub}>9 AM – 9 PM</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactBtn}
            onPress={() => Linking.openURL('https://wa.me/919876543210')}
            activeOpacity={0.75}
          >
            <View style={[styles.contactIconCircle, { backgroundColor: '#ECFDF5' }]}>
              <Ionicons name="logo-whatsapp" size={20} color="#10B981" />
            </View>
            <Text style={styles.contactTitle}>WhatsApp Support</Text>
            <Text style={styles.contactSub}>Instant Chat</Text>
          </TouchableOpacity>
        </View>

        {/* FAQs Accordion */}
        <Text style={styles.faqSectionHeading}>Frequently Asked Questions</Text>
        <View style={styles.faqCard}>
          {faqs.map((faq, index) => {
            const isOpen = expandedFaq === index;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.faqRow,
                  index === faqs.length - 1 && { borderBottomWidth: 0 },
                ]}
                onPress={() => setExpandedFaq(isOpen ? null : index)}
                activeOpacity={0.75}
              >
                <View style={styles.faqQuestionRow}>
                  <Text style={styles.faqQText}>{faq.q}</Text>
                  <Ionicons
                    name={isOpen ? 'chevron-up' : 'chevron-down'}
                    size={16}
                    color="#8E8AA0"
                  />
                </View>
                {isOpen && <Text style={styles.faqAText}>{faq.a}</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Raise Ticket Button */}
        <TouchableOpacity
          style={styles.ticketBtn}
          onPress={() => Alert.alert('Raise Ticket', 'Our seller relationship manager in Visakhapatnam will call you within 2 hours.')}
          activeOpacity={0.75}
        >
          <Ionicons name="mail-outline" size={18} color={HomeBazColors.primary} />
          <Text style={styles.ticketBtnText}>Raise a Help Ticket</Text>
        </TouchableOpacity>
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
  heading: {
    fontSize: 20,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    marginBottom: 6,
  },
  subheading: {
    fontSize: 13,
    color: HomeBazColors.textSecondary,
    marginBottom: 18,
    lineHeight: 18,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  contactBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECECF5',
  },
  contactIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: HomeBazColors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  contactSub: {
    fontSize: 11,
    color: HomeBazColors.textSecondary,
    marginTop: 2,
  },
  faqSectionHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    marginBottom: 10,
  },
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ECECF5',
    marginBottom: 16,
    overflow: 'hidden',
  },
  faqRow: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F1F8',
  },
  faqQuestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQText: {
    fontSize: 13,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
    flex: 1,
    paddingRight: 10,
  },
  faqAText: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    lineHeight: 18,
    marginTop: 10,
  },
  ticketBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: HomeBazColors.primaryBorder,
  },
  ticketBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: HomeBazColors.primary,
  },
});
