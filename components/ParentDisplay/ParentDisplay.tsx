import React from 'react';
import { Text, View } from 'react-native';
import { plantState } from '../../types';
import PlantListItem from '../PlantListItem/PlantListItem';
import styles from './ParentDisplay.module.scss';
export const ParentDisplay = ({
  motherPlant,
  fatherPlant,
}: {
  motherPlant: plantState | undefined;
  fatherPlant: plantState | undefined;
}) => {
  console.log('father', fatherPlant);
  return (
    <View style={styles.container}>
      {motherPlant ? (
        <>
          <Text style={styles.title}>Mother:</Text>
          <PlantListItem plant={motherPlant} />
        </>
      ) : null}
      {fatherPlant ? (
        <>
          <Text style={styles.title}>Father:</Text>
          <PlantListItem plant={fatherPlant} />
        </>
      ) : null}
    </View>
  );
};
