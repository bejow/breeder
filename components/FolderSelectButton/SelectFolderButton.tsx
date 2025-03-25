import React, {useState} from 'react';

import { Pressable } from 'react-native';
import { StorageAccessFramework } from 'expo-file-system';
import { Text } from 'react-native-elements';
import { folderState, rootState, RootTabScreenProps } from '../../types';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import { addFolder, homeFolder, selectFolderById } from '../../redux/reducers/folderReducer';
import { CustomIcon } from '../CustomIcon/CustomIcon';
import { importAppendSeeds } from '../../redux/reducers/seedReducer';
import { Alert, View } from 'react-native'; 
import Dialog from 'react-native-dialog'
import uuid from 'react-native-uuid';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import SelectFolderDropdown from '../SelectFolderDropdown/SelectFolderDropdown';
import styles from './SelectFolderButton.module.scss'
import { getCurrentFolderIdFromPath } from '../../helper/folderHelper';

const mapStateToProps = (state: rootState) => ({
  folders: state.folders,
  currentFolder: state.appState.currentFolder
});

const mapDispatch = {addFolder};

interface Props extends ConnectedProps<typeof connector> {
  onFolderSelect: (folder: folderState, index: number) => void;
  selectedFolderPath: string | null;
  currentFolder: folderState;
  folders: folderState[];
}

const connector = connect(mapStateToProps, mapDispatch);

const SelectFolderButton :React.FC<Props>= ({ selectedFolderPath, currentFolder, folders, addFolder, onFolderSelect }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const currentFolderObject = useSelector((state) => selectFolderById(state as rootState, currentFolder.id))
  const selectedFolderObject = useSelector((state) => selectFolderById(state as rootState, getCurrentFolderIdFromPath(selectedFolderPath)))
  const [folder, setFolder] = useState(currentFolderObject)
  const [folderName, setFolderName] = useState('');

  const onSelect = (folder: folderState, index:number) => {
    onFolderSelect(folder, index)
    setMenuOpen(false)
  }

  const renderDialog = () => {
    return (
    <Dialog.Container visible={menuOpen}>
      <Dialog.Title>Select Folder</Dialog.Title>
      <SelectFolderDropdown folders={folders} currentFolder={currentFolder} onFolderSelect={onSelect} addFolder={addFolder} selectedFolder={selectedFolderObject}/>
      <Dialog.Button label="Cancel" onPress={() => setMenuOpen(false)}/>
    </Dialog.Container>
    )
  }


  return  (
    <View style={styles.container}>
      <View style={styles.selectionContainer}>
      <CustomIcon name="folder-outline" color="black" onPress={() => setMenuOpen(true)}/>
      <Text>{selectedFolderPath ? selectedFolderObject.name :currentFolder.name}</Text>
      </View>
      {renderDialog()}
    </View>
  )
  
};

export default connector(SelectFolderButton)
