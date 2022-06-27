import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { rootState, seedState } from '../../types';
import { addSeed } from '../../redux/reducers/seedReducer';
import { useNavigation } from '@react-navigation/native';
import { TabBarIcon } from '../../navigation/TabBarIcon';
import styles from './AddSeedModal.module.scss';
import { Button, Input } from 'react-native-elements';

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

const mapStateToProps = (state: rootState) => ({
  plants: state.plants,
  seeds: state.seeds,
});

const mapDispatch = {
  addSeed,
};

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  seed: seedState;
}

const connector = connect(mapStateToProps, mapDispatch);

const AddSeedModal = ({ addSeed, plants, seeds }: Props) => {
  const [seedData, setSeedData] = useState<seedState>(defaultState);
  const { title, strain, breeder, note, harvestDate, uuid, father, mother, type } = seedData;
  const [displayDatePicker, setDisplayDatepicker] = useState(false);
  const navigation = useNavigation();

  const strainRef = useRef<TextInput>(null);
  const noteRef = useRef<TextInput>(null);
  const breederRef = useRef<TextInput>(null);
  const [showAncestorModal, setShowAncestorModal] = useState<boolean>(false);

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
        </View>
      </ScrollView>
      <Button buttonStyle={styles.addButton} title="Add" onPress={onSubmit} />
    </View>
  );
};

export default connector(AddSeedModal);
