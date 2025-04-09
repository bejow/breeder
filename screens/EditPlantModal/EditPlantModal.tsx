import { SafeAreaView, Text, TextInput } from 'react-native';
import styles from './EditPlantModal.module.scss';
import { View } from '../../components/Themed';
import { Button } from 'react-native';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useEffect, useRef, useState } from 'react';
import { folderState, plantProperty, plantState, rootState, RootTabScreenProps } from '../../types';
import { setPlant, addPlant, selectPlantById } from '../../redux/reducers/plantReducer';
import { connect, ConnectedProps, useSelector } from 'react-redux';

import { useNavigation, useRoute } from '@react-navigation/native';
import { TabBarIcon } from '../../navigation/TabBarIcon';
import { pickImage, saveImage, takeImage } from '../../helper/imageHelper';
import { Asset } from 'expo-media-library';

import { getPathFromFolder } from '../../helper/folderHelper';
import uuid from 'react-native-uuid';
import { imageDirectory } from '../../constants/Image';

import GeneralForm from '../../components/Forms/GeneralForm';
import ImageForm from '../../components/Forms/ImageForm';
import DateForm from '../../components/Forms/DateForm';
import PropertyForm from '../../components/Forms/PropertyForm';
import ParentForm from '../../components/Forms/ParentForm';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { SharedValue, useSharedValue, withSpring } from 'react-native-reanimated';
import { CustomIcon } from '../../components/CustomIcon/CustomIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const PAGE_WIDTH = 430;
const baseOptions = {
  vertical: false,
  width: PAGE_WIDTH,
  height: PAGE_WIDTH * 0.6,
} as const;

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

  // needed for pagination
  const step = useSharedValue<number>(0)
  const [stepState, setStepState] = useState(0)
  

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
    let form = formSteps.find((stepObject) => stepObject.step == stepState);
    if (form === undefined) { 
      return formSteps[0].component;
    }
    return form.component;
  };

  const onSubmit = () => {
    setPlant(plantData);
    navigation.goBack();
  };

  const onPressPagination = (index: number) => {
    step.value = withSpring(index)
    setStepState(index)

  };

  const formSteps: {
    component: React.JSX.Element;
    step: number;
    icon: React.ComponentProps<typeof MaterialCommunityIcons>['name']
}[] = [
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
      icon: "file-edit-outline"
    },
    {
      component: <ImageForm pickImage={pickImage} takeImage={takeImage} saveImage={saveImage} onAddImageChange={onAddImageChange} imageAlbum={imageAlbum} />,
      step: 1,
      icon: "camera-outline"
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
      icon: "calendar-month-outline"
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
      icon: "tag-plus-outline"
    },
    {
      component: (
        <ParentForm
          showAncestorModal={showAncestorModal}
          setShowAncestorModal={setShowAncestorModal}
          addPlant={addPlant}
          plantData={plantData}
          setPlantData={setPlantData}
          motherPlant={motherPlant}
          fatherPlant={fatherPlant}
        />
      ),
      step: 4,
      icon: "graph-outline"
    },
  ];

  const nextStep = () => {
    let newStep = step.get() + (1 % formSteps.length);
    step.value = withSpring(newStep)
    setStepState(newStep)
  };

  return (
    <SafeAreaView style={styles.wrapper as any}>
      <View style={styles.container}>
        <Pagination.Custom<{component: React.JSX.Element, step:number, icon: React.ComponentProps<typeof MaterialCommunityIcons>['name']}>
          progress={step}
          data={formSteps}
          size={50}
          dotStyle={{
            borderRadius: 16,
          }}
          activeDotStyle={{
            borderRadius: 8,

            overflow: 'hidden',
            backgroundColor: '#f1f1f1',
          }}
          containerStyle={{
            gap: 10,
            alignItems: 'center',
            height: 10,
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginVertical: 16,
          }}
          horizontal
          onPress={onPressPagination}
          renderItem={(item,index) => (
            <CustomIcon name={item.icon} size={30} onPress={() => onPressPagination(index)}/>
          )}
        />
        <View style={styles.contentContainer}>
      {renderStep()}
      </View>
        <Button title="Next" onPress={() => nextStep()} />
      </View>
    </SafeAreaView>
  );
}

export default connector(EditPlantModal);
