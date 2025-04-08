import { Text, View } from 'react-native';
import PropertyModal from '../../screens/PropertyModal/PropertyModal';
import { PlantPropertiesDisplay } from '../PlantPropertiesDisplay/PlantPropertiesDisplay';
import { plantProperty, plantState } from '../../types';
import { Button } from 'react-native-elements';
import styles from './styles.module.scss';

interface Props {
  properties: plantProperty[];
  showPropertyModal: boolean;
  plantData: plantState;
  setPlantData: (plantData: plantState) => void;
  setShowPropertyModal: (shouldShow: boolean) => void;
}

const PropertyForm = ({ properties, setPlantData, plantData, showPropertyModal, setShowPropertyModal }: Props) => (
  <View>
    <Button title="Properties" onPress={() => setShowPropertyModal(true)} />
   
    <PlantPropertiesDisplay properties={properties} />
    {showPropertyModal && (
      <View style={styles.modal}>
        <PropertyModal
          setShowPropertyModal={setShowPropertyModal}
          showPropertyModal={showPropertyModal}
          setPlantData={setPlantData}
          plantData={plantData}
          properties={properties}
        />
      </View>
    )}
  </View>
);

export default PropertyForm;
