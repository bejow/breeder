import React, { ReactElement, RefObject, useState } from 'react';
import { GestureResponderEvent, TextInput, View } from 'react-native';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { getAllPlantProperties } from '../../redux/reducers/plantReducer';
import { plantProperty, rootState } from '../../types';
import { SearchDropdown } from '../SearchDropdown/SearchDropdown';
import styles from './PlantPropertyPicker.module.scss';
import uuid from 'react-native-uuid';
import { TabBarIcon } from '../../navigation';

export type DropdownItem = { id: String; title: String }

const mapStateToProps = (state: rootState) => ({
  plants: state.plants,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const PlantPropertyPicker = ({
  setPlantProperties,
  properties,
  label,
  inputRef,
  addProperty,
}: {
  setPlantProperties: (properties: plantProperty[]) => void;
  properties: plantProperty[];
  label: String;
  inputRef: RefObject<TextInput>;
  addProperty: (property: plantProperty) => void;
}) => {

  var previousUsedProperties = useSelector((state: rootState) => getAllPlantProperties(state));
  var previousUsedPropertiesForFlatlist: Array<{
    id: string;
    title: string;
    onPress: (event: GestureResponderEvent) => void;
  }> = previousUsedProperties.map((property) => {
    return {
      title: property.title,
      id: property.id,
      onPress: (event: GestureResponderEvent) =>
        setPlantProperties([
          ...properties,
          { title: property.title as string, note: '', weight: 5, inheritance: undefined, uuid: property.id },
        ]),
    };
  });
  const [selected, setSelected] = useState([]);

  const filterData = (data: DropdownItem[], search: string) => ( data.filter((item: DropdownItem) =>
  item.title.toLowerCase().includes(search.toLowerCase())
)
  )

  const renderAddPropertyButton: (search: string) => ReactElement | undefined = (search) => {
    // If property does not exists already: render a button to add this property
    const filteredData = filterData(previousUsedPropertiesForFlatlist, search)
    
    const propertyExists = filteredData.some(
    (property) => property.title.toLowerCase() === search.toLowerCase())
    if (propertyExists){
      return undefined
    } else {
      return <TabBarIcon
      color="black"
      name="plus"
      onPress={() =>
        addProperty({ title: search, note: '', weight: 5, uuid: uuid.v4().toString(), inheritance: undefined })
      }
    />
    }
  }

  return (
    <View style={styles.container as any}>
      <SearchDropdown
        label={label}
        placeholder="Search or Create Property"
        data={previousUsedPropertiesForFlatlist}
        selected={selected}
        setSelected={setSelected}
        inputRef={inputRef}
        onSubmit={addProperty}
        renderSubmitButton={renderAddPropertyButton}
      />
    </View>
  );
};

export default connector(PlantPropertyPicker);
