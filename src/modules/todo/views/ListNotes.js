
import React from 'react'
import { TextInput, FlatList, View, Text } from 'react-native'
import { CheckBox, ButtonWithIcon, BreakLine } from '../../common'
import { get } from 'lodash'

export const Note = (props) => {
  let { data } = props
  return <View style={{
    height: 70, flexDirection: 'row',
    width: "100%",
    alignItems: 'center',
    justifyContent: "center"
  }}>
    <CheckBox />
    <Text style={{ flex: 1, marginLeft: 5, marginRight: 5 }}>{get(data, 'content', '')}</Text>
    <ButtonWithIcon iconName="window-close"
      action={() => { }} />
  </View>
}

export const ListNotes = (props) => {
  let { data } = props
  return <FlatList
    style={{ flex: 1 }}
    data={data}
    renderItem={({ item }) => <Note data={item} />}
    ItemSeparatorComponent={() => <BreakLine />}
    ListEmptyComponent={<View><Text style={{ textAlign: 'center' }}>No note. Add new note</Text></View>}
  />
}