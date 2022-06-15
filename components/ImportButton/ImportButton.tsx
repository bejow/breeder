import React from 'react';

import { Pressable } from 'react-native';
import { StorageAccessFramework } from 'expo-file-system';
import { Text } from 'react-native-elements';
import { rootState, RootTabScreenProps } from '../../types';
import { connect, ConnectedProps } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import { importAppend } from '../../redux/reducers/plantReducer';

const mapStateToProps = (state: rootState) => ({
  state: state,
  plants: state.plants,
});

const mapDispatch = {importAppend};

type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatch);

const ExportButton = ({ state, plants, importAppend }: PropsFromRedux) => {
  DocumentPicker;

  const timestamp = new Date(Date.now()).toISOString();
  const filename = `breeder-export-${timestamp}.json`;
  const exportData = async () => {
    // Requests permissions for external directory
    const document = await DocumentPicker.getDocumentAsync();
    if (document.type === 'success') {
      const rawData = await StorageAccessFramework.readAsStringAsync(document.uri);
      const data: rootState= JSON.parse(rawData)
      importAppend(data)
      console.log(data)
    } else {
        console.log("cannot import");
      return;
    }
  };
  return (
    <Pressable onPress={exportData}>
      <Text>ImportButton</Text>
    </Pressable>
  );
};

export default connector(ExportButton);
