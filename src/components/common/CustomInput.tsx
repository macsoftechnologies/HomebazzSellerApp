import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HomeBazColors } from '@/constants/theme';

interface CustomInputProps extends TextInputProps {
  label?: string;
  required?: boolean;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
  error?: string;
  helperText?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  required,
  leftIcon,
  isPassword,
  error,
  helperText,
  style,
  onFocus,
  onBlur,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const hasValue = props.value !== undefined && String(props.value).length > 0;
  const isEditable = props.editable !== false;

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelRow}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.requiredAsterisk}> *</Text>}
        </View>
      )}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          error ? styles.inputError : null,
          props.multiline && { minHeight: 90, alignItems: 'flex-start' },
        ]}
      >
        {leftIcon && (
          <View style={styles.leftIconWrapper}>
            <Ionicons
              name={leftIcon}
              size={18}
              color={isFocused ? HomeBazColors.primary : '#9B97B0'}
            />
          </View>
        )}

        <TextInput
          placeholderTextColor="#A8A5B8"
          secureTextEntry={isPassword && !showPassword}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          style={[
            styles.input,
            leftIcon && { paddingLeft: 4 },
            props.multiline && { paddingTop: 10, textAlignVertical: 'top' },
            style,
          ]}
          {...props}
        />

        {/* Quick Clear Icon when text is present & field is editable */}
        {hasValue && isEditable && !isPassword && props.onChangeText && isFocused ? (
          <TouchableOpacity
            onPress={() => props.onChangeText?.('')}
            style={styles.clearButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7}
          >
            <Ionicons name="close-circle" size={18} color="#A8A5B8" />
          </TouchableOpacity>
        ) : null}

        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={18}
              color="#9B97B0"
            />
          </TouchableOpacity>
        )}
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: HomeBazColors.textPrimary,
  },
  requiredAsterisk: {
    fontSize: 13,
    fontWeight: '600',
    color: HomeBazColors.danger,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8E6F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
  },
  inputFocused: {
    borderColor: HomeBazColors.primary,
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: HomeBazColors.danger,
  },
  leftIconWrapper: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: HomeBazColors.textPrimary,
    paddingVertical: Platform.OS === 'android' ? 0 : 8,
    textAlignVertical: 'center',
  },
  clearButton: {
    padding: 4,
    marginLeft: 4,
  },
  eyeButton: {
    padding: 4,
  },
  errorText: {
    fontSize: 11,
    color: HomeBazColors.danger,
    marginTop: 4,
    marginLeft: 4,
  },
  helperText: {
    fontSize: 11,
    color: HomeBazColors.textSecondary,
    marginTop: 4,
    marginLeft: 4,
  },
});
