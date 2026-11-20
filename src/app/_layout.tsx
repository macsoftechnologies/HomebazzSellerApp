import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F8F9FE' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="order-details" options={{ headerShown: false }} />
        <Stack.Screen name="add-product" options={{ headerShown: false }} />
        <Stack.Screen name="inventory" options={{ headerShown: false }} />
        <Stack.Screen name="analytics" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ headerShown: false }} />
        
        {/* Module 1: Seller Registration */}
        <Stack.Screen name="registration/onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="registration/welcome" options={{ headerShown: false }} />
        <Stack.Screen name="registration/seller-type" options={{ headerShown: false }} />
        <Stack.Screen name="registration/personal-details" options={{ headerShown: false }} />
        <Stack.Screen name="registration/business-details" options={{ headerShown: false }} />
        <Stack.Screen name="registration/category-selection" options={{ headerShown: false }} />
        <Stack.Screen name="registration/address-details" options={{ headerShown: false }} />

        {/* Module 2: Seller Verification */}
        <Stack.Screen name="verification/identity-verification" options={{ headerShown: false }} />
        <Stack.Screen name="verification/address-verification" options={{ headerShown: false }} />
        <Stack.Screen name="verification/bank-details" options={{ headerShown: false }} />
        <Stack.Screen name="verification/fssai-registration" options={{ headerShown: false }} />
        <Stack.Screen name="verification/business-documents" options={{ headerShown: false }} />
        <Stack.Screen name="verification/product-sample-upload" options={{ headerShown: false }} />
        <Stack.Screen name="verification/production-capacity" options={{ headerShown: false }} />
        <Stack.Screen name="verification/application-summary" options={{ headerShown: false }} />
        <Stack.Screen name="verification/application-submitted" options={{ headerShown: false }} />
        <Stack.Screen name="verification/verification-status" options={{ headerShown: false }} />

        {/* Module 3: Product Management */}
        <Stack.Screen name="product-manage/edit-product" options={{ headerShown: false }} />
        <Stack.Screen name="product-manage/product-image-gallery" options={{ headerShown: false }} />
        <Stack.Screen name="product-manage/product-description" options={{ headerShown: false }} />
        <Stack.Screen name="product-manage/product-pricing" options={{ headerShown: false }} />
        <Stack.Screen name="product-manage/product-category" options={{ headerShown: false }} />
        <Stack.Screen name="product-manage/food-ingredients" options={{ headerShown: false }} />
        <Stack.Screen name="product-manage/allergen-info" options={{ headerShown: false }} />
        <Stack.Screen name="product-manage/expiry-info" options={{ headerShown: false }} />
        <Stack.Screen name="product-manage/manufacturing-details" options={{ headerShown: false }} />
        <Stack.Screen name="product-manage/handmade-details" options={{ headerShown: false }} />
        <Stack.Screen name="product-manage/product-preview" options={{ headerShown: false }} />
        <Stack.Screen name="product-manage/product-approval-status" options={{ headerShown: false }} />

        {/* Module 4: Order Management */}
        <Stack.Screen name="order-manage/accept-order" options={{ headerShown: false }} />
        <Stack.Screen name="order-manage/reject-order" options={{ headerShown: false }} />
        <Stack.Screen name="order-manage/order-preparation" options={{ headerShown: false }} />
        <Stack.Screen name="order-manage/ready-for-pickup" options={{ headerShown: false }} />
        <Stack.Screen name="order-manage/delivery-partner-assigned" options={{ headerShown: false }} />
        <Stack.Screen name="order-manage/handover-confirmation" options={{ headerShown: false }} />
        <Stack.Screen name="order-manage/order-cancellation" options={{ headerShown: false }} />
        <Stack.Screen name="order-manage/returns-refunds" options={{ headerShown: false }} />

        {/* Module 5: Business Management */}
        <Stack.Screen name="business/payout-history" options={{ headerShown: false }} />
        <Stack.Screen name="business/settlement-details" options={{ headerShown: false }} />
        <Stack.Screen name="business/customer-reviews" options={{ headerShown: false }} />
        <Stack.Screen name="business/promotions-offers" options={{ headerShown: false }} />
        <Stack.Screen name="business/maker-story" options={{ headerShown: false }} />
        <Stack.Screen name="business/store-details" options={{ headerShown: false }} />
        <Stack.Screen name="business/help-support" options={{ headerShown: false }} />
        <Stack.Screen name="business/settings" options={{ headerShown: false }} />
        <Stack.Screen name="business/terms-conditions" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
