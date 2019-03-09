/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import PopularPage from './PopularPage';
import TrendingPage from './TrendingPage';
import FavoritePage from './FavoritePage';
import MyPage from './MyPage';
import NavigationUtil from "../navigator/NavigationUtil";
import DynamicTabNavigator from "./DynamicTabNavigator"


type Props = {};
export default class HomePage extends Component<Props> {
    _tabNavigator() {
        return createAppContainer(createBottomTabNavigator({
            Popular: {
                screen: PopularPage,
                navigationOptions: {
                    tabBarLabel: "最热",
                    tabBarIcon: ({tintColor, focused}) => (
                        <MaterialIcons name={'whatshot'} size={26} style={{color: tintColor}}/>
                    ),
                }
            },
            Trending: {
                screen: TrendingPage,
                navigationOptions: {
                    tabBarLabel: "趋势",
                    tabBarIcon: ({tintColor, focused}) => (
                        <Ionicons name={'md-trending-up'} size={26} style={{color: tintColor}}/>
                    ),
                }
            },
            Favorite: {
                screen: FavoritePage,
                navigationOptions: {
                    tabBarLabel: "收藏",
                    tabBarIcon: ({tintColor, focused}) => (
                        <MaterialIcons name={'favorite'} size={26} style={{color: tintColor}}/>
                    ),
                }
            },
            My: {
                screen: MyPage,
                navigationOptions: {
                    tabBarLabel: "我的",
                    tabBarIcon: ({tintColor, focused}) => (
                        <Entypo name={'user'} size={26} style={{color: tintColor}}/>
                    ),
                }
            }
        }))
    }

    render() {
        NavigationUtil.navigation = this.props.navigation;
        const Tab = this._tabNavigator();
        return <DynamicTabNavigator/>;
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
});
