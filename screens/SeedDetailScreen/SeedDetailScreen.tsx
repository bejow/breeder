import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Tooltip } from 'react-native-elements/dist/tooltip/Tooltip';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { CustomIcon } from '../../components/CustomIcon/CustomIcon';
import { KeyValuePair } from '../../components/KeyValuePair/KeyValuePair';
import { ParentDisplay } from '../../components/ParentDisplay/ParentDisplay';
import { PlantPropertiesDisplay } from '../../components/PlantPropertiesDisplay/PlantPropertiesDisplay';
import { TabBarIcon } from '../../navigation/TabBarIcon';
import { deletePlant, selectPlantById } from '../../redux/reducers/plantReducer';
import { deleteSeed, selectSeedById } from '../../redux/reducers/seedReducer';
import { ParamList, plantState, rootState, seedState } from '../../types';
import styles from './SeedDetailScreen.module.scss';

const mapStateToProps = (state: rootState) => ({
  state: state,
});

const mapDispatch = {
  deleteSeed,
};

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

const connector = connect(mapStateToProps, mapDispatch);

const SeedDetailScreen = ({ state, deleteSeed }: Props) => {
  const route = useRoute<RouteProp<ParamList, 'DetailScreenParams'>>();
  const navigation = useNavigation();

  const [showEditModal, setShowEditModal] = useState(false);
  const seedId = route.params.id;
  const seed = useSelector((state) => selectSeedById(state as rootState, seedId));

  var motherPlant: plantState;
  var fatherPlant: plantState;

  motherPlant = useSelector((state) => selectPlantById(state as rootState, seed?.mother)) as plantState;
  fatherPlant = useSelector((state) => selectPlantById(state as rootState, seed?.father)) as plantState;

  const onDelete = (seed: seedState | undefined) => {
    if (seed) {
      deleteSeed(seed);
      navigation.goBack();
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: seed?.title,
      headerRight: () => (
        <View style={styles.iconContainer}>
          <Tooltip
            width={250}
            containerStyle={styles.dangerTooltip}
            popover={
              <Pressable style={styles.dangerPressable} onPress={() => onDelete(seed)}>
                <Text style={styles.dangerText}>Press here to confirm DELETION</Text>
              </Pressable>
            }
          >
            <CustomIcon name="trash-can-outline" size={30} style={styles.icon} color="red" />
          </Tooltip>
          <TabBarIcon
            style={{ marginLeft: 12 }}
            name="edit"
            size={30}
            color="black"
            onPress={() => navigation.navigate('EditSeedModal', seed)}
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
  }, [seed]);

  if (seed) {
    return (
      <View>
        <View style={styles.textContainer}>
          <KeyValuePair title="Title" value={seed.title} />
          <KeyValuePair title="Strain" value={seed.strain} />
          <KeyValuePair title="Info" value={seed.note} />
          <KeyValuePair title="Harvest Date" value={seed.harvestDate?.toDateString()} />
        </View>
        <ParentDisplay fatherPlant={fatherPlant} motherPlant={motherPlant} />
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

export default connector(SeedDetailScreen);
