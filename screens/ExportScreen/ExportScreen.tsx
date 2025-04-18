import { connect, ConnectedProps } from 'react-redux';
import { plantState, rootState } from '../../types';
import styles from './ExportScreen.module.scss';
import { ActivityIndicator, Text, View } from 'react-native';
import IconButton from '../../components/IconButton/IconButton';
import { StorageAccessFramework } from 'expo-file-system';
import { saveImage } from '../../helper/imageHelper';
import { Asset, getAssetsAsync } from 'expo-media-library';
import { useState } from 'react';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const mapStateToProps = (state: rootState) => ({
  state: state,
  plants: state.plants,
  seeds: state.seeds,
  folders: state.folders,
});

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

const timestamp = new Date(Date.now()).toISOString();

const filename = `${timestamp}-breeder-export.json`;

const ExportScreen = ({ state, plants, seeds }: Props) => {
  const [loading, setLoading] = useState(false);

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
      } catch (e) {}
    }
  };

  const saveJsonToFile = async (jsonData: string, fileName: string) => {
    try {
      const path = FileSystem.documentDirectory + fileName;
      await FileSystem.writeAsStringAsync(path, jsonData);
      console.log('JSON data saved successfully:', path);
    } catch (error) {
      console.error('Error saving JSON:', error);
    }
  };

  const saveImageToFile = async (uri: string, fileName: string) => {
    // try {
    //   const localUri = FileSystem.documentDirectory + fileName;
    //   await FileSystem.copyAsync({ from: uri, to: localUri });
    //   console.log('Image saved successfully:', localUri);
    //   return localUri;
    // } catch (error) {
    //   console.error('Error saving image:', error);
    // }

    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (permissions.granted) {
      // Gets SAF URI from response
      const uri = permissions.directoryUri;
      try {
        const asset = JSON.stringify(state);
        const file = await StorageAccessFramework.createFileAsync(uri, filename, 'application/json');
        StorageAccessFramework.writeAsStringAsync(file, asset);
      } catch (e) {}
    }
  };

  const shareFile = async (uri:string) => {
    // Check if sharing is available
    if (await Sharing.isAvailableAsync()) {
      // Share the file
      await Sharing.shareAsync(uri);
    } else {
      alert("Sharing is not available on your platform.");
    }
  };

  const fullExport = async () => {
    const folderUri = FileSystem.documentDirectory + 'export-folder/';
    const jsonFileUri = folderUri + 'data.json';
    const imageFileUri = folderUri + 'image.jpg';
    await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });
    await FileSystem.writeAsStringAsync(jsonFileUri, JSON.stringify(state));

    shareFile(jsonFileUri)

    // const images: Asset[] = []
    // plants.map((plant) => images.push(...plant.images))
    // console.log(images)
    // images.map((image, index) => saveImageToFile(image.uri, `namingPossible${index}`))


  }

  const exportImagesByPlant = async (property: keyof plantState = 'strain') => {
    //add custom property select
    setLoading(true);
    const unique = [...new Set(plants.map((plant) => plant.strain))];
    type MyObject = {
      [key: string]: Asset[];
    };
    const exportData: MyObject = {};

    unique.map((uniqueProperty) => {
      const imagesToExport: Asset[] = [];
      plants.forEach((plant) => {
        if (uniqueProperty == plant[property]) {
          imagesToExport.push(...plant.images);
        }
      });
      exportData[uniqueProperty] = imagesToExport;
    });

    for (const [uniqueProperty, images] of Object.entries(exportData)) {
      console.log(uniqueProperty, images);
      images.map(async (image) => await saveImage(image.uri, () => {}, uniqueProperty));
    }
    setLoading(false);
  };

  return (
    <View style={styles.container as any}>
      {loading ? (
        <View style={styles.buttonContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
          <View style={styles.buttonContainer}>
            <Text style={styles.header}>Standard EXPORT:</Text>
            <IconButton icon="head" onPress={() => {fullExport()}} title="FULL EXPORT" />
            <Text style={styles.infoText}>
              This will export your plant data and images to the filesystem. {'\n'} Data exported this way can be imported by the app again
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.header}>Special EXPORT (EXPERIMENTAL/DANGER):</Text>
            <Text style={styles.subHeader}>(Exported Data is not App compatible)</Text>

            <IconButton
              icon="head"
              onPress={() => {
                exportData();
              }}
              title="EXPORT DATA"
            />
            <Text style={styles.infoText}>Exports all Information about the plants as .JSON file</Text>
          </View>
          <View style={styles.buttonContainer}>
            <IconButton
              icon="head"
              onPress={() => {
                exportImagesByPlant();
              }}
              title="EXPORT IMAGES TO COLLECTIONS (DANGER)"
            />
            <Text style={styles.infoText}>
              This will export your images to Image Collections on your device. Collections will be named based on your plant Data.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default connector(ExportScreen);
