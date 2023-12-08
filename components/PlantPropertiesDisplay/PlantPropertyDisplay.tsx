import React from 'react';
import { View } from 'react-native';
import { Text, Tooltip } from 'react-native-elements';
import { plantProperty } from '../../types';
import { TooltipProps } from 'react-native-elements';
import styles from './PlantPropertiesDisplay.module.scss';
import { Chip } from 'react-native-elements/dist/buttons/Chip';
import { hashStringToColor, hexAToRGBA, rgb2hsv } from '../../helper/colorHash';

const PlantPropertyDisplay = ({ property }: { property: plantProperty }) => {
  const baseColorForProperty = hashStringToColor(property.title)
  const rgba = hexAToRGBA(baseColorForProperty, property.weight > 0 ? property.weight / 10 : 0.05)
  return (

    <Chip buttonStyle={{"backgroundColor": rgba, margin: 8}} title={`${property.title}: ${property.weight}`}/>
  );
};

export default PlantPropertyDisplay;
