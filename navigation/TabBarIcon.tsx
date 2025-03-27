import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

type Props = {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  onPress: (() => void);
  size: number;
}

export function TabBarIcon({onPress, ...rest}: Props) {
  // remove onpress

  return <TouchableOpacity onPress={() => onPress()}><FontAwesome {...rest} style={{ marginBottom: -3 }}/></TouchableOpacity>;
}
