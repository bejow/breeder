import React, { RefObject, useState } from 'react'
import { GestureResponderEvent, TextInput, View } from 'react-native'
import { Input } from 'react-native-elements'
import { connect, ConnectedProps, useSelector } from 'react-redux'
import { getAllPlantProperties } from '../../redux/reducers/plantReducer'
import { plantProperty, rootState } from '../../types'
import { SearchDropdown } from '../SearchDropdown/SearchDropdown'
import styles from './PlantPropertyPicker.module.scss'
import uuid from 'react-native-uuid';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    onPress: () => console.log("FirstItem"),
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    onPress: () => console.log("Second Item"),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    onPress: () => console.log("Third Item"),
  },
];

const mapStateToProps = (state: rootState) => ({
  plants: state.plants,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


const PlantPropertyPicker = ({ setPlantProperties, properties, label, inputRef, selectableProperties }: { setPlantProperties: (properties: plantProperty[]) => void, properties: plantProperty[], label: String, inputRef: RefObject<TextInput>, selectableProperties: { id: String, title: String }[], addProperty: Function }) => {

  var previousUsedProperties = useSelector(getAllPlantProperties)
  var previousUsedPropertiesForFlatlist: Array<{
    id: string;
    title: string;
    onPress: (event: GestureResponderEvent) => void;
  }> = previousUsedProperties.map(property => ({ title: property.title, id: property.id, onPress: (event: GestureResponderEvent) => setPlantProperties([ ...properties, {  title :property.title as string ,  note: "", weight: 5, inheritance: undefined ,uuid: property.id} ]) }))
  const [selected, setSelected] = useState([])

  return (
    <View style={styles.container as any}>
      <SearchDropdown label={label} data={previousUsedPropertiesForFlatlist} selected={selected} setSelected={setSelected} inputRef={inputRef} />
    </View>
  )
}

export default connector(PlantPropertyPicker)