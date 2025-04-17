import React from 'react';
import { StorageAccessFramework } from 'expo-file-system';
import { rootState } from '../../types';
import { connect, ConnectedProps } from 'react-redux';
import { CustomIcon } from '../CustomIcon/CustomIcon';
import { useNavigation } from '@react-navigation/native';

const mapStateToProps = (state: rootState) => ({
  state: state,
  plants: state.plants,
  seeds: state.seeds,
});

const mapDispatch = {};

type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatch);

const ExportButton = ({ state, plants }: PropsFromRedux) => {
  const timestamp = new Date(Date.now()).toISOString();
  const filename = `${timestamp}-breeder-export.json`;
  const navigation = useNavigation()





  return <CustomIcon name="export-variant" color="black" onPress={() => navigation.navigate("ExportScreen")} />;
};

export default connector(ExportButton);
