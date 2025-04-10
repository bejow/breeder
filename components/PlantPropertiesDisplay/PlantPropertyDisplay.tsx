import React from 'react';
import { plantProperty } from '../../types';
import { Chip } from '@rneui/themed';
import { hashStringToColor, hexAToRGBA, rgb2hsv } from '../../helper/colorHash';

const PlantPropertyDisplay = ({
  property,
  onPress,
}: {
  property: plantProperty;
  onPress: () => void | undefined;
}) => {
  const baseColorForProperty = hashStringToColor(property.title);
  const rgba = hexAToRGBA(baseColorForProperty, property.weight > 0 ? property.weight / 10 : 0.05);
  return (
    <Chip
    onPress={onPress}
      buttonStyle={{ backgroundColor: rgba }}
      title={`${property.title}: ${property.weight}`}
    />
  );
};

export default PlantPropertyDisplay;
