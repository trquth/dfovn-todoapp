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
import { TodoProvider } from './TodoContext';

export default class TodoContainer extends Component {

  constructor() {
    super();
    this.state = {
      textInput: '',
    };
  }

  static navigationOptions = {
    title: "Todo App"
  }

  updateTextInput(value) {
    this.setState({ textInput: value });
  }

  addTodo = (text) => {
    addNote(text)
  }

  render() {
    return (
      <TodoProvider>
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
          <ListNotes/>
        </View>
      </TodoProvider>
    );
  }
}