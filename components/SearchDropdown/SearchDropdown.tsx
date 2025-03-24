import React, { ReactElement, RefObject, useState } from 'react';
import { FlatList, GestureResponderEvent, Text, TextInput, View } from 'react-native';
import { Input } from 'react-native-elements';

import { plantProperty } from '../../types';
import { DropdownItem } from './DropdownItem';
import styles from './SearchDropdown.module.scss';

import { DropdownItem as DropdownItemType, FlatlistProperty } from '../PlantPropertyPicker/PlantPropertyPicker';

export const SearchDropdown = ({
  label,
  data,
  renderSubmitButton,
  placeholder,

}: {
  label: String;
  data: { id: String; title: String; onPress: (event: GestureResponderEvent) => void }[];
  renderSubmitButton: (search: string) => ReactElement | undefined;
  placeholder: string;
  properties: plantProperty[];
}) => {
  const [search, setSearch] = useState('');

  const setFilter = (text: string) => {
    setSearch(text);
  };



  let filteredData : Array<FlatlistProperty> = data.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
  );

  filteredData = filteredData.map((property) => {
    // clear search input on Press
    return {...property, onPress:(event:GestureResponderEvent) => {
  
      property.onPress(event)
      setSearch("")
      
    }}
  })


  return (
    <View style={styles.container}>
      <Input
        style={styles.input as any}
        placeholder={placeholder}
        blurOnSubmit={true}
        onChangeText={(text) => setFilter(text)}
        label={label}
        value={search}
        rightIcon={renderSubmitButton(search)}
      />
      { search ? <>
      <Text style={styles.infoText}>{filteredData.length} Search Results:</Text>
      <FlatList
        style={styles.list as any}
        data={filteredData}
        renderItem={DropdownItem}
        keyExtractor={(item) => item.id as string}
      /></> : null
    }
    </View>
  );
};
