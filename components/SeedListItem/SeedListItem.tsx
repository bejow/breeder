import { ListItem, Avatar } from 'react-native-elements'

import React from 'react'
import {  seedState } from '../../types'
import { hashStringToColor } from '../../helper/colorHash'



export default ({seed}: {seed: seedState}) => {
  console.log(hashStringToColor(seed.strain));
  return (
      <ListItem bottomDivider>
        <Avatar size={32} rounded title={seed.strain.slice(0,2) } containerStyle={{ backgroundColor: hashStringToColor(seed.strain) }}/>
        <ListItem.Content>
          <ListItem.Title>{seed.title}</ListItem.Title>
          <ListItem.Subtitle>{seed.strain}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
  )
}

