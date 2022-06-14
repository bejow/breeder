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
import { DropdownItem as DropdownItemType} from '../PlantPropertyPicker/PlantPropertyPicker';

export const SearchDropdown = ({
  label,
  data,
  inputRef,
  renderSubmitButton,
  placeholder,
}: {
  label: String;
  data: { id: String; title: String; onPress: (event: GestureResponderEvent) => void }[];
  inputRef: RefObject<TextInput>;
  onSubmit: (item: any) => void;
  renderSubmitButton: (search: string) => ReactElement | undefined
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
    <View>
      <Input
        ref={inputRef}
        style={styles.input as any}
        placeholder={placeholder}
        blurOnSubmit={true}
        onChangeText={(text) => setFilter(text)}
        label={label}
        value={search}
        rightIcon={renderSubmitButton(search)}
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
