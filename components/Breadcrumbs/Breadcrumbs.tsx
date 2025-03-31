import { Text } from 'react-native-elements';
import { View } from 'react-native';
import React from 'react';
import { folderState, rootState } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { getParentFolders, setCurrentFolder } from '../../redux/reducers/appStateReducer';
import { connect, ConnectedProps, useSelector } from 'react-redux';
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
  currentFolder: folderState;
}

const connector = connect(mapStateToProps, mapDispatch);

const Breadcrumbs = ({ currentFolder, setCurrentFolder }: Props) => {
  const navigation = useNavigation();
  let parentFolder = useSelector((state: rootState) => getParentFolders(state))
  const onPress = (folder: folderState) => {
    setCurrentFolder(folder)
    navigation.navigate("PlantScreen", folder)
  };

  const onHomePress = () => {
    setCurrentFolder(homeFolder)
    navigation.navigate("PlantScreen", homeFolder)
  }

  const renderBreadcrumbs = () => {
    return parentFolder.slice(1).map(folder => <View key={folder.id} style={styles.breadcrumbItemContainer}><Text style={styles.seperator}>/</Text><Text onPress={() => onPress(folder)} style={styles.breadcrumbItem}>{folder.name}</Text></View>)
  }

  return (
    <View style={styles.breadcrumbContainer}>
        <View style={styles.breadcrumbItemContainer}><Text onPress={onHomePress} style={styles.breadcrumbItem}>Home</Text></View>
        {renderBreadcrumbs()}
    </View>
  );
};

export default connector(Breadcrumbs);
