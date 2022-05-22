import { connect, ConnectedProps } from "react-redux";
import { Button, FlatList, ScrollView, StyleSheet } from "react-native";
import styles from './PlantScreen.module.scss'
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import {
  plantsReducer,
  plantState,
  rootState,
  RootTabScreenProps,
  seedState,
} from "../../types";
import { addPlant } from "../../redux/reducers/plantReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import  PlantList  from "../../components/PlantList/PlantList";

const mapStateToProps = (state: rootState) => ({
  plants: state.plants,
  seeds: state.seeds
});

const mapDispatch = {
  addPlant,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {
  navigation: RootTabScreenProps<"Plants">;
}

function PlantScreen({ navigation, plants, seeds, addPlant }: Props) {
  console.log(plants);
  return (
    <View style={styles.container as any}>
      <ScrollView style={styles.listView as any}>
      <PlantList plants={plants}/>
      </ScrollView>
      <Button title="Clear Storage" onPress={() => AsyncStorage.clear()}/>
    </View>
  );
}



export default connector(PlantScreen);
