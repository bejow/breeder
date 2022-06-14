import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, RefObject, useEffect, useState } from 'react';
import { GestureResponderEvent, Text, TextInput, Pressable, View } from 'react-native';
import { TabBarIcon } from '../../navigation';
import styles from './AncestorModal.module.scss';
import { HeaderBackButton } from '@react-navigation/elements';
import { SearchDropdown } from '../../components/SearchDropdown/SearchDropdown';
import { plantState, rootState } from '../../types';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { getAllPlantTitles } from '../../redux/reducers/plantReducer';

export const AncestorModal = ({
  setShowAncestorModal,
  showAncestorModal,
  label,
  placeholder,
  parentRef,
  onSubmit,
  mother,
  father,
  setFather,
  setMother
}: {
  setShowAncestorModal: (shouldShow: boolean) => void;
  showAncestorModal: Boolean;
  label: string;
  placeholder: string;
  parentRef: RefObject<TextInput>;
  onSubmit: (search: string) => void;
  setFather: (plantId: string) => void
  setMother: (plantId: string) => void
  mother: plantState | undefined,
  father: plantState | undefined,
}) => {
  const navigation = useNavigation();
  var previousUsedTitles = useSelector((state: rootState) => getAllPlantTitles(state));
  const [selectMother, setSelectMother] = useState(true)

  const renderAddAncestorButton: (search: string) => ReactElement | undefined = (search) => {
    // If property does not exists already: render a button to add this property
    return <TabBarIcon color="black" name="plus" onPress={() => onSubmit(search)} />;
  };

  var previousUsedTitlesForFlatlist: Array<{
    id: string;
    title: string;
    onPress: (event: GestureResponderEvent) => void;
  }> = previousUsedTitles.map((plantTitle) => {
    return {
      title: plantTitle.title,
      id: plantTitle.id,
      onPress: (event: GestureResponderEvent) => {
        if (selectMother){
          setMother(plantTitle.id)
        }
        else if (!selectMother){
          setFather(plantTitle.id)
        }
      },
    };
  });

  useEffect(() => {
    navigation.setOptions({
      title: 'Parents',
      headerLeft: () => <HeaderBackButton onPress={() => setShowAncestorModal(false)} />,
      headerRight: () => <TabBarIcon name="save" color="black" onPress={() => setShowAncestorModal(false)} />,
    });
    return () => {
      navigation.setOptions({
        title: undefined,
        headerLeft: () => undefined,
        headerRight: () => undefined,
      });
    };
  }, [showAncestorModal]);

  return (
    <View style={styles.modalContainer as any}>
      <Text>Ancestor Modal</Text>
      <Pressable onPress={() => setSelectMother(false)}><Text>Select Male</Text></Pressable>
      <Pressable onPress={() => setSelectMother(true)}><Text>Select Female</Text></Pressable>
      <Text>Currently selecting: {selectMother ? "female" : "male"}</Text>
      <SearchDropdown
        data={previousUsedTitlesForFlatlist}
        label={label}
        placeholder={placeholder}
        inputRef={parentRef}
        onSubmit={onSubmit}
        renderSubmitButton={renderAddAncestorButton}
      />
      <Text>Father: {father&&father.title}</Text>
      <Text> Mother: {mother&&mother.title}</Text>
    </View>
  );
};
