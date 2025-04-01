import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, TextInput } from 'react-native';
import styles from './EditSeedModal.module.scss';
import { Text, View } from '../../components/Themed';
import { Button, Input } from '@rneui/themed';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { useEffect, useRef, useState } from 'react';
import { plantProperty, plantState, rootState, RootTabScreenProps, seedState } from '../../types';
import { setPlant, addPlant, selectPlantById } from '../../redux/reducers/plantReducer';
import { setSeed, addSeed } from '../../redux/reducers/seedReducer';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import PropertyModal from '../PropertyModal/PropertyModal';
import { PlantPropertiesDisplay } from '../../components/PlantPropertiesDisplay/PlantPropertiesDisplay';
import { AncestorModal } from '../AncestorModal/AncestorModal';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TabBarIcon } from '../../navigation/TabBarIcon';
import { ParentDisplay } from '../../components/ParentDisplay/ParentDisplay';

const defaultState = {
  title: '',
  amount: 0,
  harvestDate: undefined,
  note: '',
  strain: '',
  breeder: '',
  uuid: '',
  father: '',
  mother: '',
  type: undefined,
};

const defaultPlantState = {
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
  setSeed,
  addSeed,
  setPlant,
  addPlant,
};

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  plant: plantState;
}

const connector = connect(mapStateToProps, mapDispatch);

function EditSeedModal({ plants, seeds, setPlant, addPlant, addSeed, setSeed }: Props) {
  const route = useRoute();
  const navigation = useNavigation();
  const [seedData, setSeedData] = useState<seedState>(route.params ? (route.params as seedState) : defaultState);

  const [showPropertyModal, setShowPropertyModal] = useState<boolean>(false);
  const [showAncestorModal, setShowAncestorModal] = useState<boolean>(false);
  const strainRef = useRef<TextInput>(null);
  const noteRef = useRef<TextInput>(null);
  const parentRef = useRef<TextInput>(null);

  const [displayDatepicker, setDisplayDatepicker] = useState({
    harvestDate: false,
  });

  const { title, strain, note, uuid, father, mother, harvestDate } = seedData;

  useEffect(() => {
    navigation.setOptions({
      title: 'Edit',
      headerRight: () => (
        <View style={styles.iconContainer}>
          <TabBarIcon style={{ marginLeft: 12 }} name="save" size={30} color="black" onPress={onSubmit} />
        </View>
      ),
    });
    return () => {
      navigation.setOptions({
        title: undefined,
        headerRight: () => undefined,
      });
    };
  }, [seedData]);

  const motherPlant = useSelector((state) => selectPlantById(state as rootState, mother));
  const fatherPlant = useSelector((state) => selectPlantById(state as rootState, father));

  const onHarvestDateChange = (event: Event, date: Date | undefined) => {
    setDisplayDatepicker({ ...displayDatepicker, harvestDate: false });
    setSeedData({ ...seedData, harvestDate: date });
  };

  const onTextInputChange = (name: string, value: string) => {
    setSeedData({ ...seedData, [name]: value });
  };

  const onSubmit = () => {
    setSeed(seedData);
    navigation.goBack();
  };

  return (
    <View style={styles.wrapper as any}>
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
            <Button title="Pick Seed Parents" onPress={() => setShowAncestorModal(true)} />
            <Button
              title="Harvest date"
              onPress={() => setDisplayDatepicker({ ...displayDatepicker, harvestDate: true })}
            />
          </View>
        </View>

          <ParentDisplay motherPlant={motherPlant} fatherPlant={fatherPlant} />

      </ScrollView>
        {showAncestorModal && (
          <View style={styles.modal}>
            <AncestorModal
              label="Pick Seed  Parents"
              placeholder="Search or Add Plant"
              setShowAncestorModal={setShowAncestorModal}
              showAncestorModal={showAncestorModal}
              onSubmit={(search) => addPlant({ ...defaultPlantState, title: search })}
              setMother={(plantId: string) => setSeedData({ ...seedData, mother: plantId })}
              setFather={(plantId: string) => setSeedData({ ...seedData, father: plantId })}
              mother={motherPlant}
              father={fatherPlant}
            />
          </View>
        )}
      <>
        {displayDatepicker.harvestDate && (
          <DateTimePicker value={harvestDate ? harvestDate : new Date()} onChange={onHarvestDateChange} mode="date" />
        )}
      </>
      <Button buttonStyle={styles.addButton} title="Save Changes" onPress={onSubmit} />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

export default connector(EditSeedModal);
