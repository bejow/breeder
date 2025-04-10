import styles from './PropertyPicker.module.scss';

import {  View } from '../Themed';

import {  useEffect } from 'react';
import { plantProperty, plantState } from '../../types';

import PlantPropertyPicker from '../PlantPropertyPicker/PlantPropertyPicker';
import { PlantPropertyEdit } from '../PlantPropertyEdit/PlantPropertyEdit';
import { useNavigation } from '@react-navigation/native';
import { TabBarIcon } from '../../navigation/TabBarIcon';
import { HeaderBackButton } from '@react-navigation/elements';

function PropertyPicker({
  setPlantData,
  plantData,
  properties,
}: {
  setPlantData: (plant: plantState) => void;
  plantData: plantState;
  properties: Array<plantProperty>;
}) {
  return (
    <View style={styles.container}>
      <PlantPropertyPicker
        setPlantProperties={(properties: plantProperty[]) => setPlantData({ ...plantData, properties: properties })}
        addProperty={(property: plantProperty) =>
          setPlantData({
            ...plantData,
            properties: [...plantData.properties, property],
          })
        }
        label="Pick Plant Traits"
        properties={properties}
      />
      <PlantPropertyEdit
        setPlantProperties={(properties: plantProperty[]) => setPlantData({ ...plantData, properties: properties })}
        properties={properties}
      />
    </View>
  );
}

export default PropertyPicker;
