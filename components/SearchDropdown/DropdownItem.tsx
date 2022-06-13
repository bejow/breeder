import React from 'react';
import styles from './SearchDropdown.module.scss';
import { View, Text, Pressable, GestureResponderEvent } from 'react-native';

export const DropdownItem = ({
  item,
}: {
  item: { title: String; id: String; onPress: (event: GestureResponderEvent) => void };
}) => {
  return (
    <Pressable onPress={item.onPress}>
      <View style={styles.item as any}>
        <Text style={styles.itemText as any}>{item.title}</Text>
      </View>
    </Pressable>
  );
};
