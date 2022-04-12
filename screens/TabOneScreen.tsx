import { connect, ConnectedProps } from 'react-redux';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { plantsReducer, plantState, rootState, RootTabScreenProps } from '../types';
import {addPlant} from '../redux/reducers/plantReducer'




const mapStateToProps = (state: rootState) => ({
  plants: state.plants,
})

const mapDispatch = {
  addPlant
}

const connector = connect(mapStateToProps, mapDispatch)

// The inferred type will look like:
// {isOn: boolean, toggleOn: () => void}
type PropsFromRedux = ConnectedProps<typeof connector>
interface Props extends PropsFromRedux {
  navigation: RootTabScreenProps<'TabOne'>
}

function TabOneScreen({navigation, plants}: Props) {
  console.log(plants);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {plants.map((plant: plantState) => <Text key={plant.uuid}>{plant.title}</Text>)}
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});



export default connector(TabOneScreen);