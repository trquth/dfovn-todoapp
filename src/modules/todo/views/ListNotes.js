
import React from 'react'
import { TextInput, FlatList, View, Text } from 'react-native'
import { CheckBox, ButtonWithIcon, BreakLine } from '../../common'
import { get } from 'lodash'
import { TodoConsumer } from '../TodoContext';
import { noteStatus } from '../TodoAction';

export const Note = (props) => {
  let { data } = props
  return <TodoConsumer>
    {({ deleteNote, changeStatus }) => {
      return <View style={{
        height: 70, flexDirection: 'row',
        width: "100%",
        alignItems: 'center',
        justifyContent: "center"
      }}>
        <CheckBox isChecked={data.status === noteStatus.done ? true : false}
          action={() => { changeStatus && changeStatus(data.key) }} />
        <Text style={{ flex: 1, marginLeft: 5, marginRight: 5 }}>{get(data, 'content', '')}</Text>
        <ButtonWithIcon iconName="window-close"
          action={() => { deleteNote && deleteNote(data.key) }} />
      </View>
    }}
  </TodoConsumer>
}

export const ListNotes = () => {
  return <TodoConsumer>
    {(data) => {
      return <FlatList
        style={{ flex: 1 }}
        data={get(data, 'data', [])}
        renderItem={({ item }) => <Note data={item} />}
        ItemSeparatorComponent={() => <BreakLine />}
        ListEmptyComponent={<View><Text style={{ textAlign: 'center' }}>No note. Add new note</Text></View>}
      />
    }}
  </TodoConsumer>
}