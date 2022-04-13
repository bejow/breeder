import { connect, ConnectedProps } from "react-redux";
import { Button, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import {
  plantsReducer,
  plantState,
  rootState,
  RootTabScreenProps,
  seedState,
} from "../types";
import { addPlant } from "../redux/reducers/plantReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const mapStateToProps = (state: rootState) => ({
  plants: state.plants,
  seeds: state.seeds
});

const mapDispatch = {
  addPlant,
};

const connector = connect(mapStateToProps, mapDispatch);

// The inferred type will look like:
// {isOn: boolean, toggleOn: () => void}
type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {
  navigation: RootTabScreenProps<"Plants">;
}

function PlantScreen({ navigation, plants, seeds, addPlant }: Props) {
  console.log(plants);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {plants.map((plant: plantState) => (
        <Text key={plant.uuid}>{plant.title}</Text>
      ))}
      {seeds.map((seed: seedState) => (
        <Text key={seed.uuid}>{seed.title}</Text>
      ))}
      <Button
        title="Add Demo plant"
        onPress={() =>
          addPlant({
            title: "Test",
            startDate: new Date(Date.parse("2021-09-01T08:08:34.674Z")),
            flowerDate: new Date(Date.parse("2021-09-01T08:08:34.674Z")),
            harvestDate: new Date(Date.parse("2021-10-29T08:08:34.674Z")),
            note: "(Beispiel Eintrag kann gelöscht werden)",
            strain: "Test Sorte",
            uuid: "",
            father: "",
            mother: "",
            properties: [""],
          })
        }
      ></Button>
      <Button title="clear storage" onPress={() => AsyncStorage.clear()} />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default connector(PlantScreen);
