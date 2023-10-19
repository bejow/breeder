import { ListItem, Avatar, Text } from 'react-native-elements';
import { View, Image, TouchableOpacity } from 'react-native';
import { StackActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { folderState, plantState, rootState, RootTabScreenProps } from '../../types';
import { hashStringToColor } from '../../helper/colorHash';
import { createPlantInfoString } from '../../helper/plantHelper';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { CustomIcon } from '../CustomIcon/CustomIcon';
import { getParentFolders, setCurrentFolder } from '../../redux/reducers/appStateReducer';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { getPathToFolderName } from '../../helper/folderHelper';
import styles from './Breadcrumbs.module.scss'
import { homeFolder } from '../../redux/reducers/folderReducer';

const mapStateToProps = (state: rootState) => ({
  currentFolder: state.appState.currentFolder,
});

const mapDispatch = {
  setCurrentFolder,
};

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  currentFolder: string|null;
}

const connector = connect(mapStateToProps, mapDispatch);

const Breadcrumbs = ({ currentFolder, setCurrentFolder }: Props) => {
  const navigation = useNavigation();
  let parentFolder = useSelector((state: rootState) => getParentFolders(state))

  const onPress = (folder: folderState) => {
    let pathToFolder = getPathToFolderName(parentFolder, folder.name )
    setCurrentFolder(pathToFolder)
    navigation.navigate("Plants", folder)
  };

  const onHomePress = () => {
    setCurrentFolder(null)
    navigation.navigate("Plants", homeFolder)
  }

  const renderBreadcrumbs = () => {
    return parentFolder.map(folder => <View key={folder.id} style={styles.breadcrumbItemContainer}><Text style={styles.seperator}>/</Text><Text onPress={() => onPress(folder)} style={styles.breadcrumbItem}>{folder.name}</Text></View>)
  }

  return (
    <View style={styles.breadcrumbContainer}>
        <View style={styles.breadcrumbItemContainer}><Text onPress={onHomePress} style={styles.breadcrumbItem}>Home</Text></View>
        {renderBreadcrumbs()}
    </View>
  );
};

export default connector(Breadcrumbs);
