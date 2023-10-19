import {useState} from 'react'
import { connect, ConnectedProps, useSelector } from "react-redux";
import { Button, FlatList, ScrollView, StyleSheet, Keyboard } from "react-native";
import styles from './PlantScreen.module.scss'
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import {
  plantsReducer,
  plantState,
  RootStackParamList,
  rootState,
  RootTabScreenProps,
  seedState,
} from "../../types";
import { addPlant } from "../../redux/reducers/plantReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PlantList  from "../../components/PlantList/PlantList";
import ExportButton from "../../components/ExportButton/ExportButton";
import ImportButton from "../../components/ImportButton/ImportButton";
import FolderList from "../../components/FolderList/FolderList";
import { RouteProp } from "@react-navigation/native";
import { getParentFolders } from "../../redux/reducers/appStateReducer";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { ClearableInput } from '../../components/ClearableInput/ClearableInput';

const mapStateToProps = (state: rootState) => ({
  plants: state.plants,
  seeds: state.seeds,
  folders: state.folders,
  currentFolder: state.appState.currentFolder
});

const mapDispatch = {
  addPlant,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {
  navigation: RootTabScreenProps<"Plants">;
  route: RouteProp<RootStackParamList, 'Plants'>
}



function PlantScreen({ route, navigation, plants, seeds, addPlant, folders, currentFolder }: Props) {
  const [search, setSearch] = useState("")

  const getFoldersToDisplay = () => {
    // filters all folders within the current folder
    let foldersToDisplay = folders.filter((folder) => (folder.parent === currentFolder))
    // apply search filter to folders
    return foldersToDisplay.filter((folder) => folder.name.toLowerCase().includes(search.toLowerCase()))
  }

  const getPlantsToDisplay = () => {
    // filters all plants within the current folder
    let plantsToDisplay = plants.filter((plant) => (plant.folder === currentFolder))
    // apply search filter to plants
    return plantsToDisplay.filter((plant) => plant.title.toLowerCase().includes(search.toLowerCase()))
    
  }

  return (
    <View style={styles.container as any}>
      <ScrollView style={styles.listView as any}>
        <Breadcrumbs/>
        <ClearableInput
            onDelete={() => setSearch("")}       
            placeholder="Search Plant"
            blurOnSubmit={false}
            value={search}
            onChangeText={(text: string) => setSearch(text)}
            onSubmitEditing={Keyboard.dismiss}
            clearButtonMode="always"    
            />
      <FolderList folders={getFoldersToDisplay()}/>
      <PlantList plants={getPlantsToDisplay()}/>
      </ScrollView>
    </View>
  );
}



export default connector(PlantScreen);
