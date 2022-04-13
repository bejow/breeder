import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput } from 'react-native';
import styles from './AddPlantModal.module.scss';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Button, Input } from 'react-native-elements';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { useRef, useState } from 'react';
import { plantState } from '../../types';

export default function AddPlantModal() {
  const [plantData, setPlantData] = useState<plantState>(  {
    title: "",
    startDate: new Date(),
    flowerDate: new Date(),
    harvestDate: new Date(),
    note: "",
    strain: "",
    uuid: "",
    father: "",
    mother: "",
    properties: [""],
  })

  const strainRef = useRef<TextInput>(null);
  const noteRef = useRef<TextInput>(null)
  
  const [displayDatepicker, setDisplayDatepicker] = useState({
    startDate: false,
    flowerDate: false,
  })

  const {title, strain, startDate, flowerDate, note, uuid, father, mother, properties} = plantData;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add new plant</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Input
        style={styles.input}
        onSubmitEditing={() => strainRef.current?.focus()}
        placeholder='title'
        blurOnSubmit={false}
        value={title}
        label="Plant Title"
      />
      <Input
        ref={strainRef}
        onSubmitEditing={() => noteRef.current?.focus()}
        style={styles.input}
        placeholder='strain'
        blurOnSubmit={false}
        label="Strain"
      />
            <Input
        ref={strainRef}
        style={styles.input}
        placeholder='note'
        blurOnSubmit={true}
        label="Note"
      />
      <>
      <Button title="Start date" onPress={() => setDisplayDatepicker({...displayDatepicker, startDate: true})}/>
            {displayDatepicker.startDate && (
        <DateTimePicker 
          testID="dateTimePicker"
          value={startDate ? startDate : new Date()}
          onChange={(event:Event, date: Date|undefined) => {
            setDisplayDatepicker({...displayDatepicker, startDate: false})
            setPlantData({...plantData, startDate:date})
          }}
          mode="date"
          is24Hour={true}
        />
      )}
      </>
            {displayDatepicker.flowerDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={flowerDate ? flowerDate : new Date()}
          mode="date"
          is24Hour={true}
        />
      )}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

