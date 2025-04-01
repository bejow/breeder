import React, { ReactElement } from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { getAllPlantProperties } from '../../redux/reducers/plantReducer';
import { plantProperty, rootState } from '../../types';
import { SearchDropdown } from '../SearchDropdown/SearchDropdown';
import styles from './PlantPropertyPicker.module.scss';
import uuid from 'react-native-uuid';
import { TabBarIcon } from '../../navigation/TabBarIcon';

export type DropdownItem = { id: String; title: String };
export type FlatlistProperty = {
  id: String;
  title: String;
  onPress: (event: GestureResponderEvent) => void;
};
const mapStateToProps = (state: rootState) => ({
  plants: state.plants,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const PlantPropertyPicker = ({
  setPlantProperties,
  properties,
  label,
  addProperty,
}: {
  setPlantProperties: (properties: plantProperty[]) => void;
  properties: plantProperty[];
  label: String;
  addProperty: (property: plantProperty) => void;
}) => {
  var previousUsedProperties = useSelector((state: rootState) => getAllPlantProperties(state));
  var previousUsedPropertiesForFlatlist: Array<FlatlistProperty> = previousUsedProperties.map((property) => {
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

  const filterData = (data: DropdownItem[], search: string) =>
    data.filter((item: DropdownItem) => item.title.toLowerCase().includes(search.toLowerCase()));

  const renderAddPropertyButton: (search: string) => ReactElement | undefined = (search) => {
    // If property does not exists already: render a button to add this property
    const filteredData = filterData(previousUsedPropertiesForFlatlist, search);

    const propertyExists = filteredData.some((property) => property.title.toLowerCase() === search.toLowerCase());
    if (propertyExists) {
      return undefined;
    } else {
      return (
        <TabBarIcon
          color="black"
          name="plus"
          onPress={() => {
            addProperty({ title: search, note: '', weight: 5, uuid: uuid.v4().toString(), inheritance: undefined });
          }}
        />
      );
    }
  };

  return (
    <View style={styles.container as any}>
      <SearchDropdown
        properties={properties}
        label={label}
        placeholder="Search or Create Property"
        data={previousUsedPropertiesForFlatlist}
        renderSubmitButton={renderAddPropertyButton}
      />
    </View>
  );
};

export default connector(PlantPropertyPicker);
