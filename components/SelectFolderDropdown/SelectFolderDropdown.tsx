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
import { TabBarIcon } from '../../navigation/TabBarIcon';
import styles from './SelectFolderDropdown.module.scss';

interface Props {
  onFolderSelect: (folder: folderState, index: number) => void;
  folders: folderState[];
  currentFolder: folderState;
  addFolder: (folder: folderState) => void;
  selectedFolder: folderState;
}

const SelectFolderDropdown: React.FC<Props> = ({
  currentFolder,
  selectedFolder,
  folders,
  addFolder,
  onFolderSelect,
}: Props) => {
  const renderDropdown = () => {
    return (
      <SelectDropdown
        data={folders}
        search={true}
        dropdownStyle={styles.dropdownButtonStyle as any}
        renderSearchInputRightIcon={() => (
          <TabBarIcon color="black" size={20} name="plus" onPress={() => addFolder(selectedFolder)} />
        )}
        defaultValue={selectedFolder ? selectedFolder.name : currentFolder.name}
        onSelect={(folder: folderState, index: number) => {
          onFolderSelect(folder, index);
        }}
        searchPlaceHolder={currentFolder.name}
        renderButton={(selectedItem: folderState, isOpen: boolean) => {
          return (
            <View style={styles.dropdownButton}>
              <Text>{selectedItem ? selectedItem.name : selectedFolder.name}</Text>
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View style={styles.dropdownItem}>
              <Text>{item.name}</Text>
            </View>
          );
        }}
      />
    );
  };

  return <View>{renderDropdown()}</View>;
};

export default SelectFolderDropdown;
