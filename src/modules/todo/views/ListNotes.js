
import React, { useState } from 'react'
import { TextInput, FlatList, View, Text, Animated, Platform } from 'react-native'
import { CheckBox, ButtonWithIcon, BreakLine } from '../../common'
import { get } from 'lodash'
import { TodoConsumer } from '../TodoContext';
import { noteStatus } from '../TodoAction';
import { CustomizeTextInput, Button } from "../../common"
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Colors } from '../../../themes';
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;

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

  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

  let translateY = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  return <TodoConsumer>
    {({ data, addTodo }) => {
      return <View style={[{ flex: 1 },
      { marginLeft: 10, marginRight: 10, marginTop: 10 }]}>
        <CustomizeTextInput placeholder={"Enter todo name here"}
          pressDone={addTodo} />
        <Animated.View style={[{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }, { transform: [{ translateY: translateY }] }]}>
          <Icon name="filter" size={35} color={Colors.grayLight} style={{ marginRight: 15, }} />
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", }}>
            <Button title={"All"} isHightligth={true} />
            <Button title={"Done"} />
            <Button title={"Active"} />
          </View>
        </Animated.View>
        <FlatList
          style={{ flex: 1 }}
          data={data}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: animatedValue } } }],
          )}
          renderItem={({ item }) => <Note data={item} />}
          ItemSeparatorComponent={() => <BreakLine />}
          ListEmptyComponent={<View><Text style={{ textAlign: 'center' }}>No note. Add new note</Text></View>}
        />
      </View>

    }}
  </TodoConsumer>
}