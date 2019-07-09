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
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {FontNames, Colors} from '../../themes';

export const NavBar = () => {
    return (
        <View style={{
            flex: 1, height: 135, backgroundColor: "#ffb300",
            justifyContent: 'center'
        }}>
            <Text style={{
                fontFamily: FontNames.RobotoBold,
                fontSize: 35, color: Colors.white, textAlign: 'center'
            }}>TODO APP</Text>
        </View>
    );
}
