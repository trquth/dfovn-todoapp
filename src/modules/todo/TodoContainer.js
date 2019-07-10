/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ListNotes } from './views/ListNotes';
import { TodoProvider } from './TodoContext';

export default class TodoContainer extends Component {
  static navigationOptions = {
    title: "Todo App"
  }

  render() {
    return (
      <TodoProvider>
        <ListNotes />
      </TodoProvider>
    );
  }
}