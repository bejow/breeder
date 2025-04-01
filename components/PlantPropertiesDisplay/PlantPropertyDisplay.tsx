import React from 'react';
import { plantProperty } from '../../types';
import { Chip } from '@rneui/themed';
import { hashStringToColor, hexAToRGBA, rgb2hsv } from '../../helper/colorHash';

const PlantPropertyDisplay = ({
  property,
  onLongPress,
}: {
  property: plantProperty;
  onLongPress: () => void | undefined;
}) => {
  const baseColorForProperty = hashStringToColor(property.title);
  const rgba = hexAToRGBA(baseColorForProperty, property.weight > 0 ? property.weight / 10 : 0.05);
  return (
    <Chip
      onLongPress={onLongPress}
      buttonStyle={{ backgroundColor: rgba, margin: 8 }}
      title={`${property.title}: ${property.weight}`}
    />
  );
};

export default PlantPropertyDisplay;
