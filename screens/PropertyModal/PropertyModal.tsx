import { ScrollView, TextInput } from 'react-native';
import styles from './PropertyModal.module.scss';

import { Text, View } from '../../components/Themed';

import { RefObject, useEffect } from 'react';
import { plantProperty, plantState } from '../../types';

import PlantPropertyPicker from '../../components/PlantPropertyPicker/PlantPropertyPicker';
import { PlantPropertyEdit } from '../../components/PlantPropertyEdit/PlantPropertyEdit';
import { useNavigation } from '@react-navigation/native';
import { TabBarIcon } from '../../navigation/TabBarIcon';
import { HeaderBackButton } from '@react-navigation/elements';

function PropertyModal({
  setPlantData,
  plantData,
  properties,
  showPropertyModal,
  setShowPropertyModal,
}: {
  setPlantData: (plant: plantState) => void;
  plantData: plantState;
  properties: Array<plantProperty>;
  setShowPropertyModal: (shouldShow: boolean) => void;
  showPropertyModal: Boolean;
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
  }, [showPropertyModal, plantData]);


  return (
    <View style={styles.modalContainer}>
      <PlantPropertyPicker
        setPlantProperties={(properties: plantProperty[]) => setPlantData({ ...plantData, properties: properties })}
        addProperty={(property: plantProperty) =>
          setPlantData({
            ...plantData,
            properties: [...plantData.properties, property],
          })
        }
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
