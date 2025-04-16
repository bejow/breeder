import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, useEffect, useState } from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { TabBarIcon } from '../../navigation/TabBarIcon';
import styles from './AncestorPicker.module.scss';

import { SearchDropdown } from '../SearchDropdown/SearchDropdown';
import { plantState, rootState } from '../../types';
import { useSelector } from 'react-redux';
import { getAllPlantTitles } from '../../redux/reducers/plantReducer';
import { ParentDisplay } from '../ParentDisplay/ParentDisplay';
import { Foundation } from '@expo/vector-icons';

export const AncestorPicker = ({
  placeholder,
  onSubmit,
  mother,
  father,
  setFather,
  setMother,
}: {
  label: string;
  placeholder: string;
  onSubmit: (search: string, selectMother: boolean, setSearch: (search:string) => void) => void;
  setFather: (plantId: string) => void;
  setMother: (plantId: string) => void;
  mother: plantState | undefined;
  father: plantState | undefined;
}) => {
  var previousUsedTitles = useSelector((state: rootState) => getAllPlantTitles(state));
  const [selectMother, setSelectMother] = useState(true);

  const renderAddAncestorButton: (search: string, setSearch: (search: string) => void) => ReactElement | undefined = (search, setSearch) => {
    // If property does not exists already: render a button to add this property
    if (search && !previousUsedTitlesForFlatlist.map((item) => item.title).includes(search)){
      return (
      <TabBarIcon
        size={20}
        color="black"
        name="plus"
        onPress={() => {
          onSubmit(search, selectMother, setSearch);
          setSearch('');
        }}
      />
    )};  };

  var previousUsedTitlesForFlatlist: Array<{
    id: string;
    title: string;
    onPress: (event: GestureResponderEvent) => void;
  }> = previousUsedTitles.map((plantTitle) => {
    return {
      title: plantTitle.title,
      id: plantTitle.id,
      onPress: (event: GestureResponderEvent) => {
        if (selectMother) {
          setMother(plantTitle.id);
        } else if (!selectMother) {
          setFather(plantTitle.id);
        }
      },
    };
  });

  return (
    <View>
      <View style={styles.iconContainer}>
        <Pressable style={styles.pressable} onPress={() => setSelectMother(true)}>
          <Foundation name="female-symbol" size={32} color={selectMother ? 'pink' : 'grey'} />
        </Pressable>
        <Pressable style={styles.pressable} onPress={() => setSelectMother(false)}>
          <Foundation name="male-symbol" size={32} color={selectMother ? 'grey' : 'blue'} />
        </Pressable>
      </View>

      <SearchDropdown
        data={previousUsedTitlesForFlatlist}
        label={`Pick ${selectMother ? 'Mother Plant' : 'Father Plant'}`}
        placeholder={placeholder}
        renderSubmitButton={renderAddAncestorButton}
      />
      <ParentDisplay motherPlant={mother} fatherPlant={father} />
    </View>
  );
};
