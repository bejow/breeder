import { StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';

import EditScreenInfo from '../../components/EditScreenInfo';
import SeedList from '../../components/SeedList/SeedList';
import { Text, View } from '../../components/Themed';
import { rootState, RootTabScreenProps } from '../../types';

const mapStateToProps = (state: rootState) => ({
  plants: state.plants,
  seeds: state.seeds
});

const mapDispatch = {
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {
  navigation: RootTabScreenProps<"Plants">;
}
function SeedScreen({seeds, navigation} : Props) {
  return (
    <View style={styles.container}>
      <SeedList seeds={seeds}/>
    </View>
  );
}

export default connector(SeedScreen)

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
