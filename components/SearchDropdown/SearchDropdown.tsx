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
import { DropdownItem as DropdownItemType } from '../PlantPropertyPicker/PlantPropertyPicker';

export const SearchDropdown = ({
  label,
  data,
  renderSubmitButton,
  placeholder,
}: {
  label: String;
  data: { id: String; title: String; onPress: (event: GestureResponderEvent) => void }[];
  onSubmit: (item: any) => void;
  renderSubmitButton: (search: string) => ReactElement | undefined;
  placeholder: string;
}) => {
  const [search, setSearch] = useState('');

  const setFilter = (text: string) => {
    setSearch(text);
  };

  const filteredData = data.filter((item: { id: String; title: String }) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

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
      <Text style={styles.infoText}>{filteredData.length} Search Results:</Text>
      <FlatList
        style={styles.list as any}
        data={filteredData}
        renderItem={DropdownItem}
        keyExtractor={(item) => item.id as string}
      />
    </View>
  );
};
