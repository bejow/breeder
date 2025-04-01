import { ListItem} from 'react-native-elements';
import { View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { folderState, rootState } from '../../types';
import { useNavigation } from '@react-navigation/native';
import styles from './FolderListItem.module.scss';
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
    navigation.navigate("PlantScreen", folder)
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
          <CustomIcon style={styles.icon} name="folder-outline"/>
      <ListItem.Content>
        <View style={styles.itemContainer}>
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
