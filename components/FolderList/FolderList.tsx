import React from 'react'
import { useState } from 'react'
import { View } from 'react-native'
import { folderReducer, folderState} from '../../types'
import styles from './FolderList.module.scss'
import FolderListItem from '../FolderListItem/FolderListItem'

export default ({folders, safelyDeleteFolder}: {folders: folderReducer, safelyDeleteFolder: (folderToDelete: folderState) => void}) => {
  const [search, setSearch] = useState("")

//   const getSearchedPlants = (search:string) => {
//     return plants.filter((plant) => plant.title.toLowerCase().includes(search.toLowerCase()))
//   }

  const renderFolderList = () => {
    // if (search !== ""){
    //   return getSearchedPlants(search).map((plant, index) => renderPlant(plant, index))
    // }
    // else {
      return folders.map((folder, index) => renderFolder(folder, index))

    // }
  }

  const renderFolder = (folder:folderState, index: number) => {
    return <FolderListItem safelyDeleteFolder={safelyDeleteFolder} key={"plantKey-" + "-" + index} folder={folder}/>
  }

  return (
    <View style={styles.list as any}>
      {/* <ClearableInput
            onDelete={() => setSearch("")}       
            placeholder="Search Plant"
            blurOnSubmit={false}
            value={search}
            onChangeText={(text: string) => setSearch(text)}
            onSubmitEditing={Keyboard.dismiss}
            clearButtonMode="always"    
            /> */}
        {renderFolderList()}
    </View>
  )
}
