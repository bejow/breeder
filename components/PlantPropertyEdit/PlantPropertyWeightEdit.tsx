import React from 'react'
import { View } from 'react-native'
import { plantProperty, plantPropertyWeight } from '../../types'
import { Slider } from '@miblanchard/react-native-slider';
import { useState } from 'react';
import { Text } from 'react-native-elements';

export const PlantPropertyWeightEdit = ({ property, setPlantProperty }: { property: plantProperty , setPlantProperty: (property: plantProperty) => void}) => {
    return (
        <View>
            <Text>Set Weight for Property: {property.title}</Text>
            <Text>{property.weight}</Text>

            <Slider value={property.weight} minimumValue={0} maximumValue={10} step={1} onValueChange={(value) => setPlantProperty({...property, weight: typeof value === "number" ? value as plantPropertyWeight : value[0] as plantPropertyWeight}) }/>
        </View>
    )
}
