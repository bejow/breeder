import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import styles from './AddPlantModal.module.scss';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Button, Input } from 'react-native-elements';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { useRef, useState } from 'react';
import { plantProperty, plantState, rootState, RootTabScreenProps } from '../../types';
import { addPlant } from "../../redux/reducers/plantReducer";
import { connect, ConnectedProps } from "react-redux";
import PlantPropertyPicker from '../../components/PlantPropertyPicker/PlantPropertyPicker';
import { PlantPropertyEdit } from '../../components/PlantPropertyEdit/PlantPropertyEdit';
import PropertyModal from '../PropertyModal/PropertyModal';

const defaultState = {
  title: "",
  startDate: new Date(),
  flowerDate: new Date(),
  harvestDate: new Date(),
  note: "",
  strain: "",
  uuid: "",
  father: "",
  mother: "",
  properties: new Array<plantProperty>(),
}

const selectableProperties = [{ id: "1", title: "Huge" }, { id: "2", title: "Small" }, { id: "3", title: "Green" }, { id: "4", title: "Tall" }]

const mapStateToProps = (state: rootState) => ({
  plants: state.plants,
  seeds: state.seeds
});

const mapDispatch = {
  addPlant,
};

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  navigation: RootTabScreenProps<"Plants">;
}

const connector = connect(mapStateToProps, mapDispatch);

function AddPlantModal({ plants, seeds, addPlant, navigation }: Props) {
  const [plantData, setPlantData] = useState<plantState>(defaultState)
  const [showPropertyModal, setShowPropertyModal] = useState<boolean>(false)

  const strainRef = useRef<TextInput>(null);
  const noteRef = useRef<TextInput>(null)
  const propertyRef = useRef<TextInput>(null);

  const [displayDatepicker, setDisplayDatepicker] = useState({
    startDate: false,
    flowerDate: false,
  })

  const { title, strain, startDate, flowerDate, note, uuid, father, mother, properties } = plantData;

  const onStartDateChange = (event: Event, date: Date | undefined) => {
    setDisplayDatepicker({ ...displayDatepicker, startDate: false })
    setPlantData({ ...plantData, startDate: date })
  }

  const onFlowerDateChange = (event: Event, date: Date | undefined) => {
    setDisplayDatepicker({ ...displayDatepicker, flowerDate: false })
    setPlantData({ ...plantData, flowerDate: date })
  }

  const onTextInputChange = (name: string, value: string) => {
    setPlantData({ ...plantData, [name]: value })
  }

  const onSubmit = () => {
    addPlant(plantData)
  }

  return (
    <ScrollView nestedScrollEnabled={true}>
      <View style={styles.container as any}>
        <Text style={styles.title as any}>Add new plant</Text>
        <View style={styles.separator as any} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Input
          style={styles.input as any}
          onSubmitEditing={() => strainRef.current?.focus()}
          placeholder='title'
          blurOnSubmit={false}
          value={title}
          onChangeText={(text) => onTextInputChange("title", text)}
          label="Plant Title"
        />
        <Input
          ref={strainRef}
          onSubmitEditing={() => noteRef.current?.focus()}
          style={styles.input as any}
          value={strain}
          placeholder='strain'

          blurOnSubmit={false}
          onChangeText={(text) => onTextInputChange("strain", text)}
          label="Strain"
        />
        <Input
          ref={noteRef}
          style={styles.input as any}
          placeholder='note'
          blurOnSubmit={true}
          onChangeText={(text) => onTextInputChange("note", text)}
          label="Note"
        />
        <Button title="Pick Plant Properties" onPress={() => setShowPropertyModal(true)} />
        {showPropertyModal && <PropertyModal setPlantData={setPlantData} plantData={plantData} propertyRef={propertyRef} properties={properties} selectableProperties={selectableProperties} />}
        <>
          <Button title="Start date" onPress={() => setDisplayDatepicker({ ...displayDatepicker, startDate: true })} />
          {displayDatepicker.startDate && (
            <DateTimePicker
              value={startDate ? startDate : new Date()}
              onChange={onStartDateChange}
              mode="date"
            />
          )}
        </>
        <>
          <Button title="Flower date" onPress={() => setDisplayDatepicker({ ...displayDatepicker, flowerDate: true })} />
          {displayDatepicker.flowerDate && (
            <DateTimePicker
              value={flowerDate ? flowerDate : new Date()}
              onChange={onFlowerDateChange}
              mode="date"
            />
          )}
        </>
        <Button title="Add" onPress={onSubmit} />

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
    </ScrollView>
  );
}

export default connector(AddPlantModal)