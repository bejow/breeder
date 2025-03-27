import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { StorageAccessFramework } from 'expo-file-system';
import { Text } from 'react-native-elements';
import { rootState, RootTabScreenProps } from '../../types';
import { connect, ConnectedProps } from 'react-redux';
import { TabBarIcon } from '../../navigation';
import { CustomIcon } from '../CustomIcon/CustomIcon';

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
  const exportData = async () => {
    // Requests permissions for external directory
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (permissions.granted) {
      // Gets SAF URI from response
      const uri = permissions.directoryUri;
      try {
        const asset = JSON.stringify(state);
        const file = await StorageAccessFramework.createFileAsync(uri, filename, 'application/json');
        StorageAccessFramework.writeAsStringAsync(file, asset);
      } catch (e) {
      }
    }
  };
  return (
    <CustomIcon name="export-variant" color="black" onPress={exportData}/>
  );
};

export default connector(ExportButton);
