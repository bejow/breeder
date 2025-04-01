import React, {useState} from 'react';
import { rootState } from '../../types';
import { connect, ConnectedProps } from 'react-redux';
import { addFolder } from '../../redux/reducers/folderReducer';
import { CustomIcon } from '../CustomIcon/CustomIcon';
import {  View } from 'react-native'; 
import Dialog from 'react-native-dialog'
import uuid from 'react-native-uuid';
import { getPathFromFolder } from '../../helper/folderHelper';

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
  const buttonColor = folderName.length < 1 ? "#BBBBBB" : undefined

  const createFolder = () => {
    let id = uuid.v4().toString()
    addFolder({name: folderName, id, parent: getPathFromFolder(currentFolder)})
    setFolderName("")
    setMenuOpen(false)
  }

  const renderDialog = () => {
    return (
      <Dialog.Container visible={menuOpen}>
      <Dialog.Title>Create Folder</Dialog.Title>
      <Dialog.Input onChangeText={(text) => setFolderName(text)} placeholder='Folder Name'>
      </Dialog.Input>
      <Dialog.Button label="Cancel" onPress={() => setMenuOpen(false)}/>
      <Dialog.Button disabled={folderName.length < 1} color={buttonColor} label="Create Folder" onPress={() => createFolder()}/>
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
