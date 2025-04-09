import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './IconButton.module.scss';
import { StyleProp, StyleSheet, StyleSheetProperties, Text, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

interface Props extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  
}

const IconButton = ({ title, onPress, icon, style }: Props) => {
  const colorScheme = useColorScheme();
  const { tint, background } = Colors[colorScheme];

  return (
    <TouchableOpacity style={{ ...style as {}, ...styles.button, backgroundColor: tint, elevation:4 }} onPress={onPress}>
      <MaterialCommunityIcons color={background} name={icon} size={20} />
      <Text style={{...styles.text, color: background }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default IconButton;
