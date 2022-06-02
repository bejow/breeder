import { ListItem, Avatar } from 'react-native-elements';

import React from 'react';
import { plantState } from '../../types';
import { hashStringToColor } from '../../helper/colorHash';
import { createPlantInfoString } from '../../helper/plantHelper';

export default ({ plant }: { plant: plantState }) => {
  return (
    <ListItem bottomDivider>
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
