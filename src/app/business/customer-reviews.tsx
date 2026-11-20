import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HomeBazColors } from '@/constants/theme';
import { Header } from '@/components/common/Header';
import { GradientButton } from '@/components/common/GradientButton';
import { MOCK_REVIEWS, SELLER_PROFILE } from '@/data/mockData';

export default function CustomerReviewsScreen() {
  const router = useRouter();
  const [reviewsList, setReviewsList] = useState(MOCK_REVIEWS);
  const [activeReviewId, setActiveReviewId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenReply = (id: string) => {
    setActiveReviewId(id);
    setReplyText('');
    setModalVisible(true);
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    setReviewsList((prev) =>
      prev.map((r) =>
        r.id === activeReviewId ? { ...r, sellerReply: replyText.trim() } : r
      )
    );
    setModalVisible(false);
    Alert.alert('Reply Sent', 'Your response has been published under the review.');
  };

  const renderReviewItem = ({ item }: { item: typeof MOCK_REVIEWS[0] }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View>
          <Text style={styles.customerName}>{item.customer}</Text>
          <Text style={styles.customerCity}>{item.city} • {item.date}</Text>
        </View>

        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={star}
              name={star <= item.rating ? 'star' : 'star-outline'}
              size={14}
              color="#F59E0B"
            />
          ))}
        </View>
      </View>

      <Text style={styles.productTag}>Purchased: {item.product}</Text>
      <Text style={styles.commentText}>"{item.comment}"</Text>

      {item.sellerReply ? (
        <View style={styles.sellerReplyBox}>
          <Text style={styles.sellerReplyTitle}>Your Response:</Text>
          <Text style={styles.sellerReplyText}>{item.sellerReply}</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.replyBtn}
          onPress={() => handleOpenReply(item.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="chatbubble-outline" size={14} color={HomeBazColors.primary} />
          <Text style={styles.replyBtnText}>Reply to Customer</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Customer Reviews" showBack />

      <FlatList
        data={reviewsList}
        keyExtractor={(item) => item.id}
        renderItem={renderReviewItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.ratingOverviewCard}>
            <View style={styles.ratingNumberCol}>
              <Text style={styles.ratingBig}>{SELLER_PROFILE.rating}</Text>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Ionicons key={s} name="star" size={16} color="#F59E0B" />
                ))}
              </View>
              <Text style={styles.ratingTotalText}>Based on {SELLER_PROFILE.totalReviews} reviews</Text>
            </View>

            <View style={styles.barsCol}>
              <View style={styles.barItem}>
                <Text style={styles.barStar}>5★</Text>
                <View style={styles.barBack}><View style={[styles.barFront, { width: '85%' }]} /></View>
              </View>
              <View style={styles.barItem}>
                <Text style={styles.barStar}>4★</Text>
                <View style={styles.barBack}><View style={[styles.barFront, { width: '12%' }]} /></View>
              </View>
              <View style={styles.barItem}>
                <Text style={styles.barStar}>3★</Text>
                <View style={styles.barBack}><View style={[styles.barFront, { width: '3%' }]} /></View>
              </View>
            </View>
          </View>
        }
      />

      {/* Reply Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reply to Review</Text>
            <Text style={styles.modalSub}>
              A warm, personal note from the maker builds lifelong customer loyalty.
            </Text>

            <TextInput
              style={styles.modalInput}
              value={replyText}
              onChangeText={setReplyText}
              placeholder="Write your response to the customer..."
              placeholderTextColor="#A8A5B8"
              multiline
              numberOfLines={4}
              autoFocus
            />

            <View style={styles.modalBtnRow}>
              <GradientButton
                title="Cancel"
                variant="outline"
                onPress={() => setModalVisible(false)}
                style={{ flex: 1, marginRight: 8 }}
              />
              <GradientButton
                title="Publish Reply"
                onPress={handleSendReply}
                style={{ flex: 1, marginLeft: 8 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  listContent: {
    padding: 16,
    paddingBottom: 30,
  },
  ratingOverviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#ECECF5',
    marginBottom: 16,
  },
  ratingNumberCol: {
    alignItems: 'center',
    paddingRight: 20,
    borderRightWidth: 1,
    borderRightColor: '#F0EFF6',
  },
  ratingBig: {
    fontSize: 36,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 3,
    marginVertical: 4,
  },
  ratingTotalText: {
    fontSize: 11,
    color: HomeBazColors.textSecondary,
  },
  barsCol: {
    flex: 1,
    paddingLeft: 16,
    gap: 6,
  },
  barItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  barStar: {
    fontSize: 11,
    fontWeight: '600',
    color: HomeBazColors.textSecondary,
    width: 20,
  },
  barBack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EFEFF6',
  },
  barFront: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#F59E0B',
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECF5',
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  customerName: {
    fontSize: 14,
    fontWeight: '700',
    color: HomeBazColors.textPrimary,
  },
  customerCity: {
    fontSize: 11,
    color: HomeBazColors.textSecondary,
    marginTop: 1,
  },
  productTag: {
    fontSize: 11,
    fontWeight: '700',
    color: HomeBazColors.primary,
    marginBottom: 6,
  },
  commentText: {
    fontSize: 13,
    color: HomeBazColors.textPrimary,
    lineHeight: 18,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  sellerReplyBox: {
    backgroundColor: HomeBazColors.primarySoft,
    borderRadius: 10,
    padding: 10,
    marginTop: 4,
  },
  sellerReplyTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: HomeBazColors.primaryDark,
    marginBottom: 2,
  },
  sellerReplyText: {
    fontSize: 12,
    color: HomeBazColors.textPrimary,
    lineHeight: 16,
  },
  replyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  replyBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: HomeBazColors.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: HomeBazColors.textPrimary,
    marginBottom: 4,
  },
  modalSub: {
    fontSize: 12,
    color: HomeBazColors.textSecondary,
    lineHeight: 16,
    marginBottom: 14,
  },
  modalInput: {
    height: 100,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: HomeBazColors.primaryBorder,
    padding: 12,
    fontSize: 13,
    color: HomeBazColors.textPrimary,
    textAlignVertical: 'top',
    marginBottom: 18,
  },
  modalBtnRow: {
    flexDirection: 'row',
  },
});
