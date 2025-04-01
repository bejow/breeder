import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, useEffect, useState } from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { TabBarIcon } from '../../navigation/TabBarIcon';
import styles from './AncestorModal.module.scss';
import { HeaderBackButton } from '@react-navigation/elements';
import { SearchDropdown } from '../../components/SearchDropdown/SearchDropdown';
import { plantState, rootState } from '../../types';
import { useSelector } from 'react-redux';
import { getAllPlantTitles } from '../../redux/reducers/plantReducer';
import { ParentDisplay } from '../../components/ParentDisplay/ParentDisplay';
import { Foundation } from '@expo/vector-icons';

export const AncestorModal = ({
  setShowAncestorModal,
  showAncestorModal,
  label,
  placeholder,
  onSubmit,
  mother,
  father,
  setFather,
  setMother,
}: {
  setShowAncestorModal: (shouldShow: boolean) => void;
  showAncestorModal: Boolean;
  label: string;
  placeholder: string;
  onSubmit: (search: string) => void;
  setFather: (plantId: string) => void;
  setMother: (plantId: string) => void;
  mother: plantState | undefined;
  father: plantState | undefined;
}) => {
  const navigation = useNavigation();
  var previousUsedTitles = useSelector((state: rootState) => getAllPlantTitles(state));
  const [selectMother, setSelectMother] = useState(true);

  const renderAddAncestorButton: (search: string) => ReactElement | undefined = (search) => {
    // If property does not exists already: render a button to add this property
    return <TabBarIcon size={20} color="black" name="plus" onPress={() => onSubmit(search)} />;
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
        if (selectMother) {
          setMother(plantTitle.id);
        } else if (!selectMother) {
          setFather(plantTitle.id);
        }
      },
    };
  });

  useEffect(() => {
    navigation.setOptions({
      title: 'Select Parents',
      headerLeft: () => <HeaderBackButton onPress={() => setShowAncestorModal(false)} />,
      headerRight: () => <TabBarIcon size={20} name="save" color="black" onPress={() => setShowAncestorModal(false)} />,
    });
    return () => {
      navigation.setOptions({
        title: undefined,
        headerLeft: () => undefined,
        headerRight: () => undefined,
      });
    };
  }, [showAncestorModal, mother, father]);

  return (
    <View style={styles.modalContainer as any}>
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
