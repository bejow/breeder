import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { plantProperty } from '../../types';
import PlantPropertyDisplay from './PlantPropertyDisplay';
import styles from './PlantPropertiesDisplay.module.scss';

export const PlantPropertiesDisplay = ({ properties }: { properties: plantProperty[] }) => {
  return (
    <View style={styles.propertiesContainer as any}>
      <Text style={styles.title}>Properties:</Text>
      {properties.map((property) => {
        return <PlantPropertyDisplay key={property.uuid} property={property} />;
      })}
    </View>
  );
};
