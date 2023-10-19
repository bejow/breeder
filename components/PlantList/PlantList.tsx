import React from 'react'
import { useState } from 'react'
import { Keyboard, View } from 'react-native'
import { Input } from 'react-native-elements/dist/input/Input'
import { plantState, plantsReducer, rootState } from '../../types'
import { ClearableInput } from '../ClearableInput/ClearableInput'
import  PlantListItem  from '../PlantListItem/PlantListItem'
import styles from './PlantList.module.scss'

export default ({plants}: {plants: plantsReducer}) => {
  const [search, setSearch] = useState("")

  const getSearchedPlants = (search:string) => {
    return plants.filter((plant) => plant.title.toLowerCase().includes(search.toLowerCase()))
  }

  const renderPlantList = () => {
    if (search !== ""){
      return getSearchedPlants(search).map((plant, index) => renderPlant(plant, index))
    }
    else {
      return plants.map((plant, index) => renderPlant(plant, index))

    }
  }

  const renderPlant = (plant:plantState, index: number) => {
    return <PlantListItem key={"plantKey-" + plant.uuid + "-" + index} plant={plant}/>
  }

  return (
    <View style={styles.list as any}>

        {renderPlantList()}
    </View>
  )
}
