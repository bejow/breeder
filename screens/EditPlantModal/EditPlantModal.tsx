import { StatusBar } from 'expo-status-bar';
import { Platform, TextInput } from 'react-native';
import styles from './EditPlantModal.module.scss';
import { Text, View } from '../../components/Themed';
import { Button, Input } from 'react-native-elements';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { useRef, useState } from 'react';
import { plantProperty, plantState, rootState, RootTabScreenProps } from '../../types';
import { setPlant, addPlant, selectPlantById } from '../../redux/reducers/plantReducer';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import PropertyModal from '../PropertyModal/PropertyModal';
import { PlantPropertiesDisplay } from '../../components/PlantPropertiesDisplay/PlantPropertiesDisplay';
import { AncestorModal } from '../AncestorModal/AncestorModal';
import { useNavigation, useRoute } from '@react-navigation/native';

const defaultState = {
  title: '',
  startDate: undefined,
  flowerDate: undefined,
  harvestDate: undefined,
  note: '',
  strain: '',
  uuid: '',
  father: '',
  mother: '',
  properties: new Array<plantProperty>(),
};

const selectableProperties = [
  { id: '1', title: 'Huge' },
  { id: '2', title: 'Small' },
  { id: '3', title: 'Green' },
  { id: '4', title: 'Tall' },
];

const mapStateToProps = (state: rootState) => ({
  plants: state.plants,
  seeds: state.seeds,
});

const mapDispatch = {
  setPlant,
  addPlant
};

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  plant: plantState;
}

const connector = connect(mapStateToProps, mapDispatch);

function AddPlantModal({ plants, seeds, setPlant, addPlant }: Props) {
    const route = useRoute()
    const navigation = useNavigation()
  const [plantData, setPlantData] = useState<plantState>(route.params ? route.params as plantState : defaultState);



  const [showPropertyModal, setShowPropertyModal] = useState<boolean>(false);
  const [showAncestorModal, setShowAncestorModal] = useState<boolean>(false);
  const strainRef = useRef<TextInput>(null);
  const noteRef = useRef<TextInput>(null);
  const propertyRef = useRef<TextInput>(null);
  const parentRef = useRef<TextInput>(null);
  
  const [displayDatepicker, setDisplayDatepicker] = useState({
    startDate: false,
    flowerDate: false,
  });
  
  const { title, strain, startDate, flowerDate, note, uuid, father, mother, properties } = plantData;

  const motherPlant = useSelector(state => selectPlantById(state as rootState, mother ))
  const fatherPlant = useSelector(state => selectPlantById(state as rootState, father ))
  const onStartDateChange = (event: Event, date: Date | undefined) => {
    setDisplayDatepicker({ ...displayDatepicker, startDate: false });
    setPlantData({ ...plantData, startDate: date });
  };

  const onFlowerDateChange = (event: Event, date: Date | undefined) => {
    setDisplayDatepicker({ ...displayDatepicker, flowerDate: false });
    setPlantData({ ...plantData, flowerDate: date });
  };

  const onTextInputChange = (name: string, value: string) => {
    setPlantData({ ...plantData, [name]: value });
  };

  const onSubmit = () => {
    setPlant(plantData);
    navigation.goBack()
  };

  return (
    <View style={styles.container as any}>
      <Text style={styles.title as any}>Add new plant</Text>
      <View style={styles.separator as any} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Input
        style={styles.input as any}
        onSubmitEditing={() => strainRef.current?.focus()}
        placeholder="title"
        blurOnSubmit={false}
        value={title}
        onChangeText={(text) => onTextInputChange('title', text)}
        label="Plant Title"
      />
      <Input
        ref={strainRef}
        onSubmitEditing={() => noteRef.current?.focus()}
        style={styles.input as any}
        value={strain}
        placeholder="strain"
        blurOnSubmit={false}
        onChangeText={(text) => onTextInputChange('strain', text)}
        label="Strain"
      />
      <Input
        ref={noteRef}
        style={styles.input as any}
        placeholder="note"
        value={note}
        blurOnSubmit={true}
        onChangeText={(text) => onTextInputChange('note', text)}
        label="Note"
      />
      <Button title="Pick Plant Properties" onPress={() => setShowPropertyModal(true)} />
      {showPropertyModal && (
        <PropertyModal
          setShowPropertyModal={setShowPropertyModal}
          showPropertyModal={showPropertyModal}
          setPlantData={setPlantData}
          plantData={plantData}
          propertyRef={propertyRef}
          properties={properties}
        />
      )}
      <PlantPropertiesDisplay properties={properties} />
      <Button title="Pick Plant Parents" onPress={() => setShowAncestorModal(true)} />
      <>
        {showAncestorModal && (
          <AncestorModal
            label="Pick Plant Parents"
            placeholder="Search or Add Plant"
            setShowAncestorModal={setShowAncestorModal}
            showAncestorModal={showAncestorModal}
            parentRef={parentRef}
            onSubmit={(search) => addPlant({...defaultState, title:search})}
            setMother={(plantId: string) => setPlantData({...plantData, mother: plantId})}
            setFather={(plantId: string) => setPlantData({...plantData, father: plantId})}
            mother={motherPlant}
            father={fatherPlant}
          />
        )}
        <Button title="Start date" onPress={() => setDisplayDatepicker({ ...displayDatepicker, startDate: true })} />
        {displayDatepicker.startDate && (
          <DateTimePicker value={startDate ? startDate : new Date()} onChange={onStartDateChange} mode="date" />
        )}
      </>
      <>
        <Button title="Flower date" onPress={() => setDisplayDatepicker({ ...displayDatepicker, flowerDate: true })} />
        {displayDatepicker.flowerDate && (
          <DateTimePicker value={flowerDate ? flowerDate : new Date()} onChange={onFlowerDateChange} mode="date" />
        )}
      </>
      <Button title="Save Changes" onPress={onSubmit} />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

export default connector(AddPlantModal);
