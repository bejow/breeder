import React from 'react';
import { View } from 'react-native';
import { plantProperty, plantPropertyWeight } from '../../types';
import { Slider } from '@miblanchard/react-native-slider';
import { useState } from 'react';
import { Text } from 'react-native-elements';
import styles from './PlantPropertyEdit.module.scss';
import { TabBarIcon } from '../../navigation/TabBarIcon';
import { hashStringToColor, hexAToRGBA } from '../../helper/colorHash';
export const PlantPropertyWeightEdit = ({
  property,
  setPlantProperty,
  removePlantProperty,
}: {
  property: plantProperty;
  setPlantProperty: (property: plantProperty) => void;
  removePlantProperty: (property: plantProperty) => void;
}) => {
  const baseColorForProperty = hashStringToColor(property.title)
  const rgba = hexAToRGBA(baseColorForProperty, property.weight / 10)
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.propertyTitle}>{property.title}</Text>
        </View>
        <TabBarIcon onPress={() => removePlantProperty(property)} name="close" color="black" />
      </View>
      <Slider
        value={property.weight}
        minimumValue={0}
        renderThumbComponent={() => (
          <View style={styles.sliderThumbBackground}>
          <View
            style={{
              backgroundColor: rgba,
              borderRadius: 12,
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={styles.sliderThumbNumber}>{property.weight}</Text>
          </View>
          </View>
        )}
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
