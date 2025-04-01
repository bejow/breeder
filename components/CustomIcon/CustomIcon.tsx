import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import styles from './CustomIcon.module.scss'

export const CustomIcon = (props: any) => {
  return (
    <MaterialCommunityIcons size={30} style={styles.icon as any} {...props}/>
  )
}
