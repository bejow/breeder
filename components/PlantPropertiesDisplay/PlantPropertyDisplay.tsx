import React from 'react';
import { plantProperty } from '../../types';
import { Chip } from '@rneui/themed';
import { hashStringToColor, hexAToRGBA, rgb2hsv } from '../../helper/colorHash';
import { scaleNumber } from '../../helper/utils';

const PlantPropertyDisplay = ({
  property,
  onPress,
}: {
  property: plantProperty;
  onPress: () => void | undefined;
}) => {
  const baseColorForProperty = hashStringToColor(property.title);
  const rgba = hexAToRGBA(baseColorForProperty, scaleNumber(property.weight, 0, 10, 0.5,1 ));
  return (
    <Chip
    onPress={onPress}
      buttonStyle={{ backgroundColor: rgba, margin: 4 }}
      title={`${property.title}: ${property.weight}`}
    />
  );
};

export default PlantPropertyDisplay;
