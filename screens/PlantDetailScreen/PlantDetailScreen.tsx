import { ParamListBase, Route, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import PlantListItem from '../../components/PlantListItem/PlantListItem';
import { PlantPropertiesDisplay } from '../../components/PlantPropertiesDisplay/PlantPropertiesDisplay';
import { TabBarIcon } from '../../navigation';
import { deletePlant, selectPlantById } from '../../redux/reducers/plantReducer';
import { ParamList, plantState, RootStackParamList, rootState, RootTabScreenProps } from '../../types';
import AddPlantModal from '../AddPlantModal/AddPlantModal';

const mapStateToProps = (state: rootState) => ({
  state: state,
});

const mapDispatch = {
  deletePlant,
};

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

const connector = connect(mapStateToProps, mapDispatch);

export const PlantDetailScreen = ({ state }: Props) => {
  const route = useRoute<RouteProp<ParamList, 'DetailScreenParams'>>();
  const navigation = useNavigation();

  const [showEditModal, setShowEditModal]= useState(false)
  
  const plantId = route.params.id;
  const plant = useSelector((state) => selectPlantById(state as rootState, plantId));
  
  var motherPlant: plantState;
  var fatherPlant: plantState;
  
  motherPlant = useSelector((state) => selectPlantById(state as rootState, plant?.mother)) as plantState;
  fatherPlant = useSelector((state) => selectPlantById(state as rootState, plant?.father)) as plantState;
  
  useEffect(() => {
    navigation.setOptions({
      title: plant?.title,
      headerRight: () => <TabBarIcon name="save" color="black" onPress={() => navigation.navigate("EditPlantModal", plant)} />,
    });
    return () => {
      navigation.setOptions({
        title: undefined,
        headerRight: () => undefined,
      });
    };
  }, [plant]);

  const renderParents = () => {
    return (
      <View>
        {motherPlant ? <PlantListItem plant={motherPlant} /> : null}
        {fatherPlant ? <PlantListItem plant={fatherPlant} /> : null}
      </View>
    );
  };

  if (plant) {
    return (
      <View>
        <Text>Title: {plant.title}</Text>
        <Text>Strain: {plant.strain}</Text>
        <Text>Info: {plant.note}</Text>
        <Text>Start Date: {plant.startDate?.toDateString()}</Text>
        <Text>Flower Date: {plant.flowerDate?.toDateString()}</Text>
        <Text>Harvest Date: {plant.harvestDate?.toDateString()}</Text>
        <Text>Properties: </Text>
        <PlantPropertiesDisplay properties={plant.properties} />
        {renderParents()}
        <Text>Title: {plant.title}</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Could not get Plant</Text>
      </View>
    );
  }
};
