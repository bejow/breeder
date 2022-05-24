import React, { RefObject, useState } from 'react'
import { FlatList, GestureResponderEvent, TextInput, View } from 'react-native'
import { Input } from 'react-native-elements'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { DropdownItem } from './DropdownItem'
import styles from './SearchDropdown.module.scss'

export const SearchDropdown = ({ label, data, selected, setSelected, inputRef }: { label: String, data: { id: String, title: String, onPress: (event: GestureResponderEvent) => void }[], inputRef: RefObject<TextInput>, selected: { id: String, title: String }[], setSelected: Function }) => {

    const [search, setSearch] = useState("")

    const setFilter = (text: string) => {
        setSearch(text)
    }
    console.log(data);
    const filteredData = data.filter((item: { id: String, title: String }) => (item.title.toLowerCase().includes(search.toLowerCase())))
    const propertyExists = data.some(property => property.title === search)
    console.log(filteredData);
    return (
        <View>
            <Input
                ref={inputRef}
                style={styles.input as any}
                placeholder='Search or Create Property'
                blurOnSubmit={true}
                onChangeText={(text) => setFilter(text)}
                label={label}
                value={search}
            />
            {!propertyExists && <Button style={styles.propertyButton as any} title="Create New Property" onPress={() => console.log("BTN")}/> }
            <FlatList
                style={styles.list as any}
                data={filteredData}
                renderItem={DropdownItem}
                keyExtractor={item => item.id as string}
            />
        </View>
    )
}
