/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet, View} from 'react-native';
import { Colors } from '../../themes';

export default class SideBarContainer extends Component {

  constructor() {
    super();

  }

  updateTextInput(value) {
    this.setState({textInput: value});
  }

  addTodo() {
    this.ref.add({
      title: this.state.textInput,
      complete: false,
    });

    this.setState({
      textInput: '',
    });
  }

  render() {
    return (
      <View style={[styles.container,{backgroundColor: Colors.white}]}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
