import React, { useState } from 'react';

import { Pressable } from 'react-native';
import { StorageAccessFramework } from 'expo-file-system';
import { Text } from 'react-native-elements';
import { folderState, rootState, RootTabScreenProps } from '../../types';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import { addFolder, selectFolderById } from '../../redux/reducers/folderReducer';
import { CustomIcon } from '../CustomIcon/CustomIcon';
import { importAppendSeeds } from '../../redux/reducers/seedReducer';
import { Alert, View } from 'react-native';
import Dialog from 'react-native-dialog';
import uuid from 'react-native-uuid';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import SelectDropdown from 'react-native-select-dropdown';
import { getCurrentFolderIdFromPath } from '../../helper/folderHelper';

const mapStateToProps = (state: rootState) => ({
  folders: state.folders,
  currentFolder: state.appState.currentFolder,
});

const mapDispatch = { addFolder };

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  onFolderSelect: (folder: folderState, index:number) => void
}

const SelectFolderDropdown = ({ currentFolder, folders, addFolder, onFolderSelect }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  
  const renderDropdown = () => {
    return (
      <SelectDropdown
        data={folders}
        search={true}
        defaultButtonText={currentFolder.name}
        defaultValue={currentFolder}
        onSelect={(folder: folderState, index:number) => {
          onFolderSelect(folder, index)
        }}
        buttonTextAfterSelection={(selectedItem: folderState, index:number) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem.name;
        }}
        rowTextForSelection={(item: folderState, index:number) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item.name;
        }}
      />
    );
  };

  return (
    <View>
      {renderDropdown()}
    </View>
  );
};

export default connector(SelectFolderDropdown);
