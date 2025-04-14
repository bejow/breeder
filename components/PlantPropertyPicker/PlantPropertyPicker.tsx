import React, { ReactElement } from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { getAllPlantProperties } from '../../redux/reducers/plantReducer';
import { plantProperty, rootState } from '../../types';
import { SearchDropdown } from '../SearchDropdown/SearchDropdown';
import styles from './PlantPropertyPicker.module.scss';
import uuid from 'react-native-uuid';
import { TabBarIcon } from '../../navigation/TabBarIcon';
import Toast from 'react-native-toast-message';

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
      onPress: (event: GestureResponderEvent) => {
        setPlantProperties([...properties, { title: property.title as string, note: '', weight: 5, inheritance: undefined, uuid: property.id }]);
        Toast.show({
          type: 'success',
          text1: `Property "${property.title}" selected`,
          text2: `"${property.title}" was selected for this plant`,
        });
      },
    };
  });

  const filterData = (data: DropdownItem[], search: string) => data.filter((item: DropdownItem) => item.title.toLowerCase().includes(search.toLowerCase()));

  const renderAddPropertyButton: (search: string, setSearch: (search: string) => void) => ReactElement | undefined = (search, setSearch) => {
    // If property does not exists already: render a button to add this property
    const filteredData = filterData(previousUsedPropertiesForFlatlist, search);

    const propertyExists = filteredData.some((property) => property.title.toLowerCase() === search.toLowerCase());
    if (propertyExists || search == "") {
      return undefined;
    } else {
      return (
        <TabBarIcon
          size={20}
          color="black"
          name="plus"
          onPress={() => {
            addProperty({ title: search, note: '', weight: 5, uuid: uuid.v4().toString(), inheritance: undefined });
            Toast.show({
              type: 'success',
              text1: `New Property "${search}" added`,
              text2: `"${search}" was added to your Property Collection`,
            });
            setSearch('');
          }}
        />
      );
    }
  };

  return (
    <View style={styles.container as any}>
      <SearchDropdown
        label={label}
        placeholder="Search or Create Property"
        // only render valid properties (no duplicates)
        data={previousUsedPropertiesForFlatlist.filter(
          (previousUsedProperty) => properties.findIndex((property) => property.uuid == previousUsedProperty.id) < 0
        )}
        renderSubmitButton={renderAddPropertyButton}
      />
    </View>
  );
};

export default connector(PlantPropertyPicker);
