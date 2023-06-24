import React from 'react'
import { useState } from 'react'
import { Keyboard, View } from 'react-native'
import { Input } from 'react-native-elements/dist/input/Input'
import { plantsReducer, rootState } from '../../types'
import { ClearableInput } from '../ClearableInput/ClearableInput'
import  PlantListItem  from '../PlantListItem/PlantListItem'
import styles from './PlantList.module.scss'

export default ({plants}: {plants: plantsReducer}) => {
  const [search, setSearch] = useState("")

  const renderPlantList = () => {
    if (search !== ""){
      return plants.filter((plant) => plant.title.toLowerCase().includes(search.toLowerCase())).map((plant, index) => <PlantListItem key={"plantKey-" + plant.uuid + "-" + index} plant={plant}/>)
    }
    else {
      return plants.map((plant, index) => <PlantListItem key={"plantKey-" + plant.uuid + "-" + index} plant={plant}/>)

    }
    
  }
  return (
    <View style={styles.list as any}>
      <ClearableInput
            onDelete={() => setSearch("")}       
            placeholder="Search Plant"
            blurOnSubmit={false}
            value={search}
            onChangeText={(text: string) => setSearch(text)}
            onSubmitEditing={Keyboard.dismiss}
            clearButtonMode="always"    
            />
        {renderPlantList()}
    </View>
  )
}
