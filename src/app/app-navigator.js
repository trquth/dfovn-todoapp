import React from 'react'
import {Dimensions, View} from 'react-native'
import {
    createStackNavigator, createDrawerNavigator,
    createBottomTabNavigator, createMaterialTopTabNavigator,
    createSwitchNavigator, createAppContainer
} from 'react-navigation';

import Todo from '../modules/todo/TodoContainer';
import SideBar from '../modules/sidebar/SideBarContainer';
import {Colors, FontNames} from '../themes';

const {width} = Dimensions.get('window')

const mainDrawerOptions = {

}

export const MainStack = createStackNavigator({
    ["FirstScreen"]: {
        screen: Todo,
        navigationOptions: {
        }
    },
}, {
        initialRouteName: "FirstScreen",
        defaultNavigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: Colors.orangeLight,
            },
            headerTitleStyle: {
                fontFamily: FontNames.RobotoBold,
                fontSize: 30, color: Colors.white, textAlign: 'center'
            }
        },
        navigationOptions: {
            headerForceInset: {top: 'never', bottom: 'never'}
        }
    })


export const MainDrawer = createDrawerNavigator({
    MainDrawer: {
        screen: MainStack,
    }
}, {
        navigationOptions: mainDrawerOptions,
        contentComponent: SideBar,
        drawerWidth: width,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
        drawerBackgroundColor: 'transparent',
        disableGestures: false,

    })

const routeAppConfiguration = {
    ["MainDrawer"]: {
        screen: MainDrawer,
    }
}

const stackAppConfiguration = {
    initialRouteName: "MainDrawer",
    navigationOptions: {

    }
}

export const AppNavigator = createSwitchNavigator(
    routeAppConfiguration,
    stackAppConfiguration
);

export default createAppContainer(AppNavigator)