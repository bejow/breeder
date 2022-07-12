import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { plantProperty } from '../../types';
import { PlantPropertyWeightEdit } from './PlantPropertyWeightEdit';

export const PlantPropertyEdit = ({
  properties,
  setPlantProperties,
}: {
  properties: Array<plantProperty>;
  setPlantProperties: (properties: plantProperty[]) => void;
}) => {
  const setPlantProperty = (property: plantProperty) => {
    var propertiesCopy = [...properties];
    var propertyIndex = propertiesCopy.findIndex((existingProperty) => existingProperty.uuid === property.uuid);
    propertiesCopy[propertyIndex] = property;
    setPlantProperties(propertiesCopy);
  };

  const removePlantProperty = (property: plantProperty) => {
    var propertiesCopy = [...properties];
    var propertyIndex = propertiesCopy.findIndex((existingProperty) => existingProperty.uuid === property.uuid);
    propertiesCopy.splice(propertyIndex, 1);
    setPlantProperties(propertiesCopy);
  };

  return (
    <View>
      <Text>Specify Plant Properties</Text>
      {properties.map((property: plantProperty, index) => {
        return (
          <View key={`plantPropertyEdit-${property.uuid}-${index}`}>
            <PlantPropertyWeightEdit 
              property={property}
              setPlantProperty={setPlantProperty}
              removePlantProperty={removePlantProperty}
            />
          </View>
        );
      })}
    </View>
  );
};
