import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-elements'
import { plantProperty } from '../../types'
import { PlantPropertyWeightEdit } from './PlantPropertyWeightEdit'

export const PlantPropertyEdit = ({ properties, setPlantProperties} : {properties: Array<plantProperty>, setPlantProperties: (properties: plantProperty[]) => void}) => {
  
  const setPlantProperty = (property: plantProperty) => {
    var propertiesCopy = [...properties]
    var propertyIndex = propertiesCopy.findIndex((existingProperty) => existingProperty.uuid === property.uuid)
    propertiesCopy[propertyIndex] = property
    setPlantProperties(propertiesCopy)
  }

  return (
    <View>
      
      {properties.map((property: plantProperty) => {
        return (
          <View>
            <Text>Specify Plant Property</Text>
            <PlantPropertyWeightEdit property={property} setPlantProperty={setPlantProperty}/>
          </View>
        )
      })}
    </View>
  )
}
