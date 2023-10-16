import { ListItem, Avatar, Text } from 'react-native-elements';
import { View, Image, TouchableOpacity } from 'react-native';
import { StackActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { folderState, plantState, RootTabScreenProps } from '../../types';
import { hashStringToColor } from '../../helper/colorHash';
import { createPlantInfoString } from '../../helper/plantHelper';
import { useNavigation } from '@react-navigation/native';
import styles from './FolderListItem.module.scss';
import uuid from 'react-native-uuid';
import { CustomIcon } from '../CustomIcon/CustomIcon';


export default ({ folder }: { folder: folderState }) => {
    
  const pushOnNavigationStack = StackActions.push('PlantScreen', { folder });
  const [menuOpen, setMenuOpen] = useState(false);
  const navigation = useNavigation();

  const renderMenu = () => {
    return (
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.closeButtonParent as any} onPress={() => console.log("test")}>
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
      {menuOpen ? (
        renderMenu()
      ) : (
        <ListItem.Content>
            <View style={styles.itemContainer}>
            <CustomIcon name="folder-outline"/>
          <ListItem.Title>{folder}</ListItem.Title>
          </View>
        </ListItem.Content>
      )}
    </ListItem>
  );
};
