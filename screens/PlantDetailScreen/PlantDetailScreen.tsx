import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Image, Tooltip } from '@rneui/themed';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { CustomIcon } from '../../components/CustomIcon/CustomIcon';
import { KeyValuePair } from '../../components/KeyValuePair/KeyValuePair';
import { ParentDisplay } from '../../components/ParentDisplay/ParentDisplay';
import { PlantPropertiesDisplay } from '../../components/PlantPropertiesDisplay/PlantPropertiesDisplay';
import { TabBarIcon } from '../../navigation/TabBarIcon';
import { deletePlant, selectPlantById } from '../../redux/reducers/plantReducer';
import { ParamList, plantState, rootState } from '../../types';
import styles from './PlantDetailScreen.module.scss';

const mapStateToProps = (state: rootState) => ({
  state: state,
});

const mapDispatch = {
  deletePlant,
};

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

const connector = connect(mapStateToProps, mapDispatch);

const PlantDetailScreen = ({ state, deletePlant }: Props) => {
  const route = useRoute<RouteProp<ParamList, 'DetailScreenParams'>>();
  const navigation = useNavigation();

  const [showEditModal, setShowEditModal] = useState(false);

  const plantId = route.params.id;
  const plant = useSelector((state) => selectPlantById(state as rootState, plantId));

  var motherPlant: plantState;
  var fatherPlant: plantState;

  motherPlant = useSelector((state) => selectPlantById(state as rootState, plant?.mother)) as plantState;
  fatherPlant = useSelector((state) => selectPlantById(state as rootState, plant?.father)) as plantState;

  const onDelete = (plant: plantState | undefined) => {
    if (plant) {
      deletePlant(plant);
      navigation.goBack();
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: plant?.title,
      headerRight: () => (
        <View style={styles.iconContainer}>
          <Tooltip
            width={250}
            containerStyle={styles.dangerTooltip}
            popover={
              <Pressable style={styles.dangerPressable} onPress={() => onDelete(plant)}>
                <Text style={styles.dangerText}>Press here to confirm DELETION</Text>
              </Pressable>
            }
          >
            <CustomIcon name="trash-can-outline" size={30} style={styles.icon} color="red" />
          </Tooltip>

          <TabBarIcon
            style={{ marginLeft: 12 }}
            name="edit"
            size={40}
            color="black"
            onPress={() => navigation.navigate('EditPlantModal', plant)}
          />
        </View>
      ),
    });
    return () => {
      navigation.setOptions({
        title: undefined,
        headerRight: () => undefined,
      });
    };
  }, [plant]);

  const renderImages = () => {
    return plant?.images?.map((asset) => {
      return (
        <Image
          style={{ width: 300, height: 300, resizeMode: 'contain', margin: 8 }}
          onError={(error) => console.log(error.type)}
          key={'img_' + asset.uri}
          source={{ uri: asset.uri }}
        />
      );
    });
  };

  if (plant) {
    return (
      <ScrollView>
        <KeyValuePair title="Title" value={plant.title} />
        <KeyValuePair title="Strain" value={plant.strain} />
        <KeyValuePair title="Info" value={plant.note} />
        <KeyValuePair title="Start Date" value={plant.startDate?.toDateString()} />
        <KeyValuePair title="Flower Date" value={plant.flowerDate?.toDateString()} />
        <KeyValuePair title="Harvest Date" value={plant.harvestDate?.toDateString()} />
        <PlantPropertiesDisplay properties={plant.properties} />
        <ParentDisplay fatherPlant={fatherPlant} motherPlant={motherPlant} />
        {renderImages()}
      </ScrollView>
    );
  } else {
    return (
      <View>
        <Text>Could not get Plant</Text>
      </View>
    );
  }
};

export default connector(PlantDetailScreen);
