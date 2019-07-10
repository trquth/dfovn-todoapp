import React, { Component, createContext } from 'react';
import {
  Text,
  View, TextInput, TouchableOpacity, Alert
} from 'react-native';
import {
  addNote, updateNote,
  noteStatus, deleteNote,
  getAllNotes
} from './TodoAction';
import { ListNotes } from './views/ListNotes';
import { Button, CustomizeTextInput } from '../common';

const TodoContext = createContext({
  data: [],
  deleteNote: () => { },
  changeStatus: () => { },
  textInput: "",
  updateTextInput: () => { },
  addTodo: () => { }
});

export class TodoProvider extends Component {

  constructor() {
    super();

    this.state = {
      data: [],
      deleteNote: this.deleteNote,
      changeStatus: this.changeNoteStatus,
      textInput: "",
      updateTextInput: this.updateTextInput,
      addTodo: this.addTodo
    };

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
        data: data,
      });
    })


  }

  componentWillUnmount() {
    this.unsubscribe = null
  }

  updateTextInput = (value) => {
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
      <TodoContext.Provider value={this.state}>
        {this.props.children}
      </TodoContext.Provider>
    );
  }
}

export const TodoConsumer = TodoContext.Consumer;
