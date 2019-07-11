
import React, {useState, useEffect} from 'react'
import {FlatList, View, Text, Animated, StyleSheet} from 'react-native'
import {CheckBox, ButtonWithIcon, BreakLine} from '../../common'
import {get} from 'lodash'
import {TodoConsumer} from '../TodoContext';
import {noteStatus} from '../TodoAction';
import {CustomizeTextInput, Button} from "../../common"
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {Colors, FontNames} from '../../../themes';
import {Loading} from '../../common/Loading';

const ANIMATION_DURATION = 250;
const ROW_HEIGHT = 70;

export const Note = (props) => {

  const [animated] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(animated, {
      toValue: 1,
      duration: ANIMATION_DURATION,
    }).start();
  });

  let {data} = props

  const rowStyles = [styles.row,
  {
    height: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, ROW_HEIGHT],
      extrapolate: 'clamp',
    }),
  },
  {opacity: animated},
  {
    transform: [
      {scale: animated},
      {
        rotate: animated.interpolate({
          inputRange: [0, 1],
          outputRange: ['35deg', '0deg'],
          extrapolate: 'clamp',
        })
      }
    ],
  },
  ];

  return <TodoConsumer>
    {({deleteNote, changeStatus}) => {
      return <Animated.View
        style={rowStyles}
      >
        <CheckBox isChecked={data.status === noteStatus.done ? true : false}
          action={() => {changeStatus && changeStatus(data.key, data.status)}} />
        <Text style={{flex: 1,fontSize:20, fontFamily:FontNames.RobotoRegular, marginLeft: 5, marginRight: 5}} numberOfLines={1}>{get(data, 'content', '')}</Text>
        <ButtonWithIcon iconName="window-close"
          action={() => {
            deleteNote && deleteNote(data.key)
          }} />
      </Animated.View>
    }}
  </TodoConsumer>
}

export const ListNotes = () => {

  return <TodoConsumer>
    {({data, addTodo, isLoading,
      onSelectedStatus, selectedStatus,
      toggleAction}) => {
      return <View style={{flex: 1}}>
        <View style={[{flex: 1},
        {marginLeft: 10, marginRight: 10, marginTop: 10}]}>
          <CustomizeTextInput placeholder={"Enter todo name here"}
            pressDone={addTodo} />
          <View style={[{
            marginTop: 5,
            flexDirection: "row",
          }]}>
            <Button title={"Toggle All"} color={Colors.blue}
              action={() => toggleAction && toggleAction()} />
            <Icon name="filter" size={35} color={Colors.grayLight} style={{marginRight: 15, marginLeft: 15, }} />
            <View style={{flex: 1, flexDirection: 'row', justifyContent: "space-between", }}>
              <Button title={"All"} isHightligth={selectedStatus === ''}
                action={() => onSelectedStatus && onSelectedStatus('')} />
              <Button title={"Done"} isHightligth={selectedStatus === noteStatus.done}
                action={() => onSelectedStatus && onSelectedStatus(noteStatus.done)} />
              <Button title={"Active"} isHightligth={selectedStatus === noteStatus.active}
                action={() => onSelectedStatus && onSelectedStatus(noteStatus.active)} />
            </View>
          </View>
          <FlatList
            style={{flex: 1}}
            data={data}
            keyExtractor={(item) => item.key}
            renderItem={({item}) => <Note data={item} />}
            ItemSeparatorComponent={() => <BreakLine />}
            ListEmptyComponent={<View><Text style={{textAlign: 'center'}}>No note. Add new note</Text></View>}
          />
        </View>
        {isLoading && <Loading />}
      </View>
    }}
  </TodoConsumer>
}

const styles = StyleSheet.create({
  row: {
    height: ROW_HEIGHT,
    flexDirection: 'row',
    width: "100%",
    alignItems: 'center', justifyContent: "center"
  },

});