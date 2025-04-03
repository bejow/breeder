import { ScrollView, TextInput } from 'react-native';
import styles from './EditPlantModal.module.scss';
import { Text, View } from '../../components/Themed';
import { Button, Input } from '@rneui/themed';
import DateTimePicker, { DateTimePickerEvent, Event } from '@react-native-community/datetimepicker';
import { useEffect, useRef, useState } from 'react';
import { folderState, plantProperty, plantState, rootState, RootTabScreenProps } from '../../types';
import { setPlant, addPlant, selectPlantById } from '../../redux/reducers/plantReducer';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import PropertyModal from '../PropertyModal/PropertyModal';
import { PlantPropertiesDisplay } from '../../components/PlantPropertiesDisplay/PlantPropertiesDisplay';
import { AncestorModal } from '../AncestorModal/AncestorModal';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TabBarIcon } from '../../navigation/TabBarIcon';
import { pickImage, requestPermissions, saveImage, takeImage } from '../../helper/imageHelper';
import { Asset } from 'expo-media-library';
import { ImageInfo } from 'expo-image-picker';
import SelectFolderButton from '../../components/FolderSelectButton/SelectFolderButton';
import { getPathFromFolder } from '../../helper/folderHelper';
import uuid from 'react-native-uuid';

const defaultState: plantState = {
  title: '',
  startDate: undefined,
  flowerDate: undefined,
  harvestDate: undefined,
  note: '',
  strain: '',
  uuid: '',
  father: '',
  folder: null,
  mother: '',
  properties: new Array<plantProperty>(),
  images: [],
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
  folders: state.folders,
  currentFolder: state.appState.currentFolder,
});

const mapDispatch = {
  setPlant,
  addPlant,
};

type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatch);

function EditPlantModal({ plants, seeds, setPlant, addPlant, folders, currentFolder }: PropsFromRedux) {
  const route = useRoute();
  const navigation = useNavigation();
  const [plantData, setPlantData] = useState<plantState>(
    route.params
      ? (route.params as plantState)
      : { ...defaultState, folder: getPathFromFolder(currentFolder), uuid: uuid.v4().toString() }
  );

  const [showPropertyModal, setShowPropertyModal] = useState<boolean>(false);
  const [showAncestorModal, setShowAncestorModal] = useState<boolean>(false);
  const strainRef = useRef<TextInput>(null);
  const noteRef = useRef<TextInput>(null);
  const propertyRef = useRef<TextInput>(null);
  const parentRef = useRef<TextInput>(null);

  const [displayDatepicker, setDisplayDatepicker] = useState({
    startDate: false,
    flowerDate: false,
    harvestDate: false,
  });

  const { title, strain, startDate, flowerDate, harvestDate, note, images, father, mother, properties, folder } =
    plantData;

  console.log(images);

  useEffect(() => {
    navigation.setOptions({
      title: 'Edit',
      headerRight: () => (
        <View style={styles.iconContainer}>
          <View style={{ margin: 12 }}>
            <TabBarIcon name="save" size={30} color="black" onPress={onSubmit} />
          </View>
        </View>
      ),
    });
    return () => {
      navigation.setOptions({
        title: undefined,
        headerRight: () => undefined,
      });
    };
  }, [plantData]);

  const motherPlant = useSelector((state) => selectPlantById(state as rootState, mother));
  const fatherPlant = useSelector((state) => selectPlantById(state as rootState, father));

  const onStartDateChange = (event: DateTimePickerEvent, date: Date | undefined) => {
    setDisplayDatepicker({ ...displayDatepicker, startDate: false });
    setPlantData({ ...plantData, startDate: date });
  };

  console.log("Editplantstate ", plantData.images)
  const onAddImageChange = (file: Asset) => {
    console.log("onAddImageChange:", file.filename);
    // check if image is already added to prevent duplicates
    if (images.findIndex((image, index) => image.uri === file.uri) === -1) {
      setPlantData({ ...plantData, images: images.concat([file]) });
    }
  };

  const onFlowerDateChange = (event: DateTimePickerEvent, date: Date | undefined) => {
    setDisplayDatepicker({ ...displayDatepicker, flowerDate: false });
    setPlantData({ ...plantData, flowerDate: date });
  };

  const onHarvestDateChange = (event: DateTimePickerEvent, date: Date | undefined) => {
    setDisplayDatepicker({ ...displayDatepicker, harvestDate: false });
    setPlantData({ ...plantData, harvestDate: date });
  };

  const onFolderSelect = (folder: folderState, index: number) => {
    setPlantData({ ...plantData, folder: getPathFromFolder(folder) });
  };

  const onTextInputChange = (name: string, value: string) => {
    setPlantData({ ...plantData, [name]: value });
  };

  const onSubmit = () => {
    setPlant(plantData);
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
          <Button
            onPress={() => pickImage((result: ImageInfo) => saveImage(result.uri, onAddImageChange))}
            title={'Pick Photo'}
          />
          <Button
            onPress={() => takeImage((result: ImageInfo) => saveImage(result.uri, onAddImageChange))}
            title={'Take Photo'}
          />
          <Text style={styles.inputLabel}>Folder</Text>
          <SelectFolderButton onFolderSelect={onFolderSelect} selectedFolderPath={folder} />
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
            <Button title="Parents" onPress={() => setShowAncestorModal(true)} />
            <Button title="Properties" onPress={() => setShowPropertyModal(true)} />
            <Button title="Start" onPress={() => setDisplayDatepicker({ ...displayDatepicker, startDate: true })} />
            <Button title="Flower" onPress={() => setDisplayDatepicker({ ...displayDatepicker, flowerDate: true })} />
            <Button title="Harvest" onPress={() => setDisplayDatepicker({ ...displayDatepicker, harvestDate: true })} />
          </View>
          <Button
            onPress={() => pickImage((result: ImageInfo) => saveImage(result.uri, onAddImageChange))}
            title={'Pick Photo'}
          />
          <Button
            onPress={() => takeImage((result: ImageInfo) => saveImage(result.uri, onAddImageChange))}
            title={'Take Photo'}
          />
          <PlantPropertiesDisplay properties={properties} />
        </View>
      </ScrollView>
      {showPropertyModal && (
        <PropertyModal
          setShowPropertyModal={setShowPropertyModal}
          showPropertyModal={showPropertyModal}
          setPlantData={setPlantData}
          plantData={plantData}
          properties={properties}
        />
      )}
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
      {displayDatepicker.startDate && (
        <DateTimePicker value={startDate ? startDate : new Date()} onChange={onStartDateChange} mode="date" />
      )}
      {displayDatepicker.harvestDate && (
        <DateTimePicker value={harvestDate ? harvestDate : new Date()} onChange={onHarvestDateChange} mode="date" />
      )}
      <>
        {displayDatepicker.flowerDate && (
          <DateTimePicker value={flowerDate ? flowerDate : new Date()} onChange={onFlowerDateChange} mode="date" />
        )}
      </>
      <Button style={styles.addButton} title="Save Changes" onPress={onSubmit} />
    </View>
  );
}

export default connector(EditPlantModal);
