import { Button, View } from 'react-native';
import { AncestorPicker } from '../AncestorPicker/AncestorPicker';
import styles from './styles.module.scss';
import { defaultPlantState } from '../../helper/plantHelper';
import { plantState } from '../../types';

interface Props {
  addPlant: (plant: plantState) => void;
  plantData: plantState;
  setPlantData: (plant: plantState) => void;
  motherPlant?: plantState;
  fatherPlant?: plantState;
}

const ParentForm = ({  addPlant, plantData, setPlantData, motherPlant, fatherPlant }: Props) => {
  return (
    <View>
          <AncestorPicker
            label="Pick Plant Parents"
            placeholder="Search or Add Plant"
            onSubmit={(search) => addPlant({ ...defaultPlantState, title: search })}
            setMother={(plantId: string) => setPlantData({ ...plantData, mother: plantId })}
            setFather={(plantId: string) => setPlantData({ ...plantData, father: plantId })}
            mother={motherPlant}
            father={fatherPlant}
          />
    </View>
  );
};

export default ParentForm;
