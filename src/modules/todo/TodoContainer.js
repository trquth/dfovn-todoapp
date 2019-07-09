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
  ScrollView, View, TextInput, Button, FlatList, TouchableOpacity
} from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {NavBar} from '../navbar/NavBar';
import {Colors} from '../../themes';

export default class TodoContainer extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('todos');
    this.state = {
      textInput: '',
    };
  }

  static navigationOptions = {
    title: "Todo App"
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
      <View style={[{flex: 1}, {marginLeft: 10, marginRight: 10, marginTop: 10}]}>
        <TextInput
          style={{width: '100%', backgroundColor: Colors.grayLight, height: 50, borderRadius: 5}}
          placeholder={'Add TODO'}
          value={this.state.textInput}
          onChangeText={(text) => this.updateTextInput(text)}
        />
        <View style={{
          height: 60, flexDirection: "row",
          alignItems: "center",
        }}>
          <Icon name="filter" size={35} color={Colors.grayLight} style={{marginRight: 15, }} />
          <View style={{flex: 1, flexDirection: 'row', justifyContent: "space-between", }}>
            <TouchableOpacity style={{
              backgroundColor: Colors.green,
              height: 35, width: 70, justifyContent: "center",
              borderRadius: 5
            }} onPress={() => {}}>
              <Text style={{textAlign: "center"}}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              backgroundColor: Colors.green,
              height: 35, width: 70, justifyContent: "center",
              borderRadius: 5
            }} onPress={() => {}}>
              <Text style={{textAlign: "center"}}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              backgroundColor: Colors.green,
              height: 35, width: 70, justifyContent: "center",
              borderRadius: 5
            }} onPress={() => {}}>
              <Text style={{textAlign: "center"}}>Active</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          style={{flex: 1}}
          data={[{key: 'a'}, {key: 'b'}]}
          renderItem={({item}) => <View style={{
            height: 70, flexDirection: 'row',
            width: "100%",
            alignItems: 'center',
            justifyContent: "center"
          }}>
            <TouchableOpacity style={{
            }} onPress={() => {}}>
              <Icon name="check-square" size={35} color={Colors.grayLight} />
            </TouchableOpacity>
            <Text style={{flex: 1, marginLeft: 5, marginRight: 5}}>xxxx salfjl afl sjjalf asfj lsjj   </Text>
            <TouchableOpacity
              onPress={() => {}}>
              <Icon name="window-close" size={35} color={Colors.red} />
            </TouchableOpacity>
          </View>}
          ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: Colors.grayLight}} />}
        />
      </View>
    );
  }
}