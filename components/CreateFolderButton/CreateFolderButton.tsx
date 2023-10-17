import React, {useState} from 'react';

import { Pressable } from 'react-native';
import { StorageAccessFramework } from 'expo-file-system';
import { Text } from 'react-native-elements';
import { rootState, RootTabScreenProps } from '../../types';
import { connect, ConnectedProps } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import { addFolder } from '../../redux/reducers/folderReducer';
import { CustomIcon } from '../CustomIcon/CustomIcon';
import { importAppendSeeds } from '../../redux/reducers/seedReducer';
import { Alert, View } from 'react-native'; 
import Dialog from 'react-native-dialog'
import uuid from 'react-native-uuid';

const mapStateToProps = (state: rootState) => ({
  folders: state.folders,
  currentFolder: state.appState.currentFolder
});

const mapDispatch = {addFolder};

type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatch);

const CreateFolderButton = ({ currentFolder, folders, addFolder }: PropsFromRedux) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [folderName, setFolderName] = useState("")

  const createFolder = () => {
    let id = uuid.v4().toString()
    addFolder({name: folderName, id, parent: currentFolder})
    setFolderName("")
    setMenuOpen(false)
  }

  const renderDialog = () => {
    return (
      <Dialog.Container visible={menuOpen}>
      <Dialog.Title>Create Folder</Dialog.Title>
      <Dialog.Input onChangeText={(text) => setFolderName(text)} placeholder='Folder Name'>
        <Text>Test</Text>
      </Dialog.Input>
      <Dialog.Button label="Cancel" onPress={() => setMenuOpen(false)}/>
      <Dialog.Button label="Create Folder" onPress={() => createFolder()}/>
    </Dialog.Container>
    )
  }

  
  return  (
    <View>
      <CustomIcon name="folder-plus-outline" color="black" onPress={() => setMenuOpen(true)}/>
      {renderDialog()}
    </View>
  )
  
};

export default connector(CreateFolderButton);
