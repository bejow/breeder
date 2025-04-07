import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import styles from './CustomIcon.module.scss';
import {  TouchableOpacity } from 'react-native';

interface IconButtonProps {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  size?: number;
  color?: string;
  onPress: () => void;
}

export const CustomIcon = ({onPress, ...rest}:IconButtonProps) => {
  return <TouchableOpacity onPress={onPress}><MaterialCommunityIcons size={30} style={styles.icon as any} {...rest} /></TouchableOpacity>;
};
