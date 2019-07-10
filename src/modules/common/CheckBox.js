
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Colors } from '../../themes';

export const CheckBox = (props) => {
  let { isChecked, action } = props
  return <TouchableOpacity style={{
  }} onPress={() => { action && action() }}>
    <Icon name={isChecked ? "check-square" : "square"} size={35} color={Colors.grayLight} />
  </TouchableOpacity>
}