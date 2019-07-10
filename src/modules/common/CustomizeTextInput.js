
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { Colors } from '../../themes';

export const CustomizeTextInput = (props) => {
  let { placeholder, pressDone } = props

  const [text, setText] = useState("");

  return <TextInput
    style={{
      width: '100%',
      backgroundColor: Colors.grayLight,
      height: 50, borderRadius: 5, height: 50
    }}
    placeholder={placeholder}
    value={text}
    onChangeText={(text) => setText(text)}
    keyboardType="default"
    returnKeyType="done"
    onSubmitEditing={(event) => {
      pressDone && pressDone(text)
      setText("")
    }}
    underlineColorAndroid="transparent"
  />
}