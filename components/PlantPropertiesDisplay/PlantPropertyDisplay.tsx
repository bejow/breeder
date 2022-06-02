import React from 'react';
import { View } from 'react-native';
import { Text, Tooltip } from 'react-native-elements';
import { plantProperty } from '../../types';
import { TooltipProps } from 'react-native-elements';
import styles from './PlantPropertiesDisplay.module.scss';

const PlantPropertyDisplay = ({ property }: { property: plantProperty }) => {
  return (
    <View style={styles.propertyContainer as any}>
      <Text style={styles.propertyTitle as any}>{property.title}</Text>
      <Text style={styles.propertyWeight as any}>{property.weight}</Text>
    </View>
  );
};

export default PlantPropertyDisplay;
