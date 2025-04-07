import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity, ViewStyle } from 'react-native';

type Props = {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  onPress?: () => void;
  size: number;
  style?: ViewStyle
};

export function TabBarIcon({ onPress, style, ...rest }: Props) {
  // remove onpress

  return (
    <TouchableOpacity onPress={onPress ? () => onPress() : undefined}>
      <FontAwesome {...rest} style={{...style, marginBottom: -3 }} />
    </TouchableOpacity>
  );
}
