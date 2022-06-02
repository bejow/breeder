import React, { ReactElement, RefObject, useState } from 'react';
import { FlatList, GestureResponderEvent, TextInput, View } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { IconNode } from 'react-native-elements/dist/icons/Icon';
import { TabBarIcon } from '../../navigation';
import { plantProperty } from '../../types';
import { DropdownItem } from './DropdownItem';
import styles from './SearchDropdown.module.scss';
import uuid from 'react-native-uuid';

export const SearchDropdown = ({
  label,
  data,
  selected,
  setSelected,
  inputRef,
  addProperty,
}: {
  label: String;
  data: { id: String; title: String; onPress: (event: GestureResponderEvent) => void }[];
  inputRef: RefObject<TextInput>;
  selected: { id: String; title: String }[];
  setSelected: Function;
  addProperty: (property: plantProperty) => void;
}) => {
  const [search, setSearch] = useState('');

  const setFilter = (text: string) => {
    setSearch(text);
  };

  const filteredData = data.filter((item: { id: String; title: String }) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderAddPropertyButton: ReactElement | undefined = filteredData.some(
    (property) => property.title.toLowerCase() === search.toLowerCase()
  ) ? undefined : (
    <TabBarIcon
      color="black"
      name="plus"
      onPress={() =>
        addProperty({ title: search, note: '', weight: 5, uuid: uuid.v4().toString(), inheritance: undefined })
      }
    />
  );

  return (
    <View>
      <Input
        ref={inputRef}
        style={styles.input as any}
        placeholder="Search or Create Property"
        blurOnSubmit={true}
        onChangeText={(text) => setFilter(text)}
        label={label}
        value={search}
        rightIcon={renderAddPropertyButton}
      />
      <FlatList
        style={styles.list as any}
        data={filteredData}
        renderItem={DropdownItem}
        keyExtractor={(item) => item.id as string}
      />
    </View>
  );
};
