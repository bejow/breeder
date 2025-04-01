import React from 'react';

import { StorageAccessFramework } from 'expo-file-system';
import { rootState } from '../../types';
import { connect, ConnectedProps } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import { importAppendPlants } from '../../redux/reducers/plantReducer';
import { CustomIcon } from '../CustomIcon/CustomIcon';
import { importAppendSeeds } from '../../redux/reducers/seedReducer';

const mapStateToProps = (state: rootState) => ({
  state: state,
  plants: state.plants,
});

const mapDispatch = { importAppendPlants, importAppendSeeds };

type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatch);

const ImportButton = ({ state, plants, importAppendPlants, importAppendSeeds }: PropsFromRedux) => {
  DocumentPicker;

  const timestamp = new Date(Date.now()).toISOString();
  const filename = `breeder-export-${timestamp}.json`;
  const importData = async () => {
    // Requests permissions for external directory
    const document = await DocumentPicker.getDocumentAsync();
    if (!document.canceled) {
      const rawData = await StorageAccessFramework.readAsStringAsync(document.assets[0].uri);
      const data: rootState = JSON.parse(rawData);
      importAppendPlants(data);
      importAppendSeeds(data);
    } else {
      // cannot import
      return;
    }
  };
  return <CustomIcon name="database-import" color="black" onPress={importData} />;
};

export default connector(ImportButton);
