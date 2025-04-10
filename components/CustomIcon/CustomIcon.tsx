import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import styles from './CustomIcon.module.scss';
import {  StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface IconButtonProps {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>
  onPress?: () => void;
}

export const CustomIcon = ({onPress, style={}, ...rest}:IconButtonProps) => {
  return <TouchableOpacity onPress={onPress}><MaterialCommunityIcons size={30} style={{ ...styles.icon as any, ...style as {}}} {...rest} /></TouchableOpacity>;
};
