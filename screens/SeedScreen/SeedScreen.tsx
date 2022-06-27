import { ScrollView, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import styles from './SeedScreen.module.scss';
import EditScreenInfo from '../../components/EditScreenInfo';
import SeedList from '../../components/SeedList/SeedList';
import { Text, View } from '../../components/Themed';
import { rootState, RootTabScreenProps } from '../../types';

const mapStateToProps = (state: rootState) => ({
  plants: state.plants,
  seeds: state.seeds,
});

const mapDispatch = {};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {
  navigation: RootTabScreenProps<'Plants'>;
}
function SeedScreen({ seeds, navigation }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.listView as any}>
        <SeedList seeds={seeds} />
      </ScrollView>
    </View>
  );
}

export default connector(SeedScreen);
