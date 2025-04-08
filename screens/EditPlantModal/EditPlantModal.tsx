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
import { pickImage, removeSpecialChars, requestPermissions, saveImage, takeImage } from '../../helper/imageHelper';
import { Asset } from 'expo-media-library';
import { ImageInfo } from 'expo-image-picker';
import SelectFolderButton from '../../components/FolderSelectButton/SelectFolderButton';
import { getPathFromFolder } from '../../helper/folderHelper';
import uuid from 'react-native-uuid';
import { imageDirectory, imageDirectoryPrefix } from '../../constants/Image';
import { ImagePickerAsset } from 'expo-image-picker';
import GeneralForm from '../../components/Forms/GeneralForm';
import ImageForm from '../../components/Forms/ImageForm';
import DateForm from '../../components/Forms/DateForm';
import PropertyForm from '../../components/Forms/PropertyForm';
import ParentForm from '../../components/Forms/ParentForm';

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
  breeder: '',
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
    route.params ? (route.params as plantState) : { ...defaultState, folder: getPathFromFolder(currentFolder), uuid: uuid.v4().toString() }
  );

  const [showPropertyModal, setShowPropertyModal] = useState<boolean>(false);
  const [showAncestorModal, setShowAncestorModal] = useState<boolean>(false);
  const [step, setStep] = useState(0);

  const strainRef = useRef<TextInput>(null);
  const noteRef = useRef<TextInput>(null);
  const propertyRef = useRef<TextInput>(null);
  const parentRef = useRef<TextInput>(null);
  const breederRef = useRef<TextInput>(null);

  const [displayDatepicker, setDisplayDatepicker] = useState({
    startDate: false,
    flowerDate: false,
    harvestDate: false,
  });

  const { title, strain, breeder, startDate, flowerDate, harvestDate, note, images, father, mother, properties, folder } = plantData;

  // save images in this album --> if strain is know save in own album if not save in general directory
  // const image_album = strain ?  `${imageDirectoryPrefix}-${removeSpecialChars(`${strain}-${breeder}`)}`: imageDirectory
  const imageAlbum = imageDirectory;

  console.log(plantData);

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

  const onAddImageChange = (file: Asset) => {
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

  const renderStep = () => {
    let form = formSteps.find((stepObject) => stepObject.step === step);
    if (form === undefined) {
      setStep(0);
      return formSteps[0].component;
    }
    return form.component;
  };

  const onSubmit = () => {
    setPlant(plantData);
    navigation.goBack();
  };

  const formSteps = [
    {
      component: (
        <GeneralForm
          title={title}
          strain={strain}
          breeder={breeder}
          note={note}
          folder={folder}
          onFolderSelect={onFolderSelect}
          onTextInputChange={onTextInputChange}
        />
      ),
      step: 0,
    },
    {
      component: <ImageForm pickImage={pickImage} takeImage={takeImage} saveImage={saveImage} onAddImageChange={onAddImageChange} imageAlbum={imageAlbum} />,
      step: 1,
    },
    {
      component: (
        <DateForm
          startDate={startDate}
          flowerDate={flowerDate}
          harvestDate={harvestDate}
          onStartDateChange={onStartDateChange}
          onFlowerDateChange={onFlowerDateChange}
          onHarvestDateChange={onHarvestDateChange}
          displayDatepicker={displayDatepicker}
          setDisplayDatepicker={setDisplayDatepicker}
        />
      ),
      step: 2,
    },
    {
      component: (
        <PropertyForm
          setShowPropertyModal={setShowPropertyModal}
          showPropertyModal={showPropertyModal}
          setPlantData={setPlantData}
          plantData={plantData}
          properties={properties}
        />
      ),
      step: 3,
    },
    {
      component: <ParentForm showAncestorModal={showAncestorModal} setShowAncestorModal={setShowAncestorModal} addPlant={addPlant} plantData={plantData} setPlantData={setPlantData} motherPlant={motherPlant} fatherPlant={fatherPlant}/>,
      step: 4
    }
  ];

  const nextStep = () => {
    let newStep = step + (1 % formSteps.length);
    setStep(newStep);
  };

  return (
    <View style={styles.wrapper as any}>
      <ScrollView style={styles.container as any}>
        <View style={styles.viewContainer as any}>
          {renderStep()}

          <View style={styles.horizontalContainer}>
          </View>

        </View>

        
        {displayDatepicker.startDate && <DateTimePicker value={startDate ? startDate : new Date()} onChange={onStartDateChange} mode="date" />}
        {displayDatepicker.harvestDate && <DateTimePicker value={harvestDate ? harvestDate : new Date()} onChange={onHarvestDateChange} mode="date" />}

        {displayDatepicker.flowerDate && <DateTimePicker value={flowerDate ? flowerDate : new Date()} onChange={onFlowerDateChange} mode="date" />}

        <Button style={styles.addButton} title="Next" onPress={() => nextStep()} />
      </ScrollView>
    </View>
  );
}

export default connector(EditPlantModal);
