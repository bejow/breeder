import React, { ReactElement, RefObject, useState } from 'react';
import { FlatList, GestureResponderEvent, Text, TextInput, View } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { IconNode } from 'react-native-elements/dist/icons/Icon';
import { TabBarIcon } from '../../navigation';
import { plantProperty } from '../../types';
import { DropdownItem } from './DropdownItem';
import styles from './SearchDropdown.module.scss';
import uuid from 'react-native-uuid';
import { DropdownItem as DropdownItemType, FlatlistProperty } from '../PlantPropertyPicker/PlantPropertyPicker';

export const SearchDropdown = ({
  label,
  data,
  renderSubmitButton,
  placeholder,
  properties,
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

  const isPropertyAlreadyPicked = (propertyTitle: String) => {
    // is property already selected for the current plant?
    if (
      properties.find((existingProperty) => {
        console.log(existingProperty)
        console.log(propertyTitle)
        if (existingProperty.title === propertyTitle) {
          return true;
        }
      })
    ) {
      return true;
    }
    return false;
  };

  let filteredData : Array<FlatlistProperty> = data.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) && !isPropertyAlreadyPicked(item.title) 
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
