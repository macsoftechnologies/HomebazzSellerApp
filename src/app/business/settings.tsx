import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
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

export default function SettingsScreen() {
  const router = useRouter();
  const [pushNotifs, setPushNotifs] = useState(true);
  const [orderAlarm, setOrderAlarm] = useState(true);
  const [autoAccept, setAutoAccept] = useState(false);
  const [language, setLanguage] = useState<'English' | 'Telugu' | 'Hindi'>('English');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Settings" showBack />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionHeader}>Order & Kitchen Alerts</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.textCol}>
              <Text style={styles.settingTitle}>Push Notifications</Text>
              <Text style={styles.settingDesc}>Receive instant popups for orders & payouts</Text>
            </View>
            <Switch
              value={pushNotifs}
              onValueChange={setPushNotifs}
              trackColor={{ false: '#D8D5E5', true: HomeBazColors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.textCol}>
              <Text style={styles.settingTitle}>Loud Order Alert Alarm</Text>
              <Text style={styles.settingDesc}>High volume chime when a new order arrives</Text>
            </View>
            <Switch
              value={orderAlarm}
              onValueChange={setOrderAlarm}
              trackColor={{ false: '#D8D5E5', true: HomeBazColors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <View style={styles.textCol}>
              <Text style={styles.settingTitle}>Auto-Accept Standard Orders</Text>
              <Text style={styles.settingDesc}>Immediately accept orders within kitchen capacity</Text>
            </View>
            <Switch
              value={autoAccept}
              onValueChange={setAutoAccept}
              trackColor={{ false: '#D8D5E5', true: HomeBazColors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <Text style={styles.sectionHeader}>App Language (భాష)</Text>
        <View style={styles.card}>
          {[
            { id: 'English', title: 'English' },
            { id: 'Telugu', title: 'Telugu (తెలుగు)' },
            { id: 'Hindi', title: 'Hindi (हिंदी)' },
          ].map((lang) => (
            <TouchableOpacity
              key={lang.id}
              style={[
                styles.langRow,
                language === lang.id && styles.langRowSelected,
              ]}
              onPress={() => {
                setLanguage(lang.id as any);
                Alert.alert('Language Updated', `Display language set to ${lang.title}`);
              }}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.langText,
                  language === lang.id && styles.langTextSelected,
                ]}
              >
                {lang.title}
              </Text>
              {language === lang.id && (
                <Ionicons name="checkmark-circle" size={18} color={HomeBazColors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionHeader}>App Information</Text>
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>HomeBaz Partner App Version</Text>
            <Text style={styles.infoVal}>v1.0.0 (Production Build)</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Active Launch Hub</Text>
            <Text style={styles.infoVal}>Visakhapatnam, AP</Text>
          </View>
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
  sectionHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: HomeBazColors.textSecondary,
    textTransform: 'uppercase',
    marginTop: 10,
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ECECF5',
    marginBottom: 16,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F1F8',
  },
  textCol: {
    flex: 1,
    paddingRight: 10,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  settingDesc: {
    fontSize: 11,
    color: HomeBazColors.textSecondary,
    marginTop: 2,
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F1F8',
  },
  langRowSelected: {
    backgroundColor: '#FAF9FE',
  },
  langText: {
    fontSize: 14,
    fontWeight: '600',
    color: HomeBazColors.textPrimary,
  },
  langTextSelected: {
    fontWeight: '800',
    color: HomeBazColors.primary,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F1F8',
  },
  infoLabel: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
  },
  infoVal: {
    fontSize: 12,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
});
