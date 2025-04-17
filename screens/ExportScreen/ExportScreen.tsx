import { connect, ConnectedProps } from 'react-redux';
import { plantState, rootState } from '../../types';
import styles from './ExportScreen.module.scss';
import { Text, View } from 'react-native';
import IconButton from '../../components/IconButton/IconButton';
import { StorageAccessFramework } from 'expo-file-system';
import { saveImage } from '../../helper/imageHelper';
import { Asset } from 'expo-media-library';

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


const ExportScreen = ({state, plants, seeds}: Props) => {

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

    const exportImagesByPlant = async (property:keyof plantState="strain") => {
        //add custom property select
        const unique = [...new Set(plants.map(plant => plant.strain))];
        type MyObject = {
            [key: string]: Asset[];
          };
        const exportData:MyObject = {}


        unique.map((uniqueProperty) => {
            const imagesToExport: Asset[] = []
            plants.forEach((plant) => {
                if (uniqueProperty == plant[property]){
                    imagesToExport.push(...plant.images)
                }
            })
            exportData[uniqueProperty] = imagesToExport
        })

        
        for (const [uniqueProperty, images] of Object.entries(exportData)){
            console.log(uniqueProperty, images)
            images.map((image) => saveImage(image.uri, () => {}, uniqueProperty))
        } 
    }

  return (
    <View style={styles.container as any}>
        <View style={styles.buttonContainer}>
            <Text style={styles.header}>Standard EXPORT:</Text>
      <IconButton icon="head" onPress={() => {}} title="FULL EXPORT" />
        <Text style={styles.infoText}>This will export your plant data and images. {"\n"} Data exported this way can be imported by the app again</Text>
        </View>
        <View style={styles.buttonContainer}>
        <Text style={styles.header}>Special EXPORT (EXPERIMENTAL/DANGER):</Text>
        <Text style={styles.subHeader}>(Exported Data is not App compatible)</Text>

        <IconButton icon="head" onPress={() => {exportData()}} title="EXPORT DATA" />
        <Text style={styles.infoText}>Exports all Information about the plants as .JSON file</Text>
        </View>
        <View style={styles.buttonContainer}>

    <IconButton icon="head" onPress={() => {exportImagesByPlant()}} title="EXPORT IMAGES TO COLLECTIONS (DANGER)" />
        <Text style={styles.infoText}>This will export your images to Image Collections on your device. Collections will be named based on your plant Data.</Text>
        
        </View>
        </View>
  );
};

export default connector(ExportScreen);
