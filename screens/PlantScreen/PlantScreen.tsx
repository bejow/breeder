import { connect, ConnectedProps, useSelector } from "react-redux";
import { Button, FlatList, ScrollView, StyleSheet } from "react-native";
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
  
  let parentFolder = useSelector((state: rootState) => getParentFolders(state))
  const getFoldersToDisplay = () => {
    // filters all folders within the current folder
    return folders.filter((folder) => (folder.parent === currentFolder))
  }

  const getPlantsToDisplay = () => {
    // ilters all plants within the current folder
    return plants.filter((plant) => (plant.folder === currentFolder))
  }

  return (
    <View style={styles.container as any}>
      <ScrollView style={styles.listView as any}>
        <Breadcrumbs/>
      <FolderList folders={getFoldersToDisplay()}/>
      <PlantList plants={getPlantsToDisplay()}/>
      </ScrollView>
    </View>
  );
}



export default connector(PlantScreen);
