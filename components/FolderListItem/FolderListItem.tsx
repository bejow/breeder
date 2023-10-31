import { ListItem, Avatar, Text } from 'react-native-elements';
import { View, Image, TouchableOpacity } from 'react-native';
import { StackActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { folderState, plantState, rootState, RootTabScreenProps } from '../../types';
import { hashStringToColor } from '../../helper/colorHash';
import { createPlantInfoString } from '../../helper/plantHelper';
import { useNavigation } from '@react-navigation/native';
import styles from './FolderListItem.module.scss';
import uuid from 'react-native-uuid';
import { CustomIcon } from '../CustomIcon/CustomIcon';
import { setCurrentFolder } from '../../redux/reducers/appStateReducer';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: rootState) => ({
  currentFolder: state.appState.currentFolder,
});

const mapDispatch = {
  setCurrentFolder,
};

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {
  folder: folderState,
  safelyDeleteFolder: (folderToDelete: folderState) => void
}

const connector = connect(mapStateToProps, mapDispatch);

const FolderListItem = ({ folder, currentFolder, setCurrentFolder, safelyDeleteFolder }: Props) => {
    
  const [menuOpen, setMenuOpen] = useState(false);
  const navigation = useNavigation();

  const onPress = () => {
    setCurrentFolder(folder)
    navigation.navigate("Plants", {...folder})
  }

  const renderMenu = () => {
    return (
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.closeButtonParent as any} onPress={() => safelyDeleteFolder(folder)}>
        <Image style={styles.copyButton as any} source={require('../../assets/images/trash.png')} />
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
      onPress={() => onPress()}
      bottomDivider
      style={styles.listItem}
    >
      <ListItem.Content>
        <View style={styles.itemContainer}>
          <CustomIcon name="folder-outline"/>
          <ListItem.Title>{folder.name}</ListItem.Title>
      {menuOpen ? (
        renderMenu()
      ) : ( null
          )}
          </View>
      </ListItem.Content>
    </ListItem>
  );
};

export default connector(FolderListItem);
