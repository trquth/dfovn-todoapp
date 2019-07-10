/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View, TextInput, TouchableOpacity, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Colors } from '../../themes';
import {
  addNote, updateNote,
  noteStatus, deleteNote,
  getAllNotes
} from './TodoAction';
import { ListNotes } from './views/ListNotes';
import { Button, CustomizeTextInput } from '../common';

export default class TodoContainer extends Component {

  constructor() {
    super();


    this.state = {
      textInput: '',
      notes: []
    };
  }

  static navigationOptions = {
    title: "Todo App"
  }

  componentDidMount() {
    this.unsubscribe = getAllNotes().onSnapshot((querySnapshot) => {
      let data = [];
      console.log('querySnapshot', querySnapshot)
      querySnapshot.forEach((doc) => {
        const { content, status } = doc.data();
        data.push({
          key: doc.id,
          content: content || "",
          status: status || "",
        });
      });

      this.setState({
        notes: data,
      });
    })


  }

  componentWillUnmount() {
    this.unsubscribe = null
  }

  updateTextInput(value) {
    this.setState({ textInput: value });
  }

  addTodo = (text) => {
    addNote(text)
  }

  changeNoteStatus = (id, status) => {
    updateNote(id, status)
  }

  deleteNote = (id) => {
    deleteNote(id).then(() => {
      console.log('DELETE SUCCESS')
    }).catch(() => {
      Alert.alert(
        'DELETE FAIL',
        'Delete note fail. Please try again',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    })
  }

  render() {
    return (
      <View style={[{ flex: 1 }, { marginLeft: 10, marginRight: 10, marginTop: 10 }]}>
        <CustomizeTextInput placeholder={"Enter todo name here"}
          pressDone={this.addTodo} />
        <View style={{
          height: 60, flexDirection: "row",
          alignItems: "center",
        }}>
          <Icon name="filter" size={35} color={Colors.grayLight} style={{ marginRight: 15, }} />
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", }}>
            <Button title={"All"} isHightligth={true} />
            <Button title={"Done"} />
            <Button title={"Active"} />
          </View>
        </View>
        <ListNotes data={this.state.notes} />
      </View>
    );
  }
}