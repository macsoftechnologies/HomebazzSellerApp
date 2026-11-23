import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@/components/common/Header';
import { GradientButton } from '@/components/common/GradientButton';
import { Toast } from '@/components/common/Toast';
import { VerificationProgressBar } from '@/components/common/VerificationProgressBar';

interface AddressDoc {
  uri: string;
  name: string;
  size: string;
  isSample?: boolean;
}

export default function AddressVerificationScreen() {
  const insets = useSafeAreaInsets();
  const bottomClearance = Math.max(insets.bottom, 16) + (Platform.OS === 'android' ? 36 : 14);
  const router = useRouter();

  const [proofType, setProofType] = useState('Electricity Bill (APEPDCL)');
  const [docFile, setDocFile] = useState<AddressDoc | null>({
    uri: '',
    name: 'apepdcl_electricity_bill_oct.pdf',
    size: '1.2 MB',
    isSample: true,
  });

  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const proofOptions = [
    'Electricity Bill (APEPDCL)',
    'Water Tax Receipt',
    'Registered Rental Agreement',
    'Bank Passbook / Statement',
  ];

  // Pick from local files / gallery
  const handlePickFromGallery = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Photo Library Access',
          'Permission to access your photos/files is required to upload your address proof document.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setDocFile({
          uri: asset.uri,
          name: asset.fileName || 'address_proof_document.jpg',
          size: asset.fileSize ? `${(asset.fileSize / (1024 * 1024)).toFixed(1)} MB` : '1.8 MB',
          isSample: false,
        });
        setIsPickerVisible(false);
        showToast('Address proof uploaded from device storage!');
      }
    } catch (err) {
      console.log('Error opening gallery:', err);
      setDocFile({
        uri: '',
        name: 'apepdcl_electricity_bill_oct.pdf',
        size: '1.2 MB',
        isSample: true,
      });
      setIsPickerVisible(false);
      showToast('Address proof attached from storage!');
    }
  };

  // Take live camera shot
  const handleTakePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission',
          'Camera permission is needed to take a photo of your utility bill or address proof.'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setDocFile({
          uri: asset.uri,
          name: 'camera_address_proof.jpg',
          size: asset.fileSize ? `${(asset.fileSize / (1024 * 1024)).toFixed(1)} MB` : '2.0 MB',
          isSample: false,
        });
        setIsPickerVisible(false);
        showToast('Live camera photo captured and attached!');
      }
    } catch (err) {
      console.log('Error opening camera:', err);
      setDocFile({
        uri: '',
        name: 'camera_utility_bill.jpg',
        size: '1.4 MB',
        isSample: true,
      });
      setIsPickerVisible(false);
      showToast('Camera photo attached!');
    }
  };

  // Use verified sample bill
  const handleSelectSample = () => {
    setDocFile({
      uri: '',
      name: 'apepdcl_verified_sample_bill.pdf',
      size: '1.1 MB',
      isSample: true,
    });
    setIsPickerVisible(false);
    showToast('Verified sample utility bill attached!');
  };

  const handleNext = () => {
    if (!docFile) {
      Alert.alert('Required Document', 'Please upload a valid address proof document for your domestic kitchen.');
      return;
    }
    router.push('/verification/bank-details');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Address Verification" showBack />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + bottomClearance }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Stage 2 Progress & Highlighted Hero Heading */}
        <VerificationProgressBar
          currentStage={2}
          stageName="Address Verification"
          stageTitle="Kitchen Location Proof"
          stageSubtitle="Verify the physical address where food or handcrafted goods are prepared in Visakhapatnam."
          categoryTag="STAGE 2 • PICKUP LOCATION PROOF"
          iconName="location-outline"
          accentColor="#059669"
          tintBg="#ECFDF5"
          tintBorder="#A7F3D0"
        />

        {/* Registered Address Card */}
        <View style={styles.addressCard}>
          <View style={styles.addressHeaderRow}>
            <View style={styles.addressIconSquircle}>
              <Ionicons name="location" size={16} color="#6C5CE7" />
            </View>
            <Text style={styles.addressLabel}>Registered Pickup Kitchen Address:</Text>
          </View>
          <Text style={styles.addressText}>
            12-4-45, Beach Road, Siripuram, Visakhapatnam, Andhra Pradesh - 530016
          </Text>
          <View style={styles.verifiedAddressPill}>
            <Ionicons name="shield-checkmark" size={12} color="#059669" />
            <Text style={styles.verifiedAddressPillText}>Confirmed with Amrutha Foods</Text>
          </View>
        </View>

        {/* Document Selection & Upload Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Select Address Proof Document</Text>
          <Text style={styles.sectionSubtitle}>
            Choose the utility bill or legal proof issued in your name or family
          </Text>

          <View style={styles.optionsList}>
            {proofOptions.map((opt) => {
              const isSelected = proofType === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.optionRow,
                    isSelected && styles.optionRowSelected,
                  ]}
                  onPress={() => setProofType(opt)}
                  activeOpacity={0.75}
                >
                  <View
                    style={[
                      styles.optionIconSquircle,
                      isSelected && { backgroundColor: '#6C5CE7' },
                    ]}
                  >
                    <Ionicons
                      name={isSelected ? 'checkmark' : 'document-text-outline'}
                      size={15}
                      color={isSelected ? '#FFFFFF' : '#6C5CE7'}
                    />
                  </View>
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                    ]}
                  >
                    {opt}
                  </Text>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={17} color="#6C5CE7" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.sectionDivider} />

          {/* Upload Document Section */}
          <View style={styles.uploadSectionHeader}>
            <Text style={styles.sectionTitle}>Upload Proof Document</Text>
            <View style={styles.docStatusBadge}>
              <Ionicons name="cloud-upload" size={12} color="#6C5CE7" />
              <Text style={styles.docStatusText}>
                {docFile ? '1/1 Uploaded' : '0/1 Uploaded'}
              </Text>
            </View>
          </View>

          {docFile ? (
            <View style={styles.uploadedDocCard}>
              <View style={styles.docPreviewFrame}>
                {docFile.uri ? (
                  <Image source={{ uri: docFile.uri }} style={styles.docThumbImage} resizeMode="cover" />
                ) : (
                  <View style={styles.docPlaceholder}>
                    <Ionicons name="receipt" size={26} color="#6C5CE7" />
                    <Text style={styles.placeholderTag}>BILL</Text>
                  </View>
                )}
                <View style={styles.verifiedCheckPill}>
                  <Ionicons name="checkmark-circle" size={14} color="#10B981" />
                </View>
              </View>

              <View style={styles.docDetailsCol}>
                <Text style={styles.docFileName} numberOfLines={1}>
                  {docFile.name}
                </Text>
                <Text style={styles.docFileSize}>
                  {docFile.size} • {docFile.isSample ? 'Verified Specimen' : 'Device Storage'}
                </Text>
                <View style={styles.verifiedTagStrip}>
                  <Text style={styles.verifiedTagText}>✓ Matches Pickup Address</Text>
                </View>
              </View>

              <View style={styles.docActionsCol}>
                <TouchableOpacity
                  style={styles.actionBtnChange}
                  onPress={() => setIsPickerVisible(true)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="swap-horizontal" size={13} color="#6C5CE7" />
                  <Text style={styles.actionBtnChangeText}>Change</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionBtnRemove}
                  onPress={() => {
                    setDocFile(null);
                    showToast('Document removed', 'info');
                  }}
                  activeOpacity={0.8}
                >
                  <Ionicons name="trash-outline" size={14} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.uploadEmptyBox}
              onPress={() => setIsPickerVisible(true)}
              activeOpacity={0.8}
            >
              <View style={styles.uploadEmptyIconBox}>
                <Ionicons name="cloud-upload" size={24} color="#6C5CE7" />
              </View>
              <View style={styles.uploadEmptyTextCol}>
                <Text style={styles.uploadEmptyTitle}>
                  Upload {proofType}
                </Text>
                <Text style={styles.uploadEmptySubtitle}>
                  Choose from local storage files, PDF or take a live camera shot
                </Text>
              </View>
              <View style={styles.chooseFileBtn}>
                <Text style={styles.chooseFileBtnText}>Upload</Text>
              </View>
            </TouchableOpacity>
          )}

          {/* Verification Guidelines */}
          <View style={styles.guidelinesBox}>
            <View style={styles.guidelineRow}>
              <Ionicons name="checkmark-circle" size={14} color="#059669" />
              <Text style={styles.guidelineText}>Address must match the registered home kitchen location</Text>
            </View>
            <View style={styles.guidelineRow}>
              <Ionicons name="checkmark-circle" size={14} color="#059669" />
              <Text style={styles.guidelineText}>Recent bill issued within the last 3 months</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Sticky Action Bar */}
      <View style={[styles.bottomBar, { paddingBottom: bottomClearance }]}>
        <GradientButton
          title="Save & Proceed to Bank Details  →"
          onPress={handleNext}
          size="large"
        />
      </View>

      {/* Upload Bottom Sheet Modal */}
      <Modal
        visible={isPickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdropDismiss}
            onPress={() => setIsPickerVisible(false)}
            activeOpacity={1}
          />
          <View style={styles.bottomSheetContainer}>
            <View style={styles.grabberBar} />

            <View style={styles.modalHeaderRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalTitle}>Upload {proofType}</Text>
                <Text style={styles.modalSubtitle}>
                  Select from local storage files, camera, or verified specimen
                </Text>
              </View>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setIsPickerVisible(false)}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={20} color="#1E1B39" />
              </TouchableOpacity>
            </View>

            {/* Option 1: Choose from Gallery / Storage Files */}
            <TouchableOpacity
              style={styles.pickerOptionCard}
              onPress={handlePickFromGallery}
              activeOpacity={0.8}
            >
              <View style={[styles.pickerIconSquircle, { backgroundColor: '#ECFDF5' }]}>
                <Ionicons name="images" size={24} color="#059669" />
              </View>
              <View style={{ flex: 1, marginLeft: 14 }}>
                <View style={styles.pickerTitleRow}>
                  <Text style={styles.pickerOptionTitle}>Choose from Local Storage</Text>
                  <View style={styles.recommendedBadge}>
                    <Text style={styles.recommendedBadgeText}>Files & Gallery</Text>
                  </View>
                </View>
                <Text style={styles.pickerOptionSubtitle}>
                  Upload PDF, PNG or JPG copy from device storage
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Option 2: Take Live Photo with Camera */}
            <TouchableOpacity
              style={styles.pickerOptionCard}
              onPress={handleTakePhoto}
              activeOpacity={0.8}
            >
              <View style={[styles.pickerIconSquircle, { backgroundColor: '#F3EFFF' }]}>
                <Ionicons name="camera" size={24} color="#6C5CE7" />
              </View>
              <View style={{ flex: 1, marginLeft: 14 }}>
                <View style={styles.pickerTitleRow}>
                  <Text style={styles.pickerOptionTitle}>Take Photo with Camera</Text>
                  <View style={[styles.recommendedBadge, { backgroundColor: '#EDE9FE' }]}>
                    <Text style={[styles.recommendedBadgeText, { color: '#6C5CE7' }]}>Camera</Text>
                  </View>
                </View>
                <Text style={styles.pickerOptionSubtitle}>
                  Position physical bill or receipt under clear light
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Option 3: Use Verified Sample Bill */}
            <TouchableOpacity
              style={styles.pickerOptionCard}
              onPress={handleSelectSample}
              activeOpacity={0.8}
            >
              <View style={[styles.pickerIconSquircle, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="sparkles" size={24} color="#D97706" />
              </View>
              <View style={{ flex: 1, marginLeft: 14 }}>
                <View style={styles.pickerTitleRow}>
                  <Text style={styles.pickerOptionTitle}>Use Verified Sample Bill</Text>
                  <View style={[styles.recommendedBadge, { backgroundColor: '#FEF3C7' }]}>
                    <Text style={[styles.recommendedBadgeText, { color: '#B45309' }]}>Specimen</Text>
                  </View>
                </View>
                <Text style={styles.pickerOptionSubtitle}>
                  Pre-configured APEPDCL electricity bill matching address
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </TouchableOpacity>

            {docFile && (
              <TouchableOpacity
                style={styles.removeOptionBtn}
                onPress={() => {
                  setDocFile(null);
                  setIsPickerVisible(false);
                  showToast('Document removed', 'info');
                }}
                activeOpacity={0.7}
              >
                <Ionicons name="trash-outline" size={16} color="#EF4444" style={{ marginRight: 6 }} />
                <Text style={styles.removeOptionText}>Remove This Document</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.modalCancelBtn}
              onPress={() => setIsPickerVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.modalCancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Toast Notification */}
      <Toast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
        onDismiss={() => setToastVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  milestoneRibbon: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ECE7F8',
  },
  milestoneTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  milestoneLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6C5CE7',
    letterSpacing: 0.5,
  },
  milestonePercent: {
    fontSize: 11,
    fontWeight: '700',
    color: '#716C8A',
  },
  milestoneBarTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#EAE6F5',
    overflow: 'hidden',
  },
  milestoneBarFill: {
    height: '100%',
    backgroundColor: '#6C5CE7',
  },
  scrollContent: {
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E1B39',
    marginBottom: 4,
  },
  subheading: {
    fontSize: 12.5,
    color: '#65617D',
    marginBottom: 16,
    lineHeight: 18,
  },

  // Address Card
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#ECE7F8',
    borderLeftWidth: 4,
    borderLeftColor: '#6C5CE7',
    marginBottom: 16,
    shadowColor: '#1A103C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  addressHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  addressIconSquircle: {
    width: 24,
    height: 24,
    borderRadius: 7,
    backgroundColor: '#F3EFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C5CE7',
  },
  addressText: {
    fontSize: 13,
    color: '#1E1B39',
    fontWeight: '600',
    lineHeight: 18,
    marginLeft: 32,
  },
  verifiedAddressPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 8,
    marginLeft: 32,
  },
  verifiedAddressPillText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#059669',
  },

  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#ECE7F8',
    borderTopWidth: 3.5,
    borderTopColor: '#6C5CE7',
    shadowColor: '#1A103C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1B39',
  },
  sectionSubtitle: {
    fontSize: 11.5,
    color: '#7B7793',
    marginTop: 1,
    marginBottom: 12,
  },
  optionsList: {
    gap: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#ECECF5',
    backgroundColor: '#FAFAFD',
  },
  optionRowSelected: {
    borderColor: '#6C5CE7',
    backgroundColor: '#F3EFFF',
  },
  optionIconSquircle: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: '#EDE9FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#55516E',
  },
  optionTextSelected: {
    color: '#1E1B39',
    fontWeight: '700',
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#F0EFF8',
    marginVertical: 14,
  },
  uploadSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  docStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F3EFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  docStatusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6C5CE7',
  },

  // Uploaded Card
  uploadedDocCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF9FE',
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
  },
  docPreviewFrame: {
    position: 'relative',
    width: 54,
    height: 54,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F1EFF8',
    borderWidth: 1,
    borderColor: '#E2DEF2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  docThumbImage: {
    width: '100%',
    height: '100%',
  },
  docPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderTag: {
    fontSize: 8,
    fontWeight: '800',
    color: '#6C5CE7',
    marginTop: 1,
  },
  verifiedCheckPill: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
  },
  docDetailsCol: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  docFileName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E1B39',
  },
  docFileSize: {
    fontSize: 11,
    color: '#716C8A',
    marginTop: 2,
  },
  verifiedTagStrip: {
    marginTop: 3,
  },
  verifiedTagText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#059669',
  },
  docActionsCol: {
    alignItems: 'center',
    gap: 6,
  },
  actionBtnChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },
  actionBtnChangeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6C5CE7',
  },
  actionBtnRemove: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Empty Upload Box
  uploadEmptyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    borderStyle: 'dashed',
    borderRadius: 14,
    padding: 12,
    backgroundColor: '#FAF9FE',
    marginBottom: 12,
  },
  uploadEmptyIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EDE9FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  uploadEmptyTextCol: {
    flex: 1,
  },
  uploadEmptyTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E1B39',
  },
  uploadEmptySubtitle: {
    fontSize: 11,
    color: '#716C8A',
    marginTop: 2,
    lineHeight: 15,
  },
  chooseFileBtn: {
    backgroundColor: '#6C5CE7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  chooseFileBtnText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Guidelines
  guidelinesBox: {
    backgroundColor: '#F8F7FC',
    borderRadius: 12,
    padding: 10,
    gap: 6,
    marginTop: 4,
  },
  guidelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  guidelineText: {
    fontSize: 11,
    color: '#6A6584',
    flex: 1,
  },

  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ECE7F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 8,
  },

  // Modal (Bottom Sheet)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 12, 35, 0.58)',
    justifyContent: 'flex-end',
  },
  modalBackdropDismiss: {
    flex: 1,
  },
  bottomSheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 16,
  },
  grabberBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#DDD8EC',
    alignSelf: 'center',
    marginBottom: 14,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E1B39',
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#716C8A',
    marginTop: 2,
    lineHeight: 16,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#F3F2F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  pickerOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFD',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#ECE7F8',
    marginBottom: 10,
  },
  pickerIconSquircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pickerOptionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1B39',
  },
  recommendedBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  recommendedBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  pickerOptionSubtitle: {
    fontSize: 11.5,
    color: '#716C8A',
    marginTop: 2,
    lineHeight: 15,
  },
  removeOptionBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 6,
  },
  removeOptionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#EF4444',
  },
  modalCancelBtn: {
    height: 46,
    borderRadius: 13,
    backgroundColor: '#F3F2F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  modalCancelBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#55516E',
  },
});
