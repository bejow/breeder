import { Button, View } from 'react-native';
import { AncestorPicker } from '../AncestorPicker/AncestorPicker';
import styles from './styles.module.scss';
import { defaultPlantState } from '../../helper/plantHelper';
import { plantState } from '../../types';
import uuid from 'react-native-uuid';

interface Props {
  addPlant: (plant: plantState) => void;
  plantData: plantState;
  setPlantData: (plant: plantState) => void;
  motherPlant?: plantState;
  fatherPlant?: plantState;
}

const ParentForm = ({ addPlant, plantData, setPlantData, motherPlant, fatherPlant }: Props) => {
  const newUuid = uuid.v4().toString();
  return (
    <View style={styles.container}>
      <AncestorPicker
        label="Pick Plant Parents"
        placeholder="Search or Add Plant"
        onSubmit={(search, setMother, setSearch) => {
          addPlant({ ...defaultPlantState, title: search, uuid:newUuid });
          setPlantData({ ...plantData, [setMother ? 'mother' : 'father']: newUuid });
          setSearch("")
        }}
        setMother={(plantId: string) => setPlantData({ ...plantData, mother: plantId })}
        setFather={(plantId: string) => setPlantData({ ...plantData, father: plantId })}
        mother={motherPlant}
        father={fatherPlant}
      />
    </View>
  );
};

export default ParentForm;
