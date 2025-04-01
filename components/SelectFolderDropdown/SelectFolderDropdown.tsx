import React from 'react';
import { Text } from '@rneui/themed';
import { folderState } from '../../types';
import { View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
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
