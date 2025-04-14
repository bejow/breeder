import React from 'react';
import { View, Pressable } from 'react-native';
import { plantProperty, plantPropertyWeight } from '../../types';
import { Slider } from '@miblanchard/react-native-slider';
import { useState } from 'react';
import { Text } from '@rneui/themed';
import styles from './PlantPropertyEdit.module.scss';
import { TabBarIcon } from '../../navigation/TabBarIcon';
import { hashStringToColor, hexAToRGBA } from '../../helper/colorHash';
import PlantPropertyDisplay from '../PlantPropertiesDisplay/PlantPropertyDisplay';
import { CustomIcon } from '../CustomIcon/CustomIcon';
import { scaleNumber } from '../../helper/utils';

export const PlantPropertyWeightEdit = ({
  property,
  setPlantProperty,
  removePlantProperty,
}: {
  property: plantProperty;
  setPlantProperty: (property: plantProperty) => void;
  removePlantProperty: (property: plantProperty) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const baseColorForProperty = hashStringToColor(property.title);
  const rgba = hexAToRGBA(baseColorForProperty, scaleNumber(property.weight, 0, 10, 0.5,1 ));
  return (
    <View style={styles.propertyContainer} >
      {expanded ? (
        <>
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.propertyTitle}>{property.title}</Text>
            </View>
            <View style={styles.propertyMenuBtnContainer}>
              <CustomIcon onPress={() => removePlantProperty(property)} name="trash-can-outline" color="black" />
              <CustomIcon onPress={() => setExpanded(false)} name="check" color="black" />
            </View>
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
        </>
      ) : (
        <PlantPropertyDisplay onPress={() => setExpanded(true)} property={property} />
      )}
    </View>
  );
};
