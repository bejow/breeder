import { ListItem, Avatar } from 'react-native-elements';
import { StackActions } from '@react-navigation/native';
import React from 'react';
import { plantState, RootTabScreenProps } from '../../types';
import { hashStringToColor } from '../../helper/colorHash';
import { createPlantInfoString } from '../../helper/plantHelper';
import { useNavigation } from '@react-navigation/native';

export default ({ plant }: { plant: plantState }) => {
  const navigation = useNavigation()
  const pushOnNavigationStack = StackActions.push("PlantDetailScreen", {id: plant.uuid})
  return (
    <ListItem onPress={() => navigation.dispatch(pushOnNavigationStack)} bottomDivider>
      <Avatar
        size={32}
        rounded
        title={plant.strain.slice(0, 2)}
        containerStyle={{ backgroundColor: hashStringToColor(plant.strain) }}
      />
      <ListItem.Content>
        <ListItem.Title>{plant.title}</ListItem.Title>
        <ListItem.Subtitle>{createPlantInfoString(plant)}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};
