import React from 'react'
import { View } from 'react-native'
import { plantsReducer, rootState } from '../../types'
import  PlantListItem  from '../PlantListItem/PlantListItem'
import styles from './PlantList.module.scss'

export default ({plants}: {plants: plantsReducer}) => {
  return (
    <View style={styles.list as any}>
        {plants.map((plant, index) => <PlantListItem key={"plantKey-" + plant.uuid + "-" + index} plant={plant}/>)}
    </View>
  )
}
