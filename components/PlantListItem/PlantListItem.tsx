import { ListItem, Avatar, Text } from 'react-native-elements';
import { View, Image, TouchableOpacity } from 'react-native';
import { StackActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { plantState, RootTabScreenProps } from '../../types';
import { hashStringToColor } from '../../helper/colorHash';
import { createPlantInfoString } from '../../helper/plantHelper';
import { useNavigation } from '@react-navigation/native';
import styles from './PlantListItem.module.scss';

export default ({ plant }: { plant: plantState }) => {
  const navigation = useNavigation();
  const pushOnNavigationStack = StackActions.push('PlantDetailScreen', { id: plant.uuid });
  const [menuOpen, setMenuOpen] = useState(false);

  const createCopy = () => {
    console.log("copy")
  }

  const renderMenu = () => {
    return (
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.closeButtonParent as any} onPress={() => createCopy()}>
        <Image style={styles.copyButton as any} source={require('../../assets/images/copy.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButtonParent as any} onPress={() => setMenuOpen(false)}>
        <Image style={styles.closeButton as any} source={require('../../assets/images/close.png')} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ListItem
      onLongPress={() => setMenuOpen(true)}
      onPress={() => navigation.dispatch(pushOnNavigationStack)}
      bottomDivider
      style={styles.listItem}
    >
      <Avatar
        size={32}
        rounded
        title={plant.strain.slice(0, 2)}
        containerStyle={{ backgroundColor: hashStringToColor(plant.strain) }}
      />
      {menuOpen ? (
        renderMenu()
      ) : (
        <ListItem.Content>
          <ListItem.Title>{plant.title}</ListItem.Title>
          <ListItem.Subtitle>{createPlantInfoString(plant)}</ListItem.Subtitle>
        </ListItem.Content>
      )}
    </ListItem>
  );
};
