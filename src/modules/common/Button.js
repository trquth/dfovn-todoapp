
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Colors } from '../../themes';

export const Button = (props) => {
  let { title, isHightligth, action } = props
  return <TouchableOpacity style={{
    backgroundColor: isHightligth ? Colors.green : Colors.white,
    height: 35, justifyContent: "center",
    borderRadius: 5, paddingRight: 20, paddingLeft: 20
  }} onPress={() => { action && action() }}>
    <Text style={{
      textAlign: "center",
      color: isHightligth ? Colors.white : Colors.black,
      fontSize: 15
    }}>{title}</Text>
  </TouchableOpacity>
}