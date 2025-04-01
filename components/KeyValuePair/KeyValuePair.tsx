import React from 'react';
import { Text, View } from 'react-native';
import styles from './KeyValuePair.module.scss';

export const KeyValuePair = ({ title, value }: { title: string; value: string | undefined }) => {
  return value ? (
    <View style={styles.container}>
      <Text style={styles.title}>{title}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  ) : null;
};
