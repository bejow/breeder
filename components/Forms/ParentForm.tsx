import { Button, View } from 'react-native';
import { AncestorModal } from '../../screens/AncestorModal/AncestorModal';
import styles from './styles.module.scss';
import { defaultPlantState } from '../../helper/plantHelper';
import { plantState } from '../../types';

interface Props {
  showAncestorModal: boolean;
  setShowAncestorModal: (shouldShow: boolean) => void;
  addPlant: (plant: plantState) => void;
  plantData: plantState;
  setPlantData: (plant: plantState) => void;
  motherPlant?: plantState;
  fatherPlant?: plantState;
}

const ParentForm = ({ showAncestorModal, setShowAncestorModal, addPlant, plantData, setPlantData, motherPlant, fatherPlant }: Props) => {
  return (
    <View>
      <Button title="Parents" onPress={() => setShowAncestorModal(true)} />

      {showAncestorModal && (
        <View style={styles.modal}>
          <AncestorModal
            label="Pick Plant Parents"
            placeholder="Search or Add Plant"
            setShowAncestorModal={setShowAncestorModal}
            showAncestorModal={showAncestorModal}
            onSubmit={(search) => addPlant({ ...defaultPlantState, title: search })}
            setMother={(plantId: string) => setPlantData({ ...plantData, mother: plantId })}
            setFather={(plantId: string) => setPlantData({ ...plantData, father: plantId })}
            mother={motherPlant}
            father={fatherPlant}
          />
        </View>
      )}
    </View>
  );
};

export default ParentForm;
