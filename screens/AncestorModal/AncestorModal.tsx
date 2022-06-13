import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { TabBarIcon } from '../../navigation';
import styles from './AncestorModal.module.scss'
import { HeaderBackButton } from '@react-navigation/elements';

export const AncestorModal = ({setShowAncestorModal, showAncestorModal} : {setShowAncestorModal: (shouldShow: boolean) => void, showAncestorModal: Boolean}) => {
    const navigation = useNavigation(); 

    useEffect(() => {
      navigation.setOptions({
        title: 'Parents',
        headerLeft: () => <HeaderBackButton onPress={() => setShowAncestorModal(false)} />,
        headerRight: () => <TabBarIcon name="save" color="black" onPress={() => setShowAncestorModal(false)} />,
      });
      return () => {
        navigation.setOptions({
          title: undefined,
          headerLeft: () => undefined,
          headerRight: () => undefined,
        });
      };
    }, [showAncestorModal]);


  return (
    <View style={styles.modalContainer as any}>
        <Text>Ancestor Modal</Text>
        
    </View>
  )
}
