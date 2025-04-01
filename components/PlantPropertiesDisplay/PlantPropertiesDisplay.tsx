import React from 'react';
import { View } from 'react-native';
import { Text } from '@rneui/themed';
import { plantProperty } from '../../types';
import PlantPropertyDisplay from './PlantPropertyDisplay';
import styles from './PlantPropertiesDisplay.module.scss';

export const PlantPropertiesDisplay = ({ properties }: { properties: plantProperty[] }) => {
  return (
    <View style={styles.propertiesContainer as any}>
      {properties.length > 0 ? <Text style={styles.title}>Properties:</Text> : null}
      {properties.map((property, index) => {
        return (
          <PlantPropertyDisplay
            onLongPress={() => console.log('test')}
            key={'plantProperty' + property.uuid + '-' + index}
            property={property}
          />
        );
      })}
    </View>
  );
};
