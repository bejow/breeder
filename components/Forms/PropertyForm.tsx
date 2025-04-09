import { Text, View } from 'react-native';
import PropertyPicker from '../PropertyPicker/PropertyPicker';
import { PlantPropertiesDisplay } from '../PlantPropertiesDisplay/PlantPropertiesDisplay';
import { plantProperty, plantState } from '../../types';
import { Button } from 'react-native-elements';
import styles from './styles.module.scss';

interface Props {
  properties: plantProperty[];
  plantData: plantState;
  setPlantData: (plantData: plantState) => void;
}

const PropertyForm = ({ properties, setPlantData, plantData }: Props) => (
  <View>
    <PlantPropertiesDisplay properties={properties} />
      <View style={styles.modal}>
        <PropertyPicker
          setPlantData={setPlantData}
          plantData={plantData}
          properties={properties}
        />
      </View>
  </View>
);

export default PropertyForm;
