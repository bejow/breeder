import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import styles from './PropertyModal.module.scss';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Button, Input } from 'react-native-elements';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { RefObject, useRef, useState } from 'react';
import { plantProperty, plantState, rootState, RootTabScreenProps } from '../../types';
import { addPlant } from '../../redux/reducers/plantReducer';
import { connect, ConnectedProps } from 'react-redux';
import PlantPropertyPicker from '../../components/PlantPropertyPicker/PlantPropertyPicker';
import { PlantPropertyEdit } from '../../components/PlantPropertyEdit/PlantPropertyEdit';

function PropertyModal({
  setPlantData,
  plantData,
  properties,
  propertyRef,
  selectableProperties,
}: {
  setPlantData: (plant: plantState) => void;
  plantData: plantState;
  properties: Array<plantProperty>;
  propertyRef: RefObject<TextInput>;
  selectableProperties: { id: String; title: String }[];
}) {
  return (
    <View style={styles.modalContainer}>
      <Text>Test</Text>
      <PlantPropertyPicker
        setPlantProperties={(properties: plantProperty[]) => setPlantData({ ...plantData, properties: properties })}
        addProperty={(property: plantProperty) =>
          setPlantData({
            ...plantData,
            properties: [...plantData.properties, property],
          })
        }
        inputRef={propertyRef}
        label="Pick Plant Properties"
        properties={properties}
        selectableProperties={selectableProperties}
      />
      <PlantPropertyEdit
        setPlantProperties={(properties: plantProperty[]) => setPlantData({ ...plantData, properties: properties })}
        properties={properties}
      />
    </View>
  );
}

export default PropertyModal;
