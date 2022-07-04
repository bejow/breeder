import { ScrollView, TextInput } from 'react-native';
import styles from './AddPlantModal.module.scss';
import { View } from '../../components/Themed';
import { Button, Input } from 'react-native-elements';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { useEffect, useRef, useState } from 'react';
import { plantProperty, plantState, rootState, RootTabScreenProps } from '../../types';
import { addPlant, selectPlantById } from '../../redux/reducers/plantReducer';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import PropertyModal from '../PropertyModal/PropertyModal';
import { PlantPropertiesDisplay } from '../../components/PlantPropertiesDisplay/PlantPropertiesDisplay';
import { AncestorModal } from '../AncestorModal/AncestorModal';
import { useNavigation } from '@react-navigation/native';
import { TabBarIcon } from '../../navigation/TabBarIcon';
import { ParentDisplay } from '../../components/ParentDisplay/ParentDisplay';

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

const mapStateToProps = (state: rootState) => ({
  plants: state.plants,
  seeds: state.seeds,
});

const mapDispatch = {
  addPlant,
};

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  plant: plantState;
}

const connector = connect(mapStateToProps, mapDispatch);

function AddPlantModal({ plants, seeds, addPlant }: Props) {
  const navigation = useNavigation();
  const [plantData, setPlantData] = useState<plantState>(defaultState);
  const [showPropertyModal, setShowPropertyModal] = useState<boolean>(false);
  const [showAncestorModal, setShowAncestorModal] = useState<boolean>(false);
  const strainRef = useRef<TextInput>(null);
  const noteRef = useRef<TextInput>(null);

  const [displayDatepicker, setDisplayDatepicker] = useState({
    startDate: false,
    flowerDate: false,
    harvestDate: false,
  });

  const { title, strain, startDate, flowerDate, note, uuid, father, mother, properties, harvestDate } = plantData;

  const motherPlant = useSelector((state) => selectPlantById(state as rootState, mother));
  const fatherPlant = useSelector((state) => selectPlantById(state as rootState, father));

  useEffect(() => {
    if (showAncestorModal === false && showPropertyModal === false)
      navigation.setOptions({
        headerRight: () => <TabBarIcon name="save" color="black" onPress={() => onSubmit()} />,
      });
    return () => {
      navigation.setOptions({
        title: undefined,
        headerRight: () => undefined,
      });
    };
  }, [showAncestorModal, showPropertyModal, plantData]);

  const onStartDateChange = (event: Event, date: Date | undefined) => {
    setDisplayDatepicker({ ...displayDatepicker, startDate: false });
    setPlantData({ ...plantData, startDate: date });
  };

  const onFlowerDateChange = (event: Event, date: Date | undefined) => {
    setDisplayDatepicker({ ...displayDatepicker, flowerDate: false });
    setPlantData({ ...plantData, flowerDate: date });
  };

  const onHarvestDateChange = (event: Event, date: Date | undefined) => {
    setDisplayDatepicker({ ...displayDatepicker, harvestDate: false });
    setPlantData({ ...plantData, harvestDate: date });
  };

  const onTextInputChange = (name: string, value: string) => {
    setPlantData({ ...plantData, [name]: value });
  };

  const onSubmit = () => {
    addPlant(plantData);
    navigation.goBack();
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container as any}>
        <View style={styles.viewContainer as any}>
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
          <View style={styles.horizontalContainer}>
            <Button style={styles.button} title="Parents" onPress={() => setShowAncestorModal(true)} />
            <Button style={styles.button} title="Properties" onPress={() => setShowPropertyModal(true)} />
            <Button title="Start" onPress={() => setDisplayDatepicker({ ...displayDatepicker, startDate: true })} />
            <Button title="Flower" onPress={() => setDisplayDatepicker({ ...displayDatepicker, flowerDate: true })} />
            <Button title="Harvest" onPress={() => setDisplayDatepicker({ ...displayDatepicker, harvestDate: true })} />
          </View>

          {showPropertyModal && (
            <PropertyModal
              setShowPropertyModal={setShowPropertyModal}
              showPropertyModal={showPropertyModal}
              setPlantData={setPlantData}
              plantData={plantData}
              properties={properties}
            />
          )}
          <PlantPropertiesDisplay properties={properties} />
          <ParentDisplay motherPlant={motherPlant} fatherPlant={fatherPlant} />

          <>
            {displayDatepicker.startDate && (
              <DateTimePicker value={startDate ? startDate : new Date()} onChange={onStartDateChange} mode="date" />
            )}
            {displayDatepicker.flowerDate && (
              <DateTimePicker value={flowerDate ? flowerDate : new Date()} onChange={onFlowerDateChange} mode="date" />
            )}
            {displayDatepicker.harvestDate && (
              <DateTimePicker
                value={harvestDate ? harvestDate : new Date()}
                onChange={onHarvestDateChange}
                mode="date"
              />
            )}
          </>
        </View>
        {showAncestorModal && (
          <View style={styles.modal}>
            <AncestorModal
              label="Pick Plant Parents"
              placeholder="Search or Add Plant"
              setShowAncestorModal={setShowAncestorModal}
              showAncestorModal={showAncestorModal}
              onSubmit={(search) => addPlant({ ...defaultState, title: search })}
              setMother={(plantId: string) => setPlantData({ ...plantData, mother: plantId })}
              setFather={(plantId: string) => setPlantData({ ...plantData, father: plantId })}
              mother={motherPlant}
              father={fatherPlant}
            />
          </View>
        )}
      </ScrollView>
      <Button buttonStyle={styles.addButton} title="Add" onPress={onSubmit} />
    </View>
  );
}

export default connector(AddPlantModal);
