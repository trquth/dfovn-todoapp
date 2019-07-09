import React from 'react';
import {
    StatusBar, View, TouchableOpacity, Text, Platform,
    BackHandler, ToastAndroid
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import AppNavigator from './app-navigator';


export default class AppRoot extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Platform.OS === 'android' && BackHandler.addEventListener('hardwareBackPress', this.handleAndroidBackPress)
    }

    handleAndroidBackPress = () => {
        //Todo
    }

    render() {
        return <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}
            forceInset={{vertical: 'never'}}>
            <StatusBar
                barStyle='light-content'
                translucent={true}
                backgroundColor="transparent" />

            <AppNavigator />
        </SafeAreaView>
    }
}