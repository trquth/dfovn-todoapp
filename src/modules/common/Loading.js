
import React from 'react';
import {View, Text} from 'react-native';
import {Colors} from '../../themes';
var Spinner = require('react-native-spinkit');

export const Loading = () => {
    return <View style={{
        position: 'absolute',
        left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center', alignItems: 'center'
    }}>
        <View style={{
            width: 90, height: 90, borderRadius: 8, backgroundColor: Colors.white,
            justifyContent: 'center', alignItems: 'center'
        }}>
            <Spinner isVisible={true} size={50} type={'Bounce'} color={Colors.orangeLight} />
        </View>
    </View>
}