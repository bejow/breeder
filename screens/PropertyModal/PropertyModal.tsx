import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import styles from './PropertyModal.module.scss';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Button, Image, Input } from 'react-native-elements';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { RefObject, useEffect, useRef, useState } from 'react';
import { plantProperty, plantState, rootState, RootTabScreenProps } from '../../types';
import { addPlant } from '../../redux/reducers/plantReducer';
import { connect, ConnectedProps } from 'react-redux';
import PlantPropertyPicker from '../../components/PlantPropertyPicker/PlantPropertyPicker';
import { PlantPropertyEdit } from '../../components/PlantPropertyEdit/PlantPropertyEdit';
import { useNavigation } from '@react-navigation/native';
import { TabBarIcon } from '../../navigation';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import { HeaderBackButton } from '@react-navigation/elements';

function PropertyModal({
  setPlantData,
  plantData,
  properties,
  propertyRef,
  setShowPropertyModal,
}: {
  setPlantData: (plant: plantState) => void;
  plantData: plantState;
  properties: Array<plantProperty>;
  propertyRef: RefObject<TextInput>;
  setShowPropertyModal: (shouldShow: boolean) => void;
}) {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: 'Properties',
      headerLeft: () => <HeaderBackButton onPress={() => setShowPropertyModal(false)} />,
      headerRight: () => <TabBarIcon name="save" color="black" onPress={() => setShowPropertyModal(false)} />,
    });
    return () => {
      navigation.setOptions({
        title: undefined,
        headerLeft: () => undefined,
        headerRight: () => undefined,
      });
    };
  }, []);

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
      />
      <PlantPropertyEdit
        setPlantProperties={(properties: plantProperty[]) => setPlantData({ ...plantData, properties: properties })}
        properties={properties}
      />
    </View>
  );
}

export default PropertyModal;
