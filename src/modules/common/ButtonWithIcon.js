
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Colors } from '../../themes';

export const ButtonWithIcon = (props) => {
  let { iconName, action } = props
  return iconName && <TouchableOpacity style={{
  }} onPress={() => { action && action() }}>
    <Icon name={iconName} size={35} color={Colors.red} />
  </TouchableOpacity>
}