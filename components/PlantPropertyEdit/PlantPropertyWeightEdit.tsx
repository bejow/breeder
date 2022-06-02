import React from 'react';
import { View } from 'react-native';
import { plantProperty, plantPropertyWeight } from '../../types';
import { Slider } from '@miblanchard/react-native-slider';
import { useState } from 'react';
import { Text } from 'react-native-elements';
import styles from './PlantPropertyEdit.module.scss';
import { TabBarIcon } from '../../navigation';
export const PlantPropertyWeightEdit = ({
  property,
  setPlantProperty,
  removePlantProperty,
}: {
  property: plantProperty;
  setPlantProperty: (property: plantProperty) => void;
  removePlantProperty: (property: plantProperty) => void;
}) => {
  return (
    <View>
      <View style={styles.infoContainer}>
        <View>
          <Text>Set Weight for Property: {property.title}</Text>
          <Text>{property.weight}</Text>
        </View>
        <TabBarIcon onPress={() => removePlantProperty(property)} name="close" color="black" />
      </View>
      <Slider
        value={property.weight}
        minimumValue={0}
        maximumValue={10}
        step={1}
        onValueChange={(value) =>
          setPlantProperty({
            ...property,
            weight: typeof value === 'number' ? (value as plantPropertyWeight) : (value[0] as plantPropertyWeight),
          })
        }
      />
    </View>
  );
};
