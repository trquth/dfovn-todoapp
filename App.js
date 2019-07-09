/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform, StyleSheet, Text,
  ScrollView, View, TextInput, Button
} from 'react-native';
import firebase from 'react-native-firebase';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('todos');
    this.state = {
      textInput: '',
    };
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
      <View style={styles.container}>
        <TextInput
          placeholder={'Add TODO'}
          value={this.state.textInput}
          onChangeText={(text) => this.updateTextInput(text)}
        />
        <Button
          title={'Add TODO'}
          disabled={!this.state.textInput.length}
          onPress={() => this.addTodo()}
        />
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
