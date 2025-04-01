import React from 'react';
import { View } from 'react-native';
import { seedsReducer } from '../../types';
import SeedListItem from '../SeedListItem/SeedListItem';
import styles from './SeedList.module.scss';

export default ({ seeds }: { seeds: seedsReducer }) => {
  return (
    <View style={styles.list}>
      {seeds.map((seed, index) => (
        <SeedListItem key={'seedKey-' + seed.uuid + '-' + index} seed={seed} />
      ))}
    </View>
  );
};
