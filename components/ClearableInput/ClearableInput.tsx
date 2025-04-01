import React from 'react';
import styles from './ClearableInput.module.scss';
import { View, TextInput, TouchableOpacity, Image, TextInputProps } from 'react-native';

interface ClearableInputProps extends TextInputProps {
  onDelete: () => void;
}

export const ClearableInput = ({ onDelete, ...rest }: ClearableInputProps) => {
  return (
    <View style={styles.parent as any}>
      <TextInput {...rest} style={styles.textInput as any} />
      {rest.value !== '' ? (
        <TouchableOpacity style={styles.closeButtonParent as any} onPress={onDelete}>
          <Image style={styles.closeButton as any} source={require('../../assets/images/close.png')} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
