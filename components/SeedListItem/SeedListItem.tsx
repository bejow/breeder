import { ListItem, Avatar } from '@rneui/themed';

import React from 'react';
import { seedState } from '../../types';
import { hashStringToColor } from '../../helper/colorHash';
import { StackActions, useNavigation } from '@react-navigation/native';

export default ({ seed }: { seed: seedState }) => {
  const navigation = useNavigation();
  const pushOnNavigationStack = StackActions.push('SeedDetailScreen', { id: seed.uuid });

  return (
    <ListItem onPress={() => navigation.dispatch(pushOnNavigationStack)} bottomDivider>
      <Avatar
        size={32}
        rounded
        title={seed.strain.slice(0, 2)}
        containerStyle={{ backgroundColor: hashStringToColor(seed.strain) }}
      />
      <ListItem.Content>
        <ListItem.Title>{seed.title}</ListItem.Title>
        <ListItem.Subtitle>{seed.strain}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};
