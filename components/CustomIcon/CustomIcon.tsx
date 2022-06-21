import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Icon } from '@expo/vector-icons/build/createIconSet'
import React from 'react'
import { IconProps } from 'react-native-elements'
import styles from './CustomIcon.module.scss'

export const CustomIcon = (props: any) => {
  return (
    <MaterialCommunityIcons size={30} style={styles.icon as any} {...props}/>
  )
}
