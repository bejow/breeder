import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { rootState, seedState } from '../../types';
import { addSeed } from '../../redux/reducers/seedReducer';
import { useNavigation } from '@react-navigation/native';
import { TabBarIcon } from '../../navigation/TabBarIcon';
import styles from './AddSeedModal.module.scss';
import { Button, Input } from 'react-native-elements';
import { AncestorModal } from '../AncestorModal/AncestorModal';
import { addPlant, selectPlantById } from '../../redux/reducers/plantReducer';

const defaultState = {
  title: '',
  amount: 0,
  harvestDate: undefined,
  note: '',
  strain: '',
  breeder: '',
  uuid: '',
  father: '',
  mother: '',
  type: undefined,
};

const defaultPlantState = {
  title: '',
  startDate: undefined,
  flowerDate: undefined,
  harvestDate: undefined,
  note: '',
  strain: '',
  uuid: '',
  father: '',
  mother: '',
  properties: new Array<plantProperty>(),
};

const mapStateToProps = (state: rootState) => ({
  plants: state.plants,
  seeds: state.seeds,
});

const mapDispatch = {
  addSeed,
  addPlant,
};

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  seed: seedState;
}

const connector = connect(mapStateToProps, mapDispatch);

const AddSeedModal = ({ addSeed, plants, seeds, addPlant }: Props) => {
  const [seedData, setSeedData] = useState<seedState>(defaultState);
  const { title, strain, breeder, note, harvestDate, uuid, father, mother, type } = seedData;
  const [displayDatePicker, setDisplayDatepicker] = useState(false);
  const navigation = useNavigation();

  const strainRef = useRef<TextInput>(null);
  const noteRef = useRef<TextInput>(null);
  const breederRef = useRef<TextInput>(null);
  const [showAncestorModal, setShowAncestorModal] = useState<boolean>(false);

  const motherPlant = useSelector((state) => selectPlantById(state as rootState, mother));
  const fatherPlant = useSelector((state) => selectPlantById(state as rootState, father));

  useEffect(() => {
    if (showAncestorModal === false)
      navigation.setOptions({
        headerRight: () => <TabBarIcon name="save" color="black" onPress={() => onSubmit()} />,
      });
    return () => {
      navigation.setOptions({
        title: undefined,
        headerRight: () => undefined,
      });
    };
  }, [showAncestorModal, seedData]);

  const onSubmit = () => {
    addSeed(seedData);
    navigation.goBack();
  };

  const onTextInputChange = (name: string, value: string) => {
    setSeedData({ ...seedData, [name]: value });
  };

  const onHarvestDateChange = (event: Event, date: Date | undefined) => {
    setDisplayDatepicker(false);
    setSeedData({ ...seedData, harvestDate: date });
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container as any}>
        <View style={styles.viewContainer as any}>
          <Input
            style={styles.input as any}
            onSubmitEditing={() => strainRef.current?.focus()}
            placeholder="title"
            blurOnSubmit={false}
            value={title}
            onChangeText={(text) => onTextInputChange('title', text)}
            label="Seed Title"
          />
          <Input
            ref={strainRef}
            style={styles.input as any}
            onSubmitEditing={() => breederRef.current?.focus()}
            placeholder="strain"
            blurOnSubmit={false}
            value={strain}
            onChangeText={(text) => onTextInputChange('strain', text)}
            label="Strain"
          />
          <Input
            ref={breederRef}
            style={styles.input as any}
            onSubmitEditing={() => noteRef.current?.focus()}
            placeholder="breeder"
            blurOnSubmit={false}
            value={breeder}
            onChangeText={(text) => onTextInputChange('breeder', text)}
            label="Breeder"
          />
          <Input
            ref={noteRef}
            style={styles.input as any}
            blurOnSubmit={true}
            placeholder="note"
            value={note}
            onChangeText={(text) => onTextInputChange('note', text)}
            label="Note"
          />

          <View style={styles.horizontalContainer}>
            <Button style={styles.button} title="Parents" onPress={() => setShowAncestorModal(true)} />
          </View>
        </View>
      </ScrollView>
      {showAncestorModal && (
        <View style={styles.modal}>
          <AncestorModal
            label="Pick Seed Parents"
            placeholder="Search or Add Plant"
            setShowAncestorModal={setShowAncestorModal}
            showAncestorModal={showAncestorModal}
            onSubmit={(search) => addPlant({ ...defaultPlantState, title: search })}
            setMother={(plantId: string) => setSeedData({ ...seedData, mother: plantId })}
            setFather={(plantId: string) => setSeedData({ ...seedData, father: plantId })}
            mother={motherPlant}
            father={fatherPlant}
          />
        </View>
      )}
      <Button buttonStyle={styles.addButton} title="Add" onPress={onSubmit} />
    </View>
  );
};

export default connector(AddSeedModal);
