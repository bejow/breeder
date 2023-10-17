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
  folder: folderState
}

const connector = connect(mapStateToProps, mapDispatch);

const FolderListItem = ({ folder, currentFolder, setCurrentFolder }: Props) => {
    
  const [menuOpen, setMenuOpen] = useState(false);
  const navigation = useNavigation();

  const onPress = () => {
    setCurrentFolder(currentFolder + "/" + folder.id)
    navigation.navigate("Plants", {...folder})
  }

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
      onPress={() => onPress()}
      bottomDivider
      style={styles.listItem}
    >
      {menuOpen ? (
        renderMenu()
      ) : (
        <ListItem.Content>
            <View style={styles.itemContainer}>
            <CustomIcon name="folder-outline"/>
          <ListItem.Title>{folder.name}</ListItem.Title>
          </View>
        </ListItem.Content>
      )}
    </ListItem>
  );
};

export default connector(FolderListItem);
