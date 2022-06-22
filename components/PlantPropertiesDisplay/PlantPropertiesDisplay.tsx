import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { plantProperty } from '../../types';
import PlantPropertyDisplay from './PlantPropertyDisplay';
import { Chip } from 'react-native-elements';
import styles from './PlantPropertiesDisplay.module.scss';

export const PlantPropertiesDisplay = ({ properties }: { properties: plantProperty[] }) => {
  return (
    <View style={styles.propertiesContainer as any}>

      {properties.length > 0  ? <Text style={styles.title}>Properties:</Text> : null}
      {properties.map((property) => {
        return <PlantPropertyDisplay key={property.uuid} property={property} />;
      })}
    </View>
  );
};
